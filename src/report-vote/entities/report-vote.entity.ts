import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum VoteType {
  CONFIRM = 'confirm',
  REJECT = 'reject',
}

@Entity('report_votes')
export class ReportVote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  report_id!: number;

  @Column()
  user_id!: number;

  @Column({
    type: 'enum',
    enum: VoteType,
  })
  vote_type!: VoteType;

  @CreateDateColumn()
  created_at!: Date;
}