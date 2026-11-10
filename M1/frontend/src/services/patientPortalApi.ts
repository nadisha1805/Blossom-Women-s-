const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getPatientHeaders() {
  const token = localStorage.getItem('blossom_patient_token');
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...getPatientHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = Array.isArray(data?.message) ? data.message.join(', ') : data?.message || 'Request failed';
    throw new Error(msg);
  }
  return data;
}

// -------------------------------------------------------------
// PATIENT AUTH API
// -------------------------------------------------------------
export const patientAuthApi = {
  register: (payload: {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    password: string;
  }) =>
    request<{ accessToken: string; patient: any }>('/patient-auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (credentials: { email: string; password: string }) =>
    request<{ accessToken: string; patient: any }>('/patient-auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => request<any>('/patient-auth/me'),
};

// -------------------------------------------------------------
// PATIENT PORTAL API
// -------------------------------------------------------------
export const patientPortalApi = {
  getDashboard: () => request<any>('/patient-portal/dashboard'),

  // Appointments
  getAppointments: () => request<any[]>('/patient-portal/appointments'),
  bookAppointment: (payload: {
    doctorId: string;
    serviceId: string;
    preferredDate: string;
    preferredTimeSlot: string;
    reason?: string;
  }) =>
    request<any>('/patient-portal/appointments/request', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  cancelAppointment: (id: string, reason?: string) =>
    request<any>(`/patient-portal/appointments/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),

  // Medical Records & Consultations
  getConsultations: () => request<any[]>('/patient-portal/consultations'),

  // Prescriptions
  getPrescriptions: () => request<any[]>('/patient-portal/prescriptions'),

  // Diagnostic Reports
  getReports: () => request<any[]>('/patient-portal/reports'),

  // Billing & Payments
  getInvoices: () => request<any[]>('/patient-portal/invoices'),
  createPaymentOrder: (invoiceId: string) =>
    request<{
      orderId: string;
      amount: number;
      currency: string;
      keyId: string;
      invoiceNumber: string;
    }>('/patient-portal/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ invoiceId }),
    }),
  verifyPayment: (payload: { orderId: string; paymentId: string; signature: string }) =>
    request<{ success: boolean; message: string; receiptNumber: string }>(
      '/patient-portal/payments/verify',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    ),

  // Notifications
  getNotifications: () => request<any[]>('/patient-portal/notifications'),
  markNotificationRead: (id: string) =>
    request<any>(`/patient-portal/notifications/${id}/read`, {
      method: 'PATCH',
    }),

  // Support
  getSupportRequests: () => request<any[]>('/patient-portal/support'),
  createSupportRequest: (payload: {
    subject: string;
    category: string;
    description: string;
  }) =>
    request<any>('/patient-portal/support', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

