import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOriginalUrlQuery } from '../queries/get-original-url.query';
import { UrlRepository } from '../ports/url.repository';
import { Code } from '../../domain/value-objects/code';
import { UrlCacheService } from '../ports/url-cache.service';
import { UrlReadEvent } from '../events/url-read.event';

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
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    query: GetOriginalUrlQuery,
  ): Promise<GetOriginalUrlQueryResponse> {
    const { code, ip } = query;

    const cachedUrl = await this.urlCacheService.getByCode(code);
    if (cachedUrl) {
      this.eventBus.publish<UrlReadEvent>(
        new UrlReadEvent(
          cachedUrl.getId().value,
          cachedUrl.getOwnerId().value,
          ip,
        ),
      );
      return { url: cachedUrl.getOriginalUrl() };
    }

    const url = await this.urlRepository.findByCode(Code.fromString(code));
    if (!url) throw new UrlNotFound();

    this.eventBus.publish<UrlReadEvent>(
      new UrlReadEvent(url.getId().value, url.getOwnerId().value, ip),
    );

    return { url: url.getOriginalUrl() };
  }
}
