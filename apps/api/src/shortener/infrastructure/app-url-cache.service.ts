import { Injectable } from '@nestjs/common';
import { UrlCacheService } from '../application/ports/url-cache.service';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppUrlCacheService implements UrlCacheService {
  private readonly client: Redis;
  static readonly keyPrefix = 'url:';

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis(configService.get<string>('REDIS_URL') as string);
  }

  async cache(code: string, originalUrl: string): Promise<void> {
    await this.client.set(
      `${AppUrlCacheService.keyPrefix}${code}`,
      originalUrl,
      'EX',
      60 * 60 * 24,
    );
  }

  async getByCode(code: string): Promise<string | null> {
    return this.client.get(`${AppUrlCacheService.keyPrefix}${code}`);
  }
}
