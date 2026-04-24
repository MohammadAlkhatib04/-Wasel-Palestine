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
import { RouteCacheService } from './route-cache.service';
import { CreateRouteCacheDto } from './dto/create-route-cache.dto';
import { UpdateRouteCacheDto } from './dto/update-route-cache.dto';
import { EstimateRouteDto } from './dto/estimate-route.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/auth/guards/auth-roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserType } from 'src/utils/user.type';

@Controller('route-cache')
export class RouteCacheController {
  constructor(private readonly routeCacheService: RouteCacheService) {}

  @UseGuards(JwtAuthGuard)
  @Get('estimate')
  estimate(@Query() estimateRouteDto: EstimateRouteDto) {
    return this.routeCacheService.estimateRoute(estimateRouteDto);
  }

  @Post()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  create(@Body() createRouteCacheDto: CreateRouteCacheDto) {
    return this.routeCacheService.create(createRouteCacheDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findAll() {
    return this.routeCacheService.findAll();
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRouteCacheDto: UpdateRouteCacheDto,
  ) {
    return this.routeCacheService.update(id, updateRouteCacheDto);
  }
}
