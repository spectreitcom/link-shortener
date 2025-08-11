import { Visit } from '../../domain/visit';
import { IpAddress } from '../../domain/value-objects/ip-address';
import { UrlId } from '../../domain/value-objects/url-id';

export abstract class VisitRepository {
  abstract save(visit: Visit): Promise<void>;
  abstract isUnique(ip: IpAddress, urlId: UrlId): Promise<boolean>;
}
