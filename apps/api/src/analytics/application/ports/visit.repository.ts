import { Visit } from '../../domain/visit';
import { IpAddress } from '../../domain/value-objects/ip-address';
import { UrlId } from '../../domain/value-objects/url-id';
import { PrismaClient } from '@prisma/client';

type TransactionClient = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];

export abstract class VisitRepository {
  abstract save(visit: Visit): Promise<void>;
  abstract save(visit: Visit, tx: TransactionClient): Promise<void>;
  abstract isUnique(ip: IpAddress, urlId: UrlId): Promise<boolean>;
  abstract isUnique(
    ip: IpAddress,
    urlId: UrlId,
    tx: TransactionClient,
  ): Promise<boolean>;
  abstract getByDateRange(
    urlId: UrlId,
    startDate: string,
    endDate: string,
  ): Promise<Visit[]>;
}
