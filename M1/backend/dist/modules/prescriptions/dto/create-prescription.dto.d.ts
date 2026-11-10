export declare class PrescriptionItemDto {
    medicationName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
}
export declare class CreatePrescriptionDto {
    patientId: string;
    consultationId?: string;
    clinicalNotes?: string;
    items: PrescriptionItemDto[];
}
