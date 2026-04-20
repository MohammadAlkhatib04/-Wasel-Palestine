import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { ReportVote } from './entities/report-vote.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,

    @InjectRepository(ReportVote)
    private readonly voteRepository: Repository<ReportVote>,
  ) {}

  async create(dto: ReportDto, userId: number) {
    const existingReport = await this.reportRepository.findOne({
      where: {
        category: dto.category,
        status: 'pending',
      },
      order: {
        created_at: 'DESC',
      },
    });

    let duplicateId: number | null = null;

    if (
      existingReport &&
      dto.latitude != null &&
      dto.longitude != null &&
      existingReport.latitude != null &&
      existingReport.longitude != null
    ) {
      const latDiff = Math.abs(
        Number(existingReport.latitude) - Number(dto.latitude),
      );
      const lngDiff = Math.abs(
        Number(existingReport.longitude) - Number(dto.longitude),
      );

      if (latDiff < 0.01 && lngDiff < 0.01) {
        duplicateId = existingReport.duplicate_of_id ?? existingReport.id;
      }
    }

    const report = this.reportRepository.create({
      user_id: userId,
      category: dto.category,
      description: dto.description,
      latitude: dto.latitude,
      longitude: dto.longitude,
      duplicate_of_id: duplicateId ?? undefined,
    });

    const savedReport = await this.reportRepository.save(report);

    return {
      message: duplicateId
        ? 'Report submitted successfully and marked as duplicate'
        : 'Report submitted successfully',
      data: savedReport,
    };
  }

  async findAll() {
    return await this.reportRepository.find({
      relations: ['user', 'votes'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['user', 'votes'],
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  async vote(reportId: number, userId: number, voteType: 'up' | 'down') {
    const report = await this.reportRepository.findOne({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const existingVote = await this.voteRepository.findOne({
      where: {
        report_id: reportId,
        user_id: userId,
      },
    });

    if (existingVote) {
      throw new BadRequestException('You already voted on this report');
    }

    const vote = this.voteRepository.create({
      report_id: reportId,
      user_id: userId,
      vote_type: voteType,
    });

    await this.voteRepository.save(vote);

    report.confidence_score += voteType === 'up' ? 1 : -1;
    await this.reportRepository.save(report);

    return {
      message: 'Vote added successfully',
      data: {
        report_id: reportId,
        user_id: userId,
        vote_type: voteType,
        new_confidence_score: report.confidence_score,
      },
    };
  }
}
