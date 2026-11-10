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
import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BillingService } from './billing.service.js';
import { CreateInvoiceDto, RecordPaymentDto } from './dto/billing.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole, InvoiceStatus } from '@prisma/client';
let BillingController = class BillingController {
    billingService;
    constructor(billingService) {
        this.billingService = billingService;
    }
    createInvoice(dto) {
        return this.billingService.createInvoice(dto);
    }
    recordPayment(dto, receivedByName) {
        return this.billingService.recordPayment(dto, receivedByName);
    }
    findAll(patientId, status) {
        return this.billingService.findAll({ patientId, status });
    }
    findOne(id) {
        return this.billingService.findOne(id);
    }
};
__decorate([
    Post('invoices'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.BILLING_STAFF, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'Generate clinic invoice with line item calculation' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateInvoiceDto]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "createInvoice", null);
__decorate([
    Post('payments'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.BILLING_STAFF, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'Record payment transaction against an invoice (supports partial payments)' }),
    __param(0, Body()),
    __param(1, CurrentUser('fullName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RecordPaymentDto, String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "recordPayment", null);
__decorate([
    Get('invoices'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.BILLING_STAFF, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'List and filter invoices by status or patient' }),
    ApiQuery({ name: 'patientId', required: false }),
    ApiQuery({ name: 'status', required: false, enum: InvoiceStatus }),
    __param(0, Query('patientId')),
    __param(1, Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "findAll", null);
__decorate([
    Get('invoices/:id'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.BILLING_STAFF, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'Get detailed invoice with items and payment history' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingController.prototype, "findOne", null);
BillingController = __decorate([
    ApiTags('Billing & Invoicing'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('billing'),
    __metadata("design:paramtypes", [BillingService])
], BillingController);
export { BillingController };
//# sourceMappingURL=billing.controller.js.map