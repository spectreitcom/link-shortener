import { IEvent } from '@nestjs/cqrs';

export class UrlReadEvent implements IEvent {
  constructor(
    public readonly urlId: string,
    public readonly ownerId: string,
    public readonly ip: string,
  ) {}
}
