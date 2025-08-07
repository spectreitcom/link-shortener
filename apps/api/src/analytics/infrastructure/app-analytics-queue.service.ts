import { Injectable } from '@nestjs/common';
import { AnalyticsQueueService } from '../application/ports/analytics-queue.service';
import { UrlReadEvent } from 'src/shortener/application/events/url-read.event';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { ANALYTICS_QUEUE } from './constants';

@Injectable()
export class AppAnalyticsQueueService implements AnalyticsQueueService {
  constructor(
    @InjectQueue(ANALYTICS_QUEUE)
    private readonly analyticsQueue: Queue,
  ) {}

  async add(data: UrlReadEvent): Promise<void> {
    await this.analyticsQueue.add('analytics-queue', data);
  }
}
