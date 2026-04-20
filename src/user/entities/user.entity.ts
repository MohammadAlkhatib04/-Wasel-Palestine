import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserType } from 'src/utils/user.type';
import { CURRENT_TIMESTAMP } from '../../utils/constants';
import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { CheckpointStatusHistory } from 'src/checkpoint-status-history/entities/checkpoint-status-history.entity';
import { Report } from '../../report/entities/report.entity';
import { AlertSubscription } from '../../alert-subscription/entities/alert-subscription.entity';
import { Incident } from 'src/incident/entities/incident.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  fullName!: string;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar', select: false })
  password?: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  phone!: string | null;

  @Column({ type: 'enum', enum: UserType, default: UserType.CITIZEN })
  userType!: UserType;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', nullable: true, select: false })
  refreshTokenHash?: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt!: Date;

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.createdBy)
  checkpoints?: Checkpoint[];

  @OneToMany(
    () => CheckpointStatusHistory,
    (checkpointStatusHistory) => checkpointStatusHistory.changedBy,
  )
  checkpointStatusHistories!: CheckpointStatusHistory[];

  @OneToMany(() => Report, (report) => report.user)
  reports?: Report[];

  @OneToMany(
    () => AlertSubscription,
    (alertSubscription) => alertSubscription.user,
  )
  alertSubscriptions!: AlertSubscription[];

  @OneToMany(() => Incident, (incident) => incident.createdBy)
  createdIncidents!: Incident[];

  @OneToMany(() => Incident, (incident) => incident.verifiedBy)
  verifiedIncidents!: Incident[];

  @OneToMany(() => Incident, (incident) => incident.closedBy)
  closedIncidents!: Incident[];
}
