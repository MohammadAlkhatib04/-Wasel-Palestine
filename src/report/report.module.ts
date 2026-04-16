import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportVote } from './entities/report-vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, ReportVote]), // 🔥 الصح
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}