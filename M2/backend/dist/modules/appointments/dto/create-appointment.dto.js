var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, Matches, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateAppointmentDto {
    patientName;
    email;
    phone;
    serviceId;
    preferredDoctorId;
    preferredDate;
    preferredTime;
    reason;
    consent;
}
__decorate([
    ApiProperty({ description: 'Full name of patient', example: 'Sarah Jenkins' }),
    IsString(),
    IsNotEmpty({ message: 'Patient name is required' }),
    MinLength(2, { message: 'Name must be at least 2 characters' }),
    MaxLength(100),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "patientName", void 0);
__decorate([
    ApiProperty({ description: 'Email address of patient', example: 'sarah.jenkins@example.com' }),
    IsEmail({}, { message: 'Please provide a valid email address' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ description: 'Contact phone number', example: '+1 555-0199' }),
    IsString(),
    IsNotEmpty({ message: 'Phone number is required' }),
    Matches(/^[\+]?[\d\s\-\(\)]{7,20}$/, { message: 'Please provide a valid phone number' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "phone", void 0);
__decorate([
    ApiProperty({ description: 'Target healthcare service ID or slug', example: 'gynecology' }),
    IsString(),
    IsNotEmpty({ message: 'Service selection is required' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "serviceId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Target preferred doctor ID or slug (optional)', example: 'dr-priya-sharma' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "preferredDoctorId", void 0);
__decorate([
    ApiProperty({ description: 'Preferred appointment date (ISO 8601 string)', example: '2026-11-20' }),
    IsString(),
    IsNotEmpty({ message: 'Preferred date is required' }),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "preferredDate", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Preferred time interval', example: 'Morning (9:00 AM – 12:00 PM)' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "preferredTime", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Reason for visit (non-sensitive general note)', example: 'Annual wellness checkup' }),
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "reason", void 0);
__decorate([
    ApiProperty({ description: 'Consent confirmation for personal data processing', example: true }),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateAppointmentDto.prototype, "consent", void 0);
//# sourceMappingURL=create-appointment.dto.js.map