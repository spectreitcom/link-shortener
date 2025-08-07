import { randomUUID } from 'crypto';
import { IsUUID, validateSync } from 'class-validator';

export class VisitId {
  @IsUUID(4, { message: 'VisitId must be a valid UUID v4' })
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
    this.validateSync();
  }

  private validateSync(): void {
    const errors = validateSync(this);
    if (errors.length) {
      throw new Error('Invalid VisitId');
    }
  }

  static create(): VisitId {
    return new VisitId(randomUUID());
  }

  equals(other: VisitId): boolean {
    return this.value === other.value;
  }
}
