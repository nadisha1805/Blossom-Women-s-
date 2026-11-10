import { PrismaService } from '../../prisma/prisma.service.js';
export declare class ServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        benefits: string | null;
        whatToExpect: string | null;
        category: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findBySlug(slug: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string;
        benefits: string | null;
        whatToExpect: string | null;
        category: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
