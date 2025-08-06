import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUrlCommand } from './commands/create-url.command';

@Injectable()
export class ShortenerService {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * Shortens a given URL and associates it with an owner identified by the ownerId.
   *
   * @param {string} url - The URL to be shortened.
   * @param {string} ownerId - The identifier of the owner to associate with the shortened URL.
   * @return {Promise<void>} A promise that resolves when the URL has been successfully shortened.
   */
  async shortenUrl(url: string, ownerId: string): Promise<void> {
    return this.commandBus.execute<CreateUrlCommand, void>(
      new CreateUrlCommand(url, ownerId),
    );
  }
}
