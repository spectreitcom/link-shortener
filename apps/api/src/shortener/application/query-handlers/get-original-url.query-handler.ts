import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOriginalUrlQuery } from '../queries/get-original-url.query';
import { UrlRepository } from '../ports/url.repository';
import { Code } from '../../domain/value-objects/code';
import { UrlCacheService } from '../ports/url-cache.service';

export type GetOriginalUrlQueryResponse = { url: string };

export class UrlNotFound extends Error {
  constructor() {
    super('Url not found');
  }
}

@QueryHandler(GetOriginalUrlQuery)
export class GetOriginalUrlQueryHandler
  implements IQueryHandler<GetOriginalUrlQuery, GetOriginalUrlQueryResponse>
{
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly urlCacheService: UrlCacheService,
  ) {}

  async execute(
    query: GetOriginalUrlQuery,
  ): Promise<GetOriginalUrlQueryResponse> {
    const { code } = query;

    const cachedUrl = await this.urlCacheService.getByCode(code);
    if (cachedUrl) return { url: cachedUrl };

    const url = await this.urlRepository.findByCode(Code.fromString(code));
    if (!url) throw new UrlNotFound();

    return { url: url.getOriginalUrl() };
  }
}
