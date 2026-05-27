import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DAY_NAMES = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    let schedules = await this.prisma.schedule.findMany({ orderBy: { dayOfWeek: 'asc' } });
    if (schedules.length === 0) {
      await this.prisma.schedule.createMany({
        data: [0,1,2,3,4,5,6].map(day => ({
          dayOfWeek: day,
          open: day >= 1 && day <= 6,
          openTime: '11:00',
          closeTime: '22:00',
        })),
      });
      schedules = await this.prisma.schedule.findMany({ orderBy: { dayOfWeek: 'asc' } });
    }
    return schedules.map(s => ({ ...s, dayName: DAY_NAMES[s.dayOfWeek] }));
  }

  update(id: number, data: any) {
    return this.prisma.schedule.update({ where: { id }, data });
  }

  async isOpen(): Promise<{ open: boolean; message: string }> {
    const now = new Date();
    // Brasilia: UTC-3
    const brtOffset = -3 * 60;
    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    const brtTotalMinutes = ((utcMinutes + brtOffset) % (24 * 60) + 24 * 60) % (24 * 60);
    const brtHour = Math.floor(brtTotalMinutes / 60);
    const brtMinute = brtTotalMinutes % 60;
    const dayOfWeek = new Date(now.getTime() + brtOffset * 60000).getUTCDay();

    const schedule = await this.prisma.schedule.findUnique({ where: { dayOfWeek } });
    if (!schedule || !schedule.open) return { open: false, message: 'Restaurante fechado hoje.' };

    const [openH, openM]   = schedule.openTime.split(':').map(Number);
    const [closeH, closeM] = schedule.closeTime.split(':').map(Number);
    const current = brtHour * 60 + brtMinute;
    const open    = openH * 60 + openM;
    const close   = closeH * 60 + closeM;

    if (current >= open && current < close)
      return { open: true,  message: `Aberto até ${schedule.closeTime}` };

    return { open: false, message: current < open
      ? `Abrimos às ${schedule.openTime}`
      : `Fechado. Voltamos amanhã às ${schedule.openTime}` };
  }
}
