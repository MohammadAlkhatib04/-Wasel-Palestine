import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AlertSubscriptionService } from './alert-subscription.service';
import { CreateAlertSubscriptionDto } from './dto/create-alert-subscription.dto';
import { UpdateAlertSubscriptionDto } from './dto/update-alert-subscription.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../user/decorator/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('alert-subscriptions')
export class AlertSubscriptionController {
  constructor(
    private readonly alertSubscriptionService: AlertSubscriptionService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateAlertSubscriptionDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.alertSubscriptionService.create(dto, userId);
  }

  @Get('my')
  findMySubscriptions(@CurrentUser('id') userId: number) {
    return this.alertSubscriptionService.findMySubscriptions(userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.alertSubscriptionService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAlertSubscriptionDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.alertSubscriptionService.update(id, dto, userId);
  }

  @Patch(':id/toggle')
  toggle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.alertSubscriptionService.toggle(id, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.alertSubscriptionService.remove(id, userId);
  }
}