var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
let PatientAuthService = class PatientAuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    generatePatientId() {
        const num = randomInt(10000, 99999);
        return `PAT-${num}`;
    }
    async register(dto) {
        const existingAccount = await this.prisma.patientAccount.findUnique({
            where: { email: dto.email.toLowerCase().trim() },
        });
        if (existingAccount) {
            throw new ConflictException('An account is already registered with this email address.');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const dobDate = new Date(dto.dob);
        let linkedPatient = await this.prisma.patient.findFirst({
            where: {
                OR: [
                    { phone: dto.phone.trim() },
                    { email: dto.email.toLowerCase().trim() },
                ],
            },
        });
        if (!linkedPatient) {
            let patientId = this.generatePatientId();
            let isUnique = false;
            while (!isUnique) {
                const match = await this.prisma.patient.findUnique({ where: { patientId } });
                if (!match)
                    isUnique = true;
                else
                    patientId = this.generatePatientId();
            }
            linkedPatient = await this.prisma.patient.create({
                data: {
                    patientId,
                    fullName: dto.fullName.trim(),
                    dob: dobDate,
                    phone: dto.phone.trim(),
                    email: dto.email.toLowerCase().trim(),
                },
            });
        }
        const account = await this.prisma.patientAccount.create({
            data: {
                email: dto.email.toLowerCase().trim(),
                passwordHash,
                fullName: dto.fullName.trim(),
                phone: dto.phone.trim(),
                dob: dobDate,
                linkedPatientId: linkedPatient.id,
            },
            include: {
                linkedPatient: true,
            },
        });
        await this.prisma.patientNotification.create({
            data: {
                patientAccountId: account.id,
                title: 'Welcome to Blossom Patient Portal',
                message: 'Your personal health records, appointment bookings, and prescriptions are now accessible online.',
                category: 'SYSTEM',
                linkUrl: '/patient/profile',
            },
        });
        const token = this.jwtService.sign({
            sub: account.id,
            email: account.email,
            fullName: account.fullName,
            linkedPatientId: linkedPatient.id,
            patientId: linkedPatient.patientId,
            type: 'PATIENT',
        });
        return {
            accessToken: token,
            patient: {
                id: account.id,
                email: account.email,
                fullName: account.fullName,
                phone: account.phone,
                patientId: linkedPatient.patientId,
            },
        };
    }
    async login(dto) {
        const account = await this.prisma.patientAccount.findUnique({
            where: { email: dto.email.toLowerCase().trim() },
            include: { linkedPatient: true },
        });
        if (!account) {
            throw new UnauthorizedException('Invalid patient email or password');
        }
        if (!account.isActive) {
            throw new UnauthorizedException('Patient account is currently suspended. Please contact clinic support.');
        }
        const isMatch = await bcrypt.compare(dto.password, account.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid patient email or password');
        }
        await this.prisma.patientAccount.update({
            where: { id: account.id },
            data: { lastLoginAt: new Date() },
        });
        const token = this.jwtService.sign({
            sub: account.id,
            email: account.email,
            fullName: account.fullName,
            linkedPatientId: account.linkedPatientId,
            patientId: account.linkedPatient?.patientId ?? null,
            type: 'PATIENT',
        });
        return {
            accessToken: token,
            patient: {
                id: account.id,
                email: account.email,
                fullName: account.fullName,
                phone: account.phone,
                patientId: account.linkedPatient?.patientId ?? null,
            },
        };
    }
    async getProfile(accountId) {
        const account = await this.prisma.patientAccount.findUnique({
            where: { id: accountId },
            include: { linkedPatient: true },
        });
        if (!account) {
            throw new NotFoundException('Patient account not found');
        }
        return {
            id: account.id,
            email: account.email,
            fullName: account.fullName,
            phone: account.phone,
            dob: account.dob,
            isVerified: account.isVerified,
            patientId: account.linkedPatient?.patientId,
            bloodGroup: account.linkedPatient?.bloodGroup,
            allergies: account.linkedPatient?.allergies,
            medicalConditions: account.linkedPatient?.medicalConditions,
            lastLoginAt: account.lastLoginAt,
        };
    }
};
PatientAuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], PatientAuthService);
export { PatientAuthService };
//# sourceMappingURL=patient-auth.service.js.map