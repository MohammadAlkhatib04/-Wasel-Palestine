import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Checkpoint } from '../entities/checkpoint.entity';
import { Repository } from 'typeorm';
import { CheckpointSearchStrategy } from './checkpoint-search.strategy';
import { SearchCheckpointDto } from '../dto/search-checkpoint.dto';

// strategies/search-by-city-status.strategy.ts
@Injectable()
export class SearchByCityStatusStrategy implements CheckpointSearchStrategy {
  constructor(
    @InjectRepository(Checkpoint)
    private checkpointRepo: Repository<Checkpoint>,
  ) {}
  async search(params: SearchCheckpointDto): Promise<Checkpoint[]> {
    if (!params.city || !params.status) {
      throw new Error('City and status are required for this search');
    }
    return this.checkpointRepo.find({
      where: {
        city: params.city,
        status: params.status,
      },
    });
  }
}
