import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  async getSummary() {
    const data = await this.analyticsService.getSummary();

    return {
      success: true,
      message: 'Analytics summary fetched successfully',
      data,
    };
  }
}
