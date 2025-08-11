import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetStatisticsQuery } from '../queries/get-statistics.query';
import { AnalyticsUrlView } from '../../views/analytics-url.view';
import { AnalyticsUrlRepository } from '../ports/analytics-url.repository';
import { OwnerId } from '../../domain/value-objects/owner-id';
import { UrlId } from '../../domain/value-objects/url-id';
import { VisitRepository } from '../ports/visit.repository';
import { format } from 'date-fns';
import { VisitView } from '../../views/visit.view';

export class WrongOwnerError extends Error {
  constructor() {
    super("You don't have access to this resource");
  }
}

@QueryHandler(GetStatisticsQuery)
export class GetStatisticsQueryHandler
  implements IQueryHandler<GetStatisticsQuery, AnalyticsUrlView>
{
  constructor(
    private readonly analyticsUrlRepository: AnalyticsUrlRepository,
    private readonly visitRepository: VisitRepository,
  ) {}

  async execute(query: GetStatisticsQuery): Promise<AnalyticsUrlView> {
    const { urlId, ownerId, fromDate, endDate } = query;

    const _fromDate = new Date(fromDate);
    const _endDate = new Date(endDate);

    const _ownerId = OwnerId.fromString(ownerId);
    const _urlId = UrlId.fromString(urlId);

    const analyticsUrl = await this.analyticsUrlRepository.findByUrlId(_urlId);

    if (!analyticsUrl) {
      return new AnalyticsUrlView(0, 0, []);
    }

    if (!analyticsUrl.isOwnerOf(_ownerId)) {
      throw new WrongOwnerError();
    }

    const visits = await this.visitRepository.getByDateRange(
      analyticsUrl.getUrlId(),
      _fromDate,
      _endDate,
    );

    const map = new Map<string, number>();

    for (const visit of visits) {
      const visitDate = format(visit.getCreatedAt()!, 'yyyy-MM-dd');
      const count = map.get(visitDate) || 0;
      map.set(visitDate, count + 1);
    }

    const visitsArray = Array.from(map.entries()).map(
      ([date, count]) => new VisitView(date, count),
    );

    return new AnalyticsUrlView(
      analyticsUrl.getVisitCount(),
      analyticsUrl.getUniqueVisitCount(),
      visitsArray,
    );
  }
}
