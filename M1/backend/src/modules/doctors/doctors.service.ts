import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.doctor.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { slug },
    });
    if (!doctor || !doctor.isActive) {
      throw new NotFoundException(`Doctor with slug "${slug}" not found`);
    }
    return doctor;
  }
}

