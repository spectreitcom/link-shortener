import { User } from '../../domain/user';
import { UserId } from '../../domain/value-objects/user-id';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract findById(id: UserId): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}
