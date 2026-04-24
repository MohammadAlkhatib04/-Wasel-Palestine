import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RouteCacheController } from './route-cache.controller';
import { RouteCacheService } from './route-cache.service';
import { RouteCache } from './entities/route-cache.entity';
import { UserModule } from 'src/user/user.module';
import { AuthRolesGuard } from 'src/auth/guards/auth-roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([RouteCache]), UserModule, ConfigModule],
  controllers: [RouteCacheController],
  providers: [RouteCacheService, AuthRolesGuard],
  exports: [RouteCacheService],
})
export class RouteCacheModule {}
