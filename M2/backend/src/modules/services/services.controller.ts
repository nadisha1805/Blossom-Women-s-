import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ServicesService } from './services.service.js';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'List all active clinical services' })
  @ApiResponse({ status: 200, description: 'List of services' })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get service by slug' })
  @ApiParam({ name: 'slug', example: 'gynecology' })
  @ApiResponse({ status: 200, description: 'Service details' })
  @ApiResponse({ status: 404, description: 'Service not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.servicesService.findBySlug(slug);
  }
}

