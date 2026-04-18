import { PartialType } from '@nestjs/mapped-types';
import { CreateModerationLogDto } from './create-moderation-log.dto';

export class UpdateModerationLogDto extends PartialType(CreateModerationLogDto) {}