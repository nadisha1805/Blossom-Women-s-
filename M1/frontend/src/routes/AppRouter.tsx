import { Routes, Route, Navigate } from 'react-router-dom';
// Milestone 1 Public Layout & Pages
import Layout from '../components/layout/Layout';
import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';
import ServicesPage from '../pages/Services/ServicesPage';
import ServiceDetailPage from '../pages/Services/ServiceDetailPage';
import DoctorsPage from '../pages/Doctors/DoctorsPage';
import DoctorProfilePage from '../pages/Doctors/DoctorProfilePage';
import ResourcesPage from '../pages/Resources/ResourcesPage';
import ArticleDetailPage from '../pages/Resources/ArticleDetailPage';
import FAQPage from '../pages/FAQ/FAQPage';
import ContactPage from '../pages/Contact/ContactPage';
import AppointmentPage from '../pages/Appointment/AppointmentPage';
import PrivacyPolicyPage from '../pages/Legal/PrivacyPolicyPage';
import TermsPage from '../pages/Legal/TermsPage';
import NotFoundPage from '../pages/NotFoundPage';

// Milestone 2 Clinic Management Portal & Clinical Workflows
import PortalLayout from '../components/layout/PortalLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PortalLoginPage from '../pages/Portal/PortalLoginPage';
import AdminDashboardPage from '../pages/Portal/AdminDashboardPage';
import PatientsManagementPage from '../pages/Portal/PatientsManagementPage';
import AppointmentsManagementPage from '../pages/Portal/AppointmentsManagementPage';
import DoctorDashboardPage from '../pages/Portal/DoctorDashboardPage';
import NurseDashboardPage from '../pages/Portal/NurseDashboardPage';
import LabStaffDashboardPage from '../pages/Portal/LabStaffDashboardPage';
import BillingManagementPage from '../pages/Portal/BillingManagementPage';

// Milestone 3 Patient Portal & Self-Service
import PatientLayout from '../components/layout/PatientLayout';
import PatientProtectedRoute from '../components/auth/PatientProtectedRoute';
import PatientLoginPage from '../pages/Patient/PatientLoginPage';
import PatientRegisterPage from '../pages/Patient/PatientRegisterPage';
import PatientDashboardPage from '../pages/Patient/PatientDashboardPage';
import PatientAppointmentsPage from '../pages/Patient/PatientAppointmentsPage';
import PatientMedicalRecordsPage from '../pages/Patient/PatientMedicalRecordsPage';
import PatientPrescriptionsPage from '../pages/Patient/PatientPrescriptionsPage';
import PatientReportsPage from '../pages/Patient/PatientReportsPage';
import PatientBillingPage from '../pages/Patient/PatientBillingPage';
import PatientNotificationsPage from '../pages/Patient/PatientNotificationsPage';
import PatientSupportPage from '../pages/Patient/PatientSupportPage';
import PatientProfilePage from '../pages/Patient/PatientProfilePage';

export default function AppRouter() {
  return (
    <Routes>
      {/* ───────────────────────────────────────────────────────────
          1. PUBLIC WEBSITE (MILESTONE 1 PRESERVED)
         ─────────────────────────────────────────────────────────── */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />

        {/* Doctors */}
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:slug" element={<DoctorProfilePage />} />

        {/* Health Resources */}
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:slug" element={<ArticleDetailPage />} />

        {/* Other Public Pages */}
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />

        {/* Legal */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Route>

      {/* ───────────────────────────────────────────────────────────
          2. CLINIC MANAGEMENT PORTAL (MILESTONE 2)
         ─────────────────────────────────────────────────────────── */}
      <Route path="/portal/login" element={<PortalLoginPage />} />
      <Route
        path="/portal/unauthorized"
        element={
          <div className="min-h-screen bg-[#FAF5EF] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md text-center border border-[#E9DFE3]">
              <h2 className="font-serif text-2xl font-bold text-rose-800 mb-2">Access Denied</h2>
              <p className="text-xs text-[#756A73] mb-4">
                Your staff role does not have authorization to view this clinical workflow.
              </p>
              <a
                href="/portal"
                className="inline-block px-4 py-2 rounded-xl bg-[#70405B] text-white text-xs font-semibold"
              >
                Return to Workspace
              </a>
            </div>
          </div>
        }
      />

      {/* Protected Clinic Portal Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PortalLayout />}>
          {/* Index redirect to user role's primary dashboard */}
          <Route path="/portal" element={<Navigate to="/portal/admin" replace />} />

          {/* Admin Dashboard */}
          <Route
            path="/portal/admin"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'CLINIC_ADMIN']} />
            }
          >
            <Route index element={<AdminDashboardPage />} />
          </Route>

          {/* Patients Directory */}
          <Route
            path="/portal/patients"
            element={
              <ProtectedRoute
                allowedRoles={['SUPER_ADMIN', 'CLINIC_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']}
              />
            }
          >
            <Route index element={<PatientsManagementPage />} />
          </Route>

          {/* Appointments Management */}
          <Route
            path="/portal/appointments"
            element={
              <ProtectedRoute
                allowedRoles={['SUPER_ADMIN', 'CLINIC_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']}
              />
            }
          >
            <Route index element={<AppointmentsManagementPage />} />
          </Route>

          {/* Doctor Desk & EMR */}
          <Route
            path="/portal/doctor"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'CLINIC_ADMIN', 'DOCTOR']} />
            }
          >
            <Route index element={<DoctorDashboardPage />} />
          </Route>

          {/* Nurse Desk & Vitals */}
          <Route
            path="/portal/nurse"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'CLINIC_ADMIN', 'NURSE']} />
            }
          >
            <Route index element={<NurseDashboardPage />} />
          </Route>

          {/* Diagnostic & Laboratory */}
          <Route
            path="/portal/lab"
            element={
              <ProtectedRoute
                allowedRoles={['SUPER_ADMIN', 'CLINIC_ADMIN', 'LAB_STAFF', 'DOCTOR']}
              />
            }
          >
            <Route index element={<LabStaffDashboardPage />} />
          </Route>

          {/* Billing & Invoices */}
          <Route
            path="/portal/billing"
            element={
              <ProtectedRoute
                allowedRoles={['SUPER_ADMIN', 'CLINIC_ADMIN', 'BILLING_STAFF', 'RECEPTIONIST']}
              />
            }
          >
            <Route index element={<BillingManagementPage />} />
          </Route>
        </Route>
      </Route>

      {/* ───────────────────────────────────────────────────────────
          3. PATIENT PORTAL (MILESTONE 3)
         ─────────────────────────────────────────────────────────── */}
      <Route path="/patient/login" element={<PatientLoginPage />} />
      <Route path="/patient/register" element={<PatientRegisterPage />} />

      {/* Protected Patient Portal Experience */}
      <Route element={<PatientProtectedRoute />}>
        <Route element={<PatientLayout />}>
          <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
          <Route path="/patient/appointments" element={<PatientAppointmentsPage />} />
          <Route path="/patient/consultations" element={<PatientMedicalRecordsPage />} />
          <Route path="/patient/prescriptions" element={<PatientPrescriptionsPage />} />
          <Route path="/patient/reports" element={<PatientReportsPage />} />
          <Route path="/patient/billing" element={<PatientBillingPage />} />
          <Route path="/patient/notifications" element={<PatientNotificationsPage />} />
          <Route path="/patient/support" element={<PatientSupportPage />} />
          <Route path="/patient/profile" element={<PatientProfilePage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
