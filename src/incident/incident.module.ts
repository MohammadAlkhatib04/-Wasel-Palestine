import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { Incident } from './entities/incident.entity';
import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { UserModule } from 'src/user/user.module';
import { ModerationLog } from 'src/moderation-log/entities/moderation-log.entity';
import { AlertRecord } from 'src/alert-record/entities/alert-record.entity';
import { AlertSubscription } from 'src/alert-subscription/entities/alert-subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Incident,
      Checkpoint,
      ModerationLog,
      AlertRecord,
      AlertSubscription,
    ]),
    UserModule,
  ],
  controllers: [IncidentController],
  providers: [IncidentService],
  exports: [IncidentService],
})
export class IncidentModule {}
