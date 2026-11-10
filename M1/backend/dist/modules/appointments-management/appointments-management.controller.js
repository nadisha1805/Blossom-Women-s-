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
import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AppointmentsManagementService } from './appointments-management.service.js';
import { CreateBookingDto, UpdateAppointmentStatusDto } from './dto/create-booking.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UserRole, AppointmentStatus } from '@prisma/client';
let AppointmentsManagementController = class AppointmentsManagementController {
    apptMgmtService;
    constructor(apptMgmtService) {
        this.apptMgmtService = apptMgmtService;
    }
    createBooking(dto) {
        return this.apptMgmtService.createBooking(dto);
    }
    findAll(doctorId, patientId, date, status, search) {
        return this.apptMgmtService.findAll({ doctorId, patientId, date, status, search });
    }
    getPendingRequests() {
        return this.apptMgmtService.getPendingRequests();
    }
    findOne(id) {
        return this.apptMgmtService.findOne(id);
    }
    updateStatus(id, dto) {
        return this.apptMgmtService.updateStatus(id, dto);
    }
};
__decorate([
    Post(),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST, UserRole.DOCTOR, UserRole.NURSE),
    ApiOperation({ summary: 'Book/Confirm a scheduled appointment with conflict checking' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBookingDto]),
    __metadata("design:returntype", void 0)
], AppointmentsManagementController.prototype, "createBooking", null);
__decorate([
    Get(),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.BILLING_STAFF),
    ApiOperation({ summary: 'Query clinic appointments with filters' }),
    ApiQuery({ name: 'doctorId', required: false }),
    ApiQuery({ name: 'patientId', required: false }),
    ApiQuery({ name: 'date', required: false, example: '2026-11-20' }),
    ApiQuery({ name: 'status', required: false, enum: AppointmentStatus }),
    ApiQuery({ name: 'search', required: false }),
    __param(0, Query('doctorId')),
    __param(1, Query('patientId')),
    __param(2, Query('date')),
    __param(3, Query('status')),
    __param(4, Query('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], AppointmentsManagementController.prototype, "findAll", null);
__decorate([
    Get('requests/pending'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'Get pending website appointment requests' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsManagementController.prototype, "getPendingRequests", null);
__decorate([
    Get(':id'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.BILLING_STAFF),
    ApiOperation({ summary: 'Get single appointment details with related vitals & EMR' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsManagementController.prototype, "findOne", null);
__decorate([
    Patch(':id/status'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST, UserRole.DOCTOR, UserRole.NURSE),
    ApiOperation({ summary: 'Transition appointment status (CHECKED_IN, IN_CONSULTATION, COMPLETED, CANCELLED)' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateAppointmentStatusDto]),
    __metadata("design:returntype", void 0)
], AppointmentsManagementController.prototype, "updateStatus", null);
AppointmentsManagementController = __decorate([
    ApiTags('Clinic Appointments Management'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('appointments-management'),
    __metadata("design:paramtypes", [AppointmentsManagementService])
], AppointmentsManagementController);
export { AppointmentsManagementController };
//# sourceMappingURL=appointments-management.controller.js.map