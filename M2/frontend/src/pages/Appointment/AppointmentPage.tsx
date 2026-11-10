import { motion } from 'framer-motion';
import AppointmentForm from '../../components/ui/AppointmentForm';

export default function AppointmentPage() {
  return (
    <div>
      {/* Hero */}
      <section
        aria-labelledby="appointment-hero-heading"
        className="bg-gradient-to-br from-[#F7E7EC] to-[#FAF5EF] py-20"
      >
        <div className="section-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#70405B] mb-5"
          >
            Book a Consultation
          </motion.p>
          <motion.h1
            id="appointment-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-hero text-[#442B3B] text-balance leading-tight mb-6 max-w-2xl mx-auto"
          >
            Request an Appointment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[#756A73] text-lg leading-relaxed max-w-xl mx-auto"
          >
            Complete the form below and our team will review your enquiry and contact you to confirm your appointment at a mutually convenient time.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </div>
  );
}
