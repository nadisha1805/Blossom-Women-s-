import { ArticlesService } from './articles.service.js';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
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
