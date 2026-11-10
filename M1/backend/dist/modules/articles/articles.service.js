var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category) {
        return this.prisma.article.findMany({
            where: {
                published: true,
                ...(category ? { category } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findBySlug(slug) {
        const article = await this.prisma.article.findUnique({
            where: { slug },
        });
        if (!article || !article.published) {
            throw new NotFoundException(`Article with slug "${slug}" not found`);
        }
        return article;
    }
};
ArticlesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ArticlesService);
export { ArticlesService };
//# sourceMappingURL=articles.service.js.map