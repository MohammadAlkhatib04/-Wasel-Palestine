import { IsEnum, IsInt, IsOptional, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { IncidentType } from '../enums/incident-type.enum';
import { IncidentSeverity } from '../enums/incident-severity.enum';
import { IncidentStatus } from '../enums/incident-status.enum';

export enum IncidentSortBy {
  CREATED_AT = 'createdAt',
  SEVERITY = 'severity',
  UPDATED_AT = 'updatedAt',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class SearchIncidentDto {
  @IsOptional()
  @IsEnum(IncidentType, { message: 'Invalid incident type' })
  type?: IncidentType;

  @IsOptional()
  @IsEnum(IncidentSeverity, { message: 'Invalid incident severity' })
  severity?: IncidentSeverity;

  @IsOptional()
  @IsEnum(IncidentStatus, { message: 'Invalid incident status' })
  status?: IncidentStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  checkpointId?: number;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsEnum(IncidentSortBy, { message: 'Invalid sortBy value' })
  sortBy: IncidentSortBy = IncidentSortBy.CREATED_AT;

  @IsOptional()
  @IsEnum(SortOrder, { message: 'Invalid sortOrder value' })
  sortOrder: SortOrder = SortOrder.DESC;
}
