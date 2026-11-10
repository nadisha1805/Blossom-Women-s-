import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecordVitalsDto {
  @ApiProperty({ example: 'UUID of patient' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({ example: 'UUID of appointment' })
  @IsOptional()
  @IsString()
  appointmentId?: string;

  @ApiPropertyOptional({ example: 120, description: 'Systolic blood pressure (mmHg)' })
  @IsOptional()
  @IsInt()
  systolicBP?: number;

  @ApiPropertyOptional({ example: 80, description: 'Diastolic blood pressure (mmHg)' })
  @IsOptional()
  @IsInt()
  diastolicBP?: number;

  @ApiPropertyOptional({ example: 74, description: 'Heart rate (beats/min)' })
  @IsOptional()
  @IsInt()
  heartRate?: number;

  @ApiPropertyOptional({ example: 36.8, description: 'Body temperature (°C)' })
  @IsOptional()
  @IsNumber()
  temperature?: number;

  @ApiPropertyOptional({ example: 16, description: 'Respiratory rate (breaths/min)' })
  @IsOptional()
  @IsInt()
  respiratoryRate?: number;

  @ApiPropertyOptional({ example: 99, description: 'Blood oxygen SpO2 (%)' })
  @IsOptional()
  @IsInt()
  spO2?: number;

  @ApiPropertyOptional({ example: 62.5, description: 'Weight (kg)' })
  @IsOptional()
  @IsNumber()
  weightKg?: number;

  @ApiPropertyOptional({ example: 165.0, description: 'Height (cm)' })
  @IsOptional()
  @IsNumber()
  heightCm?: number;

  @ApiPropertyOptional({ example: 'Patient alert and oriented, reports slight fatigue.' })
  @IsOptional()
  @IsString()
  nursingNotes?: string;
}

