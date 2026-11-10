import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatientBookAppointmentDto {
  @ApiProperty({ example: 'UUID of service' })
  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @ApiPropertyOptional({ example: 'UUID of doctor' })
  @IsOptional()
  @IsString()
  doctorId?: string;

  @ApiProperty({ example: '2026-11-25' })
  @IsDateString()
  preferredDate: string;

  @ApiPropertyOptional({ example: '10:00 AM' })
  @IsOptional()
  @IsString()
  preferredTimeSlot?: string;

  @ApiPropertyOptional({ example: 'Follow up on cycle irregular bleeding' })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class CreateSupportRequestDto {
  @ApiProperty({ example: 'Question regarding ultrasound preparation' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'MEDICAL_RECORDS', description: 'APPOINTMENTS, MEDICAL_RECORDS, BILLING, GENERAL' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Should I arrive fasting for tomorrow\'s pelvic ultrasound scan?' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreatePaymentOrderDto {
  @ApiProperty({ example: 'UUID of invoice' })
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}

export class VerifyPaymentDto {
  @ApiProperty({ example: 'order_Kj29aL81b9' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ example: 'pay_L189211' })
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty({ example: 'signature_hex_digest' })
  @IsString()
  @IsNotEmpty()
  signature: string;
}

