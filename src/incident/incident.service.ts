import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchIncidentDto } from './dto/search-incident.dto';
import { Incident } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { UserService } from 'src/user/user.service';
import { JWTPayloadType } from 'src/utils/types';
import { Checkpoint } from 'src/checkpoint/entities/checkpoint.entity';
import { IncidentStatus } from './enums/incident-status.enum';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,

    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,

    private readonly userService: UserService,
  ) {}

  async create(
    createIncidentDto: CreateIncidentDto,
    userPayload: JWTPayloadType,
  ) {
    const user = await this.userService.getCurrentUser(userPayload.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let checkpoint: Checkpoint | null = null;

    if (createIncidentDto.checkpointId !== undefined) {
      checkpoint = await this.checkpointRepository.findOne({
        where: { id: createIncidentDto.checkpointId },
      });

      if (!checkpoint) {
        throw new NotFoundException(
          `Checkpoint with id ${createIncidentDto.checkpointId} not found`,
        );
      }
    }

    const incident = this.incidentRepository.create({
      title: createIncidentDto.title,
      description: createIncidentDto.description,
      type: createIncidentDto.type,
      severity: createIncidentDto.severity,
      latitude: createIncidentDto.latitude,
      longitude: createIncidentDto.longitude,
      createdBy: user,
      checkpoint: checkpoint ?? undefined,
    });

    const savedIncident = await this.incidentRepository.save(incident);

    return {
      message: 'Incident created successfully',
      data: savedIncident,
    };
  }

  // async findAll() {
  //   return this.incidentRepository.find({
  //     order: { createdAt: 'DESC' },
  //   });
  // }

  async findAll(searchDto: SearchIncidentDto) {
    const {
      type,
      severity,
      status,
      checkpointId,
      fromDate,
      toDate,
      page,
      limit,
      sortBy,
      sortOrder,
    } = searchDto;

    const query = this.incidentRepository.createQueryBuilder('incident');

    // 🔵 Relations (optional)
    query.leftJoinAndSelect('incident.createdBy', 'createdBy');
    query.leftJoinAndSelect('incident.checkpoint', 'checkpoint');

    // 🔵 Filtering

    if (type) {
      query.andWhere('incident.type = :type', { type });
    }

    if (severity) {
      query.andWhere('incident.severity = :severity', { severity });
    }

    if (status) {
      query.andWhere('incident.status = :status', { status });
    }

    if (checkpointId) {
      query.andWhere('checkpoint.id = :checkpointId', { checkpointId });
    }

    if (fromDate) {
      query.andWhere('incident.createdAt >= :fromDate', { fromDate });
    }

    if (toDate) {
      query.andWhere('incident.createdAt <= :toDate', { toDate });
    }

    query.orderBy(`incident.${sortBy}`, sortOrder);

    const skip = (page - 1) * limit;

    query.skip(skip).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      message:
        total === 0 ? 'No incidents found' : 'Incidents fetched successfully',
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const incident = await this.incidentRepository.findOne({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    return incident;
  }

  async update(id: number, updateIncidentDto: UpdateIncidentDto) {
    const incident = await this.incidentRepository.findOne({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    if (updateIncidentDto.title !== undefined) {
      incident.title = updateIncidentDto.title;
    }
    if (updateIncidentDto.description !== undefined) {
      incident.description = updateIncidentDto.description;
    }
    if (updateIncidentDto.type !== undefined) {
      incident.type = updateIncidentDto.type;
    }
    if (updateIncidentDto.severity !== undefined) {
      incident.severity = updateIncidentDto.severity;
    }
    if (updateIncidentDto.latitude !== undefined) {
      incident.latitude = updateIncidentDto.latitude;
    }
    if (updateIncidentDto.longitude !== undefined) {
      incident.longitude = updateIncidentDto.longitude;
    }

    if (updateIncidentDto.checkpointId !== undefined) {
      const checkpoint = await this.checkpointRepository.findOne({
        where: { id: updateIncidentDto.checkpointId },
      });

      if (!checkpoint) {
        throw new NotFoundException(
          `Checkpoint with id ${updateIncidentDto.checkpointId} not found`,
        );
      }

      incident.checkpoint = checkpoint;
    }

    const updatedIncident = await this.incidentRepository.save(incident);

    return {
      message: 'Incident updated successfully',
      data: updatedIncident,
    };
  }

  async verifyIncident(id: number, userPayload: JWTPayloadType) {
    const user = await this.userService.getCurrentUser(userPayload.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const incident = await this.incidentRepository.findOne({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    if (incident.status === IncidentStatus.VERIFIED) {
      throw new BadRequestException('Incident is already verified');
    }

    if (incident.status === IncidentStatus.CLOSED) {
      throw new BadRequestException('Closed incident cannot be verified');
    }

    incident.status = IncidentStatus.VERIFIED;
    incident.verifiedBy = user;
    incident.verifiedAt = new Date();

    const updatedIncident = await this.incidentRepository.save(incident);

    return {
      message: 'Incident verified successfully',
      data: updatedIncident,
    };
  }

  async closeIncident(id: number, userPayload: JWTPayloadType) {
    const user = await this.userService.getCurrentUser(userPayload.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const incident = await this.incidentRepository.findOne({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with id ${id} not found`);
    }

    if (incident.status === IncidentStatus.CLOSED) {
      throw new BadRequestException('Incident is already closed');
    }

    incident.status = IncidentStatus.CLOSED;
    incident.closedBy = user;
    incident.closedAt = new Date();

    const updatedIncident = await this.incidentRepository.save(incident);

    return {
      message: 'Incident closed successfully',
      data: updatedIncident,
    };
  }
}
