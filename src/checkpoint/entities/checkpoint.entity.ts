import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('checkpoints')
export class Checkpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0 })
  latitude?: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0 })
  longitude?: number;

  @Column({
    type: 'enum',
    enum: ['open', 'closed', 'restricted'],
    default: 'open',
  })
  status: 'open' | 'closed' | 'restricted';

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
