import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CheckpointController } from './checkpoint.controller';
import { Checkpoint } from './entities/checkpoint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckpointSearchContext } from './context/checkpoint-search.context';
import { SearchByCityStatusStrategy } from './strategies/search-by-city-status.strategy';
import { SearchByCityStrategy } from './strategies/search-by-city.strategy';
import { SearchByNameStrategy } from './strategies/search-by-name.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CheckpointController],
  providers: [
    CheckpointService,
    CheckpointSearchContext,
    SearchByCityStrategy,
    SearchByNameStrategy,
    SearchByCityStatusStrategy,
  ],
  imports: [TypeOrmModule.forFeature([Checkpoint]), UserModule],
})
export class CheckpointModule {}
