import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class InvoiceItemDto {
  @ApiProperty({ example: 'Consultation Fee - Senior Gynecologist' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiProperty({ example: 75.0 })
  @IsNumber()
  unitPrice: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 'UUID of patient' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiPropertyOptional({ example: 'UUID of appointment' })
  @IsOptional()
  @IsString()
  appointmentId?: string;

  @ApiPropertyOptional({ example: 0.0 })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({ example: 0.0 })
  @IsOptional()
  @IsNumber()
  tax?: number;

  @ApiProperty({ type: [InvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}

export class RecordPaymentDto {
  @ApiProperty({ example: 'UUID of invoice' })
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @ApiProperty({ example: 75.0 })
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: PaymentMethod, example: 'CARD' })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional({ example: 'TXN-984210' })
  @IsOptional()
  @IsString()
  transactionRef?: string;

  @ApiPropertyOptional({ example: 'Paid in full at checkout counter' })
  @IsOptional()
  @IsString()
  notes?: string;
}

