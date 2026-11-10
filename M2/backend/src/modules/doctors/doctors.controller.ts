import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service.js';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'List all active doctors' })
  @ApiResponse({ status: 200, description: 'List of doctors' })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get doctor by slug' })
  @ApiParam({ name: 'slug', example: 'dr-priya-sharma' })
  @ApiResponse({ status: 200, description: 'Doctor profile' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.doctorsService.findBySlug(slug);
  }
}

