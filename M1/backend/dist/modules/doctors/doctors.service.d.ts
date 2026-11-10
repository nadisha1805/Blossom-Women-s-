import { PrismaService } from '../../prisma/prisma.service.js';
export declare class DoctorsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
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
    }[]>;
    findBySlug(slug: string): Promise<{
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
    }>;
}
