const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface AppointmentPayload {
  patientName: string;
  email: string;
  phone: string;
  serviceId: string;
  preferredDoctorId?: string;
  preferredDate: string;
  preferredTime?: string;
  reason?: string;
  consent: boolean;
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    referenceId: string;
    patientName: string;
    service: string;
    preferredDoctor: string | null;
    preferredDate: string;
    preferredTime: string | null;
    status: string;
    createdAt: string;
  };
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

export async function submitAppointmentRequest(
  payload: AppointmentPayload,
): Promise<AppointmentResponse> {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message || 'Failed to submit appointment request';
    throw new Error(errorMsg);
  }

  return data;
}

export async function submitContactMessage(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message || 'Failed to submit contact message';
    throw new Error(errorMsg);
  }

  return data;
}

