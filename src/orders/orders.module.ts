import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
