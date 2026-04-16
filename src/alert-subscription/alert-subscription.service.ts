import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertSubscription } from './entities/alert-subscription.entity';
import { Repository } from 'typeorm';
import { CreateAlertSubscriptionDto } from './dto/create-alert-subscription.dto';
import { UpdateAlertSubscriptionDto } from './dto/update-alert-subscription.dto';

@Injectable()
export class AlertSubscriptionService {
  constructor(
    @InjectRepository(AlertSubscription)
    private readonly alertSubscriptionRepository: Repository<AlertSubscription>,
  ) {}

  async create(dto: CreateAlertSubscriptionDto, userId: number) {
    const subscription = this.alertSubscriptionRepository.create({
      user_id: userId,
      center_latitude: dto.center_latitude,
      center_longitude: dto.center_longitude,
      radius_km: dto.radius_km,
      category: dto.category,
      is_active: dto.is_active ?? true,
    });

    return await this.alertSubscriptionRepository.save(subscription);
  }

  async findMySubscriptions(userId: number) {
    return await this.alertSubscriptionRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number, userId: number) {
    const subscription = await this.alertSubscriptionRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!subscription) {
      throw new NotFoundException('Alert subscription not found');
    }

    if (subscription.user_id !== userId) {
      throw new ForbiddenException('You can only access your own subscriptions');
    }

    return subscription;
  }

  async update(id: number, dto: UpdateAlertSubscriptionDto, userId: number) {
    const subscription = await this.alertSubscriptionRepository.findOne({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException('Alert subscription not found');
    }

    if (subscription.user_id !== userId) {
      throw new ForbiddenException('You can only update your own subscriptions');
    }

    Object.assign(subscription, dto);

    return await this.alertSubscriptionRepository.save(subscription);
  }

  async toggle(id: number, userId: number) {
    const subscription = await this.alertSubscriptionRepository.findOne({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException('Alert subscription not found');
    }

    if (subscription.user_id !== userId) {
      throw new ForbiddenException('You can only update your own subscriptions');
    }

    subscription.is_active = !subscription.is_active;

    return await this.alertSubscriptionRepository.save(subscription);
  }

  async remove(id: number, userId: number) {
    const subscription = await this.alertSubscriptionRepository.findOne({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException('Alert subscription not found');
    }

    if (subscription.user_id !== userId) {
      throw new ForbiddenException('You can only delete your own subscriptions');
    }

    await this.alertSubscriptionRepository.remove(subscription);

    return { message: 'Alert subscription deleted successfully' };
  }
}