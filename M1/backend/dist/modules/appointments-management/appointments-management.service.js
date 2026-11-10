var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AppointmentStatus } from '@prisma/client';
import { randomInt } from 'crypto';
let AppointmentsManagementService = class AppointmentsManagementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateAppointmentNumber() {
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        return `APT-${year}-${seq}`;
    }
    async createBooking(dto) {
        const patient = await this.prisma.patient.findFirst({
            where: { OR: [{ id: dto.patientId }, { patientId: dto.patientId }] },
        });
        if (!patient) {
            throw new NotFoundException(`Patient "${dto.patientId}" not found`);
        }
        const doctor = await this.prisma.doctor.findFirst({
            where: { OR: [{ id: dto.doctorId }, { slug: dto.doctorId }] },
        });
        if (!doctor) {
            throw new NotFoundException(`Doctor "${dto.doctorId}" not found`);
        }
        const service = await this.prisma.service.findFirst({
            where: { OR: [{ id: dto.serviceId }, { slug: dto.serviceId }] },
        });
        if (!service) {
            throw new NotFoundException(`Service "${dto.serviceId}" not found`);
        }
        const targetDate = new Date(dto.scheduledDate);
        targetDate.setHours(0, 0, 0, 0);
        const conflict = await this.prisma.appointment.findFirst({
            where: {
                doctorId: doctor.id,
                scheduledDate: targetDate,
                scheduledTimeSlot: dto.scheduledTimeSlot.trim(),
                status: { in: [AppointmentStatus.CONFIRMED, AppointmentStatus.CHECKED_IN, AppointmentStatus.IN_CONSULTATION] },
            },
        });
        if (conflict) {
            throw new ConflictException(`Doctor ${doctor.name} already has an appointment booked on ${dto.scheduledDate} at ${dto.scheduledTimeSlot}.`);
        }
        let appointmentNumber = this.generateAppointmentNumber();
        let isUnique = false;
        while (!isUnique) {
            const existing = await this.prisma.appointment.findUnique({ where: { appointmentNumber } });
            if (!existing)
                isUnique = true;
            else
                appointmentNumber = this.generateAppointmentNumber();
        }
        const created = await this.prisma.appointment.create({
            data: {
                appointmentNumber,
                patientId: patient.id,
                doctorId: doctor.id,
                serviceId: service.id,
                scheduledDate: targetDate,
                scheduledTimeSlot: dto.scheduledTimeSlot.trim(),
                status: AppointmentStatus.CONFIRMED,
                type: dto.type ?? 'CONSULTATION',
                reason: dto.reason?.trim() ?? null,
                appointmentRequestId: dto.appointmentRequestId ?? null,
            },
            include: {
                patient: true,
                doctor: true,
                service: true,
            },
        });
        if (dto.appointmentRequestId) {
            await this.prisma.appointmentRequest.update({
                where: { id: dto.appointmentRequestId },
                data: { status: AppointmentStatus.CONFIRMED },
            }).catch(() => null);
        }
        return created;
    }
    async findAll(query) {
        const where = {};
        if (query?.doctorId) {
            where.doctorId = query.doctorId;
        }
        if (query?.patientId) {
            where.patientId = query.patientId;
        }
        if (query?.date) {
            const d = new Date(query.date);
            d.setHours(0, 0, 0, 0);
            where.scheduledDate = d;
        }
        if (query?.status) {
            where.status = query.status;
        }
        if (query?.search && query.search.trim()) {
            const s = query.search.trim();
            where.OR = [
                { appointmentNumber: { contains: s, mode: 'insensitive' } },
                { patient: { fullName: { contains: s, mode: 'insensitive' } } },
                { patient: { phone: { contains: s, mode: 'insensitive' } } },
            ];
        }
        return this.prisma.appointment.findMany({
            where,
            include: {
                patient: true,
                doctor: true,
                service: true,
                vitalRecords: { orderBy: { recordedAt: 'desc' }, take: 1 },
                consultation: true,
            },
            orderBy: [{ scheduledDate: 'asc' }, { scheduledTimeSlot: 'asc' }],
        });
    }
    async findOne(id) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
            include: {
                patient: true,
                doctor: true,
                service: true,
                vitalRecords: {
                    include: { recordedBy: { select: { fullName: true } } },
                    orderBy: { recordedAt: 'desc' },
                },
                consultation: {
                    include: {
                        prescriptions: { include: { items: true } },
                        diagnosticOrders: true,
                    },
                },
                invoices: { include: { items: true, payments: true } },
            },
        });
        if (!appointment) {
            throw new NotFoundException(`Appointment "${id}" not found`);
        }
        return appointment;
    }
    async updateStatus(id, dto) {
        const appointment = await this.prisma.appointment.findUnique({ where: { id } });
        if (!appointment) {
            throw new NotFoundException(`Appointment "${id}" not found`);
        }
        return this.prisma.appointment.update({
            where: { id },
            data: {
                status: dto.status,
                cancellationReason: dto.cancellationReason ?? undefined,
            },
            include: {
                patient: true,
                doctor: true,
                service: true,
            },
        });
    }
    async getPendingRequests() {
        return this.prisma.appointmentRequest.findMany({
            where: { status: AppointmentStatus.REQUESTED },
            include: { service: true, preferredDoctor: true },
            orderBy: { createdAt: 'desc' },
        });
    }
};
AppointmentsManagementService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AppointmentsManagementService);
export { AppointmentsManagementService };
//# sourceMappingURL=appointments-management.service.js.map