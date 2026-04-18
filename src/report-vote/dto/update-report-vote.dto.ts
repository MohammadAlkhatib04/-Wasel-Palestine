import { PartialType } from '@nestjs/mapped-types';
import { CreateReportVoteDto } from './create-report-vote.dto';

export class UpdateReportVoteDto extends PartialType(CreateReportVoteDto) {}