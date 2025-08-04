import { HashService } from '../application/ports/hash.service';
import { hash, verify } from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHashService implements HashService {
  hash(value: string): Promise<string> {
    return hash(value);
  }

  verify(value: string, hashedValue: string): Promise<boolean> {
    return verify(hashedValue, value);
  }
}
