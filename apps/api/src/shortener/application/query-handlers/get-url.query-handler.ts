import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUrlQuery } from '../queries/get-url.query';
import { UserUrlView } from '../../views/user-url.view';
import { UrlRepository } from '../ports/url.repository';
import { UrlId } from '../../domain/value-objects/url-id';
import { OwnerId } from '../../domain/value-objects/owner-id';

export class WrongOwnerError extends Error {
  constructor() {
    super("You don't have access to this resource");
  }
}

export class UrlNotFoundError extends Error {
  constructor() {
    super('Url not found');
  }
}

@QueryHandler(GetUrlQuery)
export class GetUrlQueryHandler
  implements IQueryHandler<GetUrlQuery, UserUrlView>
{
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(query: GetUrlQuery): Promise<UserUrlView> {
    const { urlId, ownerId } = query;

    const url = await this.urlRepository.findById(UrlId.fromString(urlId));

    if (!url) {
      throw new UrlNotFoundError();
    }

    if (!url.isOwnerOf(OwnerId.fromString(ownerId))) {
      throw new WrongOwnerError();
    }

    return new UserUrlView(
      url.getId().value,
      url.getOriginalUrl(),
      url.getCode().value,
    );
  }
}
