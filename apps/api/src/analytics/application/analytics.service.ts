import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetStatisticsQuery } from './queries/get-statistics.query';
import { AnalyticsUrlView } from '../views/analytics-url.view';

@Injectable()
export class AnalyticsService {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * Retrieves statistical data for a specified URL within a given date range.
   *
   * @param {string} urlId - The unique identifier of the URL for which to retrieve statistics.
   * @param {string} ownerId - The unique identifier of the owner of the URL.
   * @param {string} fromDate - The start date for the statistics query in the format YYYY-MM-DD.
   * @param {string} endDate - The end date for the statistics query in the format YYYY-MM-DD.
   * @return {Promise<AnalyticsUrlView>} A promise that resolves to the analytics data for the specified URL.
   */
  getStatistics(
    urlId: string,
    ownerId: string,
    fromDate: string,
    endDate: string,
  ) {
    return this.queryBus.execute<GetStatisticsQuery, AnalyticsUrlView>(
      new GetStatisticsQuery(urlId, ownerId, fromDate, endDate),
    );
  }
}
