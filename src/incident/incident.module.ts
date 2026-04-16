import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { UserModule } from 'src/user/user.module';
import { Incident } from './entities/incident.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Incident]), UserModule],
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
