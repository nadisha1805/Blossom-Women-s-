# Blossom Women's Health Clinic Management System

> **Integrated Healthcare Platform:** Complete solution covering Milestone 1 (Public Website), Milestone 2 (Clinic Management System & Clinical Workflows), and Milestone 3 (Secure Patient Portal, Self-Service & Online Gateway Payments).

---

## Project Overview

A comprehensive, full-stack women's healthcare platform connecting patients, doctors, nurses, laboratory staff, billing specialists, and clinic administrators on a unified PostgreSQL database and NestJS REST API architecture.

**Platform Capabilities:**
1. **Milestone 1 — Public Clinic Website:**
   - Homepage with hero, services preview, featured doctors, patient testimonials, educational resources, interactive FAQ, and contact forms.
   - Comprehensive service catalog and detailed physician profiles.
   - Public online appointment booking with immediate validation and conflict prevention.
2. **Milestone 2 — Clinic Management System & Staff Dashboards:**
   - Role-Based Access Control (RBAC) with 7 distinct roles: `SUPER_ADMIN`, `CLINIC_ADMIN`, `DOCTOR`, `NURSE`, `RECEPTIONIST`, `LAB_STAFF`, and `BILLING_STAFF`.
   - Patient Registration & Electronic Medical Records (EMR).
   - Nurse Vitals entry with automated BMI calculation and status staging.
   - Doctor Consultation Desk with diagnosis, clinical notes, and ICD-aligned care plans.
   - Electronic Prescriptions with dosage, frequency, and instructions.
   - Diagnostic Order Management for Ultrasound, Pathology, Cytology, and Blood Panels.
   - Itemized Invoicing, tax/discount adjustments, and receipt generation.
3. **Milestone 3 — Patient Portal & Online Integrations:**
   - Dedicated Patient Authentication with automatic clinical file linking (`PAT-XXXXX`).
   - Self-service dashboard displaying upcoming appointments, active prescriptions, released lab results, and current balance.
   - Appointment booking and cancellation workflows with IDOR protection.
   - Released Medical Summaries & Doctor notes (`isReleasedToPatient`).
   - Digital e-Prescriptions with printable prescription slips.
   - Released Diagnostic & Laboratory reports.
   - Online Payment Gateway flow with Razorpay order creation and HMAC-SHA256 signature verification.
   - In-app notification center and Patient Support ticketing system.

---

## Monorepo Architecture

```
M1/
├── frontend/       # React SPA (Vite + TypeScript + Tailwind CSS v3)
│   ├── src/
│   │   ├── components/layout/   # Public Layout, PortalLayout (Staff), PatientLayout (Patient)
│   │   ├── context/             # AuthContext (Dual Staff & Patient session handling)
│   │   ├── pages/               # Public pages (M1), Staff Portal (M2), Patient Portal (M3)
│   │   ├── routes/              # AppRouter with ProtectedRoute & PatientProtectedRoute
│   │   └── services/            # api.ts, portalApi.ts, patientPortalApi.ts
├── backend/        # NestJS REST API (TypeScript + Prisma ORM)
│   ├── prisma/                  # schema.prisma with migrations & relational constraints
│   ├── src/
│   │   ├── modules/auth/        # Staff RBAC authentication & JwtStrategy
│   │   ├── modules/patient-auth/# Patient authentication & clinical account linking
│   │   ├── modules/patient-portal/# IDOR-protected patient self-service endpoints
│   │   ├── modules/billing/     # Invoices, itemized charges & payment recording
│   │   ├── modules/vitals/      # Nurse clinical vital entries
│   │   ├── modules/consultations/# Doctor consultation desk
│   │   ├── modules/prescriptions/# Electronic prescription engine
│   │   └── modules/diagnostics/ # Laboratory order processing
└── docs/           # Technical specifications & documentation
```

---

## Tech Stack

### Frontend
- **Framework:** React 19 with Vite 8
- **Language:** TypeScript 5.8
- **Styling:** Tailwind CSS v3 with PostCSS 8 & Blossom design tokens
- **Routing:** React Router v7
- **Icons & Motion:** Lucide React & Framer Motion

