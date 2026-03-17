import { Injectable } from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { Repository } from 'typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchCheckpointDto } from './dto/search-checkpoint.dto';
import { CheckpointSearchContext } from './context/checkpoint-search.context';
import { SearchByCityStrategy } from './strategies/search-by-city.strategy';
import { SearchByCityStatusStrategy } from './strategies/search-by-city-status.strategy';
import { SearchByNameStrategy } from './strategies/search-by-name.strategy';

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
  public async createCheckpoint(createCheckpointDto: CreateCheckpointDto) {
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

  // public async update(name: string, updateCheckpointDto: UpdateCheckpointDto) {
  //   try {
  //     const searchCheckpoint = await this.findOne(name);
  //     if (searchCheckpoint !== null) {
  //       const { location, latitude, longitude, status } = updateCheckpointDto;
  //       await this.checkpointRepository.update(searchCheckpoint.id, {
  //         location,
  //         latitude,
  //         longitude,
  //         status,
  //       });
  //       return `This action updates a #${name} checkpoint`;
  //     } else {
  //       throw new Error(`Checkpoint ${name} not found`);
  //     }
  //   } catch (err) {
  //     return `This action have some error` + err;
  //   }
  // }

  remove(id: number) {
    return `This action removes a #${id} checkpoint`;
  }
}
