import { Url } from '../../domain/url';
import { Code } from '../../domain/value-objects/code';
import { UrlId } from '../../domain/value-objects/url-id';

export abstract class UrlRepository {
  abstract save(url: Url): Promise<void>;
  abstract findByCode(code: Code): Promise<Url | null>;
  abstract findById(id: UrlId): Promise<Url | null>;
}
