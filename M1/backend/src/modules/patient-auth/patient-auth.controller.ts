import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PatientAuthService } from './patient-auth.service.js';
import { RegisterPatientAccountDto, LoginPatientAccountDto } from './dto/patient-auth.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';

@ApiTags('Patient Portal Authentication')
@Controller('patient-auth')
export class PatientAuthController {
  constructor(private readonly patientAuthService: PatientAuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a patient online account and link with EMR record' })
  @ApiResponse({ status: 201, description: 'Patient registered and issued JWT token' })
  register(@Body() dto: RegisterPatientAccountDto) {
    return this.patientAuthService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Patient login with email and password' })
  @ApiResponse({ status: 200, description: 'Login successful, returns patient token' })
  login(@Body() dto: LoginPatientAccountDto) {
    return this.patientAuthService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated patient account & health baseline' })
  getProfile(@CurrentUser('sub') accountId: string) {
    return this.patientAuthService.getProfile(accountId);
  }
}

