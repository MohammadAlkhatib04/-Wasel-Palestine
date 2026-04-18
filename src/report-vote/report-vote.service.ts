import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportVote, VoteType } from './entities/report-vote.entity';

@Injectable()
export class ReportVoteService {
  constructor(
    @InjectRepository(ReportVote)
    private readonly reportVoteRepository: Repository<ReportVote>,
  ) {}

  async create(data: {
    report_id: number;
    user_id: number;
    vote_type: VoteType;
  }) {
    const existingVote = await this.reportVoteRepository.findOne({
      where: {
        report_id: data.report_id,
        user_id: data.user_id,
      },
    });

    if (existingVote) {
      throw new BadRequestException(
        'This user has already voted on this report',
      );
    }

    const vote = this.reportVoteRepository.create({
      report_id: data.report_id,
      user_id: data.user_id,
      vote_type: data.vote_type,
    });

    return await this.reportVoteRepository.save(vote);
  }

  async findAll() {
    return await this.reportVoteRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }
  async findByReportId(reportId: number) {
  return await this.reportVoteRepository.find({
    where: {
      report_id: reportId,
    },
    order: {
      created_at: 'DESC',
    },
  });
}
}