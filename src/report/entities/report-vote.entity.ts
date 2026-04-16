import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
  Unique,
} from 'typeorm';

import { Report } from './report.entity';
import { User } from '../../user/entities/user.entity';

@Entity('report_vote')
@Unique(['report_id', 'user_id'])
export class ReportVote {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Report, (report) => report.votes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @Column()
  report_id!: number;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  user_id!: number;

  @Column()
  vote_type!: 'up' | 'down';

  @CreateDateColumn()
  created_at!: Date;
}