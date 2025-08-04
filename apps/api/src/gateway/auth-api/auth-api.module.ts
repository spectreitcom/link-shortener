import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api.controller';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [AuthApiController],
})
export class AuthApiModule {}
