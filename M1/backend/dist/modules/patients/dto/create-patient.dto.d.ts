export declare class CreatePatientDto {
    fullName: string;
    dob: string;
    gender?: string;
    bloodGroup?: string;
    phone: string;
    email?: string;
    address?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    allergies?: string[];
    medicalConditions?: string[];
    currentMedications?: string[];
    medicalHistory?: string;
    menstrualHistory?: string;
    pregnancyHistory?: string;
    previousSurgeries?: string;
}
