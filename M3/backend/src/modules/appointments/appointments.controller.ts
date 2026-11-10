import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit an appointment request' })
  @ApiResponse({ status: 201, description: 'Appointment request recorded with status REQUESTED' })
  @ApiResponse({ status: 400, description: 'Validation error or missing consent' })
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(dto);
  }

  @Get(':referenceId')
  @ApiOperation({ summary: 'Look up appointment status by reference ID' })
  @ApiParam({ name: 'referenceId', example: 'BLS-A1B2C3' })
  @ApiResponse({ status: 200, description: 'Appointment details' })
  @ApiResponse({ status: 404, description: 'Reference ID not found' })
  getByReference(@Param('referenceId') referenceId: string) {
    return this.appointmentsService.getAppointmentByReference(referenceId);
  }
}

