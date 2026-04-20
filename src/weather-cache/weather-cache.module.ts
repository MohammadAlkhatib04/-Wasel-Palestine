import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherCacheController } from './weather-cache.controller';
import { WeatherCacheService } from './weather-cache.service';
import { WeatherCache } from './entities/weather-cache.entity';
import { UserModule } from 'src/user/user.module';
import { AuthRolesGuard } from 'src/auth/guards/auth-roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherCache]), UserModule],
  controllers: [WeatherCacheController],
  providers: [WeatherCacheService, AuthRolesGuard],
})
export class WeatherCacheModule {}
