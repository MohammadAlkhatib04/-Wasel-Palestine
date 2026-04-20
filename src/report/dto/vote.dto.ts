import { IsIn } from 'class-validator';

export class VoteDto {
  @IsIn(['up', 'down'])
  vote_type!: 'up' | 'down';
}
