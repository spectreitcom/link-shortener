import { Module } from '@nestjs/common';
import { UsersApiModule } from './users-api/users-api.module';
import { AuthApiModule } from './auth-api/auth-api.module';

@Module({
  imports: [UsersApiModule, AuthApiModule],
})
export class GatewayModule {}
