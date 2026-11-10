import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { randomInt } from 'crypto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  generatePatientId(): string {
    const num = randomInt(10000, 99999);
    return `PAT-${num}`;
  }

  async create(dto: CreatePatientDto) {
    // Check possible duplicate by phone
    const existing = await this.prisma.patient.findFirst({
      where: { phone: dto.phone.trim() },
    });

    if (existing) {
      throw new ConflictException(
        `A patient is already registered with phone number "${dto.phone}" (Patient ID: ${existing.patientId})`,
      );
    }

    let patientId = this.generatePatientId();
    // Ensure unique patientId
    let isUnique = false;
    while (!isUnique) {
      const match = await this.prisma.patient.findUnique({ where: { patientId } });
      if (!match) isUnique = true;
      else patientId = this.generatePatientId();
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

  async findAll(query?: { search?: string; page?: number; limit?: number }) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
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

  async findOne(id: string) {
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

  async update(id: string, updateData: Partial<CreatePatientDto>) {
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
}

