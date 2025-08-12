import { IsOptional, IsDateString } from 'class-validator';

export class GetStatisticsParamsDto {
  @IsOptional()
  @IsDateString()
  readonly fromDate: string;

  @IsOptional()
  @IsDateString()
  readonly endDate: string;
}
