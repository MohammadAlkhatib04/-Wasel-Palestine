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
      category: dto.category.trim().toLowerCase(),
      is_active: dto.is_active ?? true,
    });

    const savedSubscription = await this.alertSubscriptionRepository.save(
      subscription,
    );

    return {
      message: 'Alert subscription created successfully',
      data: savedSubscription,
    };
  }

  async findAll() {
    const data = await this.alertSubscriptionRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });

    return {
      message:
        data.length === 0
          ? 'No alert subscriptions found'
          : 'Alert subscriptions fetched successfully',
      data,
    };
  }

  async findMySubscriptions(userId: number) {
    const data = await this.alertSubscriptionRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });

    return {
      message:
        data.length === 0
          ? 'No alert subscriptions found'
          : 'Your alert subscriptions fetched successfully',
      data,
    };
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

    return {
      message: 'Alert subscription fetched successfully',
      data: subscription,
    };
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

    if (dto.center_latitude !== undefined) {
      subscription.center_latitude = dto.center_latitude;
    }

    if (dto.center_longitude !== undefined) {
      subscription.center_longitude = dto.center_longitude;
    }

    if (dto.radius_km !== undefined) {
      subscription.radius_km = dto.radius_km;
    }

    if (dto.category !== undefined) {
      subscription.category = dto.category.trim().toLowerCase();
    }

    if (dto.is_active !== undefined) {
      subscription.is_active = dto.is_active;
    }

    const updatedSubscription = await this.alertSubscriptionRepository.save(
      subscription,
    );

    return {
      message: 'Alert subscription updated successfully',
      data: updatedSubscription,
    };
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

    const updatedSubscription = await this.alertSubscriptionRepository.save(
      subscription,
    );

    return {
      message: `Alert subscription ${updatedSubscription.is_active ? 'activated' : 'deactivated'} successfully`,
      data: updatedSubscription,
    };
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
