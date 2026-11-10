var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AppointmentsModule } from './modules/appointments/appointments.module.js';
import { ContactModule } from './modules/contact/contact.module.js';
import { DoctorsModule } from './modules/doctors/doctors.module.js';
import { ServicesModule } from './modules/services/services.module.js';
import { ArticlesModule } from './modules/articles/articles.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { PatientsModule } from './modules/patients/patients.module.js';
import { AppointmentsManagementModule } from './modules/appointments-management/appointments-management.module.js';
import { VitalsModule } from './modules/vitals/vitals.module.js';
import { ConsultationsModule } from './modules/consultations/consultations.module.js';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module.js';
import { DiagnosticsModule } from './modules/diagnostics/diagnostics.module.js';
import { BillingModule } from './modules/billing/billing.module.js';
import { ReportsModule } from './modules/reports/reports.module.js';
import { PatientAuthModule } from './modules/patient-auth/patient-auth.module.js';
import { PatientPortalModule } from './modules/patient-portal/patient-portal.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            PrismaModule,
            AppointmentsModule,
            ContactModule,
            DoctorsModule,
            ServicesModule,
            ArticlesModule,
            AuthModule,
            PatientsModule,
            AppointmentsManagementModule,
            VitalsModule,
            ConsultationsModule,
            PrescriptionsModule,
            DiagnosticsModule,
            BillingModule,
            ReportsModule,
            PatientAuthModule,
            PatientPortalModule,
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map