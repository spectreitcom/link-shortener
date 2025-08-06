import { IsOptional, IsPositive } from 'class-validator';

export class GetUserUrlsParamsDto {
  @IsOptional()
  @IsPositive()
  readonly page: number = 1;
}
