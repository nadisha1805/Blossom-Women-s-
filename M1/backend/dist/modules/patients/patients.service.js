var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { randomInt } from 'crypto';
let PatientsService = class PatientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generatePatientId() {
        const num = randomInt(10000, 99999);
        return `PAT-${num}`;
    }
    async create(dto) {
        const existing = await this.prisma.patient.findFirst({
            where: { phone: dto.phone.trim() },
        });
        if (existing) {
            throw new ConflictException(`A patient is already registered with phone number "${dto.phone}" (Patient ID: ${existing.patientId})`);
        }
        let patientId = this.generatePatientId();
        let isUnique = false;
        while (!isUnique) {
            const match = await this.prisma.patient.findUnique({ where: { patientId } });
            if (!match)
                isUnique = true;
            else
                patientId = this.generatePatientId();
        }
        const patient = await this.prisma.patient.create({
            data: {
                patientId,
                fullName: dto.fullName.trim(),
                dob: new Date(dto.dob),
                gender: dto.gender ?? 'Female',
                bloodGroup: dto.bloodGroup ?? null,
                phone: dto.phone.trim(),
                email: dto.email?.trim().toLowerCase() ?? null,
                address: dto.address?.trim() ?? null,
                emergencyContactName: dto.emergencyContactName?.trim() ?? null,
                emergencyContactPhone: dto.emergencyContactPhone?.trim() ?? null,
                allergies: dto.allergies ?? [],
                medicalConditions: dto.medicalConditions ?? [],
                currentMedications: dto.currentMedications ?? [],
                medicalHistory: dto.medicalHistory?.trim() ?? null,
                menstrualHistory: dto.menstrualHistory?.trim() ?? null,
                pregnancyHistory: dto.pregnancyHistory?.trim() ?? null,
                previousSurgeries: dto.previousSurgeries?.trim() ?? null,
            },
        });
        return patient;
    }
    async findAll(query) {
        const page = Number(query?.page) || 1;
        const limit = Number(query?.limit) || 20;
        const skip = (page - 1) * limit;
        const where = {};
        if (query?.search && query.search.trim()) {
            const search = query.search.trim();
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { patientId: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [total, items] = await Promise.all([
            this.prisma.patient.count({ where }),
            this.prisma.patient.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ]);
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const patient = await this.prisma.patient.findFirst({
            where: {
                OR: [{ id }, { patientId: id }],
            },
            include: {
                appointments: {
                    include: {
                        doctor: true,
                        service: true,
                    },
                    orderBy: { scheduledDate: 'desc' },
                },
                vitalRecords: {
                    include: { recordedBy: { select: { fullName: true, role: true } } },
                    orderBy: { recordedAt: 'desc' },
                },
                consultations: {
                    include: {
                        doctor: true,
                        prescriptions: { include: { items: true } },
                        diagnosticOrders: true,
                    },
                    orderBy: { createdAt: 'desc' },
                },
                prescriptions: {
                    include: { items: true, doctor: { select: { fullName: true } } },
                    orderBy: { issuedAt: 'desc' },
                },
                diagnosticOrders: {
                    include: { orderingDoctor: true, assignedLabStaff: true },
                    orderBy: { orderedAt: 'desc' },
                },
                invoices: {
                    include: { items: true, payments: true },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!patient) {
            throw new NotFoundException(`Patient with identifier "${id}" not found`);
        }
        return patient;
    }
    async update(id, updateData) {
        const existing = await this.prisma.patient.findUnique({ where: { id } });
        if (!existing) {
            throw new NotFoundException(`Patient "${id}" not found`);
        }
        return this.prisma.patient.update({
            where: { id },
            data: {
                ...updateData,
                dob: updateData.dob ? new Date(updateData.dob) : undefined,
            },
        });
    }
};
PatientsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PatientsService);
export { PatientsService };
//# sourceMappingURL=patients.service.js.map