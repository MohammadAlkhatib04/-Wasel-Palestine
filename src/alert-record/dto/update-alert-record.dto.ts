import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertRecordDto } from './create-alert-record.dto';

export class UpdateAlertRecordDto extends PartialType(CreateAlertRecordDto) {}