import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertRecordController } from './alert-record.controller';
import { AlertRecordService } from './alert-record.service';
import { AlertRecord } from './entities/alert-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertRecord])],
  controllers: [AlertRecordController],
  providers: [AlertRecordService],
})
export class AlertRecordModule {}