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
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service.js';
let DoctorsController = class DoctorsController {
    doctorsService;
    constructor(doctorsService) {
        this.doctorsService = doctorsService;
    }
    findAll() {
        return this.doctorsService.findAll();
    }
    findBySlug(slug) {
        return this.doctorsService.findBySlug(slug);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'List all active doctors' }),
    ApiResponse({ status: 200, description: 'List of doctors' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findAll", null);
__decorate([
    Get(':slug'),
    ApiOperation({ summary: 'Get doctor by slug' }),
    ApiParam({ name: 'slug', example: 'dr-priya-sharma' }),
    ApiResponse({ status: 200, description: 'Doctor profile' }),
    ApiResponse({ status: 404, description: 'Doctor not found' }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findBySlug", null);
DoctorsController = __decorate([
    ApiTags('Doctors'),
    Controller('doctors'),
    __metadata("design:paramtypes", [DoctorsService])
], DoctorsController);
export { DoctorsController };
//# sourceMappingURL=doctors.controller.js.map