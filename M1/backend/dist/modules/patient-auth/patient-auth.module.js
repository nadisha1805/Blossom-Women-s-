var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PatientAuthService } from './patient-auth.service.js';
import { PatientAuthController } from './patient-auth.controller.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
let PatientAuthModule = class PatientAuthModule {
};
PatientAuthModule = __decorate([
    Module({
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
], PatientAuthModule);
export { PatientAuthModule };
//# sourceMappingURL=patient-auth.module.js.map