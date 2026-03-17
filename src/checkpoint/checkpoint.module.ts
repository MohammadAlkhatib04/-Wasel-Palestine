import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [CheckpointController],
  providers: [CheckpointService],
  imports: [TypeOrmModule.forFeature([Checkpoint])],
})
export class CheckpointModule {}
