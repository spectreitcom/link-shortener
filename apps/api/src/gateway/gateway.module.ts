import { Module } from '@nestjs/common';
import { UsersApiModule } from './users-api/users-api.module';
import { AuthApiModule } from './auth-api/auth-api.module';
import { UrlApiModule } from './url-api/url-api.module';
import { AnalyticsApiModule } from './analytics-api/analytics-api.module';

@Module({
  imports: [UsersApiModule, AuthApiModule, UrlApiModule, AnalyticsApiModule],
})
export class GatewayModule {}
