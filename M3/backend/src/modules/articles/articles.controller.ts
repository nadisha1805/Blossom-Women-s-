import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ArticlesService } from './articles.service.js';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: 'List published educational articles' })
  @ApiQuery({ name: 'category', required: false, example: 'Hormonal Health' })
  @ApiResponse({ status: 200, description: 'List of articles' })
  findAll(@Query('category') category?: string) {
    return this.articlesService.findAll(category);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get article by slug' })
  @ApiParam({ name: 'slug', example: 'understanding-pcos-symptoms-management' })
  @ApiResponse({ status: 200, description: 'Article content' })
  @ApiResponse({ status: 404, description: 'Article not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }
}

