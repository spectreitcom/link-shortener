import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, ValidatedUser } from './types';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: ValidatedUser) {
    const accessToken = await this.generateAccessToken(user);
    return {
      ...user,
      accessToken,
    };
  }

  private generateAccessToken(user: ValidatedUser) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.signAsync(payload);
  }
}
