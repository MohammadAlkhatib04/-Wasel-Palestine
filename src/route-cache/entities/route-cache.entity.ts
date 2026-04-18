import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('route_cache')
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