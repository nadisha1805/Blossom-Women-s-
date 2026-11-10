import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AppointmentsModule } from './modules/appointments/appointments.module.js';
import { ContactModule } from './modules/contact/contact.module.js';
import { DoctorsModule } from './modules/doctors/doctors.module.js';
import { ServicesModule } from './modules/services/services.module.js';
import { ArticlesModule } from './modules/articles/articles.module.js';

@Module({
  imports: [
    PrismaModule,
    AppointmentsModule,
    ContactModule,
    DoctorsModule,
    ServicesModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
