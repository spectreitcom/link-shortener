import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { ValidatedUser } from '../types';

export const CurrentUser = createParamDecorator((_: unknown, context) => {
  const request = context.switchToHttp().getRequest<Request>();
  return request.user as ValidatedUser;
});
