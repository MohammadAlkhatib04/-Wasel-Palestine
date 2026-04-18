import { IsDateString, IsNumber, IsObject } from 'class-validator';

export class CreateWeatherCacheDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsObject()
  weather_data!: Record<string, any>;

  @IsDateString()
  expires_at!: Date;
}