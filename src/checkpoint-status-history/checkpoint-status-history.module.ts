import { Module } from '@nestjs/common';
import { CheckpointStatusHistoryService } from './checkpoint-status-history.service';
import { CheckpointStatusHistoryController } from './checkpoint-status-history.controller';
import { CheckpointStatusHistory } from './entities/checkpoint-status-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CheckpointStatusHistory])],
  controllers: [CheckpointStatusHistoryController],
  providers: [CheckpointStatusHistoryService],
  exports: [CheckpointStatusHistoryService],
})
export class CheckpointStatusHistoryModule {}
