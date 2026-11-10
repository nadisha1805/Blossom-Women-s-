export declare class PatientBookAppointmentDto {
    serviceId: string;
    doctorId?: string;
    preferredDate: string;
    preferredTimeSlot?: string;
    reason?: string;
}
export declare class CreateSupportRequestDto {
    subject: string;
    category: string;
    description: string;
}
export declare class CreatePaymentOrderDto {
    invoiceId: string;
}
export declare class VerifyPaymentDto {
    orderId: string;
    paymentId: string;
    signature: string;
}
