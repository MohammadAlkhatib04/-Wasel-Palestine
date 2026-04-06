import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckpointStatusHistoryDto } from './create-checkpoint-status-history.dto';

export class UpdateCheckpointStatusHistoryDto extends PartialType(CreateCheckpointStatusHistoryDto) {}
