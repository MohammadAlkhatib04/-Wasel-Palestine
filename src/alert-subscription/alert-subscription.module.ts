import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertSubscription } from './entities/alert-subscription.entity';
import { AlertSubscriptionService } from './alert-subscription.service';
import { AlertSubscriptionController } from './alert-subscription.controller';
import { UserModule } from 'src/user/user.module';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([AlertSubscription]), UserModule],
  controllers: [AlertSubscriptionController],
  providers: [AlertSubscriptionService, AuthRolesGuard],
  exports: [AlertSubscriptionService],
})
export class AlertSubscriptionModule {}
