import { ICommand } from '@nestjs/cqrs';

export class CreateUrlCommand implements ICommand {
  constructor(
    public readonly originalUrl: string,
    public readonly ownerId: string,
  ) {}
}
