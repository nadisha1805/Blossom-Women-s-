import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateInvoiceDto, RecordPaymentDto } from './dto/billing.dto.js';
import { InvoiceStatus, PaymentMethod } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  generateInvoiceNumber(): string {
    const year = new Date().getFullYear();
    const seq = randomInt(1000, 9999);
    return `INV-${year}-${seq}`;
  }

  generateReceiptNumber(): string {
    const year = new Date().getFullYear();
    const seq = randomInt(1000, 9999);
    return `REC-${year}-${seq}`;
  }

  async createInvoice(dto: CreateInvoiceDto) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) {
      throw new NotFoundException(`Patient "${dto.patientId}" not found`);
    }

    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Invoice must have at least one billable item');
    }

    // Backend financial calculations
    let subtotal = 0;
    const calculatedItems = dto.items.map((it) => {
      const qty = it.quantity && it.quantity > 0 ? it.quantity : 1;
      const unit = Number(it.unitPrice);
      const total = qty * unit;
      subtotal += total;
      return {
        description: it.description.trim(),
        quantity: qty,
        unitPrice: unit,
        totalPrice: total,
      };
    });

    const discount = Number(dto.discount || 0);
    const tax = Number(dto.tax || 0);
    const total = Math.max(0, subtotal - discount + tax);
    const balance = total;

    let invoiceNumber = this.generateInvoiceNumber();
    let isUnique = false;
    while (!isUnique) {
      const match = await this.prisma.invoice.findUnique({ where: { invoiceNumber } });
      if (!match) isUnique = true;
      else invoiceNumber = this.generateInvoiceNumber();
    }

    return this.prisma.invoice.create({
      data: {
        invoiceNumber,
        patientId: dto.patientId,
        appointmentId: dto.appointmentId ?? null,
        subtotal,
        discount,
        tax,
        total,
        paidAmount: 0,
        balance,
        status: InvoiceStatus.PENDING,
        items: {
          create: calculatedItems,
        },
      },
      include: {
        patient: true,
        items: true,
        payments: true,
      },
    });
  }

  async recordPayment(dto: RecordPaymentDto, receivedByName?: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: dto.invoiceId },
      include: { payments: true },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice "${dto.invoiceId}" not found`);
    }

    const paymentAmount = Number(dto.amount);
    if (paymentAmount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }

    const currentBalance = Number(invoice.balance);
    if (paymentAmount > currentBalance) {
      throw new BadRequestException(
        `Payment amount ($${paymentAmount}) exceeds outstanding invoice balance ($${currentBalance})`,
      );
    }

    let receiptNumber = this.generateReceiptNumber();
    let isUnique = false;
    while (!isUnique) {
      const match = await this.prisma.payment.findUnique({ where: { receiptNumber } });
      if (!match) isUnique = true;
      else receiptNumber = this.generateReceiptNumber();
    }

    // Execute atomic transaction for financial integrity
    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          receiptNumber,
          invoiceId: dto.invoiceId,
          amount: paymentAmount,
          paymentMethod: dto.paymentMethod,
          transactionRef: dto.transactionRef?.trim() ?? null,
          receivedBy: receivedByName ?? null,
          notes: dto.notes?.trim() ?? null,
        },
      });

      const newPaidAmount = Number(invoice.paidAmount) + paymentAmount;
      const newBalance = Number(invoice.total) - newPaidAmount;
      const newStatus =
        newBalance <= 0 ? InvoiceStatus.PAID : InvoiceStatus.PARTIALLY_PAID;

      const updatedInvoice = await tx.invoice.update({
        where: { id: dto.invoiceId },
        data: {
          paidAmount: newPaidAmount,
          balance: newBalance,
          status: newStatus,
        },
        include: {
          patient: true,
          items: true,
          payments: true,
        },
      });

      return { payment, invoice: updatedInvoice };
    });
  }

  async findAll(query?: { patientId?: string; status?: InvoiceStatus }) {
    const where: any = {};
    if (query?.patientId) where.patientId = query.patientId;
    if (query?.status) where.status = query.status;

    return this.prisma.invoice.findMany({
      where,
      include: {
        patient: true,
        items: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        patient: true,
        appointment: { include: { doctor: true, service: true } },
        items: true,
        payments: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice "${id}" not found`);
    }

    return invoice;
  }
}

