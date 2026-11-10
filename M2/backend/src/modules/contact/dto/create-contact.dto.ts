import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ description: 'Full name', example: 'Maya Patel' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Contact email address', example: 'maya.patel@example.com' })
  @IsEmail({}, { message: 'Valid email address is required' })
  email: string;

  @ApiPropertyOptional({ description: 'Contact phone number (optional)', example: '+1 555-0144' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Subject of the enquiry', example: 'General clinic inquiry' })
  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  @MaxLength(200)
  subject: string;

  @ApiProperty({ description: 'Message body', example: 'Hello, I would like to inquire about opening hours.' })
  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  @MaxLength(2000)
  message: string;

  @ApiProperty({ description: 'Consent confirmation for personal data handling', example: true })
  @IsBoolean()
  consent: boolean;
}

