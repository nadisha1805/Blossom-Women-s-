# Blossom Women's Health Clinic — Production Deployment Guide

This guide describes the complete production deployment architecture, containerization, database management, and security checklist for the integrated **Milestone 1 (Public Website)**, **Milestone 2 (Clinic Management System)**, and **Milestone 3 (Patient Portal & Payments)** platform.

---

## 1. Architecture Overview

The system runs as three containerized services managed by Docker Compose or Kubernetes:
- **`postgres`**: Relational PostgreSQL database storing patients, medical records, appointments, prescriptions, diagnostic results, invoices, and audit logs.
- **`backend`**: Node.js/NestJS REST API engine with Prisma ORM, Passport JWT authentication, Swagger OpenAPI documentation, and Razorpay HMAC-SHA256 signature verification.
- **`frontend`**: High-performance Nginx web server hosting the compiled React 19 SPA, serving static assets with gzip compression, caching, and proxying `/api` requests to the backend.

```
                      ┌────────────────────────────────────────┐
                      │          Internet / Clients            │
                      └──────────────────┬─────────────────────┘
                                         │ HTTPS (443) / HTTP (80)
                                         ▼
                      ┌────────────────────────────────────────┐
                      │          Nginx Frontend Container      │
                      │  - React 19 Single Page Application    │
                      │  - Public Website (M1)                 │
                      │  - Staff Portal (M2)                   │
                      │  - Patient Portal (M3)                 │
                      └──────────────────┬─────────────────────┘
                                         │ Reverse Proxy (/api/*)
                                         ▼
                      ┌────────────────────────────────────────┐
                      │          NestJS Backend Container      │
                      │  - REST API Engine (:3001)             │
                      │  - JWT & RBAC Guard Validation         │
                      │  - HMAC Signature Verification         │
                      │  - Swagger UI (/api/docs)              │
                      └──────────────────┬─────────────────────┘
                                         │ Database Connections
                                         ▼
                      ┌────────────────────────────────────────┐
                      │         PostgreSQL Database            │
                      │  - Relational Schema & Constraints     │
                      │  - Persistent Volume Storage           │
                      └────────────────────────────────────────┘
```

---

## 2. Quick Production Deployment with Docker Compose

### Prerequisites
- Docker Engine 24+ and Docker Compose v2+
- Valid domain name with DNS A records configured (e.g. `clinic.blossomhealth.com`)
- SSL/TLS certificate (Let's Encrypt or corporate CA)

### Step 1: Clone Repository & Configure Environment
```bash
git clone <repository-url>
cd "Women Healthcare/M1"
cp .env.example .env
```

Ensure production values are set in `.env`:
```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://postgres:StrongPassword2026!@postgres:5432/blossom_clinic_db?schema=public
JWT_SECRET=super_long_cryptographically_secure_random_key_64_characters
RAZORPAY_KEY_ID=rzp_live_your_production_key_id
RAZORPAY_KEY_SECRET=your_production_secret_key
CORS_ORIGIN=https://clinic.blossomhealth.com
```

### Step 2: Build & Start All Containers
```bash
docker compose up --build -d
```

### Step 3: Verify Container Health
```bash
docker compose ps
docker compose logs -f backend
```

---

## 3. Database Initialization & Migrations

When launching against a fresh PostgreSQL instance, deploy database migrations using Prisma:

```bash
# Run migrations inside the running backend container
docker compose exec backend npx prisma migrate deploy

# Seed baseline specialty services and doctors
docker compose exec backend npm run prisma:seed
```

### Automated Database Backups
Schedule daily PostgreSQL backups using `pg_dump`:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/blossom-clinic"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p "$BACKUP_DIR"

docker compose exec -T postgres pg_dump -U postgres blossom_clinic_db | gzip > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql.gz"

# Retain backups for 30 days
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +30 -delete
```

---

## 4. Production Security & Compliance Checklist

- [x] **IDOR Protection:** All patient endpoints verify `account.linkedPatientId`, ensuring patients cannot query or cancel foreign clinical records.
- [x] **Clinical Release Gating (`isReleasedToPatient`):** Doctors and lab staff must sign off on notes before they become visible on patient portal dashboards.
- [x] **Cryptographic Payment Verification:** All payment webhooks and gateway callbacks verify the HMAC-SHA256 signature against `RAZORPAY_KEY_SECRET`.
- [x] **Password Security:** All staff and patient passwords are salted and hashed using bcrypt (10 rounds).
- [x] **HTTP Security Headers:** Nginx is configured with:
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- [x] **CORS Lockdown:** In production, `CORS_ORIGIN` restricts cross-origin requests exclusively to your verified domain.

