import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReportVoteService } from './report-vote.service';
import { CreateReportVoteDto } from './dto/create-report-vote.dto';

@Controller('api/v1/report-votes')
export class ReportVoteController {
  constructor(private readonly reportVoteService: ReportVoteService) {}

  @Post()
  create(@Body() createReportVoteDto: CreateReportVoteDto) {
    return this.reportVoteService.create(createReportVoteDto);
  }

  @Get()
  findAll() {
    return this.reportVoteService.findAll();
  }

  @Get('report/:reportId')
  findByReportId(@Param('reportId') reportId: string) {
    return this.reportVoteService.findByReportId(Number(reportId));
  }
}