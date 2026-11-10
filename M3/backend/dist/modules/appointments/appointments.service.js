var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { randomBytes } from 'crypto';
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateReferenceId() {
        const randomHex = randomBytes(3).toString('hex').toUpperCase();
        return `BLS-${randomHex}`;
    }
    async createAppointment(dto) {
        if (!dto.consent) {
            throw new BadRequestException('Patient consent is required to submit an appointment request');
        }
        const apptDate = new Date(dto.preferredDate);
        if (isNaN(apptDate.getTime())) {
            throw new BadRequestException('Invalid appointment date format');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (apptDate < today) {
            throw new BadRequestException('Preferred date cannot be in the past');
        }
        let service = await this.prisma.service.findFirst({
            where: {
                OR: [{ id: dto.serviceId }, { slug: dto.serviceId }, { name: dto.serviceId }],
            },
        });
        if (!service) {
            service = await this.prisma.service.create({
                data: {
                    name: dto.serviceId,
                    slug: dto.serviceId.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    description: `Consultation service for ${dto.serviceId}`,
                },
            });
        }
        let preferredDoctorId = null;
        if (dto.preferredDoctorId && dto.preferredDoctorId.trim() !== '') {
            const doctor = await this.prisma.doctor.findFirst({
                where: {
                    OR: [
                        { id: dto.preferredDoctorId },
                        { slug: dto.preferredDoctorId },
                        { name: dto.preferredDoctorId },
                    ],
                },
            });
            if (doctor) {
                preferredDoctorId = doctor.id;
            }
        }
        const referenceId = this.generateReferenceId();
        const created = await this.prisma.appointmentRequest.create({
            data: {
                referenceId,
                patientName: dto.patientName.trim(),
                email: dto.email.trim().toLowerCase(),
                phone: dto.phone.trim(),
                serviceId: service.id,
                preferredDoctorId: preferredDoctorId,
                preferredDate: apptDate,
                preferredTime: dto.preferredTime ?? null,
                reason: dto.reason?.trim() ?? null,
                status: 'REQUESTED',
                consent: dto.consent,
            },
            include: {
                service: true,
                preferredDoctor: true,
            },
        });
        return {
            success: true,
            message: 'Appointment request submitted successfully. Our team will contact you to confirm.',
            data: {
                id: created.id,
                referenceId: created.referenceId,
                patientName: created.patientName,
                service: created.service.name,
                preferredDoctor: created.preferredDoctor?.name ?? null,
                preferredDate: created.preferredDate,
                preferredTime: created.preferredTime,
                status: created.status,
                createdAt: created.createdAt,
            },
        };
    }
    async getAppointmentByReference(referenceId) {
        const appt = await this.prisma.appointmentRequest.findUnique({
            where: { referenceId },
            include: {
                service: true,
                preferredDoctor: true,
            },
        });
        if (!appt) {
            throw new NotFoundException(`Appointment request with reference "${referenceId}" not found`);
        }
        return {
            referenceId: appt.referenceId,
            patientName: appt.patientName,
            service: appt.service.name,
            preferredDoctor: appt.preferredDoctor?.name ?? null,
            preferredDate: appt.preferredDate,
            preferredTime: appt.preferredTime,
            status: appt.status,
            createdAt: appt.createdAt,
        };
    }
};
AppointmentsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AppointmentsService);
export { AppointmentsService };
//# sourceMappingURL=appointments.service.js.map