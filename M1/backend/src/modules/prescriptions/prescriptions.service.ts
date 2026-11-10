import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreatePrescriptionDto } from './dto/create-prescription.dto.js';
import { PrescriptionStatus } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  generatePrescriptionNumber(): string {
    const year = new Date().getFullYear();
    const seq = randomInt(1000, 9999);
    return `RX-${year}-${seq}`;
  }

  async createPrescription(dto: CreatePrescriptionDto, doctorUserId: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) {
      throw new NotFoundException(`Patient "${dto.patientId}" not found`);
    }

    let prescriptionNumber = this.generatePrescriptionNumber();
    let isUnique = false;
    while (!isUnique) {
      const match = await this.prisma.prescription.findUnique({ where: { prescriptionNumber } });
      if (!match) isUnique = true;
      else prescriptionNumber = this.generatePrescriptionNumber();
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

  async findByPatient(patientId: string) {
    return this.prisma.prescription.findMany({
      where: { patientId },
      include: {
        doctor: { select: { fullName: true, doctor: true } },
        items: true,
      },
      orderBy: { issuedAt: 'desc' },
    });
  }

  async findOne(id: string) {
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
}

