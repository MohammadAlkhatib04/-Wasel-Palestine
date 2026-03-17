import { Injectable } from '@nestjs/common';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { Repository } from 'typeorm';
import { Checkpoint } from './entities/checkpoint.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,
  ) {}
  public async createCheckpoint(createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointRepository.save(createCheckpointDto);
  }

  public async getAllCheckpoint() {
    return this.checkpointRepository.find();
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
