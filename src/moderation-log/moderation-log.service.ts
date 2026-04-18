import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModerationLog } from './entities/moderation-log.entity';
import { CreateModerationLogDto } from './dto/create-moderation-log.dto';

@Injectable()
export class ModerationLogService {
  constructor(
    @InjectRepository(ModerationLog)
    private readonly moderationLogRepository: Repository<ModerationLog>,
  ) {}

  async create(createModerationLogDto: CreateModerationLogDto) {
    const log = this.moderationLogRepository.create({
      entity_type: createModerationLogDto.entity_type,
      entity_id: createModerationLogDto.entity_id,
      moderator_id: createModerationLogDto.moderator_id,
      action: createModerationLogDto.action,
      notes: createModerationLogDto.notes,
    });

    return await this.moderationLogRepository.save(log);
  }

  async findAll() {
    return await this.moderationLogRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }
}