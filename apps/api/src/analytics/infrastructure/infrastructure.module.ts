import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { AnalyticsQueueService } from '../application/ports/analytics-queue.service';
import { AppAnalyticsQueueService } from './app-analytics-queue.service';
import { ANALYTICS_QUEUE } from './constants';
import { AnalyticsQueueProcessor } from './analytics-queue.processor';
import { PrismaModule } from '../../prisma/prisma.module';
import { AnalyticsUrlRepository } from '../application/ports/analytics-url.repository';
import { PrismaAnalyticsUrlRepository } from './prisma-analytics-url.repository';
import { VisitRepository } from '../application/ports/visit.repository';
import { PrismaVisitRepository } from './prisma-visit.repository';

@Module({
  imports: [
    PrismaModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: ANALYTICS_QUEUE,
    }),
  ],
  providers: [
    {
      provide: AnalyticsQueueService,
      useClass: AppAnalyticsQueueService,
    },
    {
      provide: AnalyticsUrlRepository,
      useClass: PrismaAnalyticsUrlRepository,
    },
    {
      provide: VisitRepository,
      useClass: PrismaVisitRepository,
    },
    AnalyticsQueueProcessor,
  ],
  exports: [AnalyticsQueueService, AnalyticsUrlRepository, VisitRepository],
})
export class InfrastructureModule {}
