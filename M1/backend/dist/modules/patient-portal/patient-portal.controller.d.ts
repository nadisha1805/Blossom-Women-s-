import { PatientPortalService } from './patient-portal.service.js';
import { PatientBookAppointmentDto, CreateSupportRequestDto, CreatePaymentOrderDto, VerifyPaymentDto } from './dto/patient-portal.dto.js';
export declare class PatientPortalController {
    private readonly patientPortalService;
    constructor(patientPortalService: PatientPortalService);
    getDashboard(accountId: string): Promise<{
        patient: {
            fullName: string | undefined;
            patientId: string | undefined;
            bloodGroup: string | null | undefined;
            allergies: string[] | undefined;
        };
        upcomingAppointments: ({
            doctor: {
                id: string;
                name: string;
                slug: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                qualification: string;
                specialty: string;
                experienceYears: number | null;
                biography: string;
                areasOfExpertise: string[];
                profileImage: string | null;
            };
            service: {
                description: string;
                id: string;
                name: string;
                slug: string;
                benefits: string | null;
                whatToExpect: string | null;
                category: string | null;
                standardFee: import("@prisma/client/runtime/library").Decimal;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            type: string;
            serviceId: string;
            reason: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            doctorId: string;
            patientId: string;
            scheduledDate: Date;
            appointmentNumber: string;
            scheduledTimeSlot: string;
            cancellationReason: string | null;
            appointmentRequestId: string | null;
        })[];
        recentConsultations: ({
            doctor: {
                id: string;
                name: string;
                slug: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                qualification: string;
                specialty: string;
                experienceYears: number | null;
                biography: string;
                areasOfExpertise: string[];
                profileImage: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.ConsultationStatus;
            doctorId: string;
            patientId: string;
            consultationNumber: string;
            appointmentId: string;
            chiefComplaint: string;
            symptoms: string | null;
            clinicalFindings: string | null;
            diagnosis: string;
            treatmentPlan: string;
            specialtyType: string | null;
            specialtyDetails: import("@prisma/client/runtime/library").JsonValue | null;
            isReleasedToPatient: boolean;
            followUpDate: Date | null;
            followUpNotes: string | null;
            signedAt: Date | null;
        })[];
        activePrescriptions: ({
            doctor: {
                fullName: string;
            };
            items: {
                id: string;
                createdAt: Date;
                prescriptionId: string;
                medicationName: string;
                dosage: string;
                frequency: string;
                duration: string;
                instructions: string | null;
            }[];
        } & {
            id: string;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PrescriptionStatus;
            doctorId: string;
            patientId: string;
            issuedAt: Date;
            isReleasedToPatient: boolean;
            consultationId: string | null;
            prescriptionNumber: string;
            clinicalNotes: string | null;
        })[];
        diagnosticReports: {
            id: string;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.DiagnosticStatus;
            patientId: string;
            orderedAt: Date;
            isReleasedToPatient: boolean;
            orderNumber: string;
            orderingDoctorId: string;
            consultationId: string | null;
            assignedLabStaffId: string | null;
            testName: string;
            testCategory: string;
            sampleCollectedAt: Date | null;
            resultsNotes: string | null;
            reportUrl: string | null;
            standardPrice: import("@prisma/client/runtime/library").Decimal;
            isReviewed: boolean;
            reviewedAt: Date | null;
        }[];
        pendingInvoices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.InvoiceStatus;
            patientId: string;
            total: import("@prisma/client/runtime/library").Decimal;
            appointmentId: string | null;
            invoiceNumber: string;
            subtotal: import("@prisma/client/runtime/library").Decimal;
            discount: import("@prisma/client/runtime/library").Decimal;
            tax: import("@prisma/client/runtime/library").Decimal;
            paidAmount: import("@prisma/client/runtime/library").Decimal;
            balance: import("@prisma/client/runtime/library").Decimal;
            dueDate: Date | null;
        }[];
        totalOutstandingBalance: number;
        notifications: {
            title: string;
            message: string;
            id: string;
            category: string;
            createdAt: Date;
            isRead: boolean;
            linkUrl: string | null;
            patientAccountId: string;
        }[];
    }>;
    getAppointments(accountId: string): Promise<({
        doctor: {
            id: string;
            name: string;
            slug: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            qualification: string;
            specialty: string;
            experienceYears: number | null;
            biography: string;
            areasOfExpertise: string[];
            profileImage: string | null;
        };
        service: {
            description: string;
            id: string;
            name: string;
            slug: string;
            benefits: string | null;
            whatToExpect: string | null;
            category: string | null;
            standardFee: import("@prisma/client/runtime/library").Decimal;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        vitalRecords: {
            id: string;
            patientId: string;
            recordedAt: Date;
            appointmentId: string | null;
            recordedById: string;
            systolicBP: number | null;
            diastolicBP: number | null;
            heartRate: number | null;
            temperature: import("@prisma/client/runtime/library").Decimal | null;
            respiratoryRate: number | null;
            spO2: number | null;
            weightKg: import("@prisma/client/runtime/library").Decimal | null;
            heightCm: import("@prisma/client/runtime/library").Decimal | null;
            bmi: import("@prisma/client/runtime/library").Decimal | null;
            nursingNotes: string | null;
        }[];
    } & {
        type: string;
        serviceId: string;
        reason: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        doctorId: string;
        patientId: string;
        scheduledDate: Date;
        appointmentNumber: string;
        scheduledTimeSlot: string;
        cancellationReason: string | null;
        appointmentRequestId: string | null;
    })[]>;
    bookAppointment(accountId: string, dto: PatientBookAppointmentDto): Promise<{
        doctor: {
            id: string;
            name: string;
            slug: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            qualification: string;
            specialty: string;
            experienceYears: number | null;
            biography: string;
            areasOfExpertise: string[];
            profileImage: string | null;
        };
        service: {
            description: string;
            id: string;
            name: string;
            slug: string;
            benefits: string | null;
            whatToExpect: string | null;
            category: string | null;
            standardFee: import("@prisma/client/runtime/library").Decimal;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        type: string;
        serviceId: string;
        reason: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        doctorId: string;
        patientId: string;
        scheduledDate: Date;
        appointmentNumber: string;
        scheduledTimeSlot: string;
        cancellationReason: string | null;
        appointmentRequestId: string | null;
    }>;
    cancelAppointment(accountId: string, appointmentId: string, reason?: string): Promise<{
        type: string;
        serviceId: string;
        reason: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        doctorId: string;
        patientId: string;
        scheduledDate: Date;
        appointmentNumber: string;
        scheduledTimeSlot: string;
        cancellationReason: string | null;
        appointmentRequestId: string | null;
    }>;
    getConsultations(accountId: string): Promise<({
        doctor: {
            id: string;
            name: string;
            slug: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            qualification: string;
            specialty: string;
            experienceYears: number | null;
            biography: string;
            areasOfExpertise: string[];
            profileImage: string | null;
        };
        diagnosticOrders: {
            id: string;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.DiagnosticStatus;
            patientId: string;
            orderedAt: Date;
            isReleasedToPatient: boolean;
            orderNumber: string;
            orderingDoctorId: string;
            consultationId: string | null;
            assignedLabStaffId: string | null;
            testName: string;
            testCategory: string;
            sampleCollectedAt: Date | null;
            resultsNotes: string | null;
            reportUrl: string | null;
            standardPrice: import("@prisma/client/runtime/library").Decimal;
            isReviewed: boolean;
            reviewedAt: Date | null;
        }[];
        prescriptions: ({
            items: {
                id: string;
                createdAt: Date;
                prescriptionId: string;
                medicationName: string;
                dosage: string;
                frequency: string;
                duration: string;
                instructions: string | null;
            }[];
        } & {
            id: string;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.PrescriptionStatus;
            doctorId: string;
            patientId: string;
            issuedAt: Date;
            isReleasedToPatient: boolean;
            consultationId: string | null;
            prescriptionNumber: string;
            clinicalNotes: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.ConsultationStatus;
        doctorId: string;
        patientId: string;
        consultationNumber: string;
        appointmentId: string;
        chiefComplaint: string;
        symptoms: string | null;
        clinicalFindings: string | null;
        diagnosis: string;
        treatmentPlan: string;
        specialtyType: string | null;
        specialtyDetails: import("@prisma/client/runtime/library").JsonValue | null;
        isReleasedToPatient: boolean;
        followUpDate: Date | null;
        followUpNotes: string | null;
        signedAt: Date | null;
    })[]>;
    getPrescriptions(accountId: string): Promise<({
        doctor: {
            fullName: string;
        };
        items: {
            id: string;
            createdAt: Date;
            prescriptionId: string;
            medicationName: string;
            dosage: string;
            frequency: string;
            duration: string;
            instructions: string | null;
        }[];
    } & {
        id: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.PrescriptionStatus;
        doctorId: string;
        patientId: string;
        issuedAt: Date;
        isReleasedToPatient: boolean;
        consultationId: string | null;
        prescriptionNumber: string;
        clinicalNotes: string | null;
    })[]>;
    getDiagnosticReports(accountId: string): Promise<({
        orderingDoctor: {
            id: string;
            name: string;
            slug: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            qualification: string;
            specialty: string;
            experienceYears: number | null;
            biography: string;
            areasOfExpertise: string[];
            profileImage: string | null;
        };
    } & {
        id: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.DiagnosticStatus;
        patientId: string;
        orderedAt: Date;
        isReleasedToPatient: boolean;
        orderNumber: string;
        orderingDoctorId: string;
        consultationId: string | null;
        assignedLabStaffId: string | null;
        testName: string;
        testCategory: string;
        sampleCollectedAt: Date | null;
        resultsNotes: string | null;
        reportUrl: string | null;
        standardPrice: import("@prisma/client/runtime/library").Decimal;
        isReviewed: boolean;
        reviewedAt: Date | null;
    })[]>;
    getInvoices(accountId: string): Promise<({
        items: {
            description: string;
            id: string;
            createdAt: Date;
            invoiceId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
        }[];
        payments: {
            id: string;
            invoiceId: string;
            receiptNumber: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            transactionRef: string | null;
            receivedBy: string | null;
            notes: string | null;
            paidAt: Date;
        }[];
        transactions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            invoiceId: string;
            amount: import("@prisma/client/runtime/library").Decimal;
            patientAccountId: string;
            orderId: string;
            paymentId: string | null;
            signature: string | null;
            currency: string;
            gatewayResponse: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        patientId: string;
        total: import("@prisma/client/runtime/library").Decimal;
        appointmentId: string | null;
        invoiceNumber: string;
        subtotal: import("@prisma/client/runtime/library").Decimal;
        discount: import("@prisma/client/runtime/library").Decimal;
        tax: import("@prisma/client/runtime/library").Decimal;
        paidAmount: import("@prisma/client/runtime/library").Decimal;
        balance: import("@prisma/client/runtime/library").Decimal;
        dueDate: Date | null;
    })[]>;
    createPaymentOrder(accountId: string, dto: CreatePaymentOrderDto): Promise<{
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
        invoiceNumber: string;
    }>;
    verifyPayment(accountId: string, dto: VerifyPaymentDto): Promise<{
        success: boolean;
        message: string;
        receiptNumber: string;
    }>;
    getNotifications(accountId: string): Promise<{
        title: string;
        message: string;
        id: string;
        category: string;
        createdAt: Date;
        isRead: boolean;
        linkUrl: string | null;
        patientAccountId: string;
    }[]>;
    markNotificationRead(accountId: string, notificationId: string): Promise<{
        title: string;
        message: string;
        id: string;
        category: string;
        createdAt: Date;
        isRead: boolean;
        linkUrl: string | null;
        patientAccountId: string;
    }>;
    createSupportRequest(accountId: string, dto: CreateSupportRequestDto): Promise<{
        description: string;
        id: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        subject: string;
        patientAccountId: string;
        ticketNumber: string;
        response: string | null;
        respondedAt: Date | null;
    }>;
    getSupportRequests(accountId: string): Promise<{
        description: string;
        id: string;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        subject: string;
        patientAccountId: string;
        ticketNumber: string;
        response: string | null;
        respondedAt: Date | null;
    }[]>;
}
