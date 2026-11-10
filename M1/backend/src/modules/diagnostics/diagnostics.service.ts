import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateDiagnosticOrderDto, UpdateDiagnosticOrderDto } from './dto/diagnostic-order.dto.js';
import { DiagnosticStatus } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class DiagnosticsService {
  constructor(private prisma: PrismaService) {}

  generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const seq = randomInt(1000, 9999);
    return `LAB-${year}-${seq}`;
  }

  async createOrder(dto: CreateDiagnosticOrderDto) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) {
      throw new NotFoundException(`Patient "${dto.patientId}" not found`);
    }

    let orderNumber = this.generateOrderNumber();
    let isUnique = false;
    while (!isUnique) {
      const match = await this.prisma.diagnosticOrder.findUnique({ where: { orderNumber } });
      if (!match) isUnique = true;
      else orderNumber = this.generateOrderNumber();
    }

    return this.prisma.diagnosticOrder.create({
      data: {
        orderNumber,
        patientId: dto.patientId,
        orderingDoctorId: dto.orderingDoctorId,
        consultationId: dto.consultationId ?? null,
        testName: dto.testName.trim(),
        testCategory: dto.testCategory.trim(),
        standardPrice: dto.standardPrice ?? 45.0,
        status: DiagnosticStatus.ORDERED,
      },
      include: {
        patient: true,
        orderingDoctor: true,
      },
    });
  }

  async findAll(query?: { status?: DiagnosticStatus; patientId?: string }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.patientId) where.patientId = query.patientId;

    return this.prisma.diagnosticOrder.findMany({
      where,
      include: {
        patient: true,
        orderingDoctor: true,
        assignedLabStaff: { select: { fullName: true } },
      },
      orderBy: { orderedAt: 'desc' },
    });
  }

  async updateOrder(id: string, dto: UpdateDiagnosticOrderDto, staffUserId?: string) {
    const order = await this.prisma.diagnosticOrder.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Diagnostic order "${id}" not found`);
    }

    const data: any = { ...dto };
    if (dto.status === DiagnosticStatus.SAMPLE_COLLECTED && !order.sampleCollectedAt) {
      data.sampleCollectedAt = new Date();
      if (staffUserId) data.assignedLabStaffId = staffUserId;
    }

    if (dto.isReviewed) {
      data.isReviewed = true;
      data.reviewedAt = new Date();
      data.status = DiagnosticStatus.REVIEWED;
    }

    return this.prisma.diagnosticOrder.update({
      where: { id },
      data,
      include: {
        patient: true,
        orderingDoctor: true,
        assignedLabStaff: { select: { fullName: true } },
      },
    });
  }
}

