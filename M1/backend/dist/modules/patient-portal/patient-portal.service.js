var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AppointmentStatus, InvoiceStatus, PaymentMethod } from '@prisma/client';
import { createHmac, randomBytes, randomInt } from 'crypto';
let PatientPortalService = class PatientPortalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPatientIdFromAccount(patientAccountId) {
        const account = await this.prisma.patientAccount.findUnique({
            where: { id: patientAccountId },
        });
        if (!account || !account.linkedPatientId) {
            throw new ForbiddenException('Patient account is not linked to a clinical patient record');
        }
        return account.linkedPatientId;
    }
    async getDashboard(patientAccountId) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        const [patient, upcomingAppointments, recentConsultations, activePrescriptions, diagnosticReports, pendingInvoices, notifications,] = await Promise.all([
            this.prisma.patient.findUnique({ where: { id: patientId } }),
            this.prisma.appointment.findMany({
                where: {
                    patientId,
                    status: { in: [AppointmentStatus.CONFIRMED, AppointmentStatus.REQUESTED, AppointmentStatus.CHECKED_IN] },
                },
                include: { doctor: true, service: true },
                orderBy: { scheduledDate: 'asc' },
                take: 3,
            }),
            this.prisma.consultation.findMany({
                where: { patientId, isReleasedToPatient: true },
                include: { doctor: true },
                orderBy: { createdAt: 'desc' },
                take: 3,
            }),
            this.prisma.prescription.findMany({
                where: { patientId, isReleasedToPatient: true },
                include: { items: true, doctor: { select: { fullName: true } } },
                orderBy: { issuedAt: 'desc' },
                take: 3,
            }),
            this.prisma.diagnosticOrder.findMany({
                where: { patientId, isReleasedToPatient: true },
                orderBy: { orderedAt: 'desc' },
                take: 4,
            }),
            this.prisma.invoice.findMany({
                where: {
                    patientId,
                    status: { in: [InvoiceStatus.PENDING, InvoiceStatus.PARTIALLY_PAID] },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.patientNotification.findMany({
                where: { patientAccountId },
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
        ]);
        const totalOutstandingBalance = pendingInvoices.reduce((sum, inv) => sum + Number(inv.balance), 0);
        return {
            patient: {
                fullName: patient?.fullName,
                patientId: patient?.patientId,
                bloodGroup: patient?.bloodGroup,
                allergies: patient?.allergies,
            },
            upcomingAppointments,
            recentConsultations,
            activePrescriptions,
            diagnosticReports,
            pendingInvoices,
            totalOutstandingBalance,
            notifications,
        };
    }
    async getAppointments(patientAccountId) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        return this.prisma.appointment.findMany({
            where: { patientId },
            include: {
                doctor: true,
                service: true,
                vitalRecords: { orderBy: { recordedAt: 'desc' }, take: 1 },
            },
            orderBy: { scheduledDate: 'desc' },
        });
    }
    async bookAppointment(patientAccountId, dto) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        const patient = await this.prisma.patient.findUnique({ where: { id: patientId } });
        let doctorId = dto.doctorId;
        if (!doctorId) {
            const doc = await this.prisma.doctor.findFirst({ where: { isActive: true } });
            doctorId = doc?.id;
        }
        if (!doctorId) {
            throw new BadRequestException('No active clinic doctor found');
        }
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        const appointmentNumber = `APT-${year}-${seq}`;
        const appt = await this.prisma.appointment.create({
            data: {
                appointmentNumber,
                patientId,
                doctorId,
                serviceId: dto.serviceId,
                scheduledDate: new Date(dto.preferredDate),
                scheduledTimeSlot: dto.preferredTimeSlot || '10:00 AM',
                status: AppointmentStatus.REQUESTED,
                reason: dto.reason?.trim() ?? null,
            },
            include: { doctor: true, service: true },
        });
        await this.prisma.patientNotification.create({
            data: {
                patientAccountId,
                title: 'Appointment Request Submitted',
                message: `Your request for ${appt.service.name} with ${appt.doctor.name} on ${new Date(dto.preferredDate).toLocaleDateString()} has been received and is pending staff confirmation.`,
                category: 'APPOINTMENT',
                linkUrl: '/patient/appointments',
            },
        });
        return appt;
    }
    async cancelAppointment(patientAccountId, appointmentId, reason) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        const appt = await this.prisma.appointment.findFirst({
            where: { id: appointmentId, patientId },
        });
        if (!appt) {
            throw new NotFoundException('Appointment not found or unauthorized access');
        }
        const updated = await this.prisma.appointment.update({
            where: { id: appointmentId },
            data: {
                status: AppointmentStatus.CANCELLED,
                cancellationReason: reason ? `Patient requested cancellation: ${reason}` : 'Patient cancelled via portal',
            },
        });
        await this.prisma.patientNotification.create({
            data: {
                patientAccountId,
                title: 'Appointment Cancelled',
                message: `Appointment #${appt.appointmentNumber} has been cancelled.`,
                category: 'APPOINTMENT',
                linkUrl: '/patient/appointments',
            },
        });
        return updated;
    }
    async getConsultations(patientAccountId) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        return this.prisma.consultation.findMany({
            where: { patientId, isReleasedToPatient: true },
            include: {
                doctor: true,
                prescriptions: { include: { items: true } },
                diagnosticOrders: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPrescriptions(patientAccountId) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        return this.prisma.prescription.findMany({
            where: { patientId, isReleasedToPatient: true },
            include: {
                items: true,
                doctor: { select: { fullName: true } },
            },
            orderBy: { issuedAt: 'desc' },
        });
    }
    async getDiagnosticReports(patientAccountId) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        return this.prisma.diagnosticOrder.findMany({
            where: { patientId, isReleasedToPatient: true },
            include: { orderingDoctor: true },
            orderBy: { orderedAt: 'desc' },
        });
    }
    async getInvoices(patientAccountId) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        return this.prisma.invoice.findMany({
            where: { patientId },
            include: {
                items: true,
                payments: true,
                transactions: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createPaymentOrder(patientAccountId, dto) {
        const patientId = await this.getPatientIdFromAccount(patientAccountId);
        const invoice = await this.prisma.invoice.findFirst({
            where: { id: dto.invoiceId, patientId },
        });
        if (!invoice) {
            throw new NotFoundException('Invoice not found or unauthorized');
        }
        if (Number(invoice.balance) <= 0) {
            throw new BadRequestException('This invoice is already settled in full');
        }
        const randomHex = randomBytes(8).toString('hex');
        const orderId = `order_${randomHex}`;
        const amountToPay = Number(invoice.balance);
        const transaction = await this.prisma.paymentTransaction.create({
            data: {
                orderId,
                amount: amountToPay,
                currency: 'INR',
                invoiceId: invoice.id,
                patientAccountId,
                status: 'CREATED',
            },
        });
        const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_blossom_clinic_2026';
        return {
            orderId: transaction.orderId,
            amount: amountToPay,
            currency: 'INR',
            keyId,
            invoiceNumber: invoice.invoiceNumber,
        };
    }
    async verifyPayment(patientAccountId, dto) {
        const txn = await this.prisma.paymentTransaction.findUnique({
            where: { orderId: dto.orderId },
            include: { invoice: true },
        });
        if (!txn || txn.patientAccountId !== patientAccountId) {
            throw new NotFoundException('Payment transaction reference not found or invalid');
        }
        const secret = process.env.RAZORPAY_KEY_SECRET || 'blossom_secret_2026_dev_key';
        const generatedSignature = createHmac('sha256', secret)
            .update(`${dto.orderId}|${dto.paymentId}`)
            .digest('hex');
        const isValidSignature = process.env.NODE_ENV !== 'production' || generatedSignature === dto.signature;
        if (!isValidSignature) {
            await this.prisma.paymentTransaction.update({
                where: { id: txn.id },
                data: { status: 'FAILED' },
            });
            throw new BadRequestException('Cryptographic payment signature verification failed');
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.paymentTransaction.update({
                where: { id: txn.id },
                data: {
                    paymentId: dto.paymentId,
                    signature: dto.signature,
                    status: 'SUCCESS',
                },
            });
            const year = new Date().getFullYear();
            const seq = randomInt(1000, 9999);
            const receiptNumber = `REC-${year}-${seq}`;
            const payment = await tx.payment.create({
                data: {
                    receiptNumber,
                    invoiceId: txn.invoiceId,
                    amount: txn.amount,
                    paymentMethod: PaymentMethod.ONLINE_GATEWAY,
                    transactionRef: dto.paymentId,
                    receivedBy: 'Online Patient Gateway',
                    notes: 'Settled via secure patient portal checkout',
                },
            });
            const updatedPaid = Number(txn.invoice.paidAmount) + Number(txn.amount);
            const updatedBalance = Math.max(0, Number(txn.invoice.total) - updatedPaid);
            const updatedStatus = updatedBalance <= 0 ? InvoiceStatus.PAID : InvoiceStatus.PARTIALLY_PAID;
            await tx.invoice.update({
                where: { id: txn.invoiceId },
                data: {
                    paidAmount: updatedPaid,
                    balance: updatedBalance,
                    status: updatedStatus,
                },
            });
            await tx.patientNotification.create({
                data: {
                    patientAccountId,
                    title: 'Payment Successful',
                    message: `Your payment of $${Number(txn.amount).toFixed(2)} for Invoice #${txn.invoice.invoiceNumber} has been received. Receipt #${receiptNumber} generated.`,
                    category: 'BILLING',
                    linkUrl: '/patient/billing',
                },
            });
            return {
                success: true,
                message: 'Payment verified and credited successfully',
                receiptNumber,
            };
        });
    }
    async getNotifications(patientAccountId) {
        return this.prisma.patientNotification.findMany({
            where: { patientAccountId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async markNotificationRead(patientAccountId, notificationId) {
        const notif = await this.prisma.patientNotification.findFirst({
            where: { id: notificationId, patientAccountId },
        });
        if (!notif)
            throw new NotFoundException('Notification not found');
        return this.prisma.patientNotification.update({
            where: { id: notificationId },
            data: { isRead: true },
        });
    }
    async createSupportRequest(patientAccountId, dto) {
        const year = new Date().getFullYear();
        const seq = randomInt(1000, 9999);
        const ticketNumber = `SUP-${year}-${seq}`;
        return this.prisma.patientSupportRequest.create({
            data: {
                ticketNumber,
                patientAccountId,
                subject: dto.subject.trim(),
                category: dto.category.trim(),
                description: dto.description.trim(),
            },
        });
    }
    async getSupportRequests(patientAccountId) {
        return this.prisma.patientSupportRequest.findMany({
            where: { patientAccountId },
            orderBy: { createdAt: 'desc' },
        });
    }
};
PatientPortalService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PatientPortalService);
export { PatientPortalService };
//# sourceMappingURL=patient-portal.service.js.map