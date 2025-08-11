import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from '../../analytics/application/analytics.service';
import { JwtGuard } from '../authentication/guards/jwt.guard';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import { ValidatedUser } from '../authentication/types';
import { GetStatisticsParamsDto } from './dtos/get-statistics-params.dto';

@Controller('analytics')
export class AnalyticsApiController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(JwtGuard)
  @Get(':urlId')
  getStatistics(
    @CurrentUser() user: ValidatedUser,
    @Param('urlId') urlId: string,
    @Query() queryParams: GetStatisticsParamsDto,
  ) {
    return this.analyticsService.getStatistics(
      urlId,
      user.id,
      queryParams.fromDate,
      queryParams.endDate,
    );
  }
}
