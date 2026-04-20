import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WeatherCacheService } from './weather-cache.service';
import { CreateWeatherCacheDto } from './dto/create-weather-cache.dto';
import { UpdateWeatherCacheDto } from './dto/update-weather-cache.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';
import { UserType } from 'src/utils/user.type';

@Controller('weather-cache')
@Roles(UserType.ADMIN, UserType.MODERATOR)
@UseGuards(AuthRolesGuard)
export class WeatherCacheController {
  constructor(private readonly weatherCacheService: WeatherCacheService) {}

  @Post()
  create(@Body() createWeatherCacheDto: CreateWeatherCacheDto) {
    return this.weatherCacheService.create(createWeatherCacheDto);
  }

  @Get()
  findAll() {
    return this.weatherCacheService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWeatherCacheDto: UpdateWeatherCacheDto,
  ) {
    return this.weatherCacheService.update(id, updateWeatherCacheDto);
  }
}
