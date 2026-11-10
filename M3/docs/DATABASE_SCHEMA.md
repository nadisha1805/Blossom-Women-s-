# Database Schema Documentation — Milestone 1
## Women's Healthcare Clinic Management System

Database: **PostgreSQL 15+**  
ORM: **Prisma ORM 5.22.0**

---

### Entity Relationship Overview

```
 [Doctor] 1 ──────── 0..* [AppointmentRequest] *..0 ──────── 1 [Service]
                                 │
                            status: REQUESTED
                                 │
                   [ContactMessage] (Independent)
                   [Article]        (Independent)
```

---

### 1. `doctors` Table
Represents clinic medical practitioners and specialists.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT (UUID) | PRIMARY KEY, default uuid() | Unique doctor identifier |
| `name` | TEXT | NOT NULL | Doctor full name and title |
| `slug` | TEXT | NOT NULL, UNIQUE | URL-friendly slug (e.g. `dr-priya-sharma`) |
| `qualification` | TEXT | NOT NULL | Degrees, fellowship, and credentials |
| `specialty` | TEXT | NOT NULL | Primary clinical specialty |
| `experienceYears`| INTEGER | NULLABLE | Years of clinical practice |
| `biography` | TEXT | NOT NULL | Professional bio and care philosophy |
| `areasOfExpertise`| TEXT[] | DEFAULT ARRAY[] | Clinical interest tags |
| `profileImage` | TEXT | NULLABLE | Path or CDN URL to photo |
| `isActive` | BOOLEAN | DEFAULT true | Directory visibility |
| `createdAt` | TIMESTAMP | DEFAULT now() | Record creation date |
| `updatedAt` | TIMESTAMP | AUTO UPDATE | Record modification date |

---

### 2. `services` Table
Represents medical specialties and clinical services offered.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT (UUID) | PRIMARY KEY, default uuid() | Unique service identifier |
| `name` | TEXT | NOT NULL | Display name |
| `slug` | TEXT | NOT NULL, UNIQUE | URL slug (e.g. `gynecology`) |
| `description` | TEXT | NOT NULL | High-level clinical description |
| `benefits` | TEXT | NULLABLE | Patient benefits |
| `whatToExpect` | TEXT | NULLABLE | What happens during consultation |
| `category` | TEXT | NULLABLE | Grouping (Maternity, Endocrinology, etc.) |
| `isActive` | BOOLEAN | DEFAULT true | Active catalog flag |
| `createdAt` | TIMESTAMP | DEFAULT now() | Creation date |
| `updatedAt` | TIMESTAMP | AUTO UPDATE | Modification date |

---

### 3. `appointment_requests` Table
Stores incoming patient appointment enquiries awaiting clinic confirmation.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT (UUID) | PRIMARY KEY, default uuid() | System unique key |
| `referenceId` | TEXT | NOT NULL, UNIQUE | Human-readable ref code (e.g., `BLS-9A4F2C`) |
| `patientName` | TEXT | NOT NULL | Patient full name |
| `email` | TEXT | NOT NULL | Patient contact email |
| `phone` | TEXT | NOT NULL | Patient contact telephone |
| `serviceId` | TEXT | NOT NULL, FK → `services.id` | Selected clinical service |
| `preferredDoctorId`| TEXT | NULLABLE, FK → `doctors.id` | Selected physician if requested |
| `preferredDate` | TIMESTAMP | NOT NULL | Patient requested visit date |
| `preferredTime` | TEXT | NULLABLE | Preferred time window |
| `reason` | TEXT | NULLABLE | Non-confidential appointment reason |
| `status` | ENUM | DEFAULT 'REQUESTED' | Current status (`REQUESTED`, `CONFIRMED`, `RESCHEDULED`, `CANCELLED`) |
| `consent` | BOOLEAN | DEFAULT false | Privacy consent confirmation |
| `createdAt` | TIMESTAMP | DEFAULT now() | Request submission timestamp |
| `updatedAt` | TIMESTAMP | AUTO UPDATE | Update timestamp |

---

### 4. `contact_messages` Table
Stores enquiries submitted through the Contact Us form.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT (UUID) | PRIMARY KEY, default uuid() | Unique ID |
| `name` | TEXT | NOT NULL | Sender name |
| `email` | TEXT | NOT NULL | Sender email |
| `phone` | TEXT | NULLABLE | Sender phone |
| `subject` | TEXT | NOT NULL | Topic |
| `message` | TEXT | NOT NULL | Message body |
| `consent` | BOOLEAN | DEFAULT false | Privacy consent flag |
| `isRead` | BOOLEAN | DEFAULT false | Read indicator for staff |
| `createdAt` | TIMESTAMP | DEFAULT now() | Created date |
| `updatedAt` | TIMESTAMP | AUTO UPDATE | Modified date |

---

### 5. `articles` Table
Educational women's health content and resources.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | TEXT (UUID) | PRIMARY KEY, default uuid() | Unique ID |
| `title` | TEXT | NOT NULL | Article title |
| `slug` | TEXT | NOT NULL, UNIQUE | URL slug |
| `excerpt` | TEXT | NOT NULL | Short summary |
| `content` | TEXT | NOT NULL | Educational article body |
| `category` | TEXT | NOT NULL | Topic category |
| `featuredImage` | TEXT | NULLABLE | Cover image path |
| `readTime` | TEXT | NULLABLE | E.g. '5 min read' |
| `published` | BOOLEAN | DEFAULT true | Publication flag |
| `createdAt` | TIMESTAMP | DEFAULT now() | Published date |
| `updatedAt` | TIMESTAMP | AUTO UPDATE | Update date |

---

### Future Milestone Extension Points
- **Milestone 2:** User & Staff authentication (`users`, `roles`, `permissions`), `patient_records`, `consultation_notes`, `prescriptions`, `diagnostics_orders`, `billing_invoices`.
- **Milestone 3:** `patient_portal_accounts`, `portal_notifications`, `payment_transactions`, `appointment_slots`.

