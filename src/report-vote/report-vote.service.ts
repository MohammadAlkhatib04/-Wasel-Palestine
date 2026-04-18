import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportVote } from './entities/report-vote.entity';
import { CreateReportVoteDto } from './dto/create-report-vote.dto';

@Injectable()
export class ReportVoteService {
  constructor(
    @InjectRepository(ReportVote)
    private readonly reportVoteRepository: Repository<ReportVote>,
  ) {}

  async create(createReportVoteDto: CreateReportVoteDto) {
    const existingVote = await this.reportVoteRepository.findOne({
      where: {
        report_id: createReportVoteDto.report_id,
        user_id: createReportVoteDto.user_id,
      },
    });

    if (existingVote) {
      throw new BadRequestException(
        'This user has already voted on this report',
      );
    }

    const vote = this.reportVoteRepository.create({
      report_id: createReportVoteDto.report_id,
      user_id: createReportVoteDto.user_id,
      vote_type: createReportVoteDto.vote_type,
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