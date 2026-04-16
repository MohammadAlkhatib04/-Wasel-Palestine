import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { Incident } from './entities/incident.entity';
import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, Checkpoint]), UserModule],
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
