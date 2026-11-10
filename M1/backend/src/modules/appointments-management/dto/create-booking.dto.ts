import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';

export class CreateBookingDto {
  @ApiProperty({ example: 'PAT-10029 or UUID' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'UUID of doctor' })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: 'UUID of service' })
  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({ example: '2026-11-20' })
  @IsDateString()
  scheduledDate: string;

  @ApiProperty({ example: '10:30 AM' })
  @IsString()
  @IsNotEmpty()
  scheduledTimeSlot: string;

  @ApiPropertyOptional({ example: 'CONSULTATION' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 'Annual wellness exam' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ example: 'UUID of original appointment request if converting' })
  @IsOptional()
  @IsString()
  appointmentRequestId?: string;
}

export class UpdateAppointmentStatusDto {
  @ApiProperty({ enum: AppointmentStatus, example: 'CHECKED_IN' })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @ApiPropertyOptional({ example: 'Patient requested reschedule' })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}

