import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteCache } from './entities/route-cache.entity';
import { CreateRouteCacheDto } from './dto/create-route-cache.dto';
import { UpdateRouteCacheDto } from './dto/update-route-cache.dto';

@Injectable()
export class RouteCacheService {
  constructor(
    @InjectRepository(RouteCache)
    private readonly routeCacheRepository: Repository<RouteCache>,
  ) {}

  async create(createRouteCacheDto: CreateRouteCacheDto) {
    const routeCache = this.routeCacheRepository.create({
      origin_hash: createRouteCacheDto.origin_hash,
      destination_hash: createRouteCacheDto.destination_hash,
      constraints_hash: createRouteCacheDto.constraints_hash,
      route_data: createRouteCacheDto.route_data,
      expires_at: createRouteCacheDto.expires_at,
    });

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

  return await this.routeCacheRepository.findOne({
    where: { id },
  });
}
}