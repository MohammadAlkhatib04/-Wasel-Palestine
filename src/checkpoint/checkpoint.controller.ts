import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  create(@Body() createCheckpointDto: CreateCheckpointDto) {
    return this.checkpointService.createCheckpoint(createCheckpointDto);
  }

  @Get()
  findAll() {
    return this.checkpointService.getAllCheckpoint();
  }

  @Get(':id')
  findOne(@Param('name') name: string) {
    return this.checkpointService.findOne(name);
  }

  // @Patch(':name')
  // update(
  //   @Param('name') name: string,
  //   @Body() updateCheckpointDto: UpdateCheckpointDto,
  // ) {
  //   return this.checkpointService.update(name, updateCheckpointDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkpointService.remove(+id);
  }
}
