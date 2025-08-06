import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOriginalUrlQuery } from '../queries/get-original-url.query';
import { UrlRepository } from '../ports/url.repository';
import { Code } from '../../domain/value-objects/code';

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
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(
    query: GetOriginalUrlQuery,
  ): Promise<GetOriginalUrlQueryResponse> {
    const { code } = query;

    const url = await this.urlRepository.findByCode(Code.fromString(code));

    if (!url) throw new UrlNotFound();

    return { url: url.getOriginalUrl() };
  }
}
