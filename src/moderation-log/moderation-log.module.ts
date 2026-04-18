import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModerationLogController } from './moderation-log.controller';
import { ModerationLogService } from './moderation-log.service';
import { ModerationLog } from './entities/moderation-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModerationLog])],
  controllers: [ModerationLogController],
  providers: [ModerationLogService],
})
export class ModerationLogModule {}