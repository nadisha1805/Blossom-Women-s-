var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class PrescriptionItemDto {
    medicationName;
    dosage;
    frequency;
    duration;
    instructions;
}
__decorate([
    ApiProperty({ example: 'Medroxyprogesterone acetate' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "medicationName", void 0);
__decorate([
    ApiProperty({ example: '10 mg' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "dosage", void 0);
__decorate([
    ApiProperty({ example: 'Once daily for 10 days' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "frequency", void 0);
__decorate([
    ApiProperty({ example: '10 days' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "duration", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Take with evening meal' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], PrescriptionItemDto.prototype, "instructions", void 0);
export class CreatePrescriptionDto {
    patientId;
    consultationId;
    clinicalNotes;
    items;
}
__decorate([
    ApiProperty({ example: 'UUID of patient' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "patientId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'UUID of consultation' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "consultationId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Ensure follow-up after completing cycle.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "clinicalNotes", void 0);
__decorate([
    ApiProperty({ type: [PrescriptionItemDto] }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => PrescriptionItemDto),
    __metadata("design:type", Array)
], CreatePrescriptionDto.prototype, "items", void 0);
//# sourceMappingURL=create-prescription.dto.js.map