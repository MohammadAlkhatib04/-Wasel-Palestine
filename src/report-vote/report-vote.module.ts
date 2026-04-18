import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportVoteController } from './report-vote.controller';
import { ReportVoteService } from './report-vote.service';
import { ReportVote } from './entities/report-vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportVote])],
  controllers: [ReportVoteController],
  providers: [ReportVoteService],
})
export class ReportVoteModule {}