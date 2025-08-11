import { Injectable } from '@nestjs/common';
import { VisitRepository } from '../application/ports/visit.repository';
import { IpAddress } from '../domain/value-objects/ip-address';
import { Visit } from '../domain/visit';
import { PrismaService } from '../../prisma/prisma.service';
import { UrlId } from '../domain/value-objects/url-id';
import { VisitId } from '../domain/value-objects/visit-id';
import { OwnerId } from '../domain/value-objects/owner-id';
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

  async getByDateRange(
    urlId: UrlId,
    startDate: Date,
    endDate: Date,
  ): Promise<Visit[]> {
    const visits = await this.prismaService.visit.findMany({
      where: {
        urlId: urlId.value,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return visits.map(
      (visit) =>
        new Visit(
          VisitId.fromString(visit.id),
          UrlId.fromString(visit.urlId),
          IpAddress.fromString(visit.ip),
          OwnerId.fromString(visit.ownerId),
          visit.createdAt,
        ),
    );
  }
}
