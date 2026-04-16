import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto } from './dto/report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@Body() dto: ReportDto) {
    return this.reportService.create(dto);
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  // 🔥 Voting endpoint
  @Post(':id/vote')
  vote(@Param('id') id: string) {
    const userId = 1; // مؤقت
    return this.reportService.vote(Number(id), userId);
  }
}