import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('weather_cache')
export class WeatherCache {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal')
  latitude!: number;

  @Column('decimal')
  longitude!: number;

  @Column({ type: 'jsonb' })
  weather_data!: Record<string, any>;

  @CreateDateColumn()
  cached_at!: Date;

  @Column({ type: 'timestamp' })
  expires_at!: Date;
}