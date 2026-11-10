import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PatientAuthService } from './patient-auth.service.js';
import { PatientAuthController } from './patient-auth.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'blossom_clinic_dev_secret_key_2026',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [PatientAuthController],
  providers: [PatientAuthService],
  exports: [PatientAuthService, JwtModule],
})
export class PatientAuthModule {}

