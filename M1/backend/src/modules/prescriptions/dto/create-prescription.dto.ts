import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PrescriptionItemDto {
  @ApiProperty({ example: 'Medroxyprogesterone acetate' })
  @IsString()
  @IsNotEmpty()
  medicationName: string;

  @ApiProperty({ example: '10 mg' })
  @IsString()
  @IsNotEmpty()
  dosage: string;

  @ApiProperty({ example: 'Once daily for 10 days' })
  @IsString()
  @IsNotEmpty()
  frequency: string;

  @ApiProperty({ example: '10 days' })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiPropertyOptional({ example: 'Take with evening meal' })
  @IsOptional()
  @IsString()
  instructions?: string;
}

export class CreatePrescriptionDto {
  @ApiProperty({ example: 'UUID of patient' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({ example: 'UUID of consultation' })
  @IsOptional()
  @IsString()
  consultationId?: string;

  @ApiPropertyOptional({ example: 'Ensure follow-up after completing cycle.' })
  @IsOptional()
  @IsString()
  clinicalNotes?: string;

  @ApiProperty({ type: [PrescriptionItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PrescriptionItemDto)
  items: PrescriptionItemDto[];
}

