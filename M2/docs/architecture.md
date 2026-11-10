# Blossom Women's Health Clinic — M1 Architecture Overview

## Project Structure

```
M1/
├── frontend/         # React + Vite + TypeScript SPA
├── backend/          # NestJS REST API (see Phase 6 notes)
├── docs/             # Technical documentation
├── .env.example      # Environment variable template
└── README.md         # Root project readme
```

---

## Frontend Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + React Router v7 + Framer Motion + Lucide React

### Directory Structure

```
frontend/src/
├── assets/           # Static assets (images referenced from /public/assets/)
├── components/
│   ├── articles/     # ArticleCard
│   ├── doctors/      # DoctorCard
│   ├── layout/       # Header, Footer, Layout
│   ├── services/     # ServiceCard
│   └── ui/           # AppointmentForm, Breadcrumbs, Button, CTASection,
│                     #   FAQAccordion, SectionHeading
├── data/             # Static data files (TypeScript)
│   ├── articles.ts   # Health education articles
│   ├── doctors.ts    # Doctor profiles
│   ├── faqs.ts       # FAQ categories and questions
│   └── services.ts   # Healthcare service catalog
├── hooks/            # Custom React hooks (empty — placeholder for M2+)
├── lib/              # Utility functions (empty — placeholder for M2+)
├── pages/
│   ├── About/        # AboutPage
│   ├── Appointment/  # AppointmentPage (uses AppointmentForm)
│   ├── Contact/      # ContactPage (with contact form)
│   ├── Doctors/      # DoctorsPage + DoctorProfilePage
│   ├── FAQ/          # FAQPage
│   ├── Home/         # HomePage
│   ├── Legal/        # PrivacyPolicyPage + TermsPage
│   ├── Resources/    # ResourcesPage + ArticleDetailPage
│   └── Services/     # ServicesPage + ServiceDetailPage
├── routes/
│   └── AppRouter.tsx # React Router v7 route definitions
└── styles/
    └── globals.css   # Global CSS, design tokens, utilities, prose styles
```

### Design System

**Color Palette:**
| Token | Value | Use |
|-------|-------|-----|
| Plum Dark | `#442B3B` | Headings, primary text |
| Plum | `#70405B` | Accents, interactive elements |
| Blush | `#EBC4CF` | Soft highlights, borders |
| Blush Light | `#F7E7EC` | Subtle backgrounds |
| Ivory | `#FAF5EF` | Page background |
| Sage | `#B9CBB7` | Success, checkmarks |
| Sage BG | `#EEF3EC` | Greenish backgrounds |
| Lavender | `#DCD2EE` | Journey section background |
| Text Secondary | `#756A73` | Body text |
| Border Soft | `#E9DFE3` | Borders, dividers |

**Typography:**
- Serif: DM Serif Display (headings)
- Sans: Inter (body, UI elements)

**Font sizes:** Responsive clamp values (`text-hero`, `text-section`, `text-card-heading`)

### Image Assets

All images must be placed in `/frontend/public/assets/images/` to be served at `/assets/images/<filename>` in the running app.

Current images:
- `hero-doctor.png` — Homepage hero
- `about-clinic.png` — About page and homepage editorial
- `doctor-1.png`, `doctor-2.png`, `doctor-3.png` — Doctor profiles
- `article-1.png`, `article-2.png`, `article-3.png` — Article covers
- `service-gynecology.png`, `service-maternity.png`, `service-fertility.png`, `service-wellness.png` — Service images

### Routing

All routes are defined in `src/routes/AppRouter.tsx`. All routes share the `Layout` wrapper (Header + Footer).

| Route | Page |
|-------|------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/services` | ServicesPage |
| `/services/:slug` | ServiceDetailPage |
| `/doctors` | DoctorsPage |
| `/doctors/:slug` | DoctorProfilePage |
| `/resources` | ResourcesPage |
| `/resources/:slug` | ArticleDetailPage |
| `/faq` | FAQPage |
| `/contact` | ContactPage |
| `/appointment` | AppointmentPage |
| `/privacy-policy` | PrivacyPolicyPage |
| `/terms` | TermsPage |
| `*` | NotFoundPage |

---

## Backend Architecture (Foundation — M1 Scope)

**Stack:** Node.js + TypeScript + NestJS + PostgreSQL + Prisma ORM

**Status (M1):** Initial scaffold only. No production functionality is live.

### Planned Structure

```
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── health/         # Health check endpoint
│   ├── appointment/    # Appointment request module (M2+)
│   ├── contact/        # Contact form module (M2+)
│   └── prisma/         # Prisma service
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Migration history
├── .env                # Environment variables (not committed)
├── .env.example        # Template
└── package.json
```

### Initial Prisma Schema (M1 Planning)

See `docs/api-overview.md` for the planned schema.

---

## Security Considerations

- No patient clinical data is collected through the public website in M1
- Appointment request forms collect: name, email, phone, preferred service/doctor/date/time, optional brief message
- Privacy policy is draft only — must be reviewed by legal before launch
- No authentication is implemented in M1
- All form submissions in M1 are simulated (no backend endpoint is live)

---

## Pre-Launch Requirements

Before going live, the following must be confirmed and completed:

1. **Doctor profiles** — Replace all placeholder names, titles, and qualifications with verified, consented information
2. **Legal documents** — Privacy Policy and Terms must be reviewed and approved by qualified legal advisors
3. **Contact details** — Replace all placeholder contact information in Footer, ContactPage, and Legal pages
4. **Backend endpoint** — Connect AppointmentForm to a real API endpoint
5. **Analytics/cookies** — If adding analytics, update Privacy Policy and implement cookie consent
6. **Image alt text** — Review all image alt text with the clinic for accuracy
7. **SEO** — Add per-page meta descriptions to all routes via document.title or a router-level meta management approach
8. **Accessibility audit** — Conduct a formal WCAG 2.1 AA review before launch
