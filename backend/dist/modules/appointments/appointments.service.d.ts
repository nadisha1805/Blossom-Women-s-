import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
export declare class AppointmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateReferenceId(): string;
    createAppointment(dto: CreateAppointmentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            referenceId: string;
            patientName: string;
            service: string;
            preferredDoctor: string | null;
            preferredDate: Date;
            preferredTime: string | null;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            createdAt: Date;
        };
    }>;
    getAppointmentByReference(referenceId: string): Promise<{
        referenceId: string;
        patientName: string;
        service: string;
        preferredDoctor: string | null;
        preferredDate: Date;
        preferredTime: string | null;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        createdAt: Date;
    }>;
}
