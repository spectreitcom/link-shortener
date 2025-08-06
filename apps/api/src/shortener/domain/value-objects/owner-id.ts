import { randomUUID } from 'crypto';
import { IsUUID, validateSync } from 'class-validator';

export class OwnerId {
  @IsUUID(4, { message: 'OwnerId must be a valid UUID v4' })
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    this.validateSync();
  }

  private validateSync(): void {
    const errors = validateSync(this);
    if (errors.length) {
      throw new Error('Invalid OwnerId');
    }
  }

  static fromString(value: string): OwnerId {
    return new OwnerId(value);
  }

  static create(): OwnerId {
    return new OwnerId(randomUUID());
  }

  equals(other: OwnerId): boolean {
    return this.value === other.value;
  }
}
