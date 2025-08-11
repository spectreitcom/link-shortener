import { IQuery } from '@nestjs/cqrs';
import { format, isBefore, subDays } from 'date-fns';

export class GetStatisticsQuery implements IQuery {
  constructor(
    public readonly urlId: string,
    public readonly ownerId: string,
    public readonly fromDate: string,
    public readonly endDate: string,
  ) {
    if (!this.fromDate) {
      this.fromDate = format(new Date(), 'yyyy-MM-dd');
    }

    if (!this.endDate) {
      this.endDate = subDays(this.fromDate, 7).toString();
    }

    if (isBefore(this.endDate, this.fromDate)) {
      throw new Error('End date must be after start date');
    }
  }
}
