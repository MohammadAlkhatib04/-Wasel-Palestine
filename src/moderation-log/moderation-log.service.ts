import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ModerationLog,
  ModerationAction,
  ModerationEntityType,
} from './entities/moderation-log.entity';

@Injectable()
export class ModerationLogService {
  constructor(
    @InjectRepository(ModerationLog)
    private readonly moderationLogRepository: Repository<ModerationLog>,
  ) {}

  async create(data: {
    entity_type: ModerationEntityType;
    entity_id: number;
    moderator_id: number;
    action: ModerationAction;
    notes?: string;
  }) {
    const log = this.moderationLogRepository.create({
      entity_type: data.entity_type,
      entity_id: data.entity_id,
      moderator_id: data.moderator_id,
      action: data.action,
      notes: data.notes,
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