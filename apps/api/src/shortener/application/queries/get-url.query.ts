import { IQuery } from '@nestjs/cqrs';

export class GetUrlQuery implements IQuery {
  constructor(
    public readonly urlId: string,
    public readonly ownerId: string,
  ) {}
}
