import { WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { AnalyticsUrlRepository } from '../application/ports/analytics-url.repository';
import { VisitRepository } from '../application/ports/visit.repository';
import { Visit } from '../domain/visit';
import { UrlReadEvent } from '../../shortener/application/events/url-read.event';
import { AnalyticsUrl } from '../domain/analytics-url';
import { IpAddress } from '../domain/value-objects/ip-address';

@Injectable()
export class AnalyticsQueueProcessor extends WorkerHost {
  constructor(
    private readonly analyticsUrlRepository: AnalyticsUrlRepository,
    private readonly visitRepository: VisitRepository,
  ) {
    super();
  }

  async process(job: Job<UrlReadEvent>) {
    const { urlId, ownerId, ip } = job.data;

    const analyticsUrl = AnalyticsUrl.create(urlId, ownerId);
    analyticsUrl.incrementVisitCount();

    const isIpUnique = await this.visitRepository.isUnique(
      IpAddress.fromString(ip),
    );

    if (isIpUnique) {
      analyticsUrl.incrementUniqueVisitCount();
    }

    const visit = Visit.create(urlId, ownerId, ip);

    await this.analyticsUrlRepository.save(analyticsUrl);
    await this.visitRepository.save(visit);
  }
}
