import { Module } from '@nestjs/common';
import { PatientPortalController } from './patient-portal.controller.js';
import { PatientPortalService } from './patient-portal.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PatientPortalController],
  providers: [PatientPortalService],
  exports: [PatientPortalService],
})
export class PatientPortalModule {}

