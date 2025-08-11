import { Injectable } from '@nestjs/common';
import { VisitRepository } from '../application/ports/visit.repository';
import { IpAddress } from '../domain/value-objects/ip-address';
import { Visit } from '../domain/visit';
import { PrismaService } from '../../prisma/prisma.service';
import { UrlId } from '../domain/value-objects/url-id';
import { PrismaClient } from '@prisma/client';

type TransactionClient = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];

@Injectable()
export class PrismaVisitRepository implements VisitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(visit: Visit, tx?: TransactionClient): Promise<void> {
    const client = tx || this.prismaService;
    await client.visit.create({
      data: {
        id: visit.getId().value,
        urlId: visit.getUrlId().value,
        ip: visit.getIp().value,
        ownerId: visit.getOwnerId().value,
      },
    });
  }

  async isUnique(
    ip: IpAddress,
    urlId: UrlId,
    tx?: TransactionClient,
  ): Promise<boolean> {
    const client = tx || this.prismaService;
    const visit = await client.visit.findFirst({
      where: {
        ip: ip.value,
        urlId: urlId.value,
      },
    });
    return visit === null;
  }
}
