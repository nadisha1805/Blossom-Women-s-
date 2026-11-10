import { ConsultationStatus } from '@prisma/client';
export declare class SaveConsultationDto {
    appointmentId: string;
    chiefComplaint: string;
    symptoms?: string;
    clinicalFindings?: string;
    diagnosis: string;
    treatmentPlan: string;
    specialtyType?: string;
    specialtyDetails?: any;
    status?: ConsultationStatus;
    followUpDate?: string;
    followUpNotes?: string;
}
export declare class AmendConsultationDto {
    reason: string;
    amendedFields: Partial<SaveConsultationDto>;
}
