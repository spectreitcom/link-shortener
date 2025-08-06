import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UrlRepository } from '../application/ports/url.repository';
import { PrismaUrlRepository } from './prisma-url.repository';
import { UrlCacheService } from '../application/ports/url-cache.service';
import { AppUrlCacheService } from './app-url-cache.service';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UrlRepository,
      useClass: PrismaUrlRepository,
    },
    {
      provide: UrlCacheService,
      useClass: AppUrlCacheService,
    },
  ],
  exports: [UrlRepository, UrlCacheService],
})
export class InfrastructureModule {}
