import { IsDateString, IsObject, IsString } from 'class-validator';

export class CreateRouteCacheDto {
  @IsString()
  origin_hash!: string;

  @IsString()
  destination_hash!: string;

  @IsString()
  constraints_hash!: string;

  @IsObject()
  route_data!: Record<string, any>;

  @IsDateString()
  expires_at!: Date;
}