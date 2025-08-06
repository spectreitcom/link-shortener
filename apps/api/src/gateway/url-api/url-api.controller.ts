import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ShortenerService } from '../../shortener/application/shortener.service';
import { CreateShortUrlDto } from './dtos/create-short-url.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import { ValidatedUser } from '../authentication/types';
import { Public } from '../authentication/decorators/public.decorator';
import { UrlNotFound } from '../../shortener/application/query-handlers/get-original-url.query-handler';

@Controller('urls')
export class UrlApiController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  createShortUrl(
    @Body() createShortUrlDto: CreateShortUrlDto,
    @CurrentUser() user: ValidatedUser,
  ) {
    return this.shortenerService.shortenUrl(createShortUrlDto.url, user.id);
  }

  @Public()
  @Get(':code')
  getOriginalUrl(@Param('code') code: string) {
    try {
      return this.shortenerService.getOriginalUrl(code);
    } catch (e) {
      if (e instanceof UrlNotFound) {
        throw new NotFoundException(e.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
