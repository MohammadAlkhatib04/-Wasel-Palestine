import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RouteCacheService } from './route-cache.service';
import { CreateRouteCacheDto } from './dto/create-route-cache.dto';
import { UpdateRouteCacheDto } from './dto/update-route-cache.dto';

@Controller('api/v1/route-cache')
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
    @Param('id') id: string,
    @Body() updateRouteCacheDto: UpdateRouteCacheDto,
  ) {
    return this.routeCacheService.update(Number(id), updateRouteCacheDto);
  }
}