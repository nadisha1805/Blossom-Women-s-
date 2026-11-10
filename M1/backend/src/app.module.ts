import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';

// Public website modules
import { AppointmentsModule } from './modules/appointments/appointments.module.js';
import { ContactModule } from './modules/contact/contact.module.js';
import { DoctorsModule } from './modules/doctors/doctors.module.js';
import { ServicesModule } from './modules/services/services.module.js';
import { ArticlesModule } from './modules/articles/articles.module.js';

// Milestone 2 Clinic Management & Workflows modules
import { AuthModule } from './modules/auth/auth.module.js';
import { PatientsModule } from './modules/patients/patients.module.js';
import { AppointmentsManagementModule } from './modules/appointments-management/appointments-management.module.js';
import { VitalsModule } from './modules/vitals/vitals.module.js';
import { ConsultationsModule } from './modules/consultations/consultations.module.js';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module.js';
import { DiagnosticsModule } from './modules/diagnostics/diagnostics.module.js';
import { BillingModule } from './modules/billing/billing.module.js';
import { ReportsModule } from './modules/reports/reports.module.js';

// Milestone 3 Patient Portal modules
import { PatientAuthModule } from './modules/patient-auth/patient-auth.module.js';
import { PatientPortalModule } from './modules/patient-portal/patient-portal.module.js';

@Module({
  imports: [
    PrismaModule,
    // Public Website
    AppointmentsModule,
    ContactModule,
    DoctorsModule,
    ServicesModule,
    ArticlesModule,
    // Milestone 2 Clinic Management
    AuthModule,
    PatientsModule,
    AppointmentsManagementModule,
    VitalsModule,
    ConsultationsModule,
    PrescriptionsModule,
    DiagnosticsModule,
    BillingModule,
    ReportsModule,
    // Milestone 3 Patient Portal
    PatientAuthModule,
    PatientPortalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
