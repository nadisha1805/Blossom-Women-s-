import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a clinic contact message' })
  @ApiResponse({ status: 201, description: 'Message saved successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed or missing consent' })
  create(@Body() dto: CreateContactDto) {
    return this.contactService.createMessage(dto);
  }
}

