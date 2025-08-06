import { Url } from '../../domain/url';
import { Code } from '../../domain/value-objects/code';

export abstract class UrlRepository {
  abstract save(url: Url): Promise<void>;
  abstract findByCode(code: Code): Promise<Url | null>;
}
