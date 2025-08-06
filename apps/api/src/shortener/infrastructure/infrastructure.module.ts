import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UrlRepository } from '../application/ports/url.repository';
import { PrismaUrlRepository } from './prisma-url.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UrlRepository,
      useClass: PrismaUrlRepository,
    },
  ],
  exports: [UrlRepository],
})
export class InfrastructureModule {}
