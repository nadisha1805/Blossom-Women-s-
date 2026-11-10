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
import { VitalsService } from './vitals.service.js';
import { RecordVitalsDto } from './dto/record-vitals.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@prisma/client';
let VitalsController = class VitalsController {
    vitalsService;
    constructor(vitalsService) {
        this.vitalsService = vitalsService;
    }
    recordVitals(dto, staffId) {
        return this.vitalsService.recordVitals(dto, staffId);
    }
    findByPatient(patientId) {
        return this.vitalsService.findByPatient(patientId);
    }
};
__decorate([
    Post(),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.NURSE, UserRole.DOCTOR),
    ApiOperation({ summary: 'Record patient vital signs (BP, pulse, temp, SpO2, BMI)' }),
    __param(0, Body()),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RecordVitalsDto, String]),
    __metadata("design:returntype", void 0)
], VitalsController.prototype, "recordVitals", null);
__decorate([
    Get('patient/:patientId'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE),
    ApiOperation({ summary: 'Get vital history and observations for a patient' }),
    __param(0, Param('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VitalsController.prototype, "findByPatient", null);
VitalsController = __decorate([
    ApiTags('Nursing & Patient Vitals'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('vitals'),
    __metadata("design:paramtypes", [VitalsService])
], VitalsController);
export { VitalsController };
//# sourceMappingURL=vitals.controller.js.map