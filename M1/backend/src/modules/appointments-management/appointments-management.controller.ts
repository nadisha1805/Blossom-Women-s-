import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AppointmentsManagementService } from './appointments-management.service.js';
import { CreateBookingDto, UpdateAppointmentStatusDto } from './dto/create-booking.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UserRole, AppointmentStatus } from '@prisma/client';

@ApiTags('Clinic Appointments Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments-management')
export class AppointmentsManagementController {
  constructor(private readonly apptMgmtService: AppointmentsManagementService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ summary: 'Book/Confirm a scheduled appointment with conflict checking' })
  createBooking(@Body() dto: CreateBookingDto) {
    return this.apptMgmtService.createBooking(dto);
  }

  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.CLINIC_ADMIN,
    UserRole.DOCTOR,
    UserRole.NURSE,
    UserRole.RECEPTIONIST,
    UserRole.BILLING_STAFF,
  )
  @ApiOperation({ summary: 'Query clinic appointments with filters' })
  @ApiQuery({ name: 'doctorId', required: false })
  @ApiQuery({ name: 'patientId', required: false })
  @ApiQuery({ name: 'date', required: false, example: '2026-11-20' })
  @ApiQuery({ name: 'status', required: false, enum: AppointmentStatus })
  @ApiQuery({ name: 'search', required: false })
  findAll(
    @Query('doctorId') doctorId?: string,
    @Query('patientId') patientId?: string,
    @Query('date') date?: string,
    @Query('status') status?: AppointmentStatus,
    @Query('search') search?: string,
  ) {
    return this.apptMgmtService.findAll({ doctorId, patientId, date, status, search });
  }

  @Get('requests/pending')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Get pending website appointment requests' })
  getPendingRequests() {
    return this.apptMgmtService.getPendingRequests();
  }

  @Get(':id')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.CLINIC_ADMIN,
    UserRole.DOCTOR,
    UserRole.NURSE,
    UserRole.RECEPTIONIST,
    UserRole.BILLING_STAFF,
  )
  @ApiOperation({ summary: 'Get single appointment details with related vitals & EMR' })
  findOne(@Param('id') id: string) {
    return this.apptMgmtService.findOne(id);
  }

  @Patch(':id/status')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST, UserRole.DOCTOR, UserRole.NURSE)
  @ApiOperation({ summary: 'Transition appointment status (CHECKED_IN, IN_CONSULTATION, COMPLETED, CANCELLED)' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateAppointmentStatusDto) {
    return this.apptMgmtService.updateStatus(id, dto);
  }
}

