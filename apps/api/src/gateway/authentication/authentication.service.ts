import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/domain/user';
import { JwtPayload } from './types';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(user: User) {
    const payload: JwtPayload = {
      sub: user.getId().value,
      email: user.getEmail(),
    };
    return this.jwtService.signAsync(payload);
  }
}
