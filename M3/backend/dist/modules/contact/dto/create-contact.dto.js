var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateContactDto {
    name;
    email;
    phone;
    subject;
    message;
    consent;
}
__decorate([
    ApiProperty({ description: 'Full name', example: 'Maya Patel' }),
    IsString(),
    IsNotEmpty({ message: 'Name is required' }),
    MaxLength(100),
    __metadata("design:type", String)
], CreateContactDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: 'Contact email address', example: 'maya.patel@example.com' }),
    IsEmail({}, { message: 'Valid email address is required' }),
    __metadata("design:type", String)
], CreateContactDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Contact phone number (optional)', example: '+1 555-0144' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateContactDto.prototype, "phone", void 0);
__decorate([
    ApiProperty({ description: 'Subject of the enquiry', example: 'General clinic inquiry' }),
    IsString(),
    IsNotEmpty({ message: 'Subject is required' }),
    MaxLength(200),
    __metadata("design:type", String)
], CreateContactDto.prototype, "subject", void 0);
__decorate([
    ApiProperty({ description: 'Message body', example: 'Hello, I would like to inquire about opening hours.' }),
    IsString(),
    IsNotEmpty({ message: 'Message is required' }),
    MaxLength(2000),
    __metadata("design:type", String)
], CreateContactDto.prototype, "message", void 0);
__decorate([
    ApiProperty({ description: 'Consent confirmation for personal data handling', example: true }),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateContactDto.prototype, "consent", void 0);
//# sourceMappingURL=create-contact.dto.js.map