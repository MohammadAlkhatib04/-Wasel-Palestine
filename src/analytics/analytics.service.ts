import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(private readonly dataSource: DataSource) {}

  async getSummary() {
    // incidents by status
    const incidentsByStatus = await this.dataSource.query(`
      SELECT status, COUNT(*) as count
      FROM incidents
      GROUP BY status
    `);

    // reports by category
    const reportsByCategory = await this.dataSource.query(`
      SELECT category, COUNT(*) as count
      FROM reports
      GROUP BY category
    `);

    // verified incidents count
    const verifiedIncidents = await this.dataSource.query(`
      SELECT COUNT(*) as count
      FROM incidents
      WHERE status = 'verified'
    `);

    // alert records count
    const alertRecords = await this.dataSource.query(`
      SELECT COUNT(*) as count
      FROM alert_records
    `);

    return {
      incidentsByStatus,
      reportsByCategory,
      verifiedIncidents: Number(verifiedIncidents[0]?.count || 0),
      alertRecords: Number(alertRecords[0]?.count || 0),
    };
  }
}
