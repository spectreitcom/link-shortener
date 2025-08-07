import { Visit } from '../../domain/visit';
import { IpAddress } from '../../domain/value-objects/ip-address';

export abstract class VisitRepository {
  abstract save(visit: Visit): Promise<void>;
  abstract isUnique(ip: IpAddress): Promise<boolean>;
}
