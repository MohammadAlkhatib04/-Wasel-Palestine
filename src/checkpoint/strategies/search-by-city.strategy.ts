import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Checkpoint } from '../entities/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckpointSearchStrategy } from './checkpoint-search.strategy';
import { SearchCheckpointDto } from '../dto/search-checkpoint.dto';

@Injectable()
export class SearchByCityStrategy implements CheckpointSearchStrategy {
  constructor(
    @InjectRepository(Checkpoint)
    private checkpointRepo: Repository<Checkpoint>,
  ) {}

  async search(params: SearchCheckpointDto): Promise<Checkpoint[]> {
    if (!params.city) {
      throw new Error('City is required for this search');
    }
    return this.checkpointRepo.find({
      where: { city: params.city },
    });
  }
}
