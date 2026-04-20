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
import { RouteCacheService } from './route-cache.service';
import { CreateRouteCacheDto } from './dto/create-route-cache.dto';
import { UpdateRouteCacheDto } from './dto/update-route-cache.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';
import { UserType } from 'src/utils/user.type';

@Controller('route-cache')
@Roles(UserType.ADMIN, UserType.MODERATOR)
@UseGuards(AuthRolesGuard)
export class RouteCacheController {
  constructor(private readonly routeCacheService: RouteCacheService) {}

  @Post()
  create(@Body() createRouteCacheDto: CreateRouteCacheDto) {
    return this.routeCacheService.create(createRouteCacheDto);
  }

  @Get()
  findAll() {
    return this.routeCacheService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRouteCacheDto: UpdateRouteCacheDto,
  ) {
    return this.routeCacheService.update(id, updateRouteCacheDto);
  }
}
