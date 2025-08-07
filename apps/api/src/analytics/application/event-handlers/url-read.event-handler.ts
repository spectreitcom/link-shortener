import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UrlReadEvent } from '../../../shortener/application/events/url-read.event';
import { AnalyticsQueueService } from '../ports/analytics-queue.service';
import { Logger } from '@nestjs/common';

@EventsHandler(UrlReadEvent)
export class UrlReadEventHandler implements IEventHandler<UrlReadEvent> {
  private readonly logger = new Logger(UrlReadEvent.name);

  constructor(private readonly analyticsQueueService: AnalyticsQueueService) {}

  async handle(event: UrlReadEvent) {
    this.logger.debug(JSON.stringify(event));
    await this.analyticsQueueService.add(event);
  }
}
