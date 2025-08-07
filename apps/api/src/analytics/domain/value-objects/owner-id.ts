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

  equals(other: OwnerId): boolean {
    return this.value === other.value;
  }

  static fromString(ownerId: string) {
    return new OwnerId(ownerId);
  }
}
