import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AlertRecordService } from './alert-record.service';
import { CreateAlertRecordDto } from './dto/create-alert-record.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';
import { UserType } from 'src/utils/user.type';

@Controller('alert-records')
@Roles(UserType.ADMIN, UserType.MODERATOR, UserType.CITIZEN)
@UseGuards(AuthRolesGuard)
export class AlertRecordController {
  constructor(private readonly alertRecordService: AlertRecordService) {}

  @Post()
  create(@Body() createAlertRecordDto: CreateAlertRecordDto) {
    return this.alertRecordService.create(createAlertRecordDto);
  }

  @Get()
  findAll() {
    return this.alertRecordService.findAll();
  }
}
