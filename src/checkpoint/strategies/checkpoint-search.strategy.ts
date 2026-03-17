import { SearchCheckpointDto } from '../dto/search-checkpoint.dto';
import { Checkpoint } from '../entities/checkpoint.entity';

export interface CheckpointSearchStrategy {
  search(params: SearchCheckpointDto): Promise<Checkpoint[]>;
}
