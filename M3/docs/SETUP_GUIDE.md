# Blossom Women's Health Clinic — Setup & Execution Guide
## Milestone 1 Development & Local Verification

Follow these steps to run and test Milestone 1 locally.

---

### Prerequisites
- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **PostgreSQL**: v15 or higher (running locally or via Docker / hosted provider)

---

### Step 1: Environment Configuration

Create a `.env` file in `M1/backend/` (or copy from root `.env.example`):

```bash
cd "M1/backend"
cp ../.env.example .env
```

Ensure your `.env` contains:
```env
# Application
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173,http://localhost:3000

# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blossom_clinic_db?schema=public"
```

In `M1/frontend/` (optional, defaults to `http://localhost:3001/api`):
```env
VITE_API_URL=http://localhost:3001/api
```

---

### Step 2: Database Migration & Seeding (Backend)

Run database migrations to generate the tables, and seed the initial doctors, services, and articles:

```bash
cd "M1/backend"

# Apply initial migration to your PostgreSQL database:
npx prisma migrate deploy

# (Optional: or use migrate dev for interactive local dev)
# npx prisma migrate dev --name init

# Seed clinic doctors, services, and educational articles:
npx tsx prisma/seed.ts
```

---

### Step 3: Start the Backend REST API Server

```bash
cd "M1/backend"
npm run start:dev
```

- **API Base:** `http://localhost:3001/api`
- **Health Check:** `http://localhost:3001/api/health`
- **OpenAPI / Swagger Documentation:** `http://localhost:3001/api/docs`

---

### Step 4: Start the Frontend Application

Open a new terminal window:

```bash
cd "M1/frontend"
npm run dev
```

The frontend will start on:
- **Web App:** `http://localhost:5173`

---

### Step 5: Run Automated Tests

To run unit and service integration tests:

```bash
cd "M1/backend"
npm run test
```

To run production type checks and builds:

```bash
# Verify frontend compilation:
cd "M1/frontend"
npm run build

# Verify backend compilation:
cd "M1/backend"
npm run build
```

---

### Functional Verification Checklist
1. **Homepage:** Navigate to `http://localhost:5173/` — check Hero section, Specialty cards, Why Choose Us, Doctor profiles, Educational articles, FAQs, and Footer.
2. **About Us:** View clinic values, patient-centric philosophy, and team introduction.
3. **Services & Detail Pages:** Navigate to `/services` and click any service card (e.g. `/services/gynecology`) to view clinical expectations, benefits, and consultation details.
4. **Doctors Directory & Profiles:** Navigate to `/doctors` and `/doctors/:slug` to see clinician qualifications and areas of expertise.
5. **Health Resources:** Visit `/resources` and open articles to review women's health awareness content.
6. **FAQ Accordion:** Test interactive accordion collapse and expand behaviour.
7. **Contact Form:** Send an enquiry at `/contact` and observe validation & submission response.
8. **Appointment Request Form:** Submit a request at `/appointment` with date selection, service, doctor, and consent. Verify that status `REQUESTED` is assigned with a unique reference ID.
9. **Swagger UI:** Check `http://localhost:3001/api/docs` to test endpoints directly.

