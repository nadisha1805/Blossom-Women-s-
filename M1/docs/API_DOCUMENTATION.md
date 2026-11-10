# Blossom Women's Health Clinic — API Documentation
## Milestone 2: Clinic Management System & Clinical Workflows

### Base URLs
- **Development API:** `http://localhost:3001/api`
- **Interactive Swagger UI:** `http://localhost:3001/api/docs`
- **Health Check:** `http://localhost:3001/api/health`

---

### Authentication & Role-Based Access Control (RBAC)
Staff endpoints are protected by `JwtAuthGuard` and `RolesGuard`. Send bearer token in the `Authorization` header:
```
Authorization: Bearer <jwt_access_token>
```

#### Staff Roles Matrix:
1. `SUPER_ADMIN`: Master access across all clinic modules and administration.
2. `CLINIC_ADMIN`: Operational administration, reports, staff, schedule oversight, billing.
3. `DOCTOR`: Clinical consultation desk, EMR records, electronic prescriptions, lab test ordering.
4. `NURSE`: Triage, vitals recording (BP, pulse, temp, SpO2, BMI), patient preparation.
5. `RECEPTIONIST`: Patient registration, appointment requests conversion, walk-ins, check-in.
6. `LAB_STAFF`: Specimen collection logging, processing, diagnostic results entry.
7. `BILLING_STAFF`: Generating itemized invoices, recording payments, partial settlements, receipts.

---

### Core Endpoint Catalog

#### 1. Authentication
- `POST /api/auth/login`: Staff login with email and password. Returns JWT token and staff identity.
- `GET /api/auth/me`: Get current authenticated user profile and doctor link.

#### 2. Patient Management
- `POST /api/patients`: Register patient. Automatically assigns unique `PAT-XXXXX`.
- `GET /api/patients`: Search and paginate patients by name, phone, email, or patient ID.
- `GET /api/patients/:id`: Get full patient profile, including vitals, EMR consultations, prescriptions, and billing.
- `PUT /api/patients/:id`: Update patient demographics and medical baseline.

#### 3. Appointments Management
- `POST /api/appointments-management`: Book/confirm scheduled appointment. Verifies doctor availability (conflicts prevented).
- `GET /api/appointments-management`: Query appointments by date, doctor, status (`CONFIRMED`, `CHECKED_IN`, `IN_CONSULTATION`, `COMPLETED`, `CANCELLED`).
- `GET /api/appointments-management/requests/pending`: View website appointment requests awaiting staff confirmation.
- `GET /api/appointments-management/:id`: Retrieve single appointment with related vitals and consultation.
- `PATCH /api/appointments-management/:id/status`: Transition appointment status.

#### 4. Nursing & Vitals
- `POST /api/vitals`: Record blood pressure (systolic/diastolic), pulse, temperature, SpO2, respiratory rate, weight, height (BMI computed on server).
- `GET /api/vitals/patient/:patientId`: Get patient historical vitals log.

#### 5. Doctor Consultations & EMR
- `POST /api/consultations`: Create draft or finalize/sign consultation with diagnosis, treatment plan, and women's health specialty section (Gynecology, Antenatal, PCOS, Menopause, Fertility).
- `PUT /api/consultations/:id/amend`: Amend signed consultation while preserving immutable amendment history.
- `GET /api/consultations/appointment/:appointmentId`: Get consultation associated with an appointment.
- `GET /api/consultations/patient/:patientId`: Get consultation records for a patient.

#### 6. Electronic Prescriptions
- `POST /api/prescriptions`: Issue electronic prescription with dosage, frequency, and duration.
- `GET /api/prescriptions/:id`: View prescription details.
- `GET /api/prescriptions/patient/:patientId`: View patient prescription history.

#### 7. Diagnostic & Laboratory Orders
- `POST /api/diagnostics`: Order diagnostic investigation (imaging, hormone panel, pathology, Pap cytology).
- `GET /api/diagnostics`: List laboratory orders filtered by status (`ORDERED`, `SAMPLE_COLLECTED`, `PROCESSING`, `COMPLETED`, `REVIEWED`).
- `PATCH /api/diagnostics/:id`: Update diagnostic order status, results notes, and review flag.

#### 8. Billing & Invoicing
- `POST /api/billing/invoices`: Create itemized invoice (subtotal, tax, and discount validated on server).
- `POST /api/billing/payments`: Record payment transaction (supports partial payments; generates unique `REC-XXXX`).
- `GET /api/billing/invoices`: List and filter invoices by patient or payment status (`PENDING`, `PARTIALLY_PAID`, `PAID`).
- `GET /api/billing/invoices/:id`: Get detailed invoice with line items and payments.

#### 9. Reports & Dashboards
- `GET /api/reports/admin-metrics`: Aggregated real-time metrics (patients, today's visits, revenue, pending requests).
- `GET /api/reports/doctor-metrics`: Doctor-specific dashboard metrics and assigned appointments queue.

#### 10. Public Website (Milestone 1 Preserved)
- `GET /api/health`: Health probe.
- `POST /api/appointments`: Public website appointment enquiry.
- `POST /api/contact`: Public website contact submission.
- `GET /api/doctors`, `GET /api/services`, `GET /api/articles`: Public website catalogs.
