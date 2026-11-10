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
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { UserRole } from '@prisma/client';
let ReportsController = class ReportsController {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getAdminMetrics() {
        return this.reportsService.getAdminDashboardMetrics();
    }
    getMyDoctorMetrics(doctorId) {
        return this.reportsService.getDoctorDashboardMetrics(doctorId);
    }
    getDoctorMetrics(doctorId) {
        return this.reportsService.getDoctorDashboardMetrics(doctorId);
    }
};
__decorate([
    Get('admin-metrics'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.RECEPTIONIST),
    ApiOperation({ summary: 'Admin overview metrics (patients, today schedule, pending requests, revenue)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getAdminMetrics", null);
__decorate([
    Get('doctor-metrics'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN, UserRole.DOCTOR),
    ApiOperation({ summary: 'Doctor specific dashboard metrics & assigned appointments' }),
    __param(0, CurrentUser('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getMyDoctorMetrics", null);
__decorate([
    Get('doctor-metrics/:doctorId'),
    Roles(UserRole.SUPER_ADMIN, UserRole.CLINIC_ADMIN),
    ApiOperation({ summary: 'Admin inspection of specific doctor dashboard metrics' }),
    __param(0, Param('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getDoctorMetrics", null);
ReportsController = __decorate([
    ApiTags('Clinic Reports & Dashboards'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Controller('reports'),
    __metadata("design:paramtypes", [ReportsService])
], ReportsController);
export { ReportsController };
//# sourceMappingURL=reports.controller.js.map