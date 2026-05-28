import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private service: SettingsService) {}

  @Get() getAll() { return this.service.getAll(); }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() body: { deliveryFee: number }) { return this.service.setDeliveryFee(body.deliveryFee); }
}
