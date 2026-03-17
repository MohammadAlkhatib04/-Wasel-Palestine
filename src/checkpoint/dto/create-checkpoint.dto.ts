import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { CheckpointStatus } from '../enums/checkpoint-status.enum';

export class CreateCheckpointDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  city: string;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;

  @IsEnum(CheckpointStatus)
  @IsOptional()
  status: CheckpointStatus;
}
