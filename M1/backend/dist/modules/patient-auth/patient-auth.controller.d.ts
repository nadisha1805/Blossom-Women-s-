import { PatientAuthService } from './patient-auth.service.js';
import { RegisterPatientAccountDto, LoginPatientAccountDto } from './dto/patient-auth.dto.js';
export declare class PatientAuthController {
    private readonly patientAuthService;
    constructor(patientAuthService: PatientAuthService);
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
