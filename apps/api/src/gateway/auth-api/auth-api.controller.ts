import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthLocalGuard } from '../authentication/guards/auth-local.guard';
import { Public } from '../authentication/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthApiController {
  @UseGuards(AuthLocalGuard)
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
