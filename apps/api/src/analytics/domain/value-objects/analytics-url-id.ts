import { randomUUID } from 'crypto';
import { IsUUID, validateSync } from 'class-validator';

export class AnalyticsUrlId {
  @IsUUID(4, { message: 'AnalyticsUrlId must be a valid UUID v4' })
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    this.validateSync();
  }

  private validateSync(): void {
    const errors = validateSync(this);
    if (errors.length) {
      throw new Error('Invalid AnalyticsUrlId');
    }
  }

  static create(): AnalyticsUrlId {
    return new AnalyticsUrlId(randomUUID());
  }

  equals(other: AnalyticsUrlId): boolean {
    return this.value === other.value;
  }

  static fromString(id: string) {
    return new AnalyticsUrlId(id);
  }
}
