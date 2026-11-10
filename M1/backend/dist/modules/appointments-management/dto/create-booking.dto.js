var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '@prisma/client';
export class CreateBookingDto {
    patientId;
    doctorId;
    serviceId;
    scheduledDate;
    scheduledTimeSlot;
    type;
    reason;
    appointmentRequestId;
}
__decorate([
    ApiProperty({ example: 'PAT-10029 or UUID' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "patientId", void 0);
__decorate([
    ApiProperty({ example: 'UUID of doctor' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "doctorId", void 0);
__decorate([
    ApiProperty({ example: 'UUID of service' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "serviceId", void 0);
__decorate([
    ApiProperty({ example: '2026-11-20' }),
    IsDateString(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "scheduledDate", void 0);
__decorate([
    ApiProperty({ example: '10:30 AM' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "scheduledTimeSlot", void 0);
__decorate([
    ApiPropertyOptional({ example: 'CONSULTATION' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Annual wellness exam' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "reason", void 0);
__decorate([
    ApiPropertyOptional({ example: 'UUID of original appointment request if converting' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "appointmentRequestId", void 0);
export class UpdateAppointmentStatusDto {
    status;
    cancellationReason;
}
__decorate([
    ApiProperty({ enum: AppointmentStatus, example: 'CHECKED_IN' }),
    IsEnum(AppointmentStatus),
    __metadata("design:type", String)
], UpdateAppointmentStatusDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Patient requested reschedule' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateAppointmentStatusDto.prototype, "cancellationReason", void 0);
//# sourceMappingURL=create-booking.dto.js.map