import { PrismaService } from '../../prisma/prisma.service.js';
export declare class ServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        description: string;
        id: string;
        name: string;
        slug: string;
        benefits: string | null;
        whatToExpect: string | null;
        category: string | null;
        standardFee: import("@prisma/client/runtime/library").Decimal;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findBySlug(slug: string): Promise<{
        description: string;
        id: string;
        name: string;
        slug: string;
        benefits: string | null;
        whatToExpect: string | null;
        category: string | null;
        standardFee: import("@prisma/client/runtime/library").Decimal;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
