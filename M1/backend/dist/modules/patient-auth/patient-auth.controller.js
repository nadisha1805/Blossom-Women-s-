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
import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PatientAuthService } from './patient-auth.service.js';
import { RegisterPatientAccountDto, LoginPatientAccountDto } from './dto/patient-auth.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
let PatientAuthController = class PatientAuthController {
    patientAuthService;
    constructor(patientAuthService) {
        this.patientAuthService = patientAuthService;
    }
    register(dto) {
        return this.patientAuthService.register(dto);
    }
    login(dto) {
        return this.patientAuthService.login(dto);
    }
    getProfile(accountId) {
        return this.patientAuthService.getProfile(accountId);
    }
};
__decorate([
    Post('register'),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: 'Register a patient online account and link with EMR record' }),
    ApiResponse({ status: 201, description: 'Patient registered and issued JWT token' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterPatientAccountDto]),
    __metadata("design:returntype", void 0)
], PatientAuthController.prototype, "register", null);
__decorate([
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Patient login with email and password' }),
    ApiResponse({ status: 200, description: 'Login successful, returns patient token' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginPatientAccountDto]),
    __metadata("design:returntype", void 0)
], PatientAuthController.prototype, "login", null);
__decorate([
    Get('me'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get current authenticated patient account & health baseline' }),
    __param(0, CurrentUser('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientAuthController.prototype, "getProfile", null);
PatientAuthController = __decorate([
    ApiTags('Patient Portal Authentication'),
    Controller('patient-auth'),
    __metadata("design:paramtypes", [PatientAuthService])
], PatientAuthController);
export { PatientAuthController };
//# sourceMappingURL=patient-auth.controller.js.map