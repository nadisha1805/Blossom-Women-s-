import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PatientPortalService } from './patient-portal.service.js';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { createHmac } from 'crypto';

describe('PatientPortalService', () => {
  let service: PatientPortalService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      patientAccount: { findUnique: vi.fn() },
      patient: { findUnique: vi.fn(), findFirst: vi.fn() },
      appointment: { findMany: vi.fn(), findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
      consultation: { findMany: vi.fn() },
      prescription: { findMany: vi.fn() },
      diagnosticOrder: { findMany: vi.fn() },
      invoice: { findMany: vi.fn(), findFirst: vi.fn(), update: vi.fn() },
      patientNotification: { findMany: vi.fn(), create: vi.fn(), findFirst: vi.fn(), update: vi.fn() },
      patientSupportRequest: { findMany: vi.fn(), create: vi.fn() },
      paymentTransaction: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
      payment: { create: vi.fn() },
      doctor: { findFirst: vi.fn() },
      $transaction: vi.fn((cb) => cb(mockPrisma)),
    };
    service = new PatientPortalService(mockPrisma as any);
  });

  it('should enforce IDOR protection when patient account is not linked', async () => {
    mockPrisma.patientAccount.findUnique.mockResolvedValue(null);

    await expect(service.getDashboard('unlinked-acc-id')).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should book appointment and create patient notification', async () => {
    mockPrisma.patientAccount.findUnique.mockResolvedValue({
      id: 'acc-1',
      linkedPatientId: 'pat-1',
    });
    mockPrisma.patient.findUnique.mockResolvedValue({ id: 'pat-1', fullName: 'Jane Doe' });
    mockPrisma.appointment.create.mockResolvedValue({
      id: 'appt-1',
      appointmentNumber: 'APT-2026-1234',
      service: { name: 'Prenatal Care' },
      doctor: { name: 'Dr. Sarah Jenkins' },
    });
    mockPrisma.patientNotification.create.mockResolvedValue({ id: 'notif-1' });

    const result = await service.bookAppointment('acc-1', {
      doctorId: 'doc-1',
      serviceId: 'srv-1',
      preferredDate: '2026-11-20',
      preferredTimeSlot: '10:00 AM',
      reason: 'Regular Checkup',
    });

    expect(result.appointmentNumber).toBe('APT-2026-1234');
    expect(mockPrisma.patientNotification.create).toHaveBeenCalled();
  });

  it('should prevent unauthorized cancellation of another patient appointment (IDOR protection)', async () => {
    mockPrisma.patientAccount.findUnique.mockResolvedValue({
      id: 'acc-1',
      linkedPatientId: 'pat-1',
    });
    // Appointment belongs to a different patient pat-2
    mockPrisma.appointment.findFirst.mockResolvedValue(null);

    await expect(
      service.cancelAppointment('acc-1', 'foreign-appt-id', 'Changed mind'),
    ).rejects.toThrow(NotFoundException);
  });

  it('should create payment order with gateway reference for unpaid invoice', async () => {
    mockPrisma.patientAccount.findUnique.mockResolvedValue({
      id: 'acc-1',
      linkedPatientId: 'pat-1',
    });
    mockPrisma.invoice.findFirst.mockResolvedValue({
      id: 'inv-1',
      patientId: 'pat-1',
      invoiceNumber: 'INV-2026-1001',
      balance: 150,
    });
    mockPrisma.paymentTransaction.create.mockImplementation(({ data }: any) =>
      Promise.resolve({ id: 'txn-1', ...data }),
    );

    const order = await service.createPaymentOrder('acc-1', { invoiceId: 'inv-1' });
    expect(order.orderId).toMatch(/^order_/);
    expect(order.amount).toBe(150);
    expect(order.invoiceNumber).toBe('INV-2026-1001');
  });

  it('should reject payment order creation if invoice has zero balance', async () => {
    mockPrisma.patientAccount.findUnique.mockResolvedValue({
      id: 'acc-1',
      linkedPatientId: 'pat-1',
    });
    mockPrisma.invoice.findFirst.mockResolvedValue({
      id: 'inv-1',
      patientId: 'pat-1',
      invoiceNumber: 'INV-2026-1001',
      balance: 0,
    });

    await expect(
      service.createPaymentOrder('acc-1', { invoiceId: 'inv-1' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should verify payment and credit invoice atomically', async () => {
    const orderId = 'order_test_123';
    const paymentId = 'pay_test_456';
    const secret = process.env.RAZORPAY_KEY_SECRET || 'blossom_secret_2026_dev_key';
    const signature = createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    mockPrisma.paymentTransaction.findUnique.mockResolvedValue({
      id: 'txn-1',
      orderId,
      amount: 150,
      patientAccountId: 'acc-1',
      invoiceId: 'inv-1',
      invoice: {
        id: 'inv-1',
        invoiceNumber: 'INV-2026-1001',
        paidAmount: 0,
        total: 150,
        balance: 150,
      },
    });

    mockPrisma.paymentTransaction.update.mockResolvedValue({});
    mockPrisma.payment.create.mockResolvedValue({ id: 'pay-rec-1' });
    mockPrisma.invoice.update.mockResolvedValue({});
    mockPrisma.patientNotification.create.mockResolvedValue({});

    const result = await service.verifyPayment('acc-1', {
      orderId,
      paymentId,
      signature,
    });

    expect(result.success).toBe(true);
    expect(result.receiptNumber).toMatch(/^REC-\d{4}-\d{4}$/);
  });
});

