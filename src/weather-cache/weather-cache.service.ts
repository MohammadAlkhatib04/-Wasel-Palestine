import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { WeatherCache } from './entities/weather-cache.entity';
import { CreateWeatherCacheDto } from './dto/create-weather-cache.dto';
import { UpdateWeatherCacheDto } from './dto/update-weather-cache.dto';
import { GetCurrentWeatherDto } from './dto/get-current-weather.dto';

@Injectable()
export class WeatherCacheService {
  constructor(
    @InjectRepository(WeatherCache)
    private readonly weatherCacheRepository: Repository<WeatherCache>,
  ) {}

  async create(createWeatherCacheDto: CreateWeatherCacheDto) {
    const weatherCache = this.weatherCacheRepository.create(createWeatherCacheDto);
    return await this.weatherCacheRepository.save(weatherCache);
  }

  async findAll() {
    return await this.weatherCacheRepository.find({
      order: {
        cached_at: 'DESC',
      },
    });
  }

  async update(id: number, updateWeatherCacheDto: UpdateWeatherCacheDto) {
    await this.weatherCacheRepository.update(id, updateWeatherCacheDto);

    const updated = await this.weatherCacheRepository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException(`Weather cache with id ${id} not found`);
    }

    return updated;
  }

  async getCurrentWeather(query: GetCurrentWeatherDto) {
    const normalizedLat = Number(query.latitude.toFixed(3));
    const normalizedLng = Number(query.longitude.toFixed(3));
    const now = new Date();

    const cached = await this.weatherCacheRepository.findOne({
      where: {
        latitude: normalizedLat,
        longitude: normalizedLng,
        expires_at: MoreThan(now),
      },
      order: { cached_at: 'DESC' },
    });

    if (cached) {
      return {
        message: 'Weather fetched from cache',
        data: {
          ...cached.weather_data,
          source: 'cache',
        },
      };
    }

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(query.latitude));
    url.searchParams.set('longitude', String(query.longitude));
    url.searchParams.set('current', 'temperature_2m,wind_speed_10m,weather_code');

    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorText = await response.text();
      throw new InternalServerErrorException(
        `Weather provider request failed: ${errorText}`,
      );
    }

    const json = (await response.json()) as any;
    const current = json?.current;

    if (!current) {
      throw new InternalServerErrorException(
        'Invalid weather response from provider',
      );
    }

    const weatherData = {
      latitude: query.latitude,
      longitude: query.longitude,
      temperature_celsius: current.temperature_2m,
      wind_speed_10m: current.wind_speed_10m,
      weather_code: current.weather_code,
      observed_at: current.time,
      provider: 'open-meteo',
    };

    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);

    const weatherCache = this.weatherCacheRepository.create({
      latitude: normalizedLat,
      longitude: normalizedLng,
      weather_data: weatherData,
      expires_at: expiresAt,
    });

    await this.weatherCacheRepository.save(weatherCache);

    return {
      message: 'Weather fetched successfully',
      data: {
        ...weatherData,
        source: 'open-meteo',
      },
    };
  }
}
