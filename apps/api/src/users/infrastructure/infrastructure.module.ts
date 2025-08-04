import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { HashService } from '../application/ports/hash.service';
import { AppHashService } from './app-hash.service';
import { UserRepository } from '../application/ports/user.repository';
import { PrismaUserRepository } from './prisma-user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: HashService,
      useClass: AppHashService,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [HashService, UserRepository],
})
export class InfrastructureModule {}
