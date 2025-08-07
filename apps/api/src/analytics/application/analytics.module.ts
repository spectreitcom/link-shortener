import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UrlReadEventHandler } from './event-handlers/url-read.event-handler';

@Module({
  imports: [InfrastructureModule],
  providers: [UrlReadEventHandler],
})
export class AnalyticsModule {}
