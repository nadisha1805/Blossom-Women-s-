import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
            name: string;
            slug: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
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
