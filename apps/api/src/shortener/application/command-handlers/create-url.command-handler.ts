import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUrlCommand } from '../commands/create-url.command';
import { Url } from '../../domain/url';
import { UrlRepository } from '../ports/url.repository';
import { UrlCacheService } from '../ports/url-cache.service';

export type CreateUrlCommandResponse = {
  code: string;
};

export class UniqueCodeGenerationError extends Error {
  constructor() {
    super('Failed to generate unique code');
  }
}

@CommandHandler(CreateUrlCommand)
export class CreateUrlCommandHandler
  implements ICommandHandler<CreateUrlCommand, CreateUrlCommandResponse>
{
  private readonly maxRetries = 3;

  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly urlCacheService: UrlCacheService,
  ) {}

  async execute(command: CreateUrlCommand): Promise<CreateUrlCommandResponse> {
    const { originalUrl, ownerId } = command;

    let url: Url;
    let retryCount = 0;

    do {
      if (retryCount > this.maxRetries) {
        throw new UniqueCodeGenerationError();
      }

      url = Url.create(ownerId, originalUrl);

      const existingUrl = await this.urlRepository.findByCode(url.getCode());

      if (!existingUrl) {
        break;
      }

      retryCount++;

      // eslint-disable-next-line no-constant-condition
    } while (true);

    await this.urlRepository.save(url);
    await this.urlCacheService.cache(url);

    return {
      code: url.getCode().value,
    };
  }
}
