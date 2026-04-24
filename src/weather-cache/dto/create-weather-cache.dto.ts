import { IsDateString, IsNumber, IsObject, Max, Min } from 'class-validator';

export class CreateWeatherCacheDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;

  @IsObject()
  weather_data!: Record<string, any>;

  @IsDateString()
  expires_at!: Date;
}
