var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Patch, Body, Param, UseGuards, HttpCode, HttpStatus, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PatientPortalService } from './patient-portal.service.js';
import { PatientBookAppointmentDto, CreateSupportRequestDto, CreatePaymentOrderDto, VerifyPaymentDto, } from './dto/patient-portal.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
let PatientPortalController = class PatientPortalController {
    patientPortalService;
    constructor(patientPortalService) {
        this.patientPortalService = patientPortalService;
    }
    getDashboard(accountId) {
        return this.patientPortalService.getDashboard(accountId);
    }
    getAppointments(accountId) {
        return this.patientPortalService.getAppointments(accountId);
    }
    bookAppointment(accountId, dto) {
        return this.patientPortalService.bookAppointment(accountId, dto);
    }
    cancelAppointment(accountId, appointmentId, reason) {
        return this.patientPortalService.cancelAppointment(accountId, appointmentId, reason);
    }
    getConsultations(accountId) {
        return this.patientPortalService.getConsultations(accountId);
    }
    getPrescriptions(accountId) {
        return this.patientPortalService.getPrescriptions(accountId);
    }
    getDiagnosticReports(accountId) {
        return this.patientPortalService.getDiagnosticReports(accountId);
    }
    getInvoices(accountId) {
        return this.patientPortalService.getInvoices(accountId);
    }
    createPaymentOrder(accountId, dto) {
        return this.patientPortalService.createPaymentOrder(accountId, dto);
    }
    verifyPayment(accountId, dto) {
        return this.patientPortalService.verifyPayment(accountId, dto);
    }
    getNotifications(accountId) {
        return this.patientPortalService.getNotifications(accountId);
    }
    markNotificationRead(accountId, notificationId) {
        return this.patientPortalService.markNotificationRead(accountId, notificationId);
    }
    createSupportRequest(accountId, dto) {
        return this.patientPortalService.createSupportRequest(accountId, dto);
    }
    getSupportRequests(accountId) {
        return this.patientPortalService.getSupportRequests(accountId);
    }
};
__decorate([
    Get('dashboard'),
    ApiOperation({ summary: 'Get personalized patient dashboard metrics and records' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getDashboard", null);
__decorate([
    Get('appointments'),
    ApiOperation({ summary: 'Get patient appointment history and upcoming bookings' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getAppointments", null);
__decorate([
    Post('appointments/request'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Submit an online appointment booking request' }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, PatientBookAppointmentDto]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "bookAppointment", null);
__decorate([
    Patch('appointments/:id/cancel'),
    ApiOperation({ summary: 'Cancel an upcoming appointment with reason' }),
    __param(0, CurrentUser('id')),
    __param(1, Param('id')),
    __param(2, Body('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "cancelAppointment", null);
__decorate([
    Get('consultations'),
    ApiOperation({ summary: 'Get released clinical consultation summaries and doctor notes' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getConsultations", null);
__decorate([
    Get('prescriptions'),
    ApiOperation({ summary: 'Get released digital prescriptions and medication orders' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getPrescriptions", null);
__decorate([
    Get('reports'),
    ApiOperation({ summary: 'Get released diagnostic tests and laboratory results' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getDiagnosticReports", null);
__decorate([
    Get('invoices'),
    ApiOperation({ summary: 'Get patient billing statements, invoices, and payments' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getInvoices", null);
__decorate([
    Post('payments/create-order'),
    ApiOperation({ summary: 'Create a secure payment gateway order for an invoice' }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreatePaymentOrderDto]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "createPaymentOrder", null);
__decorate([
    Post('payments/verify'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Verify cryptographic gateway signature and credit payment' }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, VerifyPaymentDto]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "verifyPayment", null);
__decorate([
    Get('notifications'),
    ApiOperation({ summary: 'Get patient notifications and clinic alerts' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getNotifications", null);
__decorate([
    Patch('notifications/:id/read'),
    ApiOperation({ summary: 'Mark a notification as read' }),
    __param(0, CurrentUser('id')),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "markNotificationRead", null);
__decorate([
    Post('support'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Submit a new support or clinical query ticket' }),
    __param(0, CurrentUser('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateSupportRequestDto]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "createSupportRequest", null);
__decorate([
    Get('support'),
    ApiOperation({ summary: 'Get all patient support tickets' }),
    __param(0, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientPortalController.prototype, "getSupportRequests", null);
PatientPortalController = __decorate([
    ApiTags('Patient Portal'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
    Controller('patient-portal'),
    __metadata("design:paramtypes", [PatientPortalService])
], PatientPortalController);
export { PatientPortalController };
//# sourceMappingURL=patient-portal.controller.js.map