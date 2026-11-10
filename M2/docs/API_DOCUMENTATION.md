# Blossom Women's Health Clinic — API Documentation
## Milestone 1: Public Website & Appointment Foundation

### Base URLs
- **Development API:** `http://localhost:3001/api`
- **Interactive Swagger UI:** `http://localhost:3001/api/docs`
- **Health Check:** `http://localhost:3001/api/health`

---

### Authentication & Authorization
Milestone 1 endpoints are public-facing to support clinic visitors and patient appointment enquiries. Role-based access control and JWT authentication for clinic staff and patients are architected for **Milestone 2** and **Milestone 3**.

---

### Endpoints

#### 1. Health Check
- **`GET /api/health`**
- **Description:** Returns server and operational health status.
- **Response `200 OK`:**
  ```json
  {
    "status": "ok",
    "timestamp": "2026-11-10T14:30:00.000Z"
  }
  ```

---

#### 2. Appointments
- **`POST /api/appointments`**
- **Description:** Submit a patient appointment request.
- **Status Assigned:** `REQUESTED` (not automatically confirmed).
- **Request Body:**
  ```json
  {
    "patientName": "Sarah Jenkins",
    "email": "sarah.jenkins@example.com",
    "phone": "+1 555-0199",
    "serviceId": "gynecology",
    "preferredDoctorId": "dr-priya-sharma",
    "preferredDate": "2026-11-25",
    "preferredTime": "Morning (9:00 AM – 12:00 PM)",
    "reason": "Annual gynecological consultation and checkup",
    "consent": true
  }
  ```
- **Validation Rules:**
  - `patientName`: Required, string, min 2 chars.
  - `email`: Required, valid email format.
  - `phone`: Required, valid phone pattern (+/digits).
  - `serviceId`: Required, ID or slug of service.
  - `preferredDoctorId`: Optional.
  - `preferredDate`: Required, ISO 8601 date, cannot be in past.
  - `consent`: Required boolean, must be `true`.
- **Response `201 Created`:**
  ```json
  {
    "success": true,
    "message": "Appointment request submitted successfully. Our team will contact you to confirm.",
    "data": {
      "id": "c1f7a61d-84e1-4560-9092-7d2d385f0962",
      "referenceId": "BLS-89C32A",
      "patientName": "Sarah Jenkins",
      "service": "General & Preventive Gynecology",
      "preferredDoctor": "Dr. Priya Sharma",
      "preferredDate": "2026-11-25T00:00:00.000Z",
      "preferredTime": "Morning (9:00 AM – 12:00 PM)",
      "status": "REQUESTED",
      "createdAt": "2026-11-10T14:30:00.000Z"
    }
  }
  ```

- **`GET /api/appointments/:referenceId`**
- **Description:** Lookup status of an appointment request using its unique reference ID (e.g. `BLS-89C32A`).

---

#### 3. Contact Enquiries
- **`POST /api/contact`**
- **Description:** Submit general enquiries from the contact page.
- **Request Body:**
  ```json
  {
    "name": "Maya Patel",
    "email": "maya.patel@example.com",
    "phone": "+1 555-0144",
    "subject": "Inquiry regarding ultrasound scheduling",
    "message": "Hello, I would like to inquire about booking availability for pelvic scans next week.",
    "consent": true
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "success": true,
    "message": "Your message has been received. Our clinic team will get back to you shortly.",
    "id": "e2a1b3c4-1234-5678-9abc-def012345678"
  }
  ```

---

#### 4. Doctors
- **`GET /api/doctors`**
  - Returns list of active clinic doctors, specialties, qualifications, and bios.
- **`GET /api/doctors/:slug`**
  - Returns specific doctor profile by URL slug (e.g., `dr-priya-sharma`).

---

#### 5. Clinical Services
- **`GET /api/services`**
  - Returns all active clinical services and specialties.
- **`GET /api/services/:slug`**
  - Returns service overview, clinical expectations, and benefits.

---

#### 6. Educational Health Articles
- **`GET /api/articles?category={category}`**
  - Returns published articles, with optional category filter.
- **`GET /api/articles/:slug`**
  - Returns individual educational article content.

