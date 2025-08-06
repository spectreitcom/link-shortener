import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../application/ports/url.repository';
import { Code } from '../domain/value-objects/code';
import { PrismaService } from '../../prisma/prisma.service';
import { Url } from '../domain/url';
import { UrlId } from '../domain/value-objects/url-id';
import { OwnerId } from '../domain/value-objects/owner-id';

@Injectable()
export class PrismaUrlRepository implements UrlRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(url: Url): Promise<void> {
    await this.prismaService.url.upsert({
      where: {
        id: url.getId().value,
      },
      create: {
        id: url.getId().value,
        originalUrl: url.getOriginalUrl(),
        code: url.getCode().value,
        ownerId: url.getOwnerId().value,
      },
      update: {
        originalUrl: url.getOriginalUrl(),
        code: url.getCode().value,
        ownerId: url.getOwnerId().value,
      },
    });
  }

  async findByCode(code: Code): Promise<Url | null> {
    const urlModel = await this.prismaService.url.findUnique({
      where: {
        code: code.value,
      },
    });

    if (!urlModel) return null;

    return new Url(
      UrlId.fromString(urlModel.id),
      OwnerId.fromString(urlModel.ownerId),
      urlModel.originalUrl,
      Code.fromString(urlModel.code),
    );
  }
}
