import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Award, Shield, CheckCircle, ChevronRight } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import ServiceCard from '../../components/services/ServiceCard';
import DoctorCard from '../../components/doctors/DoctorCard';
import ArticleCard from '../../components/articles/ArticleCard';
import CTASection from '../../components/ui/CTASection';
import services from '../../data/services';
import doctors from '../../data/doctors';
import articles from '../../data/articles';

const highlights = [
  {
    icon: Heart,
    title: 'Compassionate Care',
    description:
      'Every consultation is delivered with genuine empathy, respect for your dignity, and attention to your individual needs and concerns.',
  },
  {
    icon: Users,
    title: 'Personalized Attention',
    description:
      'We recognize that every woman\'s health journey is unique. Your care is tailored to your circumstances, not a template.',
  },
  {
    icon: Award,
    title: 'Experienced Specialists',
    description:
      'Our team of dedicated women\'s health clinicians brings expertise, professionalism, and a patient-first approach to every appointment.',
  },
  {
    icon: Shield,
    title: 'Privacy & Respect',
    description:
      'Your health information and conversations are treated with the highest standards of confidentiality and professional discretion.',
  },
];

const journeySteps = [
  {
    number: '01',
    title: 'Explore Services',
    description: 'Browse our range of women\'s healthcare services and learn what each specialty offers.',
  },
  {
    number: '02',
    title: 'Choose a Service',
    description: 'Identify the service or specialist that best addresses your health needs.',
  },
  {
    number: '03',
    title: 'Request an Appointment',
    description: 'Complete our simple appointment request form with your contact details and preferences.',
  },
  {
    number: '04',
    title: 'Hear Back From Us',
    description: 'Our team will contact you to confirm availability and finalize your appointment.',
  },
];

const fadeUpVariant: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function HomePage() {
  const visibleServices = services.filter((s) => s.visible).slice(0, 6);
  const visibleDoctors = doctors.filter((d) => d.visible);
  const visibleArticles = articles.filter((a) => a.visible).slice(0, 3);

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-[#FAF5EF] pt-12 pb-0 lg:pt-16 lg:pb-0"
      >
        {/* Background organic shape */}
        <div
          className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-[#F7E7EC] via-[#FAF5EF] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#DCD2EE]/30 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-40 w-40 h-40 rounded-full bg-[#EBC4CF]/25 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="section-container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[calc(100vh-140px)]">
            {/* Left — Content */}
            <div className="py-12 lg:py-20 order-2 lg:order-1">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#70405B] mb-6"
              >
                Compassionate Care for Every Stage of Life
              </motion.p>

              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="font-serif text-hero text-[#442B3B] mb-6 text-balance leading-tight"
              >
                Your Health.
                <br />
                <span className="text-[#70405B]">Your Journey.</span>
                <br />
                Our Care.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-[#756A73] text-lg leading-relaxed mb-8 max-w-lg"
              >
                A multispecialty women's healthcare clinic where every appointment begins with listening. We provide expert, respectful, and personalized care that honors your individuality at every life stage.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Link
                  to="/appointment"
                  id="hero-appointment-cta"
                  className="inline-flex items-center justify-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-soft hover:shadow-elevated text-sm"
                >
                  Request an Appointment
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services"
                  id="hero-services-cta"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F7E7EC] text-[#70405B] font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 border border-[#E9DFE3] hover:border-[#EBC4CF] text-sm"
                >
                  Explore Our Services
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-center gap-2 text-[#756A73] text-sm"
              >
                <CheckCircle size={15} className="text-[#B9CBB7]" aria-hidden="true" />
                <span>Personalized, respectful, and confidential care</span>
              </motion.div>
            </div>

            {/* Right — Image */}
            <div className="order-1 lg:order-2 relative flex items-end justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[520px] lg:max-w-none"
              >
                {/* Decorative blob behind image */}
                <div
                  className="absolute -top-8 -right-8 w-72 h-72 rounded-full bg-[#EBC4CF]/20 blur-2xl -z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-[#B9CBB7]/20 blur-2xl -z-10"
                  aria-hidden="true"
                />
                <img
                  src="/assets/images/hero-doctor.png"
                  alt="A compassionate female doctor in a welcoming clinic consultation room"
                  className="w-full h-[460px] lg:h-[calc(100vh-140px)] object-cover object-center rounded-tl-[3rem] rounded-tr-[1rem] rounded-b-none shadow-elevated"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Soft overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF5EF] to-transparent rounded-b-none pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CARE HIGHLIGHTS ──────────────────────────────────── */}
      <section
        aria-labelledby="highlights-heading"
        className="bg-white py-20"
      >
        <div className="section-container">
          <SectionHeading
            id="highlights-heading"
            eyebrow="Why Choose Us"
            title="Care Built Around You"
            subtitle="Our clinic was founded on the belief that every woman deserves healthcare that is thorough, compassionate, and truly individualized."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUpVariant}
                className="p-6 rounded-3xl bg-[#FAF5EF] border border-[#E9DFE3] hover:border-[#EBC4CF] transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F7E7EC] flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-[#70405B]" aria-hidden="true" />
                </div>
                <h3 className="font-sans font-semibold text-[#442B3B] text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-[#756A73] text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section
        aria-labelledby="services-heading"
        className="bg-[#FAF5EF] py-20"
      >
        <div className="section-container">
          <SectionHeading
            id="services-heading"
            eyebrow="Healthcare Specialties"
            title="Our Areas of Care"
            subtitle="Specialist women's healthcare services delivered with clinical expertise and deep personal understanding."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/services"
              id="home-view-all-services"
              className="inline-flex items-center gap-2 font-sans font-medium text-[#70405B] text-sm hover:gap-3 transition-all duration-200 group"
            >
              View All Services
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT EDITORIAL ──────────────────────────────────── */}
      <section
        aria-labelledby="about-home-heading"
        className="bg-white py-20"
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/assets/images/about-clinic.png"
                alt="The welcoming interior of Blossom Women's Health Clinic with friendly healthcare professionals"
                className="w-full h-[480px] object-cover rounded-3xl shadow-elevated"
                loading="lazy"
              />
              <div
                className="absolute -bottom-6 -right-6 bg-[#F7E7EC] rounded-2xl p-5 shadow-card hidden sm:block"
                aria-hidden="true"
              >
                <p className="font-sans text-xs text-[#756A73] mb-1">Our commitment</p>
                <p className="font-serif text-[#442B3B] text-lg leading-tight">
                  "Listening before<br />we prescribe."
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">
                About the Clinic
              </p>
              <h2
                id="about-home-heading"
                className="font-serif text-section text-[#442B3B] mb-6 text-balance leading-tight"
              >
                A Clinic Where Every Woman Feels at Home
              </h2>
              <p className="text-[#756A73] text-base leading-relaxed mb-5">
                Blossom Women's Health Clinic was established to create a healthcare environment that genuinely listens, carefully explains, and always places the patient at the center of every decision. We believe women deserve care that is as attentive to their emotional experience as it is to their clinical needs.
              </p>
              <p className="text-[#756A73] text-base leading-relaxed mb-8">
                Our team of experienced clinicians works collaboratively, sharing expertise across specialties to provide a seamless care experience. Whether you are attending for a routine check-up or navigating a more complex health concern, you will find consistent, compassionate professionalism at every visit.
              </p>
              <Link
                to="/about"
                id="home-about-link"
                className="inline-flex items-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white font-sans font-medium px-6 py-3 rounded-xl transition-all duration-200 shadow-soft hover:shadow-card text-sm"
              >
                Learn About Us
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DOCTORS ──────────────────────────────────────────── */}
      <section
        aria-labelledby="doctors-home-heading"
        className="bg-[#FAF5EF] py-20"
      >
        <div className="section-container">
          <SectionHeading
            id="doctors-home-heading"
            eyebrow="Our Medical Team"
            title="Meet Our Specialists"
            subtitle="Our clinicians bring expertise, compassion, and a genuine commitment to women's health."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleDoctors.map((doctor, i) => (
              <DoctorCard key={doctor.id} doctor={doctor} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/doctors"
              id="home-view-all-doctors"
              className="inline-flex items-center gap-2 font-sans font-medium text-[#70405B] text-sm hover:gap-3 transition-all duration-200 group"
            >
              View All Doctors
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PATIENT JOURNEY ──────────────────────────────────── */}
      <section
        aria-labelledby="journey-heading"
        className="bg-[#DCD2EE]/30 py-20"
      >
        <div className="section-container">
          <SectionHeading
            id="journey-heading"
            eyebrow="How It Works"
            title="Your Path to Care"
            subtitle="Getting started with the clinic is straightforward. Here is how to begin your healthcare journey with us."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUpVariant}
                className="relative"
              >
                {i < journeySteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px bg-[#EBC4CF]/50 z-0"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#70405B] text-white flex items-center justify-center font-sans font-bold text-sm mb-5">
                    {step.number}
                  </div>
                  <h3 className="font-sans font-semibold text-[#442B3B] text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#756A73] text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-[#756A73] text-sm italic mb-6">
              Submitting a request does not automatically confirm your appointment. The clinic team will contact you to confirm.
            </p>
            <Link
              to="/appointment"
              id="journey-cta-btn"
              className="inline-flex items-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-soft hover:shadow-card text-sm"
            >
              Request an Appointment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HEALTH EDUCATION ─────────────────────────────────── */}
      <section
        aria-labelledby="resources-home-heading"
        className="bg-white py-20"
      >
        <div className="section-container">
          <SectionHeading
            id="resources-home-heading"
            eyebrow="Health Education"
            title="Helpful Reading for Your Health Journey"
            subtitle="Thoughtfully written, general health information to help you understand your wellbeing and know when to seek professional guidance."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/resources"
              id="home-view-all-resources"
              className="inline-flex items-center gap-2 font-sans font-medium text-[#70405B] text-sm hover:gap-3 transition-all duration-200 group"
            >
              View All Health Resources
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── APPOINTMENT CTA ──────────────────────────────────── */}
      <CTASection
        id="home-appointment-cta-section"
        eyebrow="Ready to Begin?"
        title="Take the First Step Towards Better Health"
        subtitle="Complete our appointment request form and the clinic team will be in touch to confirm your appointment at a time that suits you."
        primaryLabel="Request an Appointment"
        primaryTo="/appointment"
        secondaryLabel="Contact the Clinic"
        secondaryTo="/contact"
        variant="plum"
      />
    </div>
  );
}
