import { UrlId } from './value-objects/url-id';
import { Code } from './value-objects/code';
import { OwnerId } from './value-objects/owner-id';

export type JsonUrl = {
  id: string;
  ownerId: string;
  originalUrl: string;
  code: string;
};

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

  toJson(): JsonUrl {
    return {
      id: this.id.value,
      ownerId: this.ownerId.value,
      originalUrl: this.originalUrl,
      code: this.code.value,
    };
  }

  serialize() {
    return JSON.stringify(this.toJson());
  }

  static deserialize(jsonStr: string) {
    const data = JSON.parse(jsonStr) as JsonUrl;
    return new Url(
      UrlId.fromString(data.id),
      OwnerId.fromString(data.ownerId),
      data.originalUrl,
      Code.fromString(data.code),
    );
  }
}
