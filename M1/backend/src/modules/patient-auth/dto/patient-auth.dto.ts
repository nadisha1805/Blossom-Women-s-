import { IsEmail, IsNotEmpty, IsString, MinLength, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterPatientAccountDto {
  @ApiProperty({ example: 'eleanor.vance@example.com' })
  @IsEmail({}, { message: 'Valid email address required' })
  email: string;

  @ApiProperty({ example: 'Eleanor@123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({ example: 'Eleanor Vance' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: '+1 555-0211' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '1993-04-12' })
  @IsDateString()
  dob: string;
}

export class LoginPatientAccountDto {
  @ApiProperty({ example: 'eleanor.vance@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Eleanor@123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

