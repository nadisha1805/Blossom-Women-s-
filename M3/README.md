# Blossom Women's Health Clinic — M1

> **Milestone 1:** Public-facing clinic website + initial backend & database foundation.

---

## Project Overview

A premium, responsive website for a multispecialty women's healthcare clinic. Built with a focus on compassionate design, accessibility, and a trustworthy clinical aesthetic.

**Clinic:** Blossom Women's Health Clinic
**Milestone:** 1 of 3

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
