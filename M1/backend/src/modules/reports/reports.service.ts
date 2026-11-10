import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AppointmentStatus, InvoiceStatus, ConsultationStatus } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getAdminDashboardMetrics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalPatients,
      todayAppointments,
      upcomingAppointments,
      completedConsultations,
      pendingRequests,
      cancelledAppointments,
      totalDoctors,
      pendingInvoices,
      totalRevenueResult,
      recentPatients,
      recentAppointments,
    ] = await Promise.all([
      this.prisma.patient.count(),
      this.prisma.appointment.count({
        where: { scheduledDate: { gte: today, lt: tomorrow } },
      }),
      this.prisma.appointment.count({
        where: { scheduledDate: { gte: tomorrow } },
      }),
      this.prisma.consultation.count({
        where: { status: { in: [ConsultationStatus.SIGNED, ConsultationStatus.COMPLETED] } },
      }),
      this.prisma.appointmentRequest.count({
        where: { status: AppointmentStatus.REQUESTED },
      }),
      this.prisma.appointment.count({
        where: { status: AppointmentStatus.CANCELLED },
      }),
      this.prisma.doctor.count({ where: { isActive: true } }),
      this.prisma.invoice.count({
        where: { status: { in: [InvoiceStatus.PENDING, InvoiceStatus.PARTIALLY_PAID] } },
      }),
      this.prisma.payment.aggregate({ _sum: { amount: true } }),
      this.prisma.patient.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.appointment.findMany({
        take: 6,
        include: { patient: true, doctor: true, service: true },
        orderBy: { scheduledDate: 'desc' },
      }),
    ]);

    return {
      metrics: {
        totalPatients,
        todayAppointments,
        upcomingAppointments,
        completedConsultations,
        pendingRequests,
        cancelledAppointments,
        totalDoctors,
        pendingInvoices,
        totalRevenueCollected: Number(totalRevenueResult._sum.amount || 0),
      },
      recentPatients,
      recentAppointments,
    };
  }

  async getDoctorDashboardMetrics(doctorId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      todayAppointments,
      upcomingAppointments,
      pendingConsultations,
      completedConsultations,
      assignedPatientsCount,
      appointmentsList,
    ] = await Promise.all([
      this.prisma.appointment.count({
        where: { doctorId, scheduledDate: { gte: today, lt: tomorrow } },
      }),
      this.prisma.appointment.count({
        where: { doctorId, scheduledDate: { gte: tomorrow } },
      }),
      this.prisma.appointment.count({
        where: {
          doctorId,
          status: { in: [AppointmentStatus.CONFIRMED, AppointmentStatus.CHECKED_IN, AppointmentStatus.IN_CONSULTATION] },
        },
      }),
      this.prisma.consultation.count({
        where: { doctorId, status: { in: [ConsultationStatus.SIGNED, ConsultationStatus.COMPLETED] } },
      }),
      this.prisma.appointment.groupBy({
        by: ['patientId'],
        where: { doctorId },
      }),
      this.prisma.appointment.findMany({
        where: { doctorId },
        include: {
          patient: true,
          service: true,
          vitalRecords: { orderBy: { recordedAt: 'desc' }, take: 1 },
          consultation: true,
        },
        orderBy: [{ scheduledDate: 'asc' }, { scheduledTimeSlot: 'asc' }],
        take: 20,
      }),
    ]);

    return {
      metrics: {
        todayAppointments,
        upcomingAppointments,
        pendingConsultations,
        completedConsultations,
        assignedPatients: assignedPatientsCount.length,
      },
      appointments: appointmentsList,
    };
  }
}

