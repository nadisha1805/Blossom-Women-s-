import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from './auth.service.js';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockPrisma: any;
  let mockJwt: any;

  beforeEach(() => {
    mockPrisma = {
      user: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
    };
    mockJwt = {
      sign: vi.fn().mockReturnValue('mock_jwt_token_xyz'),
    };
    service = new AuthService(mockPrisma as any, mockJwt as any);
  });

  it('should reject login for non-existent staff email', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'unknown@blossomclinic.com', password: 'Password123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should reject login if account is deactivated', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'usr-1',
      email: 'staff@blossomclinic.com',
      isActive: false,
    });

    await expect(
      service.login({ email: 'staff@blossomclinic.com', password: 'Password123' }),
    ).rejects.toThrow('deactivated');
  });

  it('should issue JWT access token upon valid credentials', async () => {
    const hashed = await bcrypt.hash('Secret123', 10);
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 'usr-1',
      email: 'doctor@blossomclinic.com',
      passwordHash: hashed,
      fullName: 'Dr. Priya Sharma',
      role: 'DOCTOR',
      isActive: true,
      doctorId: 'doc-1',
      doctor: { name: 'Dr. Priya Sharma' },
    });
    mockPrisma.user.update.mockResolvedValue({});

    const result = await service.login({
      email: 'doctor@blossomclinic.com',
      password: 'Secret123',
    });

    expect(result.accessToken).toBe('mock_jwt_token_xyz');
    expect(result.user.role).toBe('DOCTOR');
    expect(result.user.fullName).toBe('Dr. Priya Sharma');
  });
});

