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
import { PrescriptionStatus } from '@prisma/client';
import { randomInt } from 'crypto';
let PrescriptionsService = class PrescriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generatePrescriptionNumber() {
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        return `RX-${year}-${seq}`;
    }
    async createPrescription(dto, doctorUserId) {
        const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
        if (!patient) {
            throw new NotFoundException(`Patient "${dto.patientId}" not found`);
        }
        let prescriptionNumber = this.generatePrescriptionNumber();
        let isUnique = false;
        while (!isUnique) {
            const match = await this.prisma.prescription.findUnique({ where: { prescriptionNumber } });
            if (!match)
                isUnique = true;
            else
                prescriptionNumber = this.generatePrescriptionNumber();
        }
        return this.prisma.prescription.create({
            data: {
                prescriptionNumber,
                patientId: dto.patientId,
                doctorId: doctorUserId,
                consultationId: dto.consultationId ?? null,
                clinicalNotes: dto.clinicalNotes?.trim() ?? null,
                status: PrescriptionStatus.FINALIZED,
                items: {
                    create: dto.items.map((it) => ({
                        medicationName: it.medicationName.trim(),
                        dosage: it.dosage.trim(),
                        frequency: it.frequency.trim(),
                        duration: it.duration.trim(),
                        instructions: it.instructions?.trim() ?? null,
                    })),
                },
            },
            include: {
                patient: true,
                doctor: { select: { fullName: true, doctor: true } },
                items: true,
            },
        });
    }
    async findByPatient(patientId) {
        return this.prisma.prescription.findMany({
            where: { patientId },
            include: {
                doctor: { select: { fullName: true, doctor: true } },
                items: true,
            },
            orderBy: { issuedAt: 'desc' },
        });
    }
    async findOne(id) {
        const rx = await this.prisma.prescription.findUnique({
            where: { id },
            include: {
                patient: true,
                doctor: { select: { fullName: true, doctor: true } },
                items: true,
            },
        });
        if (!rx) {
            throw new NotFoundException(`Prescription "${id}" not found`);
        }
        return rx;
    }
};
PrescriptionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PrescriptionsService);
export { PrescriptionsService };
//# sourceMappingURL=prescriptions.service.js.map