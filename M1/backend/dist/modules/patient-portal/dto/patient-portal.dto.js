var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class PatientBookAppointmentDto {
    serviceId;
    doctorId;
    preferredDate;
    preferredTimeSlot;
    reason;
}
__decorate([
    ApiProperty({ example: 'UUID of service' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], PatientBookAppointmentDto.prototype, "serviceId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'UUID of doctor' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], PatientBookAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    ApiProperty({ example: '2026-11-25' }),
    IsDateString(),
    __metadata("design:type", String)
], PatientBookAppointmentDto.prototype, "preferredDate", void 0);
__decorate([
    ApiPropertyOptional({ example: '10:00 AM' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], PatientBookAppointmentDto.prototype, "preferredTimeSlot", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Follow up on cycle irregular bleeding' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], PatientBookAppointmentDto.prototype, "reason", void 0);
export class CreateSupportRequestDto {
    subject;
    category;
    description;
}
__decorate([
    ApiProperty({ example: 'Question regarding ultrasound preparation' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSupportRequestDto.prototype, "subject", void 0);
__decorate([
    ApiProperty({ example: 'MEDICAL_RECORDS', description: 'APPOINTMENTS, MEDICAL_RECORDS, BILLING, GENERAL' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSupportRequestDto.prototype, "category", void 0);
__decorate([
    ApiProperty({ example: 'Should I arrive fasting for tomorrow\'s pelvic ultrasound scan?' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSupportRequestDto.prototype, "description", void 0);
export class CreatePaymentOrderDto {
    invoiceId;
}
__decorate([
    ApiProperty({ example: 'UUID of invoice' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreatePaymentOrderDto.prototype, "invoiceId", void 0);
export class VerifyPaymentDto {
    orderId;
    paymentId;
    signature;
}
__decorate([
    ApiProperty({ example: 'order_Kj29aL81b9' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], VerifyPaymentDto.prototype, "orderId", void 0);
__decorate([
    ApiProperty({ example: 'pay_L189211' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], VerifyPaymentDto.prototype, "paymentId", void 0);
__decorate([
    ApiProperty({ example: 'signature_hex_digest' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], VerifyPaymentDto.prototype, "signature", void 0);
//# sourceMappingURL=patient-portal.dto.js.map