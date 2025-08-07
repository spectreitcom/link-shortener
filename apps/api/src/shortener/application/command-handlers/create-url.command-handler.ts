import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUrlCommand } from '../commands/create-url.command';
import { Url } from '../../domain/url';
import { UrlRepository } from '../ports/url.repository';
import { UrlCacheService } from '../ports/url-cache.service';

export type CreateUrlCommandResponse = {
  code: string;
};

@CommandHandler(CreateUrlCommand)
export class CreateUrlCommandHandler
  implements ICommandHandler<CreateUrlCommand, CreateUrlCommandResponse>
{
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly urlCacheService: UrlCacheService,
  ) {}

  async execute(command: CreateUrlCommand): Promise<CreateUrlCommandResponse> {
    const { originalUrl, ownerId } = command;
    const url = Url.create(ownerId, originalUrl);

    // todo: validate generated code

    // save the url to the database
    await this.urlRepository.save(url);

    // cache the url
    await this.urlCacheService.cache(url);

    return {
      code: url.getCode().value,
    };
  }
}
