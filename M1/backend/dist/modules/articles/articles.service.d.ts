import { PrismaService } from '../../prisma/prisma.service.js';
export declare class ArticlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string): Promise<{
        id: string;
        slug: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        title: string;
        excerpt: string;
        featuredImage: string | null;
        readTime: string | null;
        published: boolean;
    }[]>;
    findBySlug(slug: string): Promise<{
        id: string;
        slug: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        title: string;
        excerpt: string;
        featuredImage: string | null;
        readTime: string | null;
        published: boolean;
    }>;
}
