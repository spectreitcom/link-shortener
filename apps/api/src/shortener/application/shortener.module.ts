import { Module } from '@nestjs/common';
import { CreateUrlCommandHandler } from './command-handlers/create-url.command-handler';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ShortenerService } from './shortener.service';

@Module({
  imports: [InfrastructureModule],
  providers: [CreateUrlCommandHandler, ShortenerService],
  exports: [ShortenerService],
})
export class ShortenerModule {}
