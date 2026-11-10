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
import { ServicesService } from './services.service.js';
let ServicesController = class ServicesController {
    servicesService;
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    findAll() {
        return this.servicesService.findAll();
    }
    findBySlug(slug) {
        return this.servicesService.findBySlug(slug);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'List all active clinical services' }),
    ApiResponse({ status: 200, description: 'List of services' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAll", null);
__decorate([
    Get(':slug'),
    ApiOperation({ summary: 'Get service by slug' }),
    ApiParam({ name: 'slug', example: 'gynecology' }),
    ApiResponse({ status: 200, description: 'Service details' }),
    ApiResponse({ status: 404, description: 'Service not found' }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findBySlug", null);
ServicesController = __decorate([
    ApiTags('Services'),
    Controller('services'),
    __metadata("design:paramtypes", [ServicesService])
], ServicesController);
export { ServicesController };
//# sourceMappingURL=services.controller.js.map