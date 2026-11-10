import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AppointmentsService } from './appointments.service.js';
import { BadRequestException } from '@nestjs/common';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      service: {
        findFirst: vi.fn(),
        create: vi.fn(),
      },
      doctor: {
        findFirst: vi.fn(),
      },
      appointmentRequest: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
    };

    service = new AppointmentsService(mockPrisma as any);
  });

  it('should generate a valid reference ID starting with BLS-', () => {
    const ref = service.generateReferenceId();
    expect(ref).toMatch(/^BLS-[A-F0-9]{6}$/);
  });

  it('should reject appointment request if consent is not granted', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    await expect(
      service.createAppointment({
        patientName: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+1 555-0123',
        serviceId: 'gynecology',
        preferredDate: futureDate.toISOString().split('T')[0],
        consent: false,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should reject appointment request with a past date', async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 5);

    await expect(
      service.createAppointment({
        patientName: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+1 555-0123',
        serviceId: 'gynecology',
        preferredDate: pastDate.toISOString().split('T')[0],
        consent: true,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should successfully create an appointment request with status REQUESTED', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const dateStr = futureDate.toISOString().split('T')[0];

    mockPrisma.service.findFirst.mockResolvedValue({
      id: 'srv-1',
      name: 'General Gynecology',
      slug: 'gynecology',
    });

    mockPrisma.appointmentRequest.create.mockResolvedValue({
      id: 'appt-123',
      referenceId: 'BLS-99AA88',
      patientName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1 555-0123',
      serviceId: 'srv-1',
      preferredDoctorId: null,
      preferredDate: new Date(dateStr),
      preferredTime: 'Morning',
      reason: 'Routine checkup',
      status: 'REQUESTED',
      consent: true,
      createdAt: new Date(),
      service: { name: 'General Gynecology' },
      preferredDoctor: null,
    });

    const result = await service.createAppointment({
      patientName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1 555-0123',
      serviceId: 'gynecology',
      preferredDate: dateStr,
      preferredTime: 'Morning',
      reason: 'Routine checkup',
      consent: true,
    });

    expect(result.success).toBe(true);
    expect(result.data.status).toBe('REQUESTED');
    expect(result.data.referenceId).toBe('BLS-99AA88');
    expect(result.data.patientName).toBe('Jane Doe');
  });
});

