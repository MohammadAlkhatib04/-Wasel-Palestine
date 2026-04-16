import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { IncidentType } from '../enums/incident-type.enum';
import { IncidentSeverity } from '../enums/incident-severity.enum';

export class CreateIncidentDto {
  @IsString()
  @MaxLength(150)
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(IncidentType, {
    message: 'Invalid incident type',
  })
  type!: IncidentType;

  @IsEnum(IncidentSeverity, {
    message: 'Invalid incident severity',
  })
  severity!: IncidentSeverity;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsNumber()
  checkpointId?: number;
}
