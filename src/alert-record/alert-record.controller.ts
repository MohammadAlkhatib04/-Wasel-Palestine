import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlertRecordService } from './alert-record.service';
import { CreateAlertRecordDto } from './dto/create-alert-record.dto';

@Controller('api/v1/alert-records')
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