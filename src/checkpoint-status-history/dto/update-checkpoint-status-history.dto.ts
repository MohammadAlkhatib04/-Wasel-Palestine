import { IsEnum } from 'class-validator';
import { CheckpointStatus } from 'src/checkpoint/enums/checkpoint-status.enum';

export class UpdateCheckpointStatusDto {
  @IsEnum(CheckpointStatus)
  newStatus!: CheckpointStatus;
}
