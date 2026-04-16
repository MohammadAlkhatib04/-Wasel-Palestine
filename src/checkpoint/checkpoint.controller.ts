import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { SearchCheckpointDto } from './dto/search-checkpoint.dto';
import { FindCheckpointDto } from './dto/find-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';
import { UserType } from 'src/utils/user.type';

@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}
  @Post()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  create(@Req() req, @Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.createCheckpoint(
      createCheckpointDto,
      req.user,
    );
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.CITIZEN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findAll() {
    return this.checkpointService.getAllCheckpoint();
  }

  @Get('search')
  @Roles(UserType.ADMIN, UserType.CITIZEN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  search(@Query() query: SearchCheckpointDto) {
    return this.checkpointService.searchCheckpoint(query);
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.CITIZEN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findOne(@Param('name') name: string) {
    return this.checkpointService.findOne(name);
  }

  // @Patch()
  // @Roles(UserType.ADMIN)
  // @UseGuards(AuthRolesGuard)
  // update(@Body() updateDto: UpdateCheckpointDto, @Param('id') id: number) {
  //   return this.checkpointService.update(+id, updateDto);
  // }
  @Delete()
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  remove(@Query() query: FindCheckpointDto) {
    return this.checkpointService.remove(query);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCheckpointDto,
    @Req() req,
  ) {
    return this.checkpointService.update(+id, updateDto, req.user);
  }
}
