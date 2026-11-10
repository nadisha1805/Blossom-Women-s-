import { PrismaService } from '../../prisma/prisma.service.js';
import { CreatePrescriptionDto } from './dto/create-prescription.dto.js';
export declare class PrescriptionsService {
    private prisma;
    constructor(prisma: PrismaService);
    generatePrescriptionNumber(): string;
    createPrescription(dto: CreatePrescriptionDto, doctorUserId: string): Promise<{
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
        patient: {
            fullName: string;
            dob: Date;
            gender: string;
            bloodGroup: string | null;
            phone: string;
            email: string | null;
            address: string | null;
            emergencyContactName: string | null;
            emergencyContactPhone: string | null;
            allergies: string[];
            medicalConditions: string[];
            currentMedications: string[];
            medicalHistory: string | null;
            menstrualHistory: string | null;
            pregnancyHistory: string | null;
            previousSurgeries: string | null;
            id: string;
            patientId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        doctor: {
            fullName: string;
            doctor: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                isActive: boolean;
                slug: string;
                qualification: string;
                specialty: string;
                experienceYears: number | null;
                biography: string;
                areasOfExpertise: string[];
                profileImage: string | null;
            } | null;
        };
    } & {
        id: string;
        patientId: string;
        updatedAt: Date;
        doctorId: string;
        issuedAt: Date;
        status: import(".prisma/client").$Enums.PrescriptionStatus;
        prescriptionNumber: string;
        consultationId: string | null;
        clinicalNotes: string | null;
    }>;
    findByPatient(patientId: string): Promise<({
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
        doctor: {
            fullName: string;
            doctor: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                isActive: boolean;
                slug: string;
                qualification: string;
                specialty: string;
                experienceYears: number | null;
                biography: string;
                areasOfExpertise: string[];
                profileImage: string | null;
            } | null;
        };
    } & {
        id: string;
        patientId: string;
        updatedAt: Date;
        doctorId: string;
        issuedAt: Date;
        status: import(".prisma/client").$Enums.PrescriptionStatus;
        prescriptionNumber: string;
        consultationId: string | null;
        clinicalNotes: string | null;
    })[]>;
    findOne(id: string): Promise<{
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
        patient: {
            fullName: string;
            dob: Date;
            gender: string;
            bloodGroup: string | null;
            phone: string;
            email: string | null;
            address: string | null;
            emergencyContactName: string | null;
            emergencyContactPhone: string | null;
            allergies: string[];
            medicalConditions: string[];
            currentMedications: string[];
            medicalHistory: string | null;
            menstrualHistory: string | null;
            pregnancyHistory: string | null;
            previousSurgeries: string | null;
            id: string;
            patientId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        doctor: {
            fullName: string;
            doctor: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                isActive: boolean;
                slug: string;
                qualification: string;
                specialty: string;
                experienceYears: number | null;
                biography: string;
                areasOfExpertise: string[];
                profileImage: string | null;
            } | null;
        };
    } & {
        id: string;
        patientId: string;
        updatedAt: Date;
        doctorId: string;
        issuedAt: Date;
        status: import(".prisma/client").$Enums.PrescriptionStatus;
        prescriptionNumber: string;
        consultationId: string | null;
        clinicalNotes: string | null;
    }>;
}
