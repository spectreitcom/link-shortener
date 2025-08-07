import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ShortenerService } from '../../shortener/application/shortener.service';
import { CreateShortUrlDto } from './dtos/create-short-url.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import { ValidatedUser } from '../authentication/types';
import { Public } from '../authentication/decorators/public.decorator';
import { UrlNotFound } from '../../shortener/application/query-handlers/get-original-url.query-handler';
import { GetUserUrlsParamsDto } from './dtos/get-user-urls-params.dto';
import { Request } from 'express';

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

  @Get()
  getUserUrls(
    @Query() searchParams: GetUserUrlsParamsDto,
    @CurrentUser() user: ValidatedUser,
  ) {
    return this.shortenerService.getUserUrls(user.id, searchParams.page);
  }

  @Public()
  @Get(':code')
  getOriginalUrl(@Param('code') code: string, @Req() request: Request) {
    try {
      return this.shortenerService.getOriginalUrl(code, request?.ip ?? '');
    } catch (e) {
      if (e instanceof UrlNotFound) {
        throw new NotFoundException(e.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
