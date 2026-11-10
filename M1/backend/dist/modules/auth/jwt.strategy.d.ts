import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
        role?: string;
        type?: string;
    }): Promise<{
        id: string;
        sub: string;
        email: string;
        fullName: string;
        linkedPatientId: string | null;
        patientId: string | undefined;
        type: string;
        role?: undefined;
        doctorId?: undefined;
        doctor?: undefined;
    } | {
        id: string;
        email: string;
        fullName: string;
        role: import(".prisma/client").$Enums.UserRole;
        doctorId: string | null;
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
        sub?: undefined;
        linkedPatientId?: undefined;
        patientId?: undefined;
        type?: undefined;
    }>;
}
export {};
