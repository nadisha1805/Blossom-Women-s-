import { IsString, IsNotEmpty, IsOptional, IsEnum, IsObject, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConsultationStatus } from '@prisma/client';

export class SaveConsultationDto {
  @ApiProperty({ example: 'UUID of appointment' })
  @IsString()
  @IsNotEmpty()
  appointmentId: string;

  @ApiProperty({ example: 'Irregular cycles and pelvic discomfort' })
  @IsString()
  @IsNotEmpty()
  chiefComplaint: string;

  @ApiPropertyOptional({ example: 'Reports 45-day cycles, mild pelvic cramping, acne flare-ups.' })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiPropertyOptional({ example: 'Abdomen soft, non-tender. Pelvic exam normal, no adnexal tenderness.' })
  @IsOptional()
  @IsString()
  clinicalFindings?: string;

  @ApiProperty({ example: 'Polycystic Ovary Syndrome (PCOS) - Phenotype B' })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({ example: '1. Low-glycemic dietary adjustments. 2. Cyclic progestin. 3. Pelvic ultrasound scheduled.' })
  @IsString()
  @IsNotEmpty()
  treatmentPlan: string;

  @ApiPropertyOptional({ example: 'PCOS', description: 'Specialty category: GYNECOLOGY, OBSTETRICS_ANTENATAL, PCOS, MENOPAUSE, FERTILITY' })
  @IsOptional()
  @IsString()
  specialtyType?: string;

  @ApiPropertyOptional({ description: 'Specialty structured fields (e.g. LMP, cycle interval, gestational age)' })
  @IsOptional()
  @IsObject()
  specialtyDetails?: any;

  @ApiPropertyOptional({ enum: ConsultationStatus, example: 'DRAFT' })
  @IsOptional()
  @IsEnum(ConsultationStatus)
  status?: ConsultationStatus;

  @ApiPropertyOptional({ example: '2026-12-20' })
  @IsOptional()
  @IsDateString()
  followUpDate?: string;

  @ApiPropertyOptional({ example: 'Review ultrasound scans and cycle response in 4 weeks.' })
  @IsOptional()
  @IsString()
  followUpNotes?: string;
}

export class AmendConsultationDto {
  @ApiProperty({ example: 'Correction of diagnostic wording following lab review.' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsObject()
  amendedFields: Partial<SaveConsultationDto>;
}

