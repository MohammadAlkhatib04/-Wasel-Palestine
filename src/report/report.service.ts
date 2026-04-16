import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { ReportDto } from './dto/report.dto';
import { ReportVote } from './entities/report-vote.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,

    @InjectRepository(ReportVote)
    private voteRepository: Repository<ReportVote>,
  ) {}

  // 🔥 CREATE + DUPLICATE DETECTION
  async create(dto: ReportDto) {
    const existingReport = await this.reportRepository.findOne({
      where: {
        category: dto.category,
        status: 'pending',
      },
      order: {
        created_at: 'DESC',
      },
    });

    let duplicateId: number | undefined = undefined;

    if (existingReport) {
      const latDiff = Math.abs(Number(existingReport.latitude) - Number(dto.latitude));
      const lngDiff = Math.abs(Number(existingReport.longitude) - Number(dto.longitude));

      if (latDiff < 0.01 && lngDiff < 0.01) {
        duplicateId = existingReport.duplicate_of_id ?? existingReport.id;
      }
    }

    const report = this.reportRepository.create({
      ...dto,
      duplicate_of_id: duplicateId,
    });

    return await this.reportRepository.save(report);
  }

  // 📥 GET ALL
  async findAll() {
    return await this.reportRepository.find({
      relations: ['user'],
    });
  }

  // ⭐ VOTING SYSTEM
  async vote(reportId: number, userId: number) {
    // ❗ منع التصويت مرتين
    const existingVote = await this.voteRepository.findOne({
      where: { report_id: reportId, user_id: userId },
    });

    if (existingVote) {
      return { message: 'Already voted' };
    }

    // ✅ إنشاء vote
    const vote = this.voteRepository.create({
      report_id: reportId,
      user_id: userId,
    });

    await this.voteRepository.save(vote);

    // 🔥 زيادة score
    await this.reportRepository.increment(
      { id: reportId },
      'confidence_score',
      1,
    );

    return { message: 'Vote added' };
  }
}