import { Injectable } from '@nestjs/common';
import { UrlCacheService } from '../application/ports/url-cache.service';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Url } from '../domain/url';

@Injectable()
export class AppUrlCacheService implements UrlCacheService {
  private readonly client: Redis;
  static readonly keyPrefix = 'url:';

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis(configService.get<string>('REDIS_URL') as string);
  }

  async cache(url: Url): Promise<void> {
    await this.client.set(
      `${AppUrlCacheService.keyPrefix}${url.getCode().value}`,
      url.serialize(),
      'EX',
      60 * 60 * 24,
    );
  }

  async getByCode(code: string): Promise<Url | null> {
    const serializedUrl = await this.client.get(
      `${AppUrlCacheService.keyPrefix}${code}`,
    );

    if (!serializedUrl) return null;
    return Url.deserialize(serializedUrl);
  }
}
