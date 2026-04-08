import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @Column()
  category: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', nullable: true })
  latitude: number;

  @Column({ type: 'decimal', nullable: true })
  longitude: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'int', default: 0 })
  confidence_score: number;

  @Column({ nullable: true })
duplicate_of_id?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}