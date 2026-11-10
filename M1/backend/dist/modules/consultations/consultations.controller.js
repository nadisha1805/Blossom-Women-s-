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
import { Controller, Post, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConsultationsService } from './consultations.service.js';
import { SaveConsultationDto, AmendConsultationDto } from './dto/consultation.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@prisma/client';
let ConsultationsController = class ConsultationsController {
    consultationsService;
    constructor(consultationsService) {
        this.consultationsService = consultationsService;
    }
    saveConsultation(dto, staffId) {
        return this.consultationsService.saveConsultation(dto, staffId);
    }
    amendConsultation(id, dto, staffId) {
        return this.consultationsService.amendConsultation(id, dto, staffId);
    }
    findByAppointment(appointmentId) {
        return this.consultationsService.findByAppointment(appointmentId);
    }
    findByPatient(patientId) {
        return this.consultationsService.findByPatient(patientId);
    }
};
__decorate([
    Post(),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR),
    ApiOperation({ summary: 'Save draft or sign/finalize clinical consultation' }),
    __param(0, Body()),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SaveConsultationDto, String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "saveConsultation", null);
__decorate([
    Put(':id/amend'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR),
    ApiOperation({ summary: 'Amend signed clinical consultation (maintains immutable audit trail)' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AmendConsultationDto, String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "amendConsultation", null);
__decorate([
    Get('appointment/:appointmentId'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE),
    ApiOperation({ summary: 'Get consultation details by appointment' }),
    __param(0, Param('appointmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findByAppointment", null);
__decorate([
    Get('patient/:patientId'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE),
    ApiOperation({ summary: 'Get consultation history for a patient' }),
    __param(0, Param('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findByPatient", null);
ConsultationsController = __decorate([
    ApiTags('Doctor Consultations & EMR'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('consultations'),
    __metadata("design:paramtypes", [ConsultationsService])
], ConsultationsController);
export { ConsultationsController };
//# sourceMappingURL=consultations.controller.js.map