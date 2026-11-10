var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let ContactService = class ContactService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMessage(dto) {
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
};
ContactService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ContactService);
export { ContactService };
//# sourceMappingURL=contact.service.js.map