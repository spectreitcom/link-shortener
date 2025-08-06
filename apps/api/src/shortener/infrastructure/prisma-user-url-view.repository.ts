import { Injectable } from '@nestjs/common';
import { UserUrlViewRepository } from '../application/ports/user-url-view.repository';
import { UserUrlView } from '../views/user-url.view';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaUserUrlViewRepository implements UserUrlViewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    userId: string,
    take: number,
    skip: number,
  ): Promise<UserUrlView[]> {
    const urls = await this.prismaService.url.findMany({
      where: { ownerId: userId },
      take,
      skip,
    });

    return urls.map(
      (url) => new UserUrlView(url.id, url.originalUrl, url.code),
    );
  }

  async total(userId: string): Promise<number> {
    return this.prismaService.url.count({
      where: { ownerId: userId },
    });
  }
}
