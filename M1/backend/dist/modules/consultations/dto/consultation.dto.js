var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsObject, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConsultationStatus } from '@prisma/client';
export class SaveConsultationDto {
    appointmentId;
    chiefComplaint;
    symptoms;
    clinicalFindings;
    diagnosis;
    treatmentPlan;
    specialtyType;
    specialtyDetails;
    status;
    followUpDate;
    followUpNotes;
}
__decorate([
    ApiProperty({ example: 'UUID of appointment' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "appointmentId", void 0);
__decorate([
    ApiProperty({ example: 'Irregular cycles and pelvic discomfort' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "chiefComplaint", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Reports 45-day cycles, mild pelvic cramping, acne flare-ups.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "symptoms", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Abdomen soft, non-tender. Pelvic exam normal, no adnexal tenderness.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "clinicalFindings", void 0);
__decorate([
    ApiProperty({ example: 'Polycystic Ovary Syndrome (PCOS) - Phenotype B' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "diagnosis", void 0);
__decorate([
    ApiProperty({ example: '1. Low-glycemic dietary adjustments. 2. Cyclic progestin. 3. Pelvic ultrasound scheduled.' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "treatmentPlan", void 0);
__decorate([
    ApiPropertyOptional({ example: 'PCOS', description: 'Specialty category: GYNECOLOGY, OBSTETRICS_ANTENATAL, PCOS, MENOPAUSE, FERTILITY' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "specialtyType", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Specialty structured fields (e.g. LMP, cycle interval, gestational age)' }),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], SaveConsultationDto.prototype, "specialtyDetails", void 0);
__decorate([
    ApiPropertyOptional({ enum: ConsultationStatus, example: 'DRAFT' }),
    IsOptional(),
    IsEnum(ConsultationStatus),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ example: '2026-12-20' }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "followUpDate", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Review ultrasound scans and cycle response in 4 weeks.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], SaveConsultationDto.prototype, "followUpNotes", void 0);
export class AmendConsultationDto {
    reason;
    amendedFields;
}
__decorate([
    ApiProperty({ example: 'Correction of diagnostic wording following lab review.' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], AmendConsultationDto.prototype, "reason", void 0);
__decorate([
    ApiProperty(),
    IsObject(),
    __metadata("design:type", Object)
], AmendConsultationDto.prototype, "amendedFields", void 0);
//# sourceMappingURL=consultation.dto.js.map