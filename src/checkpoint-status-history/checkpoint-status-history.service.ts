import { Injectable } from '@nestjs/common';
import { CreateCheckpointStatusHistoryDto } from './dto/create-checkpoint-status-history.dto';
import { UpdateCheckpointStatusHistoryDto } from './dto/update-checkpoint-status-history.dto';

@Injectable()
export class CheckpointStatusHistoryService {
  create(createCheckpointStatusHistoryDto: CreateCheckpointStatusHistoryDto) {
    return 'This action adds a new checkpointStatusHistory';
  }

  findAll() {
    return `This action returns all checkpointStatusHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkpointStatusHistory`;
  }

  update(id: number, updateCheckpointStatusHistoryDto: UpdateCheckpointStatusHistoryDto) {
    return `This action updates a #${id} checkpointStatusHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkpointStatusHistory`;
  }
}
