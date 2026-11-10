import { PrismaService } from '../../prisma/prisma.service.js';
export declare class ArticlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string): Promise<{
        content: string;
        title: string;
        id: string;
        slug: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string;
        featuredImage: string | null;
        readTime: string | null;
        published: boolean;
    }[]>;
    findBySlug(slug: string): Promise<{
        content: string;
        title: string;
        id: string;
        slug: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        excerpt: string;
        featuredImage: string | null;
        readTime: string | null;
        published: boolean;
    }>;
}
