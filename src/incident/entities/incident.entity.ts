import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { User } from 'src/user/entities/user.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IncidentType } from '../enums/incident-type.enum';
import { IncidentSeverity } from '../enums/incident-severity.enum';
import { IncidentStatus } from '../enums/incident-status.enum';

@Entity('incidents')
export class Incident {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 150 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'enum', enum: IncidentType })
  type!: IncidentType;

  @Column({ type: 'enum', enum: IncidentSeverity })
  severity!: IncidentSeverity;

  @Column({
    type: 'enum',
    enum: IncidentStatus,
    default: IncidentStatus.OPEN,
  })
  status!: IncidentStatus;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitude!: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitude!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  verifiedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  closedAt?: Date;

  @ManyToOne(() => User, (user) => user.createdIncidents, {
    eager: true,
    nullable: false,
  })
  createdBy!: User;

  @ManyToOne(() => User, (user) => user.verifiedIncidents, {
    eager: true,
    nullable: true,
  })
  verifiedBy?: User | null;

  @ManyToOne(() => User, (user) => user.closedIncidents, {
    eager: true,
    nullable: true,
  })
  closedBy?: User | null;

  @ManyToOne(() => Checkpoint, (checkpoint) => checkpoint.incidents, {
    nullable: true,
  })
  checkpoint?: Checkpoint;
}
