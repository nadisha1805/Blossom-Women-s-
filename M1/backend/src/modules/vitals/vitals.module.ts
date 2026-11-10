import { Module } from '@nestjs/common';
import { VitalsService } from './vitals.service.js';
import { VitalsController } from './vitals.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [VitalsController],
  providers: [VitalsService],
  exports: [VitalsService],
})
export class VitalsModule {}

