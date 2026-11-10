import { PrismaService } from '../../prisma/prisma.service.js';
import { RecordVitalsDto } from './dto/record-vitals.dto.js';
export declare class VitalsService {
    private prisma;
    constructor(prisma: PrismaService);
    calculateBMI(weightKg?: number, heightCm?: number): number | null;
    recordVitals(dto: RecordVitalsDto, staffUserId: string): Promise<{
        recordedBy: {
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        patientId: string;
        appointmentId: string | null;
        systolicBP: number | null;
        diastolicBP: number | null;
        heartRate: number | null;
        temperature: import("@prisma/client/runtime/library").Decimal | null;
        respiratoryRate: number | null;
        spO2: number | null;
        weightKg: import("@prisma/client/runtime/library").Decimal | null;
        heightCm: import("@prisma/client/runtime/library").Decimal | null;
        nursingNotes: string | null;
        id: string;
        bmi: import("@prisma/client/runtime/library").Decimal | null;
        recordedAt: Date;
        recordedById: string;
    }>;
    findByPatient(patientId: string): Promise<({
        recordedBy: {
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    } & {
        patientId: string;
        appointmentId: string | null;
        systolicBP: number | null;
        diastolicBP: number | null;
        heartRate: number | null;
        temperature: import("@prisma/client/runtime/library").Decimal | null;
        respiratoryRate: number | null;
        spO2: number | null;
        weightKg: import("@prisma/client/runtime/library").Decimal | null;
        heightCm: import("@prisma/client/runtime/library").Decimal | null;
        nursingNotes: string | null;
        id: string;
        bmi: import("@prisma/client/runtime/library").Decimal | null;
        recordedAt: Date;
        recordedById: string;
    })[]>;
}
