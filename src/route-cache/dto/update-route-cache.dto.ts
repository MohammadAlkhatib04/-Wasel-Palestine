import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteCacheDto } from './create-route-cache.dto';

export class UpdateRouteCacheDto extends PartialType(CreateRouteCacheDto) {}