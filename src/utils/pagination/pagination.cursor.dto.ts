import { Expose, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class CursorPaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take?: number;

  @Expose({ name: 'last-id' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  lastId?: number;
}
