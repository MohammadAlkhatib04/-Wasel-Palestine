import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertRecord, DeliveryStatus } from './entities/alert-record.entity';
import { CreateAlertRecordDto } from './dto/create-alert-record.dto';
import { AlertSubscription } from '../alert-subscription/entities/alert-subscription.entity';
import { Incident } from '../incident/entities/incident.entity';

@Injectable()
export class AlertRecordService {
  constructor(
    @InjectRepository(AlertRecord)
    private readonly alertRecordRepository: Repository<AlertRecord>,

    @InjectRepository(AlertSubscription)
    private readonly alertSubscriptionRepository: Repository<AlertSubscription>,

    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
  ) {}

  async create(createAlertRecordDto: CreateAlertRecordDto) {
    const subscription = await this.alertSubscriptionRepository.findOne({
      where: { id: createAlertRecordDto.subscription_id },
    });

    if (!subscription) {
      throw new NotFoundException('Alert subscription not found');
    }

    const incident = await this.incidentRepository.findOne({
      where: { id: createAlertRecordDto.incident_id },
    });

    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    const record = this.alertRecordRepository.create({
      subscription_id: createAlertRecordDto.subscription_id,
      incident_id: createAlertRecordDto.incident_id,
      delivery_status:
        createAlertRecordDto.delivery_status ?? DeliveryStatus.PENDING,
    });

    const savedRecord = await this.alertRecordRepository.save(record);

    return {
      message: 'Alert record created successfully',
      data: savedRecord,
    };
  }

  async findAll() {
    const data = await this.alertRecordRepository.find({
      relations: ['subscription', 'incident'],
      order: {
        triggered_at: 'DESC',
      },
    });

    return {
      message:
        data.length === 0
          ? 'No alert records found'
          : 'Alert-records fetched successfully',
      data,
    };
  }

  async findMy(userId: number) {
    const data = await this.alertRecordRepository
      .createQueryBuilder('alertRecord')
      .leftJoinAndSelect('alertRecord.subscription', 'subscription')
      .leftJoinAndSelect('alertRecord.incident', 'incident')
      .where('subscription.user_id = :userId', { userId })
      .orderBy('alertRecord.triggered_at', 'DESC')
      .getMany();

    return {
      message:
        data.length === 0
          ? 'No alert records found'
          : 'Your alert records fetched successfully',
      data,
    };
  }
}
