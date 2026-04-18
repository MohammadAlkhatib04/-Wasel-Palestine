import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteCacheController } from './route-cache.controller';
import { RouteCacheService } from './route-cache.service';
import { RouteCache } from './entities/route-cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteCache])],
  controllers: [RouteCacheController],
  providers: [RouteCacheService],
})
export class RouteCacheModule {}