import { Body, Controller, Post } from '@nestjs/common';
import { ShortenerService } from '../../shortener/application/shortener.service';
import { CreateShortUrlDto } from './dtos/create-short-url.dto';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import { ValidatedUser } from '../authentication/types';

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
}
