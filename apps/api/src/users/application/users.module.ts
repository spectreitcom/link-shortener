import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UsersService } from './users.service';
import { CreateUserCommandHandler } from './command-handlers/create-user.command-handler';

@Module({
  imports: [InfrastructureModule],
  providers: [UsersService, CreateUserCommandHandler],
  exports: [UsersService],
})
export class UsersModule {}
