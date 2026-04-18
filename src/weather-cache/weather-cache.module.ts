import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherCacheController } from './weather-cache.controller';
import { WeatherCacheService } from './weather-cache.service';
import { WeatherCache } from './entities/weather-cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherCache])],
  controllers: [WeatherCacheController],
  providers: [WeatherCacheService],
})
export class WeatherCacheModule {}