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
import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PrescriptionsService } from './prescriptions.service.js';
import { CreatePrescriptionDto } from './dto/create-prescription.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@prisma/client';
let PrescriptionsController = class PrescriptionsController {
    prescriptionsService;
    constructor(prescriptionsService) {
        this.prescriptionsService = prescriptionsService;
    }
    createPrescription(dto, doctorUserId) {
        return this.prescriptionsService.createPrescription(dto, doctorUserId);
    }
    findOne(id) {
        return this.prescriptionsService.findOne(id);
    }
    findByPatient(patientId) {
        return this.prescriptionsService.findByPatient(patientId);
    }
};
__decorate([
    Post(),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR),
    ApiOperation({ summary: 'Issue an electronic prescription with dosage & frequency' }),
    __param(0, Body()),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePrescriptionDto, String]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "createPrescription", null);
__decorate([
    Get(':id'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'Get single prescription details' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "findOne", null);
__decorate([
    Get('patient/:patientId'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'Get patient prescription history' }),
    __param(0, Param('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrescriptionsController.prototype, "findByPatient", null);
PrescriptionsController = __decorate([
    ApiTags('Prescriptions Management'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('prescriptions'),
    __metadata("design:paramtypes", [PrescriptionsService])
], PrescriptionsController);
export { PrescriptionsController };
//# sourceMappingURL=prescriptions.controller.js.map