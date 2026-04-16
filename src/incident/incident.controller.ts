import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { UserType } from 'src/utils/user.type';

@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentService.create(createIncidentDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findAll() {
    return this.incidentService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findOne(@Param('id') id: string) {
    return this.incidentService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  remove(@Param('id') id: string) {
    return this.incidentService.remove(+id);
  }
}
