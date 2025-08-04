import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { User } from '../domain/user';
import { HashService } from './ports/hash.service';
import { UserRepository } from './ports/user.repository';
import { UserId } from '../domain/value-objects/user-id';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Creates a new user with the specified email and password.
   *
   * @param {string} email - The email address of the user to be created.
   * @param {string} password - The password for the user to be created.
   * @return {Promise<void>} A promise that resolves when the user is successfully created.
   */
  createUser(email: string, password: string): Promise<void> {
    return this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(email, password),
    );
  }

  /**
   * Validates a user's credentials by verifying the email and password.
   *
   * @param {string} email - The email address of the user to validate.
   * @param {string} password - The password provided by the user.
   * @return {Promise<User | null>} A promise that resolves to the user object if validation is successful, or null if failed.
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await this.hashService.verify(
      password,
      user.getPassword(),
    );
    if (!isPasswordValid) return null;

    return user;
  }

  /**
   * Retrieves a user by their unique identifier.
   *
   * @param {string} id The unique identifier of the user to retrieve.
   * @return {Promise<User | null>} A promise that resolves to the user if found, or null if no user with the given ID exists.
   */
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(new UserId(id));
  }
}
