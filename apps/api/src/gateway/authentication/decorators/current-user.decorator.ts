import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = () =>
  createParamDecorator((_: unknown, context) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user;
  });
