import { randomUUID } from 'crypto';
import { IsUUID, validateSync } from 'class-validator';

export class UrlId {
  @IsUUID(4, { message: 'UrlId must be a valid UUID v4' })
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    this.validateSync();
  }

  private validateSync(): void {
    const errors = validateSync(this);
    if (errors.length) {
      throw new Error('Invalid UrlId');
    }
  }

  static fromString(value: string): UrlId {
    return new UrlId(value);
  }

  static create(): UrlId {
    return new UrlId(randomUUID());
  }

  equals(other: UrlId): boolean {
    return this.value === other.value;
  }
}
