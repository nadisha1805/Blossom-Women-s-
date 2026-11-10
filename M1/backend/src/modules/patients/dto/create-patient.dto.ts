import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Eleanor Vance' })
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @ApiProperty({ example: '1992-05-14' })
  @IsDateString({}, { message: 'Date of birth must be a valid ISO date string' })
  dob: string;

  @ApiPropertyOptional({ example: 'Female' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'O+' })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiProperty({ example: '+1 555-0188' })
  @IsString()
  @IsNotEmpty({ message: 'Contact phone number is required' })
  phone: string;

  @ApiPropertyOptional({ example: 'eleanor.vance@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '14 Blossom Lane, Suite 2B' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Thomas Vance' })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: '+1 555-0199' })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiPropertyOptional({ example: ['Penicillin', 'Sulfa drugs'] })
  @IsOptional()
  @IsArray()
  allergies?: string[];

  @ApiPropertyOptional({ example: ['PCOS', 'Mild asthma'] })
  @IsOptional()
  @IsArray()
  medicalConditions?: string[];

  @ApiPropertyOptional({ example: ['Metformin 500mg'] })
  @IsOptional()
  @IsArray()
  currentMedications?: string[];

  @ApiPropertyOptional({ example: 'No major prior hospitalizations.' })
  @IsOptional()
  @IsString()
  medicalHistory?: string;

  @ApiPropertyOptional({ example: '28-day cycle, moderate flow, day 1 dysmenorrhea.' })
  @IsOptional()
  @IsString()
  menstrualHistory?: string;

  @ApiPropertyOptional({ example: 'Gravida 1, Para 0.' })
  @IsOptional()
  @IsString()
  pregnancyHistory?: string;

  @ApiPropertyOptional({ example: 'Appendectomy in 2018.' })
  @IsOptional()
  @IsString()
  previousSurgeries?: string;
}

