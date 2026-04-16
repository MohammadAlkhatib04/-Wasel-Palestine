import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { ReportVote } from './report-vote.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.reports, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  user_id!: number;

  @Column()
  category!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'decimal', nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', nullable: true })
  longitude?: number;

  @Column({ default: 'pending' })
  status!: string;

  @Column({ type: 'int', default: 0 })
  confidence_score!: number;

  @ManyToOne(() => Report, { nullable: true })
  @JoinColumn({ name: 'duplicate_of_id' })
  duplicate_of?: Report;

  @Column({ nullable: true })
  duplicate_of_id?: number;

  @OneToMany(() => ReportVote, (vote) => vote.report)
  votes?: ReportVote[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}