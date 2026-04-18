import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import {
  ModerationAction,
  ModerationEntityType,
} from '../entities/moderation-log.entity';

export class CreateModerationLogDto {
  @IsEnum(ModerationEntityType)
  entity_type!: ModerationEntityType;

  @IsInt()
  @Min(1)
  entity_id!: number;

  @IsInt()
  @Min(1)
  moderator_id!: number;

  @IsEnum(ModerationAction)
  action!: ModerationAction;

  @IsOptional()
  @IsString()
  notes?: string;
}