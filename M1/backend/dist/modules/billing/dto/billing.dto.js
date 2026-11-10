var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
export class InvoiceItemDto {
    description;
    quantity;
    unitPrice;
}
__decorate([
    ApiProperty({ example: 'Consultation Fee - Senior Gynecologist' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], InvoiceItemDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({ example: 1 }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], InvoiceItemDto.prototype, "quantity", void 0);
__decorate([
    ApiProperty({ example: 75.0 }),
    IsNumber(),
    __metadata("design:type", Number)
], InvoiceItemDto.prototype, "unitPrice", void 0);
export class CreateInvoiceDto {
    patientId;
    appointmentId;
    discount;
    tax;
    items;
}
__decorate([
    ApiProperty({ example: 'UUID of patient' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "patientId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'UUID of appointment' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "appointmentId", void 0);
__decorate([
    ApiPropertyOptional({ example: 0.0 }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "discount", void 0);
__decorate([
    ApiPropertyOptional({ example: 0.0 }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "tax", void 0);
__decorate([
    ApiProperty({ type: [InvoiceItemDto] }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => InvoiceItemDto),
    __metadata("design:type", Array)
], CreateInvoiceDto.prototype, "items", void 0);
export class RecordPaymentDto {
    invoiceId;
    amount;
    paymentMethod;
    transactionRef;
    notes;
}
__decorate([
    ApiProperty({ example: 'UUID of invoice' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RecordPaymentDto.prototype, "invoiceId", void 0);
__decorate([
    ApiProperty({ example: 75.0 }),
    IsNumber(),
    __metadata("design:type", Number)
], RecordPaymentDto.prototype, "amount", void 0);
__decorate([
    ApiProperty({ enum: PaymentMethod, example: 'CARD' }),
    IsEnum(PaymentMethod),
    __metadata("design:type", String)
], RecordPaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    ApiPropertyOptional({ example: 'TXN-984210' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RecordPaymentDto.prototype, "transactionRef", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Paid in full at checkout counter' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RecordPaymentDto.prototype, "notes", void 0);
//# sourceMappingURL=billing.dto.js.map