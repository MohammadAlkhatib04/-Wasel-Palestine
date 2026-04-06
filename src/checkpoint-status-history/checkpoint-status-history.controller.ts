import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckpointStatusHistoryService } from './checkpoint-status-history.service';
import { CreateCheckpointStatusHistoryDto } from './dto/create-checkpoint-status-history.dto';
import { UpdateCheckpointStatusHistoryDto } from './dto/update-checkpoint-status-history.dto';

@Controller('checkpoint-status-history')
export class CheckpointStatusHistoryController {
  constructor(private readonly checkpointStatusHistoryService: CheckpointStatusHistoryService) {}

  @Post()
  create(@Body() createCheckpointStatusHistoryDto: CreateCheckpointStatusHistoryDto) {
    return this.checkpointStatusHistoryService.create(createCheckpointStatusHistoryDto);
  }

  @Get()
  findAll() {
    return this.checkpointStatusHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkpointStatusHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckpointStatusHistoryDto: UpdateCheckpointStatusHistoryDto) {
    return this.checkpointStatusHistoryService.update(+id, updateCheckpointStatusHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkpointStatusHistoryService.remove(+id);
  }
}
