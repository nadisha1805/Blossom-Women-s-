import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultations.service.js';
import { ConsultationsController } from './consultations.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
  exports: [ConsultationsService],
})
export class ConsultationsModule {}

