import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportVoteService } from './report-vote.service';
import { VoteType } from './entities/report-vote.entity';

@Controller('api/v1/report-votes')
export class ReportVoteController {
  constructor(private readonly reportVoteService: ReportVoteService) {}

  @Post()
  create(
    @Body()
    body: {
      report_id: number;
      user_id: number;
      vote_type: VoteType;
    },
  ) {
    return this.reportVoteService.create(body);
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