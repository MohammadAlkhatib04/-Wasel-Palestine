import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ModerationEntityType {
  REPORT = 'report',
  INCIDENT = 'incident',
}

export enum ModerationAction {
  APPROVE = 'approve',
  REJECT = 'reject',
  VERIFY = 'verify',
  CLOSE = 'close',
  UPDATE = 'update',
}

@Entity('moderation_logs')
export class ModerationLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: ModerationEntityType,
  })
  entity_type!: ModerationEntityType;

  @Column()
  entity_id!: number;

  @Column()
  moderator_id!: number;

  @Column({
    type: 'enum',
    enum: ModerationAction,
  })
  action!: ModerationAction;

  @Column({ nullable: true })
  notes!: string;

  @CreateDateColumn()
  created_at!: Date;
}