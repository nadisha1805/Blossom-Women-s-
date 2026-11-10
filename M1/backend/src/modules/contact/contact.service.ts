import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(dto: CreateContactDto) {
    if (!dto.consent) {
      throw new BadRequestException('Consent is required to submit a contact message');
    }

    const message = await this.prisma.contactMessage.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        phone: dto.phone?.trim() ?? null,
        subject: dto.subject.trim(),
        message: dto.message.trim(),
        consent: dto.consent,
      },
    });

    return {
      success: true,
      message: 'Your message has been received. Our clinic team will get back to you shortly.',
      id: message.id,
    };
  }
}

