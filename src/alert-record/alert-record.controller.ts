import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AlertRecordService } from './alert-record.service';
import { CreateAlertRecordDto } from './dto/create-alert-record.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/auth/guards/auth-roles.guard';
import { UserType } from 'src/utils/user.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decorator/current-user.decorator';

@Controller('alert-records')
export class AlertRecordController {
  constructor(private readonly alertRecordService: AlertRecordService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  create(@Body() createAlertRecordDto: CreateAlertRecordDto) {
    return this.alertRecordService.create(createAlertRecordDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findAll() {
    return this.alertRecordService.findAll();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMy(@CurrentUser('id') userId: number) {
    return this.alertRecordService.findMy(userId);
  }
}
