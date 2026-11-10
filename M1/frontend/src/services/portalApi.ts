const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getHeaders() {
  const token = localStorage.getItem('blossom_token');
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
      ...getHeaders(),
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
// AUTH API
// -------------------------------------------------------------
export const portalAuthApi = {
  login: (credentials: { email: string; password: string }) =>
    request<{ accessToken: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  getProfile: () => request<any>('/auth/me'),
};

// -------------------------------------------------------------
// PATIENTS API
// -------------------------------------------------------------
export const portalPatientsApi = {
  create: (patient: any) =>
    request<any>('/patients', {
      method: 'POST',
      body: JSON.stringify(patient),
    }),
  list: (params?: { search?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.search) q.append('search', params.search);
    if (params?.page) q.append('page', String(params.page));
    if (params?.limit) q.append('limit', String(params.limit));
    return request<{ items: any[]; total: number; page: number; totalPages: number }>(`/patients?${q.toString()}`);
  },
  getOne: (id: string) => request<any>(`/patients/${id}`),
  update: (id: string, updates: any) =>
    request<any>(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

// -------------------------------------------------------------
// APPOINTMENTS MANAGEMENT API
// -------------------------------------------------------------
export const portalAppointmentsApi = {
  createBooking: (booking: any) =>
    request<any>('/appointments-management', {
      method: 'POST',
      body: JSON.stringify(booking),
    }),
  list: (params?: { doctorId?: string; patientId?: string; date?: string; status?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.doctorId) q.append('doctorId', params.doctorId);
    if (params?.patientId) q.append('patientId', params.patientId);
    if (params?.date) q.append('date', params.date);
    if (params?.status) q.append('status', params.status);
    if (params?.search) q.append('search', params.search);
    return request<any[]>(`/appointments-management?${q.toString()}`);
  },
  getOne: (id: string) => request<any>(`/appointments-management/${id}`),
  updateStatus: (id: string, status: string, cancellationReason?: string) =>
    request<any>(`/appointments-management/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, cancellationReason }),
    }),
  getPendingRequests: () => request<any[]>('/appointments-management/requests/pending'),
};

// -------------------------------------------------------------
// VITALS API (NURSE / CLINICAL)
// -------------------------------------------------------------
export const portalVitalsApi = {
  record: (vitals: any) =>
    request<any>('/vitals', {
      method: 'POST',
      body: JSON.stringify(vitals),
    }),
  getByPatient: (patientId: string) => request<any[]>(`/vitals/patient/${patientId}`),
};

// -------------------------------------------------------------
// CONSULTATIONS & EMR API (DOCTOR)
// -------------------------------------------------------------
export const portalConsultationsApi = {
  save: (data: any) =>
    request<any>('/consultations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  amend: (id: string, reason: string, amendedFields: any) =>
    request<any>(`/consultations/${id}/amend`, {
      method: 'PUT',
      body: JSON.stringify({ reason, amendedFields }),
    }),
  getByAppointment: (appointmentId: string) => request<any>(`/consultations/appointment/${appointmentId}`),
  getByPatient: (patientId: string) => request<any[]>(`/consultations/patient/${patientId}`),
};

// -------------------------------------------------------------
// PRESCRIPTIONS API
// -------------------------------------------------------------
export const portalPrescriptionsApi = {
  create: (data: any) =>
    request<any>('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getOne: (id: string) => request<any>(`/prescriptions/${id}`),
  getByPatient: (patientId: string) => request<any[]>(`/prescriptions/patient/${patientId}`),
};

// -------------------------------------------------------------
// DIAGNOSTICS & LAB API
// -------------------------------------------------------------
export const portalDiagnosticsApi = {
  create: (data: any) =>
    request<any>('/diagnostics', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  list: (params?: { status?: string; patientId?: string }) => {
    const q = new URLSearchParams();
    if (params?.status) q.append('status', params.status);
    if (params?.patientId) q.append('patientId', params.patientId);
    return request<any[]>(`/diagnostics?${q.toString()}`);
  },
  update: (id: string, updates: any) =>
    request<any>(`/diagnostics/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
};

// -------------------------------------------------------------
// BILLING & INVOICES API
// -------------------------------------------------------------
export const portalBillingApi = {
  createInvoice: (data: any) =>
    request<any>('/billing/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  recordPayment: (data: any) =>
    request<any>('/billing/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  listInvoices: (params?: { patientId?: string; status?: string }) => {
    const q = new URLSearchParams();
    if (params?.patientId) q.append('patientId', params.patientId);
    if (params?.status) q.append('status', params.status);
    return request<any[]>(`/billing/invoices?${q.toString()}`);
  },
  getInvoice: (id: string) => request<any>(`/billing/invoices/${id}`),
};

// -------------------------------------------------------------
// REPORTS & DASHBOARDS API
// -------------------------------------------------------------
export const portalReportsApi = {
  getAdminMetrics: () => request<any>('/reports/admin-metrics'),
  getMyDoctorMetrics: () => request<any>('/reports/doctor-metrics'),
  getDoctorMetrics: (doctorId: string) => request<any>(`/reports/doctor-metrics/${doctorId}`),
};

// Clinic Doctors and Services (Directory helpers)
export const clinicDirectoryApi = {
  getDoctors: () => request<any[]>('/doctors'),
  getServices: () => request<any[]>('/services'),
};

