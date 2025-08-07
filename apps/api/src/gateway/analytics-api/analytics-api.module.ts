import { Module } from '@nestjs/common';
import { AnalyticsModule } from '../../analytics/application/analytics.module';

@Module({
  imports: [AnalyticsModule],
})
export class AnalyticsApiModule {}
