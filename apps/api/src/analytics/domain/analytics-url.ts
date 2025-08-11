import { AnalyticsUrlId } from './value-objects/analytics-url-id';
import { UrlId } from './value-objects/url-id';
import { OwnerId } from './value-objects/owner-id';

export class AnalyticsUrl {
  constructor(
    private readonly id: AnalyticsUrlId,
    private readonly urlId: UrlId,
    private readonly ownerId: OwnerId,
    private visitCount: number,
    private uniqueVisitCount: number,
  ) {}

  static create(urlId: string, ownerId: string) {
    return new AnalyticsUrl(
      AnalyticsUrlId.create(),
      UrlId.fromString(urlId),
      OwnerId.fromString(ownerId),
      0,
      0,
    );
  }

  isOwnerOf(ownerId: OwnerId) {
    return this.ownerId.equals(ownerId);
  }

  incrementVisitCount() {
    this.visitCount++;
  }

  incrementUniqueVisitCount() {
    this.uniqueVisitCount++;
  }

  getId() {
    return this.id;
  }

  getUrlId() {
    return this.urlId;
  }

  getOwnerId() {
    return this.ownerId;
  }

  getVisitCount() {
    return this.visitCount;
  }

  getUniqueVisitCount() {
    return this.uniqueVisitCount;
  }
}
