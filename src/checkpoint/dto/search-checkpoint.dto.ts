import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CheckpointStatus } from '../enums/checkpoint-status.enum';

export class SearchCheckpointDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(CheckpointStatus)
  status?: CheckpointStatus;
}
