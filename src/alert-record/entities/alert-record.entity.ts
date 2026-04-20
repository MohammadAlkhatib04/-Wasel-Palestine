import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AlertSubscription } from '../../alert-subscription/entities/alert-subscription.entity';
import { Incident } from '../../incident/entities/incident.entity';

export enum DeliveryStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

@Entity('alert_records')
export class AlertRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => AlertSubscription, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscription_id' })
  subscription!: AlertSubscription;

  @Column()
  subscription_id!: number;

  @ManyToOne(() => Incident, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'incident_id' })
  incident!: Incident;

  @Column()
  incident_id!: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  delivery_status!: DeliveryStatus;

  @CreateDateColumn()
  triggered_at!: Date;
}
