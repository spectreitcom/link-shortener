import { AnalyticsUrl } from '../../domain/analytics-url';
import { AnalyticsUrlId } from '../../domain/value-objects/analytics-url-id';
import { UrlId } from '../../domain/value-objects/url-id';

export abstract class AnalyticsUrlRepository {
  abstract save(analyticsUrl: AnalyticsUrl): Promise<void>;
  abstract findById(id: AnalyticsUrlId): Promise<AnalyticsUrl | null>;
  abstract findByUrlId(urlId: UrlId): Promise<AnalyticsUrl | null>;
}
