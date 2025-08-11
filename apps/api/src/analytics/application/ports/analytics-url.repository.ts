import { AnalyticsUrl } from '../../domain/analytics-url';
import { AnalyticsUrlId } from '../../domain/value-objects/analytics-url-id';
import { UrlId } from '../../domain/value-objects/url-id';
import { PrismaClient } from '@prisma/client';

type TransactionClient = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];

export abstract class AnalyticsUrlRepository {
  abstract save(analyticsUrl: AnalyticsUrl): Promise<void>;
  abstract save(
    analyticsUrl: AnalyticsUrl,
    tx: TransactionClient,
  ): Promise<void>;
  abstract findById(id: AnalyticsUrlId): Promise<AnalyticsUrl | null>;
  abstract findById(
    id: AnalyticsUrlId,
    tx: TransactionClient,
  ): Promise<AnalyticsUrl | null>;
  abstract findByUrlId(urlId: UrlId): Promise<AnalyticsUrl | null>;
  abstract findByUrlId(
    urlId: UrlId,
    tx: TransactionClient,
  ): Promise<AnalyticsUrl | null>;
}
