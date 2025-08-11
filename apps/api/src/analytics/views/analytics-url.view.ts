import { VisitView } from './visit.view';

export class AnalyticsUrlView {
  constructor(
    public readonly visitCount: number,
    public readonly uniqueVisitCount: number,
    public readonly visits: VisitView[],
  ) {}
}
