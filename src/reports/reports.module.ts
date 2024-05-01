import { Module } from '@nestjs/common';
import { ReportController } from './report/report.controller';
import { ReportService } from './report/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportsModule {}
