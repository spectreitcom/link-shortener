import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from '../../users/application/users.service';
import { Public } from '../authentication/decorators/public.decorator';

@Controller('users')
export class UsersApiController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(
        createUserDto.email,
        createUserDto.password,
      );
    } catch (e) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }
      throw new InternalServerErrorException();
    }
  }
}
