import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertRecordController } from './alert-record.controller';
import { AlertRecordService } from './alert-record.service';
import { AlertRecord } from './entities/alert-record.entity';
import { AlertSubscription } from '../alert-subscription/entities/alert-subscription.entity';
import { Incident } from '../incident/entities/incident.entity';
import { UserModule } from 'src/user/user.module';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlertRecord, AlertSubscription, Incident]),
    UserModule,
  ],
  controllers: [AlertRecordController],
  providers: [AlertRecordService, AuthRolesGuard],
  exports: [AlertRecordService],
})
export class AlertRecordModule {}
