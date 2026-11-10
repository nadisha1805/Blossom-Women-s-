import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import CTASection from '../../components/ui/CTASection';
import doctors from '../../data/doctors';

export default function DoctorProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const doctor = doctors.find((d) => d.slug === slug && d.visible);

  if (!doctor) {
    return (
      <div className="section-container py-24 text-center">
        <h1 className="font-serif text-3xl text-[#442B3B] mb-4">Doctor Profile Not Found</h1>
        <p className="text-[#756A73] mb-8">The profile you are looking for is not available.</p>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 bg-[#70405B] text-white px-6 py-3 rounded-xl font-sans text-sm font-medium hover:bg-[#442B3B] transition-colors"
        >
          Meet Our Doctors
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#E9DFE3]">
        <div className="section-container">
          <Breadcrumbs
            items={[
              { label: 'Our Doctors', to: '/doctors' },
              { label: doctor.title },
            ]}
          />
        </div>
      </div>

      {/* Profile Hero */}
      <section
        aria-labelledby="doctor-profile-heading"
        className="bg-gradient-to-br from-[#FAF5EF] to-[#F7E7EC] py-16"
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
            >
              <img
                src={doctor.image}
                alt={`Professional photograph — ${doctor.specialty}`}
                className="w-full h-[400px] object-cover object-top rounded-3xl shadow-elevated"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23F7E7EC" width="400" height="400"/%3E%3C/svg%3E';
                }}
              />
              <div className="mt-4 p-5 bg-white rounded-2xl border border-[#E9DFE3] shadow-soft">
                <span className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#70405B] mb-1">Specialty</span>
                <span className="text-[#442B3B] font-sans font-medium text-sm">{doctor.specialty}</span>
              </div>
              <Link
                to="/appointment"
                id="doctor-profile-appointment-cta"
                className="mt-4 flex items-center justify-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white font-sans font-medium py-4 rounded-2xl transition-all duration-200 shadow-soft hover:shadow-card text-sm w-full"
              >
                Request an Appointment
                <ArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-[#F7E7EC] text-[#70405B] text-xs font-sans font-medium rounded-full mb-4">
                  {doctor.specialty}
                </span>
                <h1 id="doctor-profile-heading" className="font-serif text-4xl text-[#442B3B] mb-2">
                  {doctor.title}
                </h1>
                <p className="font-sans text-[#756A73] text-base mb-1">{doctor.name}</p>
                <p className="font-sans text-[#756A73]/70 text-sm italic">{doctor.qualifications}</p>
              </div>

              {/* Biography */}
              <div>
                <h2 className="font-serif text-2xl text-[#442B3B] mb-4">About</h2>
                <p className="text-[#756A73] text-base leading-relaxed">{doctor.biography}</p>
              </div>

              {/* Clinical Interests */}
              <div>
                <h2 className="font-serif text-2xl text-[#442B3B] mb-4">Clinical Interests</h2>
                <ul className="space-y-3">
                  {doctor.clinicalInterests.map((interest, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#B9CBB7] flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-[#756A73] text-sm">{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation Info */}
              <div className="bg-white border border-[#E9DFE3] rounded-2xl p-6">
                <h2 className="font-sans font-semibold text-[#442B3B] text-base mb-3">Consultation Information</h2>
                <p className="text-[#756A73] text-sm leading-relaxed">{doctor.consultationInfo}</p>
              </div>

              {/* Disclaimer */}
              <p className="text-[#756A73]/60 text-xs italic">
                Clinician details are currently being confirmed. Please contact the clinic to verify qualifications and availability before booking.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        id="doctor-profile-cta"
        title="Ready to Book a Consultation?"
        subtitle="Submit an appointment request and our team will confirm your booking at a suitable time."
        variant="blush"
      />
    </div>
  );
}
