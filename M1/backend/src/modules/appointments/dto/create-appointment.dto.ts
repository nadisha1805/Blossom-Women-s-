import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, Matches, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Full name of patient', example: 'Sarah Jenkins' })
  @IsString()
  @IsNotEmpty({ message: 'Patient name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100)
  patientName: string;

  @ApiProperty({ description: 'Email address of patient', example: 'sarah.jenkins@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ description: 'Contact phone number', example: '+1 555-0199' })
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^[\+]?[\d\s\-\(\)]{7,20}$/, { message: 'Please provide a valid phone number' })
  phone: string;

  @ApiProperty({ description: 'Target healthcare service ID or slug', example: 'gynecology' })
  @IsString()
  @IsNotEmpty({ message: 'Service selection is required' })
  serviceId: string;

  @ApiPropertyOptional({ description: 'Target preferred doctor ID or slug (optional)', example: 'dr-priya-sharma' })
  @IsOptional()
  @IsString()
  preferredDoctorId?: string;

  @ApiProperty({ description: 'Preferred appointment date (ISO 8601 string)', example: '2026-11-20' })
  @IsString()
  @IsNotEmpty({ message: 'Preferred date is required' })
  preferredDate: string;

  @ApiPropertyOptional({ description: 'Preferred time interval', example: 'Morning (9:00 AM – 12:00 PM)' })
  @IsOptional()
  @IsString()
  preferredTime?: string;

  @ApiPropertyOptional({ description: 'Reason for visit (non-sensitive general note)', example: 'Annual wellness checkup' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  @ApiProperty({ description: 'Consent confirmation for personal data processing', example: true })
  @IsBoolean()
  consent: boolean;
}

