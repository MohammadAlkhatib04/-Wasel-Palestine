import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModerationLogService } from './moderation-log.service';
import {
  ModerationAction,
  ModerationEntityType,
} from './entities/moderation-log.entity';

@Controller('api/v1/moderation-logs')
export class ModerationLogController {
  constructor(private readonly moderationLogService: ModerationLogService) {}

  @Post()
  create(
    @Body()
    body: {
      entity_type: ModerationEntityType;
      entity_id: number;
      moderator_id: number;
      action: ModerationAction;
      notes?: string;
    },
  ) {
    return this.moderationLogService.create(body);
  }
  @Get()
findAll() {
  return this.moderationLogService.findAll();
}
}