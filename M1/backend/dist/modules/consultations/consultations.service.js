var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ConsultationStatus, AppointmentStatus } from '@prisma/client';
import { randomInt } from 'crypto';
let ConsultationsService = class ConsultationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateConsultationNumber() {
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        return `CON-${year}-${seq}`;
    }
    async saveConsultation(dto, doctorUserId) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id: dto.appointmentId },
            include: { doctor: { include: { user: true } }, patient: true },
        });
        if (!appointment) {
            throw new NotFoundException(`Appointment "${dto.appointmentId}" not found`);
        }
        if (appointment.doctor.user?.id && appointment.doctor.user.id !== doctorUserId) {
        }
        const existing = await this.prisma.consultation.findUnique({
            where: { appointmentId: dto.appointmentId },
        });
        if (existing && existing.status === ConsultationStatus.SIGNED) {
            throw new BadRequestException('This consultation has already been finalized and signed. Use the amendment endpoint to document revisions.');
        }
        const followUp = dto.followUpDate ? new Date(dto.followUpDate) : null;
        const isSigning = dto.status === ConsultationStatus.SIGNED;
        if (existing) {
            const updated = await this.prisma.consultation.update({
                where: { id: existing.id },
                data: {
                    chiefComplaint: dto.chiefComplaint.trim(),
                    symptoms: dto.symptoms?.trim() ?? null,
                    clinicalFindings: dto.clinicalFindings?.trim() ?? null,
                    diagnosis: dto.diagnosis.trim(),
                    treatmentPlan: dto.treatmentPlan.trim(),
                    specialtyType: dto.specialtyType ?? null,
                    specialtyDetails: dto.specialtyDetails ?? undefined,
                    status: dto.status ?? existing.status,
                    followUpDate: followUp,
                    followUpNotes: dto.followUpNotes?.trim() ?? null,
                    signedAt: isSigning ? new Date() : existing.signedAt,
                },
                include: { doctor: true, patient: true, prescriptions: true, diagnosticOrders: true },
            });
            if (isSigning) {
                await this.prisma.appointment.update({
                    where: { id: appointment.id },
                    data: { status: AppointmentStatus.COMPLETED },
                });
            }
            return updated;
        }
        let consultationNumber = this.generateConsultationNumber();
        let isUnique = false;
        while (!isUnique) {
            const match = await this.prisma.consultation.findUnique({ where: { consultationNumber } });
            if (!match)
                isUnique = true;
            else
                consultationNumber = this.generateConsultationNumber();
        }
        const created = await this.prisma.consultation.create({
            data: {
                consultationNumber,
                appointmentId: appointment.id,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                chiefComplaint: dto.chiefComplaint.trim(),
                symptoms: dto.symptoms?.trim() ?? null,
                clinicalFindings: dto.clinicalFindings?.trim() ?? null,
                diagnosis: dto.diagnosis.trim(),
                treatmentPlan: dto.treatmentPlan.trim(),
                specialtyType: dto.specialtyType ?? null,
                specialtyDetails: dto.specialtyDetails ?? undefined,
                status: dto.status ?? ConsultationStatus.DRAFT,
                followUpDate: followUp,
                followUpNotes: dto.followUpNotes?.trim() ?? null,
                signedAt: isSigning ? new Date() : null,
            },
            include: { doctor: true, patient: true },
        });
        await this.prisma.appointment.update({
            where: { id: appointment.id },
            data: {
                status: isSigning ? AppointmentStatus.COMPLETED : AppointmentStatus.IN_CONSULTATION,
            },
        });
        return created;
    }
    async amendConsultation(id, dto, staffId) {
        const consultation = await this.prisma.consultation.findUnique({ where: { id } });
        if (!consultation) {
            throw new NotFoundException(`Consultation "${id}" not found`);
        }
        await this.prisma.consultationAmendment.create({
            data: {
                consultationId: id,
                amendedById: staffId,
                reason: dto.reason.trim(),
                previousData: {
                    chiefComplaint: consultation.chiefComplaint,
                    symptoms: consultation.symptoms,
                    clinicalFindings: consultation.clinicalFindings,
                    diagnosis: consultation.diagnosis,
                    treatmentPlan: consultation.treatmentPlan,
                    specialtyDetails: consultation.specialtyDetails,
                },
                amendedData: dto.amendedFields,
            },
        });
        return this.prisma.consultation.update({
            where: { id },
            data: {
                ...dto.amendedFields,
                updatedAt: new Date(),
            },
            include: { doctor: true, patient: true, amendments: true },
        });
    }
    async findByAppointment(appointmentId) {
        return this.prisma.consultation.findUnique({
            where: { appointmentId },
            include: {
                doctor: true,
                patient: true,
                prescriptions: { include: { items: true } },
                diagnosticOrders: true,
                amendments: true,
            },
        });
    }
    async findByPatient(patientId) {
        return this.prisma.consultation.findMany({
            where: { patientId },
            include: {
                doctor: true,
                prescriptions: { include: { items: true } },
                diagnosticOrders: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
ConsultationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ConsultationsService);
export { ConsultationsService };
//# sourceMappingURL=consultations.service.js.map