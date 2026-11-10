import { PaymentMethod } from '@prisma/client';
export declare class InvoiceItemDto {
    description: string;
    quantity?: number;
    unitPrice: number;
}
export declare class CreateInvoiceDto {
    patientId: string;
    appointmentId?: string;
    discount?: number;
    tax?: number;
    items: InvoiceItemDto[];
}
export declare class RecordPaymentDto {
    invoiceId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    transactionRef?: string;
    notes?: string;
}
