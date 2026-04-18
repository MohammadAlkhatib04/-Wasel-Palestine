import { Body, Controller, Get, Post } from '@nestjs/common';
import { ModerationLogService } from './moderation-log.service';
import { CreateModerationLogDto } from './dto/create-moderation-log.dto';

@Controller('api/v1/moderation-logs')
export class ModerationLogController {
  constructor(private readonly moderationLogService: ModerationLogService) {}

  @Post()
  create(@Body() createModerationLogDto: CreateModerationLogDto) {
    return this.moderationLogService.create(createModerationLogDto);
  }

  @Get()
  findAll() {
    return this.moderationLogService.findAll();
  }
}