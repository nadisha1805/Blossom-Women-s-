import { PrescriptionsService } from './prescriptions.service.js';
import { CreatePrescriptionDto } from './dto/create-prescription.dto.js';
export declare class PrescriptionsController {
    private readonly prescriptionsService;
    constructor(prescriptionsService: PrescriptionsService);
    createPrescription(dto: CreatePrescriptionDto, doctorUserId: string): Promise<{
        doctor: {
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
            } | null;
            fullName: string;
        };
        patient: {
            email: string | null;
            phone: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            dob: Date;
            patientId: string;
            gender: string;
            bloodGroup: string | null;
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
    }>;
    findOne(id: string): Promise<{
        doctor: {
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
            } | null;
            fullName: string;
        };
        patient: {
            email: string | null;
            phone: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fullName: string;
            dob: Date;
            patientId: string;
            gender: string;
            bloodGroup: string | null;
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
    }>;
    findByPatient(patientId: string): Promise<({
        doctor: {
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
            } | null;
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
}
