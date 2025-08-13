import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { AnalyticsService } from '../../analytics/application/analytics.service';
import { CurrentUser } from '../authentication/decorators/current-user.decorator';
import { ValidatedUser } from '../authentication/types';
import { GetStatisticsParamsDto } from './dtos/get-statistics-params.dto';
import {
  WrongDateRangeError,
  WrongOwnerError,
} from '../../analytics/application/query-handlers/get-statistics.query-handler';

@Controller('analytics')
export class AnalyticsApiController {
  private readonly logger = new Logger(AnalyticsApiController.name);

  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':urlId')
  async getStatistics(
    @CurrentUser() user: ValidatedUser,
    @Param('urlId') urlId: string,
    @Query() queryParams: GetStatisticsParamsDto,
  ) {
    try {
      return await this.analyticsService.getStatistics(
        urlId,
        user.id,
        queryParams.fromDate,
        queryParams.endDate,
      );
    } catch (e) {
      this.logger.error(e);
      if (e instanceof WrongOwnerError) {
        throw new ForbiddenException(e.message);
      } else if (e instanceof WrongDateRangeError) {
        throw new BadRequestException(e.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
