import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertRecord } from './entities/alert-record.entity';
import { CreateAlertRecordDto } from './dto/create-alert-record.dto';

@Injectable()
export class AlertRecordService {
  constructor(
    @InjectRepository(AlertRecord)
    private readonly alertRecordRepository: Repository<AlertRecord>,
  ) {}

  async create(createAlertRecordDto: CreateAlertRecordDto) {
    const record = this.alertRecordRepository.create({
      subscription_id: createAlertRecordDto.subscription_id,
      incident_id: createAlertRecordDto.incident_id,
      delivery_status: createAlertRecordDto.delivery_status,
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