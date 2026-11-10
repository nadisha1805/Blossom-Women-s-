import { ArticlesService } from './articles.service.js';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
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
