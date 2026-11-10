var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsString, MinLength, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterPatientAccountDto {
    email;
    password;
    fullName;
    phone;
    dob;
}
__decorate([
    ApiProperty({ example: 'eleanor.vance@example.com' }),
    IsEmail({}, { message: 'Valid email address required' }),
    __metadata("design:type", String)
], RegisterPatientAccountDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'Eleanor@123' }),
    IsString(),
    IsNotEmpty(),
    MinLength(6, { message: 'Password must be at least 6 characters' }),
    __metadata("design:type", String)
], RegisterPatientAccountDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ example: 'Eleanor Vance' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RegisterPatientAccountDto.prototype, "fullName", void 0);
__decorate([
    ApiProperty({ example: '+1 555-0211' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RegisterPatientAccountDto.prototype, "phone", void 0);
__decorate([
    ApiProperty({ example: '1993-04-12' }),
    IsDateString(),
    __metadata("design:type", String)
], RegisterPatientAccountDto.prototype, "dob", void 0);
export class LoginPatientAccountDto {
    email;
    password;
}
__decorate([
    ApiProperty({ example: 'eleanor.vance@example.com' }),
    IsEmail(),
    __metadata("design:type", String)
], LoginPatientAccountDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'Eleanor@123' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], LoginPatientAccountDto.prototype, "password", void 0);
//# sourceMappingURL=patient-auth.dto.js.map