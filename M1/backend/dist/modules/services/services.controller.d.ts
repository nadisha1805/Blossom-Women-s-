import { ServicesService } from './services.service.js';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
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
