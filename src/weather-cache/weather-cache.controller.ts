import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WeatherCacheService } from './weather-cache.service';
import { CreateWeatherCacheDto } from './dto/create-weather-cache.dto';
import { UpdateWeatherCacheDto } from './dto/update-weather-cache.dto';

@Controller('api/v1/weather-cache')
export class WeatherCacheController {
  constructor(private readonly weatherCacheService: WeatherCacheService) {}

  @Post()
  create(@Body() createWeatherCacheDto: CreateWeatherCacheDto) {
    return this.weatherCacheService.create(createWeatherCacheDto);
  }

  @Get()
  findAll() {
    return this.weatherCacheService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWeatherCacheDto: UpdateWeatherCacheDto,
  ) {
    return this.weatherCacheService.update(Number(id), updateWeatherCacheDto);
  }
}