import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RecordVitalsDto } from './dto/record-vitals.dto.js';

@Injectable()
export class VitalsService {
  constructor(private prisma: PrismaService) {}

  calculateBMI(weightKg?: number, heightCm?: number): number | null {
    if (!weightKg || !heightCm || heightCm <= 0) return null;
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return Math.round(bmi * 10) / 10;
  }

  async recordVitals(dto: RecordVitalsDto, staffUserId: string) {
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

  async findByPatient(patientId: string) {
    return this.prisma.vitalRecord.findMany({
      where: { patientId },
      include: {
        recordedBy: { select: { fullName: true, role: true } },
      },
      orderBy: { recordedAt: 'desc' },
    });
  }
}

