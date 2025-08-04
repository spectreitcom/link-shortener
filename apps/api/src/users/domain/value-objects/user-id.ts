import { randomUUID } from 'crypto';
import { IsUUID, validateSync } from 'class-validator';

export class UserId {
  @IsUUID(4, { message: 'UserId must be a valid UUID v4' })
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validateSync();
  }

  private validateSync(): void {
    const errors = validateSync(this);
    if (errors.length) {
      throw new Error('Invalid UserId');
    }
  }

  static create(): UserId {
    return new UserId(randomUUID());
  }

  equals(newValue: UserId): boolean {
    return this.value === newValue.value;
  }
}
