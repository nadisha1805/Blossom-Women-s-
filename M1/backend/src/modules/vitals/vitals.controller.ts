import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VitalsService } from './vitals.service.js';
import { RecordVitalsDto } from './dto/record-vitals.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@prisma/client';

@ApiTags('Nursing & Patient Vitals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vitals')
export class VitalsController {
  constructor(private readonly vitalsService: VitalsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.NURSE, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Record patient vital signs (BP, pulse, temp, SpO2, BMI)' })
  recordVitals(@Body() dto: RecordVitalsDto, @CurrentUser('id') staffId: string) {
    return this.vitalsService.recordVitals(dto, staffId);
  }

  @Get('patient/:patientId')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.CLINIC_ADMIN,
    UserRole.DOCTOR,
    UserRole.NURSE,
  )
  @ApiOperation({ summary: 'Get vital history and observations for a patient' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.vitalsService.findByPatient(patientId);
  }
}

