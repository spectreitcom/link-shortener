import { IsDate, IsOptional } from 'class-validator';

export class GetStatisticsParamsDto {
  @IsOptional()
  @IsDate()
  readonly fromDate: string;

  @IsOptional()
  @IsDate()
  readonly endDate: string;
}
