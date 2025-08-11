import { IQuery } from '@nestjs/cqrs';
import { format, subDays } from 'date-fns';

export class GetStatisticsQuery implements IQuery {
  constructor(
    public readonly urlId: string,
    public readonly ownerId: string,
    public readonly fromDate: string,
    public readonly endDate: string,
  ) {
    if (!this.endDate) {
      this.endDate = format(new Date(), 'yyyy-MM-dd');
    }

    if (!this.fromDate) {
      this.fromDate = subDays(new Date(this.endDate), 7).toString();
    }
  }
}
