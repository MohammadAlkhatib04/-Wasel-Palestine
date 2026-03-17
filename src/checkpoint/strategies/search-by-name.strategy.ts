import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Checkpoint } from '../entities/checkpoint.entity';
import { Repository } from 'typeorm';
import { SearchCheckpointDto } from '../dto/search-checkpoint.dto';
import { CheckpointSearchStrategy } from './checkpoint-search.strategy';

// strategies/search-by-name.strategy.ts
@Injectable()
export class SearchByNameStrategy implements CheckpointSearchStrategy {
  constructor(
    @InjectRepository(Checkpoint)
    private checkpointRepo: Repository<Checkpoint>,
  ) {}

  async search(params: SearchCheckpointDto): Promise<Checkpoint[]> {
    if (!params.name) {
      throw new Error('Name is required for this search');
    }
    return this.checkpointRepo.find({
      where: { name: params.name },
    });
  }
}
