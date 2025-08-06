import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UrlRepository } from '../application/ports/url.repository';
import { PrismaUrlRepository } from './prisma-url.repository';
import { UrlCacheService } from '../application/ports/url-cache.service';
import { AppUrlCacheService } from './app-url-cache.service';
import { UserUrlViewRepository } from '../application/ports/user-url-view.repository';
import { PrismaUserUrlViewRepository } from './prisma-user-url-view.repository';

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
    {
      provide: UserUrlViewRepository,
      useClass: PrismaUserUrlViewRepository,
    },
  ],
  exports: [UrlRepository, UrlCacheService, UserUrlViewRepository],
})
export class InfrastructureModule {}
