import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUrlCommand } from './commands/create-url.command';
import { GetOriginalUrlQuery } from './queries/get-original-url.query';
import { GetOriginalUrlQueryResponse } from './query-handlers/get-original-url.query-handler';

@Injectable()
export class ShortenerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  /**
   * Retrieves the original URL corresponding to the provided shortened code.
   *
   * @param {string} code - The shortened code associated with the original URL.
   * @return {Promise<GetOriginalUrlQueryResponse>} A promise that resolves to the response containing the original URL.
   */
  async getOriginalUrl(code: string): Promise<GetOriginalUrlQueryResponse> {
    return await this.queryBus.execute<
      GetOriginalUrlQuery,
      GetOriginalUrlQueryResponse
    >(new GetOriginalUrlQuery(code));
  }
}
