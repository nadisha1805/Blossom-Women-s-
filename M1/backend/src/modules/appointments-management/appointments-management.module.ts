import { Module } from '@nestjs/common';
import { AppointmentsManagementService } from './appointments-management.service.js';
import { AppointmentsManagementController } from './appointments-management.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentsManagementController],
  providers: [AppointmentsManagementService],
  exports: [AppointmentsManagementService],
})
export class AppointmentsManagementModule {}

