import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { SearchCheckpointDto } from './dto/search-checkpoint.dto';
import { FindCheckpointDto } from './dto/find-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';

@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}
  // @Get()
  // @Roles(UserType.ADMIN, UserType.CITIZEN)
  // @UseGuards(AuthRolesGuard)
  @Post()
  create(
    @Body() createCheckpointDto: CreateCheckpointDto,
    @CurrentUser() user: JWTPayloadType,
  ) {
    return this.checkpointService.createCheckpoint(
      user.id,
      createCheckpointDto,
    );
  }

  @Get()
  findAll() {
    return this.checkpointService.getAllCheckpoint();
  }

  @Get('search')
  search(@Query() query: SearchCheckpointDto) {
    return this.checkpointService.searchCheckpoint(query);
  }

  @Get(':id')
  findOne(@Param('name') name: string) {
    return this.checkpointService.findOne(name);
  }

  @Patch() update(
    @Body() updateDto: UpdateCheckpointDto,
    @Query() findDto: FindCheckpointDto,
  ) {
    return this.checkpointService.update(findDto, updateDto);
  }

  @Delete()
  remove(@Query() query: FindCheckpointDto) {
    return this.checkpointService.remove(query);
  }
}
