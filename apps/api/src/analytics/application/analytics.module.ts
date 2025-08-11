import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UrlReadEventHandler } from './event-handlers/url-read.event-handler';
import { GetStatisticsQueryHandler } from './query-handlers/get-statistics.query-handler';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [InfrastructureModule],
  providers: [UrlReadEventHandler, GetStatisticsQueryHandler, AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
