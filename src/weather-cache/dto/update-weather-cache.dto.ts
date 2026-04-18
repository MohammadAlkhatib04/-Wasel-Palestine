import { PartialType } from '@nestjs/mapped-types';
import { CreateWeatherCacheDto } from './create-weather-cache.dto';

export class UpdateWeatherCacheDto extends PartialType(CreateWeatherCacheDto) {}