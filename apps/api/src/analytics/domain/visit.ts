import { UrlId } from './value-objects/url-id';
import { IpAddress } from './value-objects/ip-address';
import { OwnerId } from './value-objects/owner-id';
import { VisitId } from './value-objects/visit-id';

export class Visit {
  constructor(
    private readonly id: VisitId,
    private readonly urlId: UrlId,
    private readonly ip: IpAddress,
    private readonly ownerId: OwnerId,
    private readonly createdAt?: Date,
  ) {}

  static create(urlId: string, ip: string, ownerId: string) {
    return new Visit(
      VisitId.create(),
      UrlId.fromString(urlId),
      IpAddress.fromString(ip),
      OwnerId.fromString(ownerId),
    );
  }

  getId() {
    return this.id;
  }

  getUrlId() {
    return this.urlId;
  }

  getIp() {
    return this.ip;
  }

  getOwnerId() {
    return this.ownerId;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
