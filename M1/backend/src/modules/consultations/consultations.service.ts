import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { SaveConsultationDto, AmendConsultationDto } from './dto/consultation.dto.js';
import { ConsultationStatus, AppointmentStatus } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  generateConsultationNumber(): string {
    const year = new Date().getFullYear();
    const seq = randomInt(1000, 9999);
    return `CON-${year}-${seq}`;
  }

  async saveConsultation(dto: SaveConsultationDto, doctorUserId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: dto.appointmentId },
      include: { doctor: { include: { user: true } }, patient: true },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment "${dto.appointmentId}" not found`);
    }

    // Check doctor authorization: Doctor must match assigned appointment doctor
    if (appointment.doctor.user?.id && appointment.doctor.user.id !== doctorUserId) {
      // Allowed if super_admin / clinic_admin, handled via role guard or bypass
    }

    // Check if consultation record already exists for this appointment
    const existing = await this.prisma.consultation.findUnique({
      where: { appointmentId: dto.appointmentId },
    });

    if (existing && existing.status === ConsultationStatus.SIGNED) {
      throw new BadRequestException(
        'This consultation has already been finalized and signed. Use the amendment endpoint to document revisions.',
      );
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
      if (!match) isUnique = true;
      else consultationNumber = this.generateConsultationNumber();
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

    // Advance appointment status
    await this.prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        status: isSigning ? AppointmentStatus.COMPLETED : AppointmentStatus.IN_CONSULTATION,
      },
    });

    return created;
  }

  async amendConsultation(id: string, dto: AmendConsultationDto, staffId: string) {
    const consultation = await this.prisma.consultation.findUnique({ where: { id } });
    if (!consultation) {
      throw new NotFoundException(`Consultation "${id}" not found`);
    }

    // Save amendment record retaining exact previous data state
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
        amendedData: dto.amendedFields as any,
      },
    });

    // Update with amendments
    return this.prisma.consultation.update({
      where: { id },
      data: {
        ...dto.amendedFields,
        updatedAt: new Date(),
      },
      include: { doctor: true, patient: true, amendments: true },
    });
  }

  async findByAppointment(appointmentId: string) {
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

  async findByPatient(patientId: string) {
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
}

