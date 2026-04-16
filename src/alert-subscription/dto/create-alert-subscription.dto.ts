import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAlertSubscriptionDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  center_latitude!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  center_longitude!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  radius_km!: number;

  @IsString()
  category!: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_active?: boolean;
}