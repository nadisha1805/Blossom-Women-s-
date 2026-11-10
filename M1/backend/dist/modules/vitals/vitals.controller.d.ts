import { VitalsService } from './vitals.service.js';
import { RecordVitalsDto } from './dto/record-vitals.dto.js';
export declare class VitalsController {
    private readonly vitalsService;
    constructor(vitalsService: VitalsService);
    recordVitals(dto: RecordVitalsDto, staffId: string): Promise<{
        recordedBy: {
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        id: string;
        patientId: string;
        recordedAt: Date;
        appointmentId: string | null;
        recordedById: string;
        systolicBP: number | null;
        diastolicBP: number | null;
        heartRate: number | null;
        temperature: import("@prisma/client/runtime/library").Decimal | null;
        respiratoryRate: number | null;
        spO2: number | null;
        weightKg: import("@prisma/client/runtime/library").Decimal | null;
        heightCm: import("@prisma/client/runtime/library").Decimal | null;
        bmi: import("@prisma/client/runtime/library").Decimal | null;
        nursingNotes: string | null;
    }>;
    findByPatient(patientId: string): Promise<({
        recordedBy: {
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        id: string;
        patientId: string;
        recordedAt: Date;
        appointmentId: string | null;
        recordedById: string;
        systolicBP: number | null;
        diastolicBP: number | null;
        heartRate: number | null;
        temperature: import("@prisma/client/runtime/library").Decimal | null;
        respiratoryRate: number | null;
        spO2: number | null;
        weightKg: import("@prisma/client/runtime/library").Decimal | null;
        heightCm: import("@prisma/client/runtime/library").Decimal | null;
        bmi: import("@prisma/client/runtime/library").Decimal | null;
        nursingNotes: string | null;
    })[]>;
}
