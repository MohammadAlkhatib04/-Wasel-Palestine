import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto } from './dto/report.dto';
import { VoteDto } from './dto/vote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decorator/current-user.decorator';
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: ReportDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.reportService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/vote')
  vote(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VoteDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.reportService.vote(id, userId, dto.vote_type);
  }
}