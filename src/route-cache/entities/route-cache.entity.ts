import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('route_cache')
@Index(['origin_hash', 'destination_hash', 'constraints_hash'], { unique: true })
export class RouteCache {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  origin_hash!: string;

  @Column()
  destination_hash!: string;

  @Column()
  constraints_hash!: string;

  @Column({ type: 'jsonb' })
  route_data!: Record<string, any>;

  @CreateDateColumn()
  cached_at!: Date;

  @Column({ type: 'timestamp' })
  expires_at!: Date;
}
