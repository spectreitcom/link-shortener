import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLocalGuard } from '../authentication/guards/auth-local.guard';
import { Public } from '../authentication/decorators/public.decorator';
import { AuthenticationService } from '../authentication/authentication.service';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import { ValidatedUser } from '../authentication/types';

@Public()
@Controller('auth')
export class AuthApiController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(AuthLocalGuard)
  @Post('login')
  login(@CurrentUser() user: ValidatedUser) {
    return this.authenticationService.login(user);
  }
}
