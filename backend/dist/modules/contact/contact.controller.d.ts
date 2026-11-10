import { ContactService } from './contact.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        id: string;
    }>;
}
