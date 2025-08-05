import { User } from '@prisma/client';

export type JwtPayload = {
  sub: string;
  email: string;
};

export type ValidatedUser = Omit<User, 'password'>;
