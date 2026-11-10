var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ArticlesService } from './articles.service.js';
let ArticlesController = class ArticlesController {
    articlesService;
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    findAll(category) {
        return this.articlesService.findAll(category);
    }
    findBySlug(slug) {
        return this.articlesService.findBySlug(slug);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'List published educational articles' }),
    ApiQuery({ name: 'category', required: false, example: 'Hormonal Health' }),
    ApiResponse({ status: 200, description: 'List of articles' }),
    __param(0, Query('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findAll", null);
__decorate([
    Get(':slug'),
    ApiOperation({ summary: 'Get article by slug' }),
    ApiParam({ name: 'slug', example: 'understanding-pcos-symptoms-management' }),
    ApiResponse({ status: 200, description: 'Article content' }),
    ApiResponse({ status: 404, description: 'Article not found' }),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findBySlug", null);
ArticlesController = __decorate([
    ApiTags('Articles'),
    Controller('articles'),
    __metadata("design:paramtypes", [ArticlesService])
], ArticlesController);
export { ArticlesController };
//# sourceMappingURL=articles.controller.js.map