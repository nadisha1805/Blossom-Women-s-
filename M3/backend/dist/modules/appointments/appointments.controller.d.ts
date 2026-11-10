import { AppointmentsService } from './appointments.service.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(dto: CreateAppointmentDto): Promise<{
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
    getByReference(referenceId: string): Promise<{
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
