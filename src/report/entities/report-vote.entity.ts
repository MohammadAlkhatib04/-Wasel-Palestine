import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

import { Report } from './report.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class ReportVote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Report)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @Column()
  report_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;
}