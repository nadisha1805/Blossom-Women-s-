import { Controller, Post, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service.js';
import { SaveConsultationDto, AmendConsultationDto } from './dto/consultation.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@prisma/client';

@ApiTags('Doctor Consultations & EMR')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Save draft or sign/finalize clinical consultation' })
  saveConsultation(@Body() dto: SaveConsultationDto, @CurrentUser('id') staffId: string) {
    return this.consultationsService.saveConsultation(dto, staffId);
  }

  @Put(':id/amend')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Amend signed clinical consultation (maintains immutable audit trail)' })
  amendConsultation(
    @Param('id') id: string,
    @Body() dto: AmendConsultationDto,
    @CurrentUser('id') staffId: string,
  ) {
    return this.consultationsService.amendConsultation(id, dto, staffId);
  }

  @Get('appointment/:appointmentId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ summary: 'Get consultation details by appointment' })
  findByAppointment(@Param('appointmentId') appointmentId: string) {
    return this.consultationsService.findByAppointment(appointmentId);
  }

  @Get('patient/:patientId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ summary: 'Get consultation history for a patient' })
  findByPatient(@Param('patientId') patientId: string) {
    return this.consultationsService.findByPatient(patientId);
  }
}

