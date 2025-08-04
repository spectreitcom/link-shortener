import { CreateUserCommand } from '../commands/create-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../ports/user.repository';
import { HashService } from '../ports/hash.service';
import { User } from '../../domain/user';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, void>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(command: CreateUserCommand) {
    const { email, password } = command;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashService.hash(password);
    const user = User.create(email, hashedPassword);
    await this.userRepository.save(user);
  }
}
