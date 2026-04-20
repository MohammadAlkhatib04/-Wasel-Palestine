import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { DeliveryStatus } from '../entities/alert-record.entity';

export class CreateAlertRecordDto {
  @IsInt()
  @Min(1)
  subscription_id!: number;

  @IsInt()
  @Min(1)
  incident_id!: number;

  @IsOptional()
  @IsEnum(DeliveryStatus)
  delivery_status?: DeliveryStatus;
}
