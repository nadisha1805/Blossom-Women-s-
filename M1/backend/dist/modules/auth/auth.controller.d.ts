import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.UserRole;
            doctorId: string | null;
            doctorName: string | null;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        doctorId: string | null;
        doctor: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
            qualification: string;
            specialty: string;
            experienceYears: number | null;
            biography: string;
            areasOfExpertise: string[];
            profileImage: string | null;
        } | null;
        lastLoginAt: Date | null;
    }>;
}
