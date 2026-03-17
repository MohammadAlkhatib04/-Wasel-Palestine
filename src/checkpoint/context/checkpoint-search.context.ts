import { Injectable } from '@nestjs/common';
import { CheckpointSearchStrategy } from '../strategies/checkpoint-search.strategy';
import { SearchCheckpointDto } from '../dto/search-checkpoint.dto';

@Injectable()
export class CheckpointSearchContext {
  private strategy: CheckpointSearchStrategy;

  setStrategy(strategy: CheckpointSearchStrategy) {
    this.strategy = strategy;
  }

  execute(params: SearchCheckpointDto) {
    if (!this.strategy) {
      throw new Error('Search strategy not set');
    }
    return this.strategy.search(params);
  }
}
