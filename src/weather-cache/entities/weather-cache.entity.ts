import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('weather_cache')
@Index(['latitude', 'longitude'])
export class WeatherCache {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude!: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude!: number;

  @Column({ type: 'jsonb' })
  weather_data!: Record<string, any>;

  @CreateDateColumn()
  cached_at!: Date;

  @Column({ type: 'timestamp' })
  expires_at!: Date;
}
