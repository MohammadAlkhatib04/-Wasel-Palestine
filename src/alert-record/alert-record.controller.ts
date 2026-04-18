import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlertRecordService } from './alert-record.service';
import { DeliveryStatus } from './entities/alert-record.entity';

@Controller('api/v1/alert-records')
export class AlertRecordController {
  constructor(private readonly alertRecordService: AlertRecordService) {}

  @Post()
  create(
    @Body()
    body: {
      subscription_id: number;
      incident_id: number;
      delivery_status: DeliveryStatus;
    },
  ) {
    return this.alertRecordService.create(body);
  }
  @Get()
findAll() {
  return this.alertRecordService.findAll();
}
}