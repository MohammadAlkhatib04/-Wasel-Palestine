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
import { JWTPayloadType } from 'src/utils/types';
import { UserService } from 'src/user/user.service';
import { CheckpointStatusHistory } from 'src/checkpoint-status-history/entities/checkpoint-status-history.entity';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,
    private context: CheckpointSearchContext,
    private searchByCity: SearchByCityStrategy,
    private searchByName: SearchByNameStrategy,
    private searchByCityStatus: SearchByCityStatusStrategy,
    private userService: UserService,
    @InjectRepository(CheckpointStatusHistory)
    private readonly historyRepository: Repository<CheckpointStatusHistory>,
  ) {}
  public async createCheckpoint(
    createCheckpointDto: CreateCheckpointDto,
    userPayLoad: JWTPayloadType,
  ) {
    const user = await this.userService.getCurrentUser(userPayLoad.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const checkpoint = this.checkpointRepository.create({
      ...createCheckpointDto,
      createdBy: user,
    });

    return this.checkpointRepository.save(checkpoint);
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

  //   public async update(
  // p0: number, findDto: FindCheckpointDto, updateDto: UpdateCheckpointDto,
  //   ) {
  //     const { id, name } = findDto;

  //     if (!id && !name) {
  //       throw new BadRequestException('You must provide id or name');
  //     }

  //     const checkpoint = await this.checkpointRepository.findOne({
  //       where: id ? { id } : { name },
  //     });

  //     if (!checkpoint) {
  //       throw new NotFoundException('Checkpoint not found');
  //     }

  //     Object.assign(checkpoint, updateDto);

  //     return this.checkpointRepository.save(checkpoint);
  //   }

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
  public async update(
    id: number,
    updateDto: UpdateCheckpointDto,
    userPayLoad: JWTPayloadType,
  ) {
    const user = await this.userService.getCurrentUser(userPayLoad.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.checkpointRepository.manager.transaction(async (manager) => {
      const checkpointRepo = manager.getRepository(Checkpoint);
      const historyRepo = manager.getRepository(CheckpointStatusHistory);

      const checkpoint = await checkpointRepo.findOne({
        where: { id },
      });

      if (!checkpoint) {
        throw new NotFoundException(`Checkpoint with id ${id} not found`);
      }

      const previousStatus = checkpoint.status;
      const statusChanged =
        updateDto.status !== undefined &&
        updateDto.status !== checkpoint.status;

      if (updateDto.name !== undefined) checkpoint.name = updateDto.name;
      if (updateDto.city !== undefined) checkpoint.city = updateDto.city;
      if (updateDto.latitude !== undefined)
        checkpoint.latitude = updateDto.latitude;
      if (updateDto.longitude !== undefined)
        checkpoint.longitude = updateDto.longitude;
      if (updateDto.status !== undefined) checkpoint.status = updateDto.status;

      const updatedCheckpoint = await checkpointRepo.save(checkpoint);

      if (statusChanged) {
        const history = historyRepo.create({
          previousStatus,
          newStatus: updatedCheckpoint.status,
          checkpoint: updatedCheckpoint,
          changedBy: user,
        });

        await historyRepo.save(history);
      }

      return {
        message: 'Checkpoint updated successfully',
        data: updatedCheckpoint,
      };
    });
  }
}
