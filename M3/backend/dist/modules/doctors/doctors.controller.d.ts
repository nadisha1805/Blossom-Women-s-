import { DoctorsService } from './doctors.service.js';
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    findAll(): Promise<{
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
    }[]>;
    findBySlug(slug: string): Promise<{
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
    }>;
}
