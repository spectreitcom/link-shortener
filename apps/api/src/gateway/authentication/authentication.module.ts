import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../../users/application/users.module';
import { AuthLocalGuard } from './guards/auth-local.guard';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [
    LocalStrategy,
    UsersModule,
    AuthLocalGuard,
    AuthenticationService,
    JwtStrategy,
    JwtGuard,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthenticationModule {}
