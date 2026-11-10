import { AppointmentStatus } from '@prisma/client';
export declare class CreateBookingDto {
    patientId: string;
    doctorId: string;
    serviceId: string;
    scheduledDate: string;
    scheduledTimeSlot: string;
    type?: string;
    reason?: string;
    appointmentRequestId?: string;
}
export declare class UpdateAppointmentStatusDto {
    status: AppointmentStatus;
    cancellationReason?: string;
}
