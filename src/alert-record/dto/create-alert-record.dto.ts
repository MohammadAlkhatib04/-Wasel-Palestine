import { IsEnum, IsInt, Min } from 'class-validator';
import { DeliveryStatus } from '../entities/alert-record.entity';

export class CreateAlertRecordDto {
  @IsInt()
  @Min(1)
  subscription_id!: number;

  @IsInt()
  @Min(1)
  incident_id!: number;

  @IsEnum(DeliveryStatus)
  delivery_status!: DeliveryStatus;
}