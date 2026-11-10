import { motion } from 'framer-motion';
import SectionHeading from '../../components/ui/SectionHeading';
import DoctorCard from '../../components/doctors/DoctorCard';
import CTASection from '../../components/ui/CTASection';
import doctors from '../../data/doctors';

export default function DoctorsPage() {
  const visible = doctors.filter((d) => d.visible);

  return (
    <div>
      {/* Hero */}
      <section aria-labelledby="doctors-hero-heading" className="bg-[#442B3B] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#EBC4CF]/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="section-container text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#EBC4CF] mb-5"
          >
            Our Medical Team
          </motion.p>
          <motion.h1
            id="doctors-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-hero text-white text-balance leading-tight mb-6 max-w-3xl mx-auto"
          >
            Experienced Specialists in Women's Health
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Our team of dedicated clinicians brings expertise, compassion, and a genuine commitment to supporting women's health at every life stage.
          </motion.p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section aria-labelledby="doctors-grid-heading" className="bg-[#FAF5EF] py-20">
        <div className="section-container">
          <SectionHeading
            id="doctors-grid-heading"
            eyebrow="Our Specialists"
            title="Meet the Team"
            subtitle="Each of our clinicians is selected for their clinical expertise and their genuine commitment to patient-centred care."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>

          {/* Placeholder note */}
          <div className="mt-10 text-center">
            <p className="text-[#756A73] text-sm italic">
              Doctor details are currently being confirmed. Verified biographical information will be added before the website goes live.
            </p>
          </div>
        </div>
      </section>

      {/* Values statement */}
      <section aria-labelledby="team-values-heading" className="bg-white py-20">
        <div className="section-container max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">Our Commitment</p>
          <h2 id="team-values-heading" className="font-serif text-section text-[#442B3B] mb-6 text-balance leading-tight">
            Clinicians Who Genuinely Care
          </h2>
          <p className="text-[#756A73] text-base leading-relaxed mb-6">
            Every member of our clinical team shares a common purpose: to provide outstanding women's healthcare in an environment built on trust, respect, and genuine compassion. We are committed to continuous professional development and to staying current with best practices in women's health.
          </p>
          <p className="text-[#756A73] text-base leading-relaxed">
            Our team collaborates across specialties to ensure that patients with complex or interconnected health needs receive coordinated, thorough, and consistent care.
          </p>
        </div>
      </section>

      <CTASection
        id="doctors-cta"
        eyebrow="Ready to Book?"
        title="Request an Appointment With Our Team"
        subtitle="Let us know your preferred clinician and service, and we will be in touch to confirm your appointment."
        variant="plum"
      />
    </div>
  );
}
