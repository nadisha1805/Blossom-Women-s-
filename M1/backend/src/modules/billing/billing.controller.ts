import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BillingService } from './billing.service.js';
import { CreateInvoiceDto, RecordPaymentDto } from './dto/billing.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole, InvoiceStatus } from '@prisma/client';

@ApiTags('Billing & Invoicing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('invoices')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.BILLING_STAFF, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Generate clinic invoice with line item calculation' })
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.billingService.createInvoice(dto);
  }

  @Post('payments')
  @Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.BILLING_STAFF, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Record payment transaction against an invoice (supports partial payments)' })
  recordPayment(
    @Body() dto: RecordPaymentDto,
    @CurrentUser('fullName') receivedByName: string,
  ) {
    return this.billingService.recordPayment(dto, receivedByName);
  }

  @Get('invoices')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.CLINIC_ADMIN,
    UserRole.BILLING_STAFF,
    UserRole.RECEPTIONIST,
  )
  @ApiOperation({ summary: 'List and filter invoices by status or patient' })
  @ApiQuery({ name: 'patientId', required: false })
  @ApiQuery({ name: 'status', required: false, enum: InvoiceStatus })
  findAll(
    @Query('patientId') patientId?: string,
    @Query('status') status?: InvoiceStatus,
  ) {
    return this.billingService.findAll({ patientId, status });
  }

  @Get('invoices/:id')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.CLINIC_ADMIN,
    UserRole.BILLING_STAFF,
    UserRole.RECEPTIONIST,
  )
  @ApiOperation({ summary: 'Get detailed invoice with items and payment history' })
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(id);
  }
}

