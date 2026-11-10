import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiagnosticStatus } from '@prisma/client';

export class CreateDiagnosticOrderDto {
  @ApiProperty({ example: 'UUID of patient' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'UUID of ordering doctor' })
  @IsString()
  @IsNotEmpty()
  orderingDoctorId: string;

  @ApiPropertyOptional({ example: 'UUID of consultation' })
  @IsOptional()
  @IsString()
  consultationId?: string;

  @ApiProperty({ example: 'Pelvic Ultrasound (Transvaginal)' })
  @IsString()
  @IsNotEmpty()
  testName: string;

  @ApiProperty({ example: 'IMAGING', description: 'IMAGING, PATHOLOGY, ENDOCRINE, CYTOLOGY' })
  @IsString()
  @IsNotEmpty()
  testCategory: string;

  @ApiPropertyOptional({ example: 85.0 })
  @IsOptional()
  @IsNumber()
  standardPrice?: number;
}

export class UpdateDiagnosticOrderDto {
  @ApiPropertyOptional({ enum: DiagnosticStatus, example: 'COMPLETED' })
  @IsOptional()
  @IsEnum(DiagnosticStatus)
  status?: DiagnosticStatus;

  @ApiPropertyOptional({ example: 'Uterus normal size, endometrial thickness 8mm, multiple small peripheral follicles consistent with PCOS pattern.' })
  @IsOptional()
  @IsString()
  resultsNotes?: string;

  @ApiPropertyOptional({ example: '/reports/ultrasound-1002.pdf' })
  @IsOptional()
  @IsString()
  reportUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  isReviewed?: boolean;
}

