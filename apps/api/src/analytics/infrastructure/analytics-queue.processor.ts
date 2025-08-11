import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AnalyticsUrlRepository } from '../application/ports/analytics-url.repository';
import { VisitRepository } from '../application/ports/visit.repository';
import { Visit } from '../domain/visit';
import { UrlReadEvent } from '../../shortener/application/events/url-read.event';
import { AnalyticsUrl } from '../domain/analytics-url';
import { IpAddress } from '../domain/value-objects/ip-address';
import { ANALYTICS_QUEUE } from './constants';
import { Logger } from '@nestjs/common';
import { UrlId } from '../domain/value-objects/url-id';
import { OwnerId } from '../domain/value-objects/owner-id';
import { PrismaService } from '../../prisma/prisma.service';

@Processor(ANALYTICS_QUEUE)
export class AnalyticsQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(AnalyticsQueueProcessor.name);

  constructor(
    private readonly analyticsUrlRepository: AnalyticsUrlRepository,
    private readonly visitRepository: VisitRepository,
    private readonly prismaService: PrismaService,
  ) {
    super();
  }

  async process(job: Job<UrlReadEvent>) {
    const { urlId, ownerId, ip } = job.data;

    let _urlId: UrlId;
    let _ip: IpAddress;

    try {
      _urlId = UrlId.fromString(urlId);
      OwnerId.fromString(ownerId);
      _ip = IpAddress.fromString(ip);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }

    try {
      await this.prismaService.$transaction(async (tx) => {
        let analyticsUrl =
          await this.analyticsUrlRepository.findByUrlId(_urlId);

        if (!analyticsUrl) {
          analyticsUrl = AnalyticsUrl.create(urlId, ownerId);
        }

        analyticsUrl.incrementVisitCount();

        const isIpUnique = await this.visitRepository.isUnique(_ip, _urlId);

        if (isIpUnique) {
          analyticsUrl.incrementUniqueVisitCount();
        }

        const visit = Visit.create(urlId, ip, ownerId);

        await this.analyticsUrlRepository.save(analyticsUrl);
        await this.visitRepository.save(visit);
      });
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