### Backend
- **Framework:** NestJS 10
- **Language:** TypeScript 5
- **ORM:** Prisma ORM 5.22
- **Database:** PostgreSQL (with connection deferral for reliable startup)
- **Security:** Passport JWT, Bcrypt password hashing, HMAC-SHA256 signature verification, IDOR validation guards
- **Documentation:** Swagger / OpenAPI UI at `/api/docs`
- **Testing:** Vitest (17 passing unit and integration tests)

---

## Quick Start Guide

### 1. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npm test          # Run test suite (17 passed)
npm run start:dev # Runs at http://localhost:3001/api (Swagger: /api/docs)
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev       # Runs at http://127.0.0.1:5173
```

---

## Portals & Credentials

- **Public Website:** `http://127.0.0.1:5173/`
- **Patient Portal:** `http://127.0.0.1:5173/patient/login`
  - Demo Account: `eleanor.vance@example.com` (or use one-click "Quick Demo Login")
- **Staff Portal:** `http://127.0.0.1:5173/portal/login`
  - Admin: `admin@blossomclinic.com` / `admin123`
  - Doctor: `doctor@blossomclinic.com` / `doctor123`
  - Nurse: `nurse@blossomclinic.com` / `nurse123`
  - Lab: `lab@blossomclinic.com` / `lab123`
  - Billing: `billing@blossomclinic.com` / `billing123`

---

## Monorepo Structure

```
M1/
├── frontend/       # React SPA (Vite + TypeScript + Tailwind CSS)
├── backend/        # REST API (NestJS + TypeScript + Prisma)
├── docs/           # Technical documentation
│   ├── architecture.md
│   ├── api-overview.md
│   └── milestone-1-checklist.md
├── .env.example    # Environment variable template
└── README.md       # This file
```

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI library |
| TypeScript | ~6 | Type safety |
| Vite | ^8 | Build tool |
| Tailwind CSS | v3 | Styling |
| React Router | v7 | Routing |
| Framer Motion | ^14 | Animations |
| Lucide React | ^1 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | ^10 | Backend framework |
| TypeScript | ^5 | Type safety |
| Prisma | ^5 | ORM |
| PostgreSQL | 15+ | Database |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 15+ (for backend)

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

**Available scripts:**
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

### Backend

```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env with your PostgreSQL credentials
npm run start:dev
```

Backend runs at: `http://localhost:3001`

Health check: `GET http://localhost:3001/api/health`

**Available scripts:**
| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start with file watching |
| `npm run build` | Compile TypeScript |
| `npm run start:prod` | Start production build |

**Database:**
```bash
npx prisma migrate dev   # Run migrations
npx prisma studio        # Open Prisma Studio GUI
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [`docs/architecture.md`](docs/architecture.md) | System architecture, design system, routing |
| [`docs/api-overview.md`](docs/api-overview.md) | API endpoint specifications and schema |
| [`docs/milestone-1-checklist.md`](docs/milestone-1-checklist.md) | Implementation status checklist |

---

## Important Notes

### Doctor Information
All doctor profiles in `frontend/src/data/doctors.ts` contain **placeholder data only**. Names, qualifications, and credentials must be replaced with verified, consented information before launch.

### Legal Documents
The Privacy Policy and Terms of Service are **draft documents** and must be reviewed and approved by qualified legal advisors before the website is made publicly accessible.

### Form Submissions
In M1, appointment request and contact form submissions are **simulated in the frontend** — no data is actually sent anywhere. Backend API integration is planned for Milestone 2.

---

## Milestone Scope

| Feature | M1 | M2 | M3 |
|---------|----|----|-----|
| Public website | ✅ | — | — |
| Appointment request form (UI only) | ✅ | — | — |
| Backend API foundation | ✅ | — | — |
| Database schema | ✅ | — | — |
| Form → Backend integration | — | ✅ | — |
| Email notifications | — | ✅ | — |
| Staff admin portal | — | ✅ | — |
| Patient portal | — | — | ✅ |
| Payments | — | — | ✅ |

---

## License

Proprietary — all rights reserved. This codebase is not licensed for open distribution.
