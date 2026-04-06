import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { CheckpointStatus } from 'src/checkpoint/enums/checkpoint-status.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('checkpoint_status_history')
export class CheckpointStatusHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: CheckpointStatus, nullable: true })
  previousStatus?: CheckpointStatus;

  @Column({ type: 'enum', enum: CheckpointStatus })
  newStatus!: CheckpointStatus;

  @CreateDateColumn()
  changedAt!: Date;

  @ManyToOne(() => Checkpoint, (checkpoint) => checkpoint.statusHistory, {
    onDelete: 'CASCADE',
  })
  checkpoint!: Checkpoint;

  @ManyToOne(() => User, (user) => user.checkpointStatusHistories, {
    eager: true,
    nullable: false,
  })
  changedBy!: User;
}
