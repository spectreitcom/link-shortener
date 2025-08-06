import { Module } from '@nestjs/common';
import { ShortenerModule } from '../../shortener/application/shortener.module';
import { UrlApiController } from './url-api.controller';

@Module({
  imports: [ShortenerModule],
  controllers: [UrlApiController],
})
export class UrlApiModule {}
