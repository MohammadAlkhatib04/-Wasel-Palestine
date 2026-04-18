import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum DeliveryStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

@Entity('alert_records')
export class AlertRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subscription_id!: number;

  @Column()
  incident_id!: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
  })
  delivery_status!: DeliveryStatus;

  @CreateDateColumn()
  triggered_at!: Date;
}