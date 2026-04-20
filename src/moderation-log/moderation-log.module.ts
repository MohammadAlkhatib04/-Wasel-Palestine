import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModerationLogController } from './moderation-log.controller';
import { ModerationLogService } from './moderation-log.service';
import { ModerationLog } from './entities/moderation-log.entity';
import { UserModule } from 'src/user/user.module';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ModerationLog]), UserModule],
  controllers: [ModerationLogController],
  providers: [ModerationLogService, AuthRolesGuard],
})
export class ModerationLogModule {}
