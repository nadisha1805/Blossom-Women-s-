var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { DiagnosticStatus } from '@prisma/client';
import { randomInt } from 'crypto';
let DiagnosticsService = class DiagnosticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateOrderNumber() {
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        return `LAB-${year}-${seq}`;
    }
    async createOrder(dto) {
        const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
        if (!patient) {
            throw new NotFoundException(`Patient "${dto.patientId}" not found`);
        }
        let orderNumber = this.generateOrderNumber();
        let isUnique = false;
        while (!isUnique) {
            const match = await this.prisma.diagnosticOrder.findUnique({ where: { orderNumber } });
            if (!match)
                isUnique = true;
            else
                orderNumber = this.generateOrderNumber();
        }
        return this.prisma.diagnosticOrder.create({
            data: {
                orderNumber,
                patientId: dto.patientId,
                orderingDoctorId: dto.orderingDoctorId,
                consultationId: dto.consultationId ?? null,
                testName: dto.testName.trim(),
                testCategory: dto.testCategory.trim(),
                standardPrice: dto.standardPrice ?? 45.0,
                status: DiagnosticStatus.ORDERED,
            },
            include: {
                patient: true,
                orderingDoctor: true,
            },
        });
    }
    async findAll(query) {
        const where = {};
        if (query?.status)
            where.status = query.status;
        if (query?.patientId)
            where.patientId = query.patientId;
        return this.prisma.diagnosticOrder.findMany({
            where,
            include: {
                patient: true,
                orderingDoctor: true,
                assignedLabStaff: { select: { fullName: true } },
            },
            orderBy: { orderedAt: 'desc' },
        });
    }
    async updateOrder(id, dto, staffUserId) {
        const order = await this.prisma.diagnosticOrder.findUnique({ where: { id } });
        if (!order) {
            throw new NotFoundException(`Diagnostic order "${id}" not found`);
        }
        const data = { ...dto };
        if (dto.status === DiagnosticStatus.SAMPLE_COLLECTED && !order.sampleCollectedAt) {
            data.sampleCollectedAt = new Date();
            if (staffUserId)
                data.assignedLabStaffId = staffUserId;
        }
        if (dto.isReviewed) {
            data.isReviewed = true;
            data.reviewedAt = new Date();
            data.status = DiagnosticStatus.REVIEWED;
        }
        return this.prisma.diagnosticOrder.update({
            where: { id },
            data,
            include: {
                patient: true,
                orderingDoctor: true,
                assignedLabStaff: { select: { fullName: true } },
            },
        });
    }
};
DiagnosticsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], DiagnosticsService);
export { DiagnosticsService };
//# sourceMappingURL=diagnostics.service.js.map