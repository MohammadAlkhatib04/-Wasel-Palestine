import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { RouteCache } from './entities/route-cache.entity';
import { CreateRouteCacheDto } from './dto/create-route-cache.dto';
import { UpdateRouteCacheDto } from './dto/update-route-cache.dto';
import { EstimateRouteDto } from './dto/estimate-route.dto';

@Injectable()
export class RouteCacheService {
  constructor(
    @InjectRepository(RouteCache)
    private readonly routeCacheRepository: Repository<RouteCache>,
    private readonly configService: ConfigService,
  ) {}

  async create(createRouteCacheDto: CreateRouteCacheDto) {
    const routeCache = this.routeCacheRepository.create(createRouteCacheDto);
    return await this.routeCacheRepository.save(routeCache);
  }

  async findAll() {
    return await this.routeCacheRepository.find({
      order: {
        cached_at: 'DESC',
      },
    });
  }

  async update(id: number, updateRouteCacheDto: UpdateRouteCacheDto) {
    await this.routeCacheRepository.update(id, updateRouteCacheDto);

    const updated = await this.routeCacheRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException(`Route cache with id ${id} not found`);
    }

    return updated;
  }

  async estimateRoute(estimateRouteDto: EstimateRouteDto) {
    const originHash = this.hashCoordinate(
      estimateRouteDto.fromLat,
      estimateRouteDto.fromLng,
    );
    const destinationHash = this.hashCoordinate(
      estimateRouteDto.toLat,
      estimateRouteDto.toLng,
    );
    const constraintsHash = this.hashConstraints({
      avoidCheckpoints: !!estimateRouteDto.avoidCheckpoints,
    });

    const now = new Date();
    const cached = await this.routeCacheRepository.findOne({
      where: {
        origin_hash: originHash,
        destination_hash: destinationHash,
        constraints_hash: constraintsHash,
      },
    });

    if (cached && cached.expires_at > now) {
      return {
        message: 'Route estimate fetched from cache',
        data: {
          ...cached.route_data,
          source: 'cache',
        },
      };
    }

    const orsApiKey = this.configService.get<string>('ORS_API_KEY');
    if (!orsApiKey) {
      throw new InternalServerErrorException('ORS_API_KEY is not configured');
    }

    const response = await fetch(
      'https://api.openrouteservice.org/v2/directions/driving-car',
      {
        method: 'POST',
        headers: {
          Authorization: orsApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: [
            [estimateRouteDto.fromLng, estimateRouteDto.fromLat],
            [estimateRouteDto.toLng, estimateRouteDto.toLat],
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new InternalServerErrorException(
        `OpenRouteService request failed: ${errorText}`,
      );
    }

    const json = (await response.json()) as any;
    const summary = json?.routes?.[0]?.summary;

    if (!summary) {
      throw new InternalServerErrorException('Invalid route response from ORS');
    }

    const routeData = {
      distance_meters: summary.distance,
      duration_seconds: summary.duration,
      distance_km: Number((summary.distance / 1000).toFixed(2)),
      duration_minutes: Number((summary.duration / 60).toFixed(2)),
      factors: {
        provider: 'openrouteservice',
        avoidCheckpoints: !!estimateRouteDto.avoidCheckpoints,
      },
    };

    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);

    if (cached) {
      cached.route_data = routeData;
      cached.expires_at = expiresAt;
      await this.routeCacheRepository.save(cached);
    } else {
      const newCache = this.routeCacheRepository.create({
        origin_hash: originHash,
        destination_hash: destinationHash,
        constraints_hash: constraintsHash,
        route_data: routeData,
        expires_at: expiresAt,
      });
      await this.routeCacheRepository.save(newCache);
    }

    return {
      message: 'Route estimate fetched successfully',
      data: {
        ...routeData,
        source: 'openrouteservice',
      },
    };
  }

  private hashCoordinate(lat: number, lng: number) {
    return createHash('sha256')
      .update(`${lat.toFixed(5)},${lng.toFixed(5)}`)
      .digest('hex');
  }

  private hashConstraints(value: Record<string, unknown>) {
    return createHash('sha256').update(JSON.stringify(value)).digest('hex');
  }
}
