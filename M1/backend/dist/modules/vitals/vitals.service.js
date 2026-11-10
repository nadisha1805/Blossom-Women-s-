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
let VitalsService = class VitalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateBMI(weightKg, heightCm) {
        if (!weightKg || !heightCm || heightCm <= 0)
            return null;
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        return Math.round(bmi * 10) / 10;
    }
    async recordVitals(dto, staffUserId) {
        const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
        if (!patient) {
            throw new NotFoundException(`Patient "${dto.patientId}" not found`);
        }
        const bmi = this.calculateBMI(dto.weightKg, dto.heightCm);
        return this.prisma.vitalRecord.create({
            data: {
                patientId: dto.patientId,
                appointmentId: dto.appointmentId ?? null,
                recordedById: staffUserId,
                systolicBP: dto.systolicBP ?? null,
                diastolicBP: dto.diastolicBP ?? null,
                heartRate: dto.heartRate ?? null,
                temperature: dto.temperature ?? null,
                respiratoryRate: dto.respiratoryRate ?? null,
                spO2: dto.spO2 ?? null,
                weightKg: dto.weightKg ?? null,
                heightCm: dto.heightCm ?? null,
                bmi: bmi ?? null,
                nursingNotes: dto.nursingNotes?.trim() ?? null,
            },
            include: {
                recordedBy: { select: { fullName: true, role: true } },
            },
        });
    }
    async findByPatient(patientId) {
        return this.prisma.vitalRecord.findMany({
            where: { patientId },
            include: {
                recordedBy: { select: { fullName: true, role: true } },
            },
            orderBy: { recordedAt: 'desc' },
        });
    }
};
VitalsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], VitalsService);
export { VitalsService };
//# sourceMappingURL=vitals.service.js.map