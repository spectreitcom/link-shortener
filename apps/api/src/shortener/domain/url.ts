import { UrlId } from './value-objects/url-id';
import { Code } from './value-objects/code';
import { OwnerId } from './value-objects/owner-id';

export class Url {
  constructor(
    private readonly id: UrlId,
    private readonly ownerId: OwnerId,
    private originalUrl: string,
    private code: Code,
  ) {}

  static create(ownerId: string, originalUrl: string) {
    const code = Code.create();
    return new Url(
      UrlId.create(),
      OwnerId.fromString(ownerId),
      originalUrl,
      code,
    );
  }

  getId() {
    return this.id;
  }

  getOwnerId() {
    return this.ownerId;
  }

  getOriginalUrl() {
    return this.originalUrl;
  }

  getCode() {
    return this.code;
  }
}
