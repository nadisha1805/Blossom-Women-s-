import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DiagnosticsService } from './diagnostics.service.js';
import { CreateDiagnosticOrderDto, UpdateDiagnosticOrderDto } from './dto/diagnostic-order.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole, DiagnosticStatus } from '@prisma/client';

@ApiTags('Diagnostics & Laboratory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Create diagnostic order (lab/imaging/pathology)' })
  createOrder(@Body() dto: CreateDiagnosticOrderDto) {
    return this.diagnosticsService.createOrder(dto);
  }

  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.CLINIC_ADMIN,
    UserRole.DOCTOR,
    UserRole.NURSE,
    UserRole.LAB_STAFF,
  )
  @ApiOperation({ summary: 'List and filter laboratory diagnostic orders' })
  @ApiQuery({ name: 'status', required: false, enum: DiagnosticStatus })
  @ApiQuery({ name: 'patientId', required: false })
  findAll(
    @Query('status') status?: DiagnosticStatus,
    @Query('patientId') patientId?: string,
  ) {
    return this.diagnosticsService.findAll({ status, patientId });
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.LAB_STAFF, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Update diagnostic status, sample collection, notes or review' })
  updateOrder(
    @Param('id') id: string,
    @Body() dto: UpdateDiagnosticOrderDto,
    @CurrentUser('id') staffUserId: string,
  ) {
    return this.diagnosticsService.updateOrder(id, dto, staffUserId);
  }
}

