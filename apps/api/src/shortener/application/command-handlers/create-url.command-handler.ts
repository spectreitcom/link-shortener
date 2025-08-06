import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUrlCommand } from '../commands/create-url.command';
import { Url } from '../../domain/url';
import { UrlRepository } from '../ports/url.repository';

export type CreateUrlCommandResponse = {
  code: string;
};

@CommandHandler(CreateUrlCommand)
export class CreateUrlCommandHandler
  implements ICommandHandler<CreateUrlCommand, CreateUrlCommandResponse>
{
  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(command: CreateUrlCommand): Promise<CreateUrlCommandResponse> {
    const { originalUrl, ownerId } = command;
    const url = Url.create(ownerId, originalUrl);

    // todo: update cache

    // todo: validate generated code

    await this.urlRepository.save(url);

    return {
      code: url.getCode().value,
    };
  }
}
