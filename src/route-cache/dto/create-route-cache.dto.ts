import { IsDateString, IsObject, IsString, IsNotEmpty } from 'class-validator';

export class CreateRouteCacheDto {
  @IsString()
  @IsNotEmpty()
  origin_hash!: string;

  @IsString()
  @IsNotEmpty()
  destination_hash!: string;

  @IsString()
  @IsNotEmpty()
  constraints_hash!: string;

  @IsObject()
  route_data!: Record<string, any>;

  @IsDateString()
  expires_at!: Date;
}
