var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePatientDto {
    fullName;
    dob;
    gender;
    bloodGroup;
    phone;
    email;
    address;
    emergencyContactName;
    emergencyContactPhone;
    allergies;
    medicalConditions;
    currentMedications;
    medicalHistory;
    menstrualHistory;
    pregnancyHistory;
    previousSurgeries;
}
__decorate([
    ApiProperty({ example: 'Eleanor Vance' }),
    IsString(),
    IsNotEmpty({ message: 'Full name is required' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "fullName", void 0);
__decorate([
    ApiProperty({ example: '1992-05-14' }),
    IsDateString({}, { message: 'Date of birth must be a valid ISO date string' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "dob", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Female' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "gender", void 0);
__decorate([
    ApiPropertyOptional({ example: 'O+' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "bloodGroup", void 0);
__decorate([
    ApiProperty({ example: '+1 555-0188' }),
    IsString(),
    IsNotEmpty({ message: 'Contact phone number is required' }),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "phone", void 0);
__decorate([
    ApiPropertyOptional({ example: 'eleanor.vance@example.com' }),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: '14 Blossom Lane, Suite 2B' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "address", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Thomas Vance' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "emergencyContactName", void 0);
__decorate([
    ApiPropertyOptional({ example: '+1 555-0199' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "emergencyContactPhone", void 0);
__decorate([
    ApiPropertyOptional({ example: ['Penicillin', 'Sulfa drugs'] }),
    IsOptional(),
    IsArray(),
    __metadata("design:type", Array)
], CreatePatientDto.prototype, "allergies", void 0);
__decorate([
    ApiPropertyOptional({ example: ['PCOS', 'Mild asthma'] }),
    IsOptional(),
    IsArray(),
    __metadata("design:type", Array)
], CreatePatientDto.prototype, "medicalConditions", void 0);
__decorate([
    ApiPropertyOptional({ example: ['Metformin 500mg'] }),
    IsOptional(),
    IsArray(),
    __metadata("design:type", Array)
], CreatePatientDto.prototype, "currentMedications", void 0);
__decorate([
    ApiPropertyOptional({ example: 'No major prior hospitalizations.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "medicalHistory", void 0);
__decorate([
    ApiPropertyOptional({ example: '28-day cycle, moderate flow, day 1 dysmenorrhea.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "menstrualHistory", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Gravida 1, Para 0.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "pregnancyHistory", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Appendectomy in 2018.' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "previousSurgeries", void 0);
//# sourceMappingURL=create-patient.dto.js.map