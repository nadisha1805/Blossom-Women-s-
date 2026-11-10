export declare class CreateAppointmentDto {
    patientName: string;
    email: string;
    phone: string;
    serviceId: string;
    preferredDoctorId?: string;
    preferredDate: string;
    preferredTime?: string;
    reason?: string;
    consent: boolean;
}
