import { UrlReadEvent } from '../../../shortener/application/events/url-read.event';

export abstract class AnalyticsQueueService {
  abstract add(data: UrlReadEvent): Promise<void>;
}
