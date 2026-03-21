import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CheckpointStatus } from '../enums/checkpoint-status.enum';
import { User } from 'src/user/entities/user.entity';

@Entity('checkpoints')
export class Checkpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0 })
  latitude?: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0 })
  longitude?: number;

  @Column({
    type: 'enum',
    enum: CheckpointStatus,
    default: CheckpointStatus.OPEN,
  })
  status: CheckpointStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.checkpoints, { eager: true })
  createdBy: User;
}
