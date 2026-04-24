import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WeatherCacheService } from './weather-cache.service';
import { CreateWeatherCacheDto } from './dto/create-weather-cache.dto';
import { UpdateWeatherCacheDto } from './dto/update-weather-cache.dto';
import { GetCurrentWeatherDto } from './dto/get-current-weather.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/auth/guards/auth-roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserType } from 'src/utils/user.type';

@Controller('weather-cache')
export class WeatherCacheController {
  constructor(private readonly weatherCacheService: WeatherCacheService) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  getCurrent(@Query() query: GetCurrentWeatherDto) {
    return this.weatherCacheService.getCurrentWeather(query);
  }

  @Post()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  create(@Body() createWeatherCacheDto: CreateWeatherCacheDto) {
    return this.weatherCacheService.create(createWeatherCacheDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findAll() {
    return this.weatherCacheService.findAll();
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWeatherCacheDto: UpdateWeatherCacheDto,
  ) {
    return this.weatherCacheService.update(id, updateWeatherCacheDto);
  }
}
