import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateBookingDto, UpdateAppointmentStatusDto } from './dto/create-booking.dto.js';
import { AppointmentStatus } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class AppointmentsManagementService {
  constructor(private prisma: PrismaService) {}

  generateAppointmentNumber(): string {
    const year = new Date().getFullYear();
    const seq = randomInt(1000, 9999);
    return `APT-${year}-${seq}`;
  }

  async createBooking(dto: CreateBookingDto) {
    // 1. Resolve Patient
    const patient = await this.prisma.patient.findFirst({
      where: { OR: [{ id: dto.patientId }, { patientId: dto.patientId }] },
    });
    if (!patient) {
      throw new NotFoundException(`Patient "${dto.patientId}" not found`);
    }

    // 2. Resolve Doctor
    const doctor = await this.prisma.doctor.findFirst({
      where: { OR: [{ id: dto.doctorId }, { slug: dto.doctorId }] },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor "${dto.doctorId}" not found`);
    }

    // 3. Resolve Service
    const service = await this.prisma.service.findFirst({
      where: { OR: [{ id: dto.serviceId }, { slug: dto.serviceId }] },
    });
    if (!service) {
      throw new NotFoundException(`Service "${dto.serviceId}" not found`);
    }

    // 4. Double-booking check: prevent conflicting appointments for the same doctor on same date & timeslot
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
      throw new ConflictException(
        `Doctor ${doctor.name} already has an appointment booked on ${dto.scheduledDate} at ${dto.scheduledTimeSlot}.`,
      );
    }

    // 5. Generate appointment number
    let appointmentNumber = this.generateAppointmentNumber();
    let isUnique = false;
    while (!isUnique) {
      const existing = await this.prisma.appointment.findUnique({ where: { appointmentNumber } });
      if (!existing) isUnique = true;
      else appointmentNumber = this.generateAppointmentNumber();
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

    // If converted from an AppointmentRequest, update the request status to CONFIRMED
    if (dto.appointmentRequestId) {
      await this.prisma.appointmentRequest.update({
        where: { id: dto.appointmentRequestId },
        data: { status: AppointmentStatus.CONFIRMED },
      }).catch(() => null);
    }

    return created;
  }

  async findAll(query?: {
    doctorId?: string;
    patientId?: string;
    date?: string;
    status?: AppointmentStatus;
    search?: string;
  }) {
    const where: any = {};

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

  async findOne(id: string) {
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

  async updateStatus(id: string, dto: UpdateAppointmentStatusDto) {
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

  // Get raw incoming public appointment requests waiting for staff confirmation
  async getPendingRequests() {
    return this.prisma.appointmentRequest.findMany({
      where: { status: AppointmentStatus.REQUESTED },
      include: { service: true, preferredDoctor: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

