import { Injectable } from '@nestjs/common';
import { AnalyticsUrlRepository } from '../application/ports/analytics-url.repository';
import { AnalyticsUrl } from '../domain/analytics-url';
import { AnalyticsUrlId } from '../domain/value-objects/analytics-url-id';
import { PrismaService } from '../../prisma/prisma.service';
import { UrlId } from '../domain/value-objects/url-id';
import { OwnerId } from '../domain/value-objects/owner-id';

@Injectable()
export class PrismaAnalyticsUrlRepository implements AnalyticsUrlRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(analyticsUrl: AnalyticsUrl): Promise<void> {
    await this.prismaService.analyticsUrl.upsert({
      where: {
        id: analyticsUrl.getId().value,
      },
      create: {
        id: analyticsUrl.getId().value,
        urlId: analyticsUrl.getUrlId().value,
        ownerId: analyticsUrl.getOwnerId().value,
        visitCount: analyticsUrl.getVisitCount(),
        uniqueVisitCount: analyticsUrl.getUniqueVisitCount(),
      },
      update: {
        visitCount: analyticsUrl.getVisitCount(),
        uniqueVisitCount: analyticsUrl.getUniqueVisitCount(),
      },
    });
  }

  async findById(id: AnalyticsUrlId): Promise<AnalyticsUrl | null> {
    const analyticsUrl = await this.prismaService.analyticsUrl.findUnique({
      where: {
        id: id.value,
      },
    });

    if (!analyticsUrl) {
      return null;
    }

    return new AnalyticsUrl(
      AnalyticsUrlId.fromString(analyticsUrl.id),
      UrlId.fromString(analyticsUrl.urlId),
      OwnerId.fromString(analyticsUrl.ownerId),
      analyticsUrl.visitCount,
      analyticsUrl.uniqueVisitCount,
    );
  }

  async findByUrlId(urlId: UrlId): Promise<AnalyticsUrl | null> {
    const analyticsUrl = await this.prismaService.analyticsUrl.findUnique({
      where: {
        urlId: urlId.value,
      },
    });

    if (!analyticsUrl) {
      return null;
    }

    return new AnalyticsUrl(
      AnalyticsUrlId.fromString(analyticsUrl.id),
      UrlId.fromString(analyticsUrl.urlId),
      OwnerId.fromString(analyticsUrl.ownerId),
      analyticsUrl.visitCount,
      analyticsUrl.uniqueVisitCount,
    );
  }
}
