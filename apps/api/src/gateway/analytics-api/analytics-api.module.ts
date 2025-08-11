import { Module } from '@nestjs/common';
import { AnalyticsModule } from '../../analytics/application/analytics.module';
import { AnalyticsApiController } from './analytics-api.controller';

@Module({
  imports: [AnalyticsModule],
  controllers: [AnalyticsApiController],
})
export class AnalyticsApiModule {}
