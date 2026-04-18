import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherCache } from './entities/weather-cache.entity';
import { CreateWeatherCacheDto } from './dto/create-weather-cache.dto';
import { UpdateWeatherCacheDto } from './dto/update-weather-cache.dto';

@Injectable()
export class WeatherCacheService {
  constructor(
    @InjectRepository(WeatherCache)
    private readonly weatherCacheRepository: Repository<WeatherCache>,
  ) {}

  async create(createWeatherCacheDto: CreateWeatherCacheDto) {
    const weatherCache = this.weatherCacheRepository.create({
      latitude: createWeatherCacheDto.latitude,
      longitude: createWeatherCacheDto.longitude,
      weather_data: createWeatherCacheDto.weather_data,
      expires_at: createWeatherCacheDto.expires_at,
    });

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

    return await this.weatherCacheRepository.findOne({
      where: { id },
    });
  }
}