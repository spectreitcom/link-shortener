import { Injectable } from '@nestjs/common';
import { VisitRepository } from '../application/ports/visit.repository';
import { IpAddress } from '../domain/value-objects/ip-address';
import { Visit } from '../domain/visit';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaVisitRepository implements VisitRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(visit: Visit): Promise<void> {
    await this.prismaService.vist.create({
      data: {
        id: visit.getId().value,
        urlId: visit.getUrlId().value,
        ip: visit.getIp().value,
        ownerId: visit.getOwnerId().value,
      },
    });
  }

  async isUnique(ip: IpAddress): Promise<boolean> {
    const visit = await this.prismaService.vist.findFirst({
      where: {
        ip: ip.value,
      },
    });
    return visit === null;
  }
}
