import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DELIVERY_FEE = 'deliveryFee';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getDeliveryFee(): Promise<number> {
    const row = await this.prisma.setting.findUnique({ where: { key: DELIVERY_FEE } });
    return row ? parseFloat(row.value) || 0 : 0;
  }

  async getAll() {
    return { deliveryFee: await this.getDeliveryFee() };
  }

  async setDeliveryFee(fee: number) {
    const value = String(Math.max(0, Number(fee) || 0));
    await this.prisma.setting.upsert({
      where: { key: DELIVERY_FEE },
      update: { value },
      create: { key: DELIVERY_FEE, value },
    });
    return { deliveryFee: Number(value) };
  }
}
