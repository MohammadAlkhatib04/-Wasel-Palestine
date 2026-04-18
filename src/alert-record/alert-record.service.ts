import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertRecord, DeliveryStatus } from './entities/alert-record.entity';

@Injectable()
export class AlertRecordService {
  constructor(
    @InjectRepository(AlertRecord)
    private readonly alertRecordRepository: Repository<AlertRecord>,
  ) {}

  async create(data: {
    subscription_id: number;
    incident_id: number;
    delivery_status: DeliveryStatus;
  }) {
    const record = this.alertRecordRepository.create({
      subscription_id: data.subscription_id,
      incident_id: data.incident_id,
      delivery_status: data.delivery_status,
    });

    return await this.alertRecordRepository.save(record);
  }
  async findAll() {
  return await this.alertRecordRepository.find({
    order: {
      triggered_at: 'DESC',
    },
  });
}
}