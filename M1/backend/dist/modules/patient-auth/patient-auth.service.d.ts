import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RegisterPatientAccountDto, LoginPatientAccountDto } from './dto/patient-auth.dto.js';
export declare class PatientAuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    generatePatientId(): string;
    register(dto: RegisterPatientAccountDto): Promise<{
        accessToken: string;
        patient: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            patientId: string;
        };
    }>;
    login(dto: LoginPatientAccountDto): Promise<{
        accessToken: string;
        patient: {
            id: string;
            email: string;
            fullName: string;
            phone: string;
            patientId: string | null;
        };
    }>;
    getProfile(accountId: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        dob: Date;
        isVerified: boolean;
        patientId: string | undefined;
        bloodGroup: string | null | undefined;
        allergies: string[] | undefined;
        medicalConditions: string[] | undefined;
        lastLoginAt: Date | null;
    }>;
}
