import { IQuery } from '@nestjs/cqrs';

export class GetOriginalUrlQuery implements IQuery {
  constructor(public readonly code: string) {}
}
