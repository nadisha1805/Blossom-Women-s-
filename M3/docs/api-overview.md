# API Overview — Blossom Women's Health Clinic

> **Status:** M1 Foundation Planning — No live API endpoints in this milestone.
> The backend scaffold is established but all form submissions are currently simulated in the frontend.

---

## Planned Endpoints (M2+)

The following endpoints are planned for future milestones. They are documented here for architecture planning purposes only.

### Appointment Requests

```
POST /api/v1/appointment-requests
```

**Request Body:**
```json
{
  "patientName": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required)",
  "preferredService": "string (required, service ID)",
  "preferredDoctor": "string (optional, doctor ID)",
  "preferredDate": "string (required, ISO date, future date only)",
  "preferredTime": "string (optional)",
  "message": "string (optional, max 500 chars)",
  "privacyAcknowledged": "boolean (required, must be true)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Appointment request received",
  "referenceId": "string"
}
```

---

### Contact Form

```
POST /api/v1/contact
```

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "subject": "string (optional)",
  "message": "string (required, max 1000 chars)",
  "privacyAcknowledged": "boolean (required)"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Message received"
}
```

---

### Health Check

```
GET /api/health
```

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "ISO 8601 datetime"
}
```

---

## Planned Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model AppointmentRequest {
  id                 String   @id @default(cuid())
  patientName        String
  email              String
  phone              String
  preferredService   String
  preferredDoctor    String?
  preferredDate      DateTime
  preferredTime      String?
  message            String?
  status             AppointmentStatus @default(PENDING)
  submittedAt        DateTime @default(now())
  updatedAt          DateTime @updatedAt

  @@map("appointment_requests")
}

model ContactMessage {
  id          String   @id @default(cuid())
  name        String
  email       String
  phone       String?
  subject     String?
  message     String
  isRead      Boolean  @default(false)
  submittedAt DateTime @default(now())

  @@map("contact_messages")
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}
```

---

## CORS Configuration

The backend should be configured to accept requests only from the clinic's domain in production:

```typescript
// main.ts
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

---

## Rate Limiting

All public-facing form submission endpoints should implement rate limiting to prevent abuse:

- Appointment requests: max 5 requests per IP per hour
- Contact form: max 10 requests per IP per hour

This will be implemented using `@nestjs/throttler` in M2.

---

## Environment Variables

See `.env.example` in the repository root.
