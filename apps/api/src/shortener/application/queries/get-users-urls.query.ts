import { IQuery } from '@nestjs/cqrs';

export class GetUsersUrlsQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly page: number,
  ) {}
}
