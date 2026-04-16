import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('alert_subscription')
export class AlertSubscription {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'bigint' })
  user_id!: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  center_latitude!: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  center_longitude!: number;

  @Column({ type: 'int' })
  radius_km!: number;

  @Column({ type: 'varchar', length: 100 })
  category!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;
}