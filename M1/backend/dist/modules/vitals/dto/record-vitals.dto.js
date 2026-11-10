var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsInt, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class RecordVitalsDto {
    patientId;
    appointmentId;
    systolicBP;
    diastolicBP;
    heartRate;
    temperature;
    respiratoryRate;
    spO2;
    weightKg;
    heightCm;
    nursingNotes;
}
__decorate([
    ApiProperty({ example: 'UUID of patient' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RecordVitalsDto.prototype, "patientId", void 0);
__decorate([
    ApiPropertyOptional({ example: 'UUID of appointment' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RecordVitalsDto.prototype, "appointmentId", void 0);
__decorate([
    ApiPropertyOptional({ example: 120, description: 'Systolic blood pressure (mmHg)' }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "systolicBP", void 0);
__decorate([
    ApiPropertyOptional({ example: 80, description: 'Diastolic blood pressure (mmHg)' }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "diastolicBP", void 0);
__decorate([
    ApiPropertyOptional({ example: 74, description: 'Heart rate (beats/min)' }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "heartRate", void 0);
__decorate([
    ApiPropertyOptional({ example: 36.8, description: 'Body temperature (°C)' }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "temperature", void 0);
__decorate([
    ApiPropertyOptional({ example: 16, description: 'Respiratory rate (breaths/min)' }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "respiratoryRate", void 0);
__decorate([
    ApiPropertyOptional({ example: 99, description: 'Blood oxygen SpO2 (%)' }),
    IsOptional(),
    IsInt(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "spO2", void 0);
__decorate([
    ApiPropertyOptional({ example: 62.5, description: 'Weight (kg)' }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "weightKg", void 0);
__decorate([
    ApiPropertyOptional({ example: 165.0, description: 'Height (cm)' }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], RecordVitalsDto.prototype, "heightCm", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Patient alert and oriented, reports slight fatigue.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RecordVitalsDto.prototype, "nursingNotes", void 0);
//# sourceMappingURL=record-vitals.dto.js.map