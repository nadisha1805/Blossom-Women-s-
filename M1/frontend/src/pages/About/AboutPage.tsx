import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Eye, Users, Shield } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import CTASection from '../../components/ui/CTASection';
import DoctorCard from '../../components/doctors/DoctorCard';
import doctors from '../../data/doctors';

const values = [
  {
    icon: Heart,
    title: 'Compassion First',
    description:
      'Every consultation begins with listening. We take the time to understand your concerns, your circumstances, and your goals before offering any guidance.',
  },
  {
    icon: Eye,
    title: 'Informed Decisions',
    description:
      'We believe women deserve clear, honest, and accessible information about their health options. We explain everything thoroughly and support you in making confident decisions.',
  },
  {
    icon: Users,
    title: 'Inclusive Care',
    description:
      'We welcome women from all backgrounds, at every life stage. Our clinic is a space of warmth, respect, and non-judgment for every patient.',
  },
  {
    icon: Shield,
    title: 'Privacy & Dignity',
    description:
      'Your personal and health information is protected with the highest standards of confidentiality and professional ethics at all times.',
  },
];

const experiences = [
  'A welcoming reception and consultation environment',
  'Unhurried appointments where your questions matter',
  'Clear explanations in accessible, jargon-free language',
  'A consistent clinical team you can build trust with',
  'Respectful coordination of any referrals or investigations',
  'Follow-up support and continuity of care',
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        aria-labelledby="about-hero-heading"
        className="bg-[#442B3B] py-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#EBC4CF]/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-[#DCD2EE]/10 blur-2xl pointer-events-none" aria-hidden="true" />
        <div className="section-container relative text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#EBC4CF] mb-5"
          >
            About the Clinic
          </motion.p>
          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-hero text-white text-balance leading-tight mb-6 max-w-3xl mx-auto"
          >
            Healthcare Built on Trust, Compassion, and Expertise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-white/70 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            At Blossom Women's Health Clinic, we have created a healthcare environment where every woman feels genuinely heard, expertly cared for, and fully supported at every stage of her life.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-heading" className="bg-[#FAF5EF] py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">
                Our Mission
              </p>
              <h2 id="mission-heading" className="font-serif text-section text-[#442B3B] mb-6 text-balance leading-tight">
                Putting Women's Health at the Centre of Everything We Do
              </h2>
              <p className="text-[#756A73] text-base leading-relaxed mb-5">
                Our mission is to provide exceptional, accessible, and compassionate women's healthcare that empowers patients to make informed decisions about their health and wellbeing. We are committed to treating every person with dignity, transparency, and respect.
              </p>
              <p className="text-[#756A73] text-base leading-relaxed mb-8">
                We recognize that seeking healthcare can feel vulnerable, and we are intentional about creating an environment that feels safe, unhurried, and genuinely supportive. Every appointment is an opportunity to listen carefully, explain clearly, and care genuinely.
              </p>
              <Link
                to="/appointment"
                id="about-appointment-cta"
                className="inline-flex items-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white font-sans font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-soft hover:shadow-card text-sm"
              >
                Request an Appointment
                <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src="/assets/images/about-clinic.png"
                alt="The welcoming interior of Blossom Women's Health Clinic"
                className="w-full h-[420px] object-cover rounded-3xl shadow-elevated"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-white py-20">
        <div className="section-container">
          <SectionHeading
            id="values-heading"
            eyebrow="Our Values"
            title="The Principles That Guide Our Care"
            subtitle="These core commitments shape every interaction, decision, and consultation at our clinic."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-3xl bg-[#FAF5EF] border border-[#E9DFE3]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F7E7EC] flex items-center justify-center flex-shrink-0">
                  <value.icon size={22} className="text-[#70405B]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-[#442B3B] text-base mb-2">{value.title}</h3>
                  <p className="text-[#756A73] text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section aria-labelledby="about-services-heading" className="bg-[#FAF5EF] py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">
                Our Specialties
              </p>
              <h2 id="about-services-heading" className="font-serif text-section text-[#442B3B] mb-6 text-balance leading-tight">
                A Comprehensive Range of Women's Healthcare Services
              </h2>
              <p className="text-[#756A73] text-base leading-relaxed mb-6">
                Our clinic provides specialist care across the full spectrum of women's health, from routine gynaecological wellness visits to expert consultations for complex conditions. Each service is delivered by experienced clinicians who understand the unique dimensions of women's healthcare.
              </p>
              <Link
                to="/services"
                id="about-services-link"
                className="inline-flex items-center gap-2 font-sans font-medium text-[#70405B] text-sm hover:gap-3 transition-all duration-200 group"
              >
                Explore All Services
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Gynaecology',
                'Pregnancy & Antenatal Care',
                'Postnatal Care',
                'Menstrual Health',
                'PCOS Consultations',
                'Fertility Consultations',
                'Menopause Care',
                'Preventive Screenings',
              ].map((svc) => (
                <div
                  key={svc}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#E9DFE3]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#EBC4CF] flex-shrink-0" aria-hidden="true" />
                  <span className="font-sans text-[#442B3B] text-sm font-medium">{svc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Patient Experience */}
      <section aria-labelledby="experience-heading" className="bg-[#DCD2EE]/30 py-20">
        <div className="section-container">
          <SectionHeading
            id="experience-heading"
            eyebrow="Patient Experience"
            title="What to Expect From Every Visit"
            subtitle="We are committed to making each appointment a positive, respectful, and informative experience."
          />
          <div className="mt-12 max-w-2xl mx-auto">
            <ul className="space-y-4">
              {experiences.map((exp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#E9DFE3]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#EEF3EC] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#70405B] text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="font-sans text-[#442B3B] text-sm">{exp}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Medical Team */}
      <section aria-labelledby="about-doctors-heading" className="bg-white py-20">
        <div className="section-container">
          <SectionHeading
            id="about-doctors-heading"
            eyebrow="Our Clinicians"
            title="Experienced Specialists in Women's Health"
            subtitle="Our team is dedicated to providing expert care with warmth and professionalism."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.filter((d) => d.visible).map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        id="about-cta"
        eyebrow="Ready to Begin?"
        title="Start Your Healthcare Journey With Us"
        subtitle="Request an appointment and our team will be in touch to confirm your visit at a time that suits you."
        primaryLabel="Request an Appointment"
        primaryTo="/appointment"
        secondaryLabel="Get in Touch"
        secondaryTo="/contact"
        variant="plum"
      />
    </div>
  );
}
