import { IsIP, validateSync } from 'class-validator';

export class IpAddress {
  @IsIP(4)
  public readonly value: string;

  private constructor(value: string) {
    this.value = value === '::1' ? '127.0.0.1' : value;
    this.validateSync();
  }

  private validateSync(): void {
    const errors = validateSync(this);
    if (errors.length) {
      throw new Error('Invalid Ip address');
    }
  }

  static fromString(value: string): IpAddress {
    return new IpAddress(value);
  }

  equals(other: IpAddress) {
    return this.value === other.value;
  }
}
