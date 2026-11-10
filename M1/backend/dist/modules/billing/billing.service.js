var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { InvoiceStatus } from '@prisma/client';
import { randomInt } from 'crypto';
let BillingService = class BillingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        return `INV-${year}-${seq}`;
    }
    generateReceiptNumber() {
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        return `REC-${year}-${seq}`;
    }
    async createInvoice(dto) {
        const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
        if (!patient) {
            throw new NotFoundException(`Patient "${dto.patientId}" not found`);
        }
        if (!dto.items || dto.items.length === 0) {
            throw new BadRequestException('Invoice must have at least one billable item');
        }
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
            if (!match)
                isUnique = true;
            else
                invoiceNumber = this.generateInvoiceNumber();
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
    async recordPayment(dto, receivedByName) {
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
            throw new BadRequestException(`Payment amount ($${paymentAmount}) exceeds outstanding invoice balance ($${currentBalance})`);
        }
        let receiptNumber = this.generateReceiptNumber();
        let isUnique = false;
        while (!isUnique) {
            const match = await this.prisma.payment.findUnique({ where: { receiptNumber } });
            if (!match)
                isUnique = true;
            else
                receiptNumber = this.generateReceiptNumber();
        }
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
            const newStatus = newBalance <= 0 ? InvoiceStatus.PAID : InvoiceStatus.PARTIALLY_PAID;
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
    async findAll(query) {
        const where = {};
        if (query?.patientId)
            where.patientId = query.patientId;
        if (query?.status)
            where.status = query.status;
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
    async findOne(id) {
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
};
BillingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BillingService);
export { BillingService };
//# sourceMappingURL=billing.service.js.map