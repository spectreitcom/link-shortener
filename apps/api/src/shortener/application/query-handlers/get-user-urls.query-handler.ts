import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersUrlsQuery } from '../queries/get-users-urls.query';
import { UserUrlView } from '../../views/user-url.view';
import { UserUrlViewRepository } from '../ports/user-url-view.repository';

export type GetUsersUrlsQueryResponse = {
  urls: UserUrlView[];
  totalPages: number;
};

@QueryHandler(GetUsersUrlsQuery)
export class GetUserUrlsQueryHandler
  implements IQueryHandler<GetUsersUrlsQuery, GetUsersUrlsQueryResponse>
{
  constructor(private readonly userUrlViewRepository: UserUrlViewRepository) {}

  async execute(query: GetUsersUrlsQuery): Promise<GetUsersUrlsQueryResponse> {
    const { userId, page } = query;

    const take = 10;
    const skip = (page - 1) * take;

    const urls = await this.userUrlViewRepository.findAll(userId, take, skip);
    const total = await this.userUrlViewRepository.total(userId);
    const totalPages = Math.ceil(total / take);

    return {
      urls,
      totalPages,
    };
  }
}
