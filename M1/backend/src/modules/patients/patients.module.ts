import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service.js';
import { PatientsController } from './patients.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}

