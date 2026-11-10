var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiagnosticStatus } from '@prisma/client';
export class CreateDiagnosticOrderDto {
    patientId;
    orderingDoctorId;
    consultationId;
    testName;
    testCategory;
    standardPrice;
}
__decorate([
    ApiProperty({ example: 'UUID of patient' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateDiagnosticOrderDto.prototype, "patientId", void 0);
__decorate([
    ApiProperty({ example: 'UUID of ordering doctor' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateDiagnosticOrderDto.prototype, "orderingDoctorId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'UUID of consultation' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateDiagnosticOrderDto.prototype, "consultationId", void 0);
__decorate([
    ApiProperty({ example: 'Pelvic Ultrasound (Transvaginal)' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateDiagnosticOrderDto.prototype, "testName", void 0);
__decorate([
    ApiProperty({ example: 'IMAGING', description: 'IMAGING, PATHOLOGY, ENDOCRINE, CYTOLOGY' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateDiagnosticOrderDto.prototype, "testCategory", void 0);
__decorate([
    ApiPropertyOptional({ example: 85.0 }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateDiagnosticOrderDto.prototype, "standardPrice", void 0);
export class UpdateDiagnosticOrderDto {
    status;
    resultsNotes;
    reportUrl;
    isReviewed;
}
__decorate([
    ApiPropertyOptional({ enum: DiagnosticStatus, example: 'COMPLETED' }),
    IsOptional(),
    IsEnum(DiagnosticStatus),
    __metadata("design:type", String)
], UpdateDiagnosticOrderDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Uterus normal size, endometrial thickness 8mm, multiple small peripheral follicles consistent with PCOS pattern.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDiagnosticOrderDto.prototype, "resultsNotes", void 0);
__decorate([
    ApiPropertyOptional({ example: '/reports/ultrasound-1002.pdf' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDiagnosticOrderDto.prototype, "reportUrl", void 0);
__decorate([
    ApiPropertyOptional({ example: true }),
    IsOptional(),
    __metadata("design:type", Boolean)
], UpdateDiagnosticOrderDto.prototype, "isReviewed", void 0);
//# sourceMappingURL=diagnostic-order.dto.js.map