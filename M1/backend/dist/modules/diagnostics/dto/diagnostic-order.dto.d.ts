import { DiagnosticStatus } from '@prisma/client';
export declare class CreateDiagnosticOrderDto {
    patientId: string;
    orderingDoctorId: string;
    consultationId?: string;
    testName: string;
    testCategory: string;
    standardPrice?: number;
}
export declare class UpdateDiagnosticOrderDto {
    status?: DiagnosticStatus;
    resultsNotes?: string;
    reportUrl?: string;
    isReviewed?: boolean;
}
