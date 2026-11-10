import { motion } from 'framer-motion';
import SectionHeading from '../../components/ui/SectionHeading';
import ServiceCard from '../../components/services/ServiceCard';
import CTASection from '../../components/ui/CTASection';
import services from '../../data/services';

export default function ServicesPage() {
  const visible = services.filter((s) => s.visible);

  return (
    <div>
      {/* Hero */}
      <section
        aria-labelledby="services-hero-heading"
        className="bg-gradient-to-br from-[#F7E7EC] to-[#FAF5EF] py-20"
      >
        <div className="section-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#70405B] mb-5"
          >
            Specialist Care
          </motion.p>
          <motion.h1
            id="services-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-hero text-[#442B3B] text-balance leading-tight mb-6 max-w-3xl mx-auto"
          >
            Our Healthcare Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[#756A73] text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Specialist women's healthcare services delivered with clinical expertise, genuine compassion, and a deep respect for your individuality at every stage of life.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section aria-labelledby="services-grid-heading" className="bg-white py-20">
        <div className="section-container">
          <SectionHeading
            id="services-grid-heading"
            eyebrow="What We Offer"
            title="Areas of Specialist Care"
            subtitle="Each service is designed to provide thorough, evidence-based care with a patient-first approach."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section aria-labelledby="services-why-heading" className="bg-[#FAF5EF] py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">
                Our Approach
              </p>
              <h2 id="services-why-heading" className="font-serif text-section text-[#442B3B] mb-6 text-balance leading-tight">
                Expert Care Delivered With Genuine Compassion
              </h2>
              <p className="text-[#756A73] text-base leading-relaxed mb-5">
                Our clinical team approaches every service area with the same commitment: to listen carefully, assess thoroughly, explain clearly, and support you in making informed decisions about your health.
              </p>
              <p className="text-[#756A73] text-base leading-relaxed">
                Whether you are attending for routine preventive care or seeking specialist guidance for a specific concern, you can expect a consistent level of attentive, respectful, and evidence-based care.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Evidence-Based Practice', desc: 'Our clinical team stays current with best practices and guidelines in women\'s healthcare.' },
                { title: 'Thorough Consultations', desc: 'We allocate sufficient time to understand your history, concerns, and health goals.' },
                { title: 'Clear Communication', desc: 'We explain clinical information in accessible language and welcome questions at every point.' },
                { title: 'Continuity of Care', desc: 'We support you through follow-up, referrals, and ongoing management where appropriate.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-5 bg-white rounded-2xl border border-[#E9DFE3]"
                >
                  <h3 className="font-sans font-semibold text-[#442B3B] text-sm mb-1">{item.title}</h3>
                  <p className="text-[#756A73] text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        id="services-cta"
        eyebrow="Ready to Begin?"
        title="Request an Appointment Today"
        subtitle="Select your preferred service and the clinic team will be in touch to confirm your appointment."
        variant="plum"
      />
    </div>
  );
}
