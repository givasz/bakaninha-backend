import { Module } from '@nestjs/common';
import { MarmitaService } from './marmita.service';
import { MarmitaController } from './marmita.controller';

@Module({
  providers: [MarmitaService],
  controllers: [MarmitaController],
})
export class MarmitaModule {}
