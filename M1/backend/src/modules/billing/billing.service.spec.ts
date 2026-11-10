import { describe, it, expect, beforeEach, vi } from 'vitest';
import { BillingService } from './billing.service.js';
import { BadRequestException } from '@nestjs/common';

describe('BillingService', () => {
  let service: BillingService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      patient: { findUnique: vi.fn() },
      invoice: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
      payment: { create: vi.fn(), findUnique: vi.fn() },
      $transaction: vi.fn((callback) => callback(mockPrisma)),
    };
    service = new BillingService(mockPrisma as any);
  });

  it('should generate invoice number starting with INV-', () => {
    const invNum = service.generateInvoiceNumber();
    expect(invNum).toMatch(/^INV-\d{4}-\d{4}$/);
  });

  it('should correctly calculate subtotal and balance on invoice creation', async () => {
    mockPrisma.patient.findUnique.mockResolvedValue({ id: 'pat-1', fullName: 'Eleanor' });
    mockPrisma.invoice.findUnique.mockResolvedValue(null);
    mockPrisma.invoice.create.mockImplementation(({ data }: any) => Promise.resolve({ id: 'inv-1', ...data }));

    const res = await service.createInvoice({
      patientId: 'pat-1',
      discount: 10,
      tax: 5,
      items: [
        { description: 'Consultation', unitPrice: 80, quantity: 1 },
        { description: 'Ultrasound', unitPrice: 50, quantity: 1 },
      ],
    });

    expect(res.subtotal).toBe(130);
    expect(res.total).toBe(125); // 130 - 10 + 5
    expect(res.balance).toBe(125);
    expect(res.status).toBe('PENDING');
  });

  it('should reject payment if amount exceeds balance', async () => {
    mockPrisma.invoice.findUnique.mockResolvedValue({
      id: 'inv-1',
      total: 100,
      paidAmount: 50,
      balance: 50,
    });

    await expect(
      service.recordPayment({
        invoiceId: 'inv-1',
        amount: 80,
        paymentMethod: 'CARD' as any,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});

