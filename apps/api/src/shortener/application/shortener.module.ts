import { Module } from '@nestjs/common';
import { CreateUrlCommandHandler } from './command-handlers/create-url.command-handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ShortenerService } from './shortener.service';
import { GetOriginalUrlQueryHandler } from './query-handlers/get-original-url.query-handler';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateUrlCommandHandler,
    ShortenerService,
    GetOriginalUrlQueryHandler,
  ],
  exports: [ShortenerService],
})
export class ShortenerModule {}
