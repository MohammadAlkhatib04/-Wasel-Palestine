import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteCacheController } from './route-cache.controller';
import { RouteCacheService } from './route-cache.service';
import { RouteCache } from './entities/route-cache.entity';
import { UserModule } from 'src/user/user.module';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([RouteCache]), UserModule],
  controllers: [RouteCacheController],
  providers: [RouteCacheService, AuthRolesGuard],
})
export class RouteCacheModule {}
