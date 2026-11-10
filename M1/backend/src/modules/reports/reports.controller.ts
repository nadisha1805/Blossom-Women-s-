import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@prisma/client';

@ApiTags('Clinic Reports & Dashboards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('admin-metrics')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Admin overview metrics (patients, today schedule, pending requests, revenue)' })
  getAdminMetrics() {
    return this.reportsService.getAdminDashboardMetrics();
  }

  @Get('doctor-metrics')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Doctor specific dashboard metrics & assigned appointments' })
  getMyDoctorMetrics(@CurrentUser('doctorId') doctorId: string) {
    return this.reportsService.getDoctorDashboardMetrics(doctorId);
  }

  @Get('doctor-metrics/:doctorId')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN)
  @ApiOperation({ summary: 'Admin inspection of specific doctor dashboard metrics' })
  getDoctorMetrics(@Param('doctorId') doctorId: string) {
    return this.reportsService.getDoctorDashboardMetrics(doctorId);
  }
}

