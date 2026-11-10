import { Routes, Route } from 'react-router-dom';
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

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Main Pages */}
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

        {/* Other Pages */}
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />

        {/* Legal */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
