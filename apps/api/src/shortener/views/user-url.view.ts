export class UserUrlView {
  constructor(
    public readonly id: string,
    public readonly originalUrl: string,
    public readonly code: string,
  ) {}
}
