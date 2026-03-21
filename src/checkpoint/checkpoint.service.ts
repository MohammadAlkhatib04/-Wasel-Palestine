import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { Repository } from 'typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchCheckpointDto } from './dto/search-checkpoint.dto';
import { CheckpointSearchContext } from './context/checkpoint-search.context';
import { SearchByCityStrategy } from './strategies/search-by-city.strategy';
import { SearchByCityStatusStrategy } from './strategies/search-by-city-status.strategy';
import { SearchByNameStrategy } from './strategies/search-by-name.strategy';
import { FindCheckpointDto } from './dto/find-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,
    private context: CheckpointSearchContext,
    private searchByCity: SearchByCityStrategy,
    private searchByName: SearchByNameStrategy,
    private searchByCityStatus: SearchByCityStatusStrategy,
  ) {}
  public async createCheckpoint(
    userId: number,
    createCheckpointDto: CreateCheckpointDto,
  ) {
    return this.checkpointRepository.save(createCheckpointDto);
  }

  public async getAllCheckpoint() {
    return this.checkpointRepository.find();
  }

  public async searchCheckpoint(query: SearchCheckpointDto) {
    if (query.city && query.status) {
      this.context.setStrategy(this.searchByCityStatus);
    } else if (query.city) {
      this.context.setStrategy(this.searchByCity);
    } else if (query.name) {
      this.context.setStrategy(this.searchByName);
    } else {
      throw new Error('Invalid search params');
    }

    return this.context.execute(query);
  }

  public async findOne(name: string) {
    return this.checkpointRepository.findOne({ where: { name } });
  }

  public async update(
    findDto: FindCheckpointDto,
    updateDto: UpdateCheckpointDto,
  ) {
    const { id, name } = findDto;

    if (!id && !name) {
      throw new BadRequestException('You must provide id or name');
    }

    const checkpoint = await this.checkpointRepository.findOne({
      where: id ? { id } : { name },
    });

    if (!checkpoint) {
      throw new NotFoundException('Checkpoint not found');
    }

    Object.assign(checkpoint, updateDto);

    return this.checkpointRepository.save(checkpoint);
  }

  public async remove(findDto: FindCheckpointDto) {
    try {
      const { id, name } = findDto;

      if (!id && !name) {
        throw new BadRequestException('You must provide id or name');
      }

      const checkpoint = await this.checkpointRepository.findOne({
        where: id ? { id } : { name },
      });

      if (!checkpoint) {
        throw new NotFoundException('Checkpoint not found');
      }

      await this.checkpointRepository.remove(checkpoint);

      return { message: 'Checkpoint deleted successfully' };
    } catch (err) {
      throw new Error('Somthing went wrong\n' + err);
    }
  }
}
