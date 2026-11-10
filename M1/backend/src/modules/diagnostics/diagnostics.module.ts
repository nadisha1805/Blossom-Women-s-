import { Module } from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service.js';
import { DiagnosticsController } from './diagnostics.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [DiagnosticsController],
  providers: [DiagnosticsService],
  exports: [DiagnosticsService],
})
export class DiagnosticsModule {}

