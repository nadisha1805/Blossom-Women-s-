import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RegisterPatientAccountDto, LoginPatientAccountDto } from './dto/patient-auth.dto.js';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';

@Injectable()
export class PatientAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  generatePatientId(): string {
    const num = randomInt(10000, 99999);
    return `PAT-${num}`;
  }

  async register(dto: RegisterPatientAccountDto) {
    const existingAccount = await this.prisma.patientAccount.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (existingAccount) {
      throw new ConflictException('An account is already registered with this email address.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const dobDate = new Date(dto.dob);

    // Secure Account Linking: Check if an existing electronic clinical patient record matches this phone or email
    let linkedPatient = await this.prisma.patient.findFirst({
      where: {
        OR: [
          { phone: dto.phone.trim() },
          { email: dto.email.toLowerCase().trim() },
        ],
      },
    });

    // If no prior clinical patient record exists, auto-provision their baseline clinical Patient file
    if (!linkedPatient) {
      let patientId = this.generatePatientId();
      let isUnique = false;
      while (!isUnique) {
        const match = await this.prisma.patient.findUnique({ where: { patientId } });
        if (!match) isUnique = true;
        else patientId = this.generatePatientId();
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

    // Create initial welcome notification
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

  async login(dto: LoginPatientAccountDto) {
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

  async getProfile(accountId: string) {
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
}

