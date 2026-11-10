import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
export declare class ContactService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMessage(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        id: string;
    }>;
}
