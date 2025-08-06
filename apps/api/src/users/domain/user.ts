import { UserId } from './value-objects/user-id';

export class User {
  constructor(
    private readonly id: UserId,
    private email: string,
    private password: string,
  ) {}

  static create(email: string, password: string) {
    return new User(UserId.create(), email, password);
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}
