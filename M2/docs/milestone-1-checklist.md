# Milestone 1 — Implementation Checklist

## Frontend

### Phase 1 — Scaffold
- [x] Vite + React + TypeScript project initialized in `frontend/`
- [x] Tailwind CSS v3 configured with brand design tokens
- [x] Framer Motion installed
- [x] Lucide React installed
- [x] React Router v7 installed
- [x] `@vitejs/plugin-react` installed
- [x] `vite.config.ts` created with React plugin
- [x] `tsconfig.json` configured for React JSX
- [x] `index.html` updated with correct entry point, title, and meta tags

### Phase 2 — Design System & Components
- [x] Global CSS variables and design tokens (`globals.css`)
- [x] Tailwind config with full brand color palette and typography
- [x] `Header` — responsive with mobile menu, scroll effect, nav links
- [x] `Footer` — links, contact info, legal links
- [x] `Layout` — Header + Footer wrapper with `<Outlet />`
- [x] `Button` — variants (primary, secondary, ghost), sizes, loading state
- [x] `SectionHeading` — eyebrow + title + subtitle, left/center align
- [x] `ServiceCard` — with image, name, description, link
- [x] `DoctorCard` — with image, name, specialty, profile link
- [x] `ArticleCard` — with image, category, reading time, excerpt, link
- [x] `FAQAccordion` — category filter + accordion Q&A
- [x] `CTASection` — variants (plum, blush), primary/secondary actions
- [x] `Breadcrumbs` — structured breadcrumb navigation
- [x] `AppointmentForm` — validated form with service/doctor selects
- [x] `prose-content` CSS class for article body HTML styling

### Phase 3 — Static Data
- [x] `services.ts` — 8 services with full detail content
- [x] `doctors.ts` — 3 doctor profiles (placeholders pending clinic confirmation)
- [x] `articles.ts` — 4 health education articles with HTML body
- [x] `faqs.ts` — FAQ categories and Q&A content

### Phase 4 — Pages
- [x] `HomePage` — Hero, highlights, services preview, about editorial, doctors, patient journey, resources, CTA
- [x] `AboutPage` — Hero, mission, values, specialties overview, patient experience, doctors, CTA
- [x] `ServicesPage` — Hero, service grid with filtering
- [x] `ServiceDetailPage` — Dynamic route, full service content, sidebar, related services
- [x] `DoctorsPage` — Hero, doctor grid
- [x] `DoctorProfilePage` — Dynamic route, profile details, clinical interests, sidebar
- [x] `ResourcesPage` — Hero, category filter, article grid
- [x] `ArticleDetailPage` — Dynamic route, article body, sidebar, related articles
- [x] `FAQPage` — Hero, accordion FAQ with category filter
- [x] `ContactPage` — Hero, contact form, contact info
- [x] `AppointmentPage` — Hero, appointment request form
- [x] `PrivacyPolicyPage` — Sectioned privacy policy (draft)
- [x] `TermsPage` — Sectioned terms and conditions (draft)
- [x] `NotFoundPage` — Branded 404 page

### Phase 5 — Routing & Navigation
- [x] `AppRouter.tsx` — All 14 routes defined
- [x] Navigation links wired up in Header
- [x] Mobile menu closes on route change
- [x] 404 catch-all route

### Images
- [x] Images generated and stored in `public/assets/images/`
- [x] All image references use correct `/assets/images/` public paths

---

## Backend

### Phase 6 — Backend Foundation
- [x] NestJS project scaffolded in `backend/`
- [x] Health check endpoint (`GET /api/health`)
- [x] CORS configuration
- [x] Environment variable configuration with `.env` support
- [x] Prisma configured with `DATABASE_URL`
- [x] Initial Prisma schema defined (`AppointmentRequest`, `ContactMessage`)
- [ ] Initial migration created (requires local PostgreSQL database)
- [ ] Database connection tested

### Note
> Form submissions (appointment request and contact form) are currently **simulated in the frontend only**. The frontend forms are not connected to the backend API in M1. This connection is planned for M2.

---

## Documentation

### Phase 7
- [x] `docs/architecture.md`
- [x] `docs/api-overview.md`
- [x] `docs/milestone-1-checklist.md` (this file)
- [x] `.env.example`
- [x] Root `README.md`

---

## Pre-Launch Items (Not M1 Scope)

These must be completed before the website is made publicly accessible:

- [ ] Replace all `[Placeholder]` content in doctor profiles with confirmed, consented information
- [ ] Have Privacy Policy reviewed and approved by qualified legal advisors
- [ ] Have Terms and Conditions reviewed and approved by qualified legal advisors
- [ ] Confirm clinic contact details (phone, email, address, opening hours)
- [ ] Connect appointment form to live backend API endpoint
- [ ] Connect contact form to live backend API endpoint
- [ ] Implement email notifications for new appointment requests
- [ ] Configure production database and run migrations
- [ ] Configure production domain and SSL
- [ ] Add analytics/cookie consent if applicable
- [ ] Conduct WCAG 2.1 AA accessibility audit
- [ ] Review all image alt text with clinic
- [ ] Implement per-page `<title>` and meta description management
- [ ] Test all routes and forms in production environment
