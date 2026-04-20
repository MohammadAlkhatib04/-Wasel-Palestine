import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { Roles } from 'src/user/decorator/user-role.decorator';
import { AuthRolesGuard } from 'src/user/guards/auth-roles.guard';
import { UserType } from 'src/utils/user.type';
import { SearchIncidentDto } from './dto/search-incident.dto';

@Controller('incident')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  create(@Body() createIncidentDto: CreateIncidentDto, @Req() req) {
    return this.incidentService.create(createIncidentDto, req.user);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findAll(@Query() query: SearchIncidentDto) {
    return this.incidentService.findAll(query);
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incidentService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentService.update(id, updateIncidentDto);
  }

  @Patch(':id/verify')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  verifyIncident(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.incidentService.verifyIncident(id, req.user);
  }

  @Patch(':id/close')
  @Roles(UserType.ADMIN, UserType.MODERATOR)
  @UseGuards(AuthRolesGuard)
  closeIncident(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.incidentService.closeIncident(id, req.user);
  }
}
