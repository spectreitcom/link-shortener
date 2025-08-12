import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUrlCommand } from './commands/create-url.command';
import { GetOriginalUrlQuery } from './queries/get-original-url.query';
import { GetOriginalUrlQueryResponse } from './query-handlers/get-original-url.query-handler';
import { GetUsersUrlsQuery } from './queries/get-users-urls.query';
import { GetUsersUrlsQueryResponse } from './query-handlers/get-user-urls.query-handler';
import { UserUrlView } from '../views/user-url.view';
import { GetUrlQuery } from './queries/get-url.query';

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
   * Retrieves the original URL associated with the given shortened URL code.
   *
   * @param {string} code - The shortened URL code for which the original URL is being requested.
   * @param {string} ip - The IP address of the client making the request.
   * @return {Promise<GetOriginalUrlQueryResponse>} A promise that resolves to the original URL data.
   */
  async getOriginalUrl(
    code: string,
    ip: string,
  ): Promise<GetOriginalUrlQueryResponse> {
    return await this.queryBus.execute<
      GetOriginalUrlQuery,
      GetOriginalUrlQueryResponse
    >(new GetOriginalUrlQuery(code, ip));
  }

  /**
   * Fetches a list of user URLs based on the provided user ID and page number.
   *
   * @param {string} userId - The unique identifier of the user whose URLs are to be fetched.
   * @param {number} page - The page number to retrieve results for, used for pagination.
   * @return {Promise<GetUsersUrlsQueryResponse>} A promise that resolves to the response containing the user's URLs.
   */
  async getUserUrls(
    userId: string,
    page: number,
  ): Promise<GetUsersUrlsQueryResponse> {
    return await this.queryBus.execute<
      GetUsersUrlsQuery,
      GetUsersUrlsQueryResponse
    >(new GetUsersUrlsQuery(userId, page));
  }

  /**
   * Retrieves a user-specific URL based on the provided identifiers.
   *
   * @param {string} urlId - The identifier for the URL to be retrieved.
   * @param {string} ownerId - The identifier of the owner of the URL.
   * @return {Promise<UserUrlView>} A promise that resolves to the view of the user's URL.
   */
  async getUrl(urlId: string, ownerId: string): Promise<UserUrlView> {
    return this.queryBus.execute<GetUrlQuery, UserUrlView>(
      new GetUrlQuery(urlId, ownerId),
    );
  }
}
