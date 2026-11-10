import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PatientPortalService } from './patient-portal.service.js';
import {
  PatientBookAppointmentDto,
  CreateSupportRequestDto,
  CreatePaymentOrderDto,
  VerifyPaymentDto,
} from './dto/patient-portal.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Patient Portal')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patient-portal')
export class PatientPortalController {
  constructor(private readonly patientPortalService: PatientPortalService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get personalized patient dashboard metrics and records' })
  getDashboard(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getDashboard(accountId);
  }

  @Get('appointments')
  @ApiOperation({ summary: 'Get patient appointment history and upcoming bookings' })
  getAppointments(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getAppointments(accountId);
  }

  @Post('appointments/request')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit an online appointment booking request' })
  bookAppointment(
    @CurrentUser('id') accountId: string,
    @Body() dto: PatientBookAppointmentDto,
  ) {
    return this.patientPortalService.bookAppointment(accountId, dto);
  }

  @Patch('appointments/:id/cancel')
  @ApiOperation({ summary: 'Cancel an upcoming appointment with reason' })
  cancelAppointment(
    @CurrentUser('id') accountId: string,
    @Param('id') appointmentId: string,
    @Body('reason') reason?: string,
  ) {
    return this.patientPortalService.cancelAppointment(accountId, appointmentId, reason);
  }

  @Get('consultations')
  @ApiOperation({ summary: 'Get released clinical consultation summaries and doctor notes' })
  getConsultations(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getConsultations(accountId);
  }

  @Get('prescriptions')
  @ApiOperation({ summary: 'Get released digital prescriptions and medication orders' })
  getPrescriptions(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getPrescriptions(accountId);
  }

  @Get('reports')
  @ApiOperation({ summary: 'Get released diagnostic tests and laboratory results' })
  getDiagnosticReports(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getDiagnosticReports(accountId);
  }

  @Get('invoices')
  @ApiOperation({ summary: 'Get patient billing statements, invoices, and payments' })
  getInvoices(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getInvoices(accountId);
  }

  @Post('payments/create-order')
  @ApiOperation({ summary: 'Create a secure payment gateway order for an invoice' })
  createPaymentOrder(
    @CurrentUser('id') accountId: string,
    @Body() dto: CreatePaymentOrderDto,
  ) {
    return this.patientPortalService.createPaymentOrder(accountId, dto);
  }

  @Post('payments/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify cryptographic gateway signature and credit payment' })
  verifyPayment(
    @CurrentUser('id') accountId: string,
    @Body() dto: VerifyPaymentDto,
  ) {
    return this.patientPortalService.verifyPayment(accountId, dto);
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Get patient notifications and clinic alerts' })
  getNotifications(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getNotifications(accountId);
  }

  @Patch('notifications/:id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  markNotificationRead(
    @CurrentUser('id') accountId: string,
    @Param('id') notificationId: string,
  ) {
    return this.patientPortalService.markNotificationRead(accountId, notificationId);
  }

  @Post('support')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a new support or clinical query ticket' })
  createSupportRequest(
    @CurrentUser('id') accountId: string,
    @Body() dto: CreateSupportRequestDto,
  ) {
    return this.patientPortalService.createSupportRequest(accountId, dto);
  }

  @Get('support')
  @ApiOperation({ summary: 'Get all patient support tickets' })
  getSupportRequests(@CurrentUser('id') accountId: string) {
    return this.patientPortalService.getSupportRequests(accountId);
  }
}

