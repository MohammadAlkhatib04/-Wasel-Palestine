import { IsEnum, IsInt, Min } from 'class-validator';
import { VoteType } from '../entities/report-vote.entity';

export class CreateReportVoteDto {
  @IsInt()
  @Min(1)
  report_id!: number;

  @IsInt()
  @Min(1)
  user_id!: number;

  @IsEnum(VoteType)
  vote_type!: VoteType;
}