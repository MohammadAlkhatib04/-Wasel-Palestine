import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ModerationLogService } from './moderation-log.service';
import { CreateModerationLogDto } from './dto/create-moderation-log.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';
import { UserType } from 'src/utils/user.type';

@Controller('moderation-logs')
@Roles(UserType.ADMIN, UserType.MODERATOR)
@UseGuards(AuthRolesGuard)
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
