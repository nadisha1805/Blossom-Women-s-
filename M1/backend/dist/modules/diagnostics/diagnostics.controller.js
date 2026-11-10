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
import { Controller, Post, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DiagnosticsService } from './diagnostics.service.js';
import { CreateDiagnosticOrderDto, UpdateDiagnosticOrderDto } from './dto/diagnostic-order.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole, DiagnosticStatus } from '@prisma/client';
let DiagnosticsController = class DiagnosticsController {
    diagnosticsService;
    constructor(diagnosticsService) {
        this.diagnosticsService = diagnosticsService;
    }
    createOrder(dto) {
        return this.diagnosticsService.createOrder(dto);
    }
    findAll(status, patientId) {
        return this.diagnosticsService.findAll({ status, patientId });
    }
    updateOrder(id, dto, staffUserId) {
        return this.diagnosticsService.updateOrder(id, dto, staffUserId);
    }
};
__decorate([
    Post(),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR),
    ApiOperation({ summary: 'Create diagnostic order (lab/imaging/pathology)' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateDiagnosticOrderDto]),
    __metadata("design:returntype", void 0)
], DiagnosticsController.prototype, "createOrder", null);
__decorate([
    Get(),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.LAB_STAFF),
    ApiOperation({ summary: 'List and filter laboratory diagnostic orders' }),
    ApiQuery({ name: 'status', required: false, enum: DiagnosticStatus }),
    ApiQuery({ name: 'patientId', required: false }),
    __param(0, Query('status')),
    __param(1, Query('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DiagnosticsController.prototype, "findAll", null);
__decorate([
    Patch(':id'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.LAB_STAFF, UserRole.DOCTOR),
    ApiOperation({ summary: 'Update diagnostic status, sample collection, notes or review' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __param(2, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateDiagnosticOrderDto, String]),
    __metadata("design:returntype", void 0)
], DiagnosticsController.prototype, "updateOrder", null);
DiagnosticsController = __decorate([
    ApiTags('Diagnostics & Laboratory'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('diagnostics'),
    __metadata("design:paramtypes", [DiagnosticsService])
], DiagnosticsController);
export { DiagnosticsController };
//# sourceMappingURL=diagnostics.controller.js.map