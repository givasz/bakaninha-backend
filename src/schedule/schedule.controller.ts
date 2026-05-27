import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('schedule')
export class ScheduleController {
  constructor(private service: ScheduleService) {}

  @Get()          getAll()  { return this.service.getAll(); }
  @Get('status')  isOpen()  { return this.service.isOpen(); }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) { return this.service.update(+id, body); }
}
