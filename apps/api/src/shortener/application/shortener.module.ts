import { Module } from '@nestjs/common';
import { CreateUrlCommandHandler } from './command-handlers/create-url.command-handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ShortenerService } from './shortener.service';
import { GetOriginalUrlQueryHandler } from './query-handlers/get-original-url.query-handler';
import { GetUserUrlsQueryHandler } from './query-handlers/get-user-urls.query-handler';
import { GetUrlQueryHandler } from './query-handlers/get-url.query-handler';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateUrlCommandHandler,
    ShortenerService,
    GetOriginalUrlQueryHandler,
    GetUserUrlsQueryHandler,
    GetUrlQueryHandler,
  ],
  exports: [ShortenerService],
})
export class ShortenerModule {}
