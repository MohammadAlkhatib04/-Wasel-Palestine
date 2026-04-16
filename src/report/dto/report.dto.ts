import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ReportDto {
  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsOptional()
  latitude?: number;

  @IsOptional()
  longitude?: number;
}