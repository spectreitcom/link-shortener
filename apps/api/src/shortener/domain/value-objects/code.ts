import { createHash, randomUUID } from 'crypto';
import { getBitsAsBase62 } from '../helpers';

export class Code {
  private constructor(public readonly value: string) {}

  static fromString(value: string) {
    return new Code(value);
  }

  static create() {
    const hash = createHash('sha256').update(randomUUID()).digest('hex');
    const code = getBitsAsBase62(Buffer.from(hash), 0, 48);
    return new Code(code);
  }

  equals(other: Code) {
    return this.value === other.value;
  }
}
