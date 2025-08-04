import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/application/users.module';
import { UsersApiController } from './users-api.controller';

@Module({
  imports: [UsersModule],
  controllers: [UsersApiController],
})
export class UsersApiModule {}
