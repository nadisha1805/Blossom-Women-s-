import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ServiceCard from '../../components/services/ServiceCard';
import CTASection from '../../components/ui/CTASection';
import services from '../../data/services';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug && s.visible);

  if (!service) {
    return (
      <div className="section-container py-24 text-center">
        <h1 className="font-serif text-3xl text-[#442B3B] mb-4">Service Not Found</h1>
        <p className="text-[#756A73] mb-8">The service you are looking for does not exist or is not currently available.</p>
        <Link to="/services" className="inline-flex items-center gap-2 bg-[#70405B] text-white px-6 py-3 rounded-xl font-sans text-sm font-medium hover:bg-[#442B3B] transition-colors">
          View All Services
        </Link>
      </div>
    );
  }

  const related = services.filter(
    (s) => service.relatedSlugs.includes(s.slug) && s.visible
  );

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#E9DFE3]">
        <div className="section-container">
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services' },
              { label: service.name },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section
        aria-labelledby="service-detail-heading"
        className="relative overflow-hidden"
      >
        <div className="h-64 lg:h-80 overflow-hidden relative">
          <img
            src={service.image}
            alt={`${service.name} at Blossom Women's Health Clinic`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#442B3B]/70 via-[#442B3B]/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="section-container">
              <motion.h1
                id="service-detail-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-4xl lg:text-5xl text-white text-balance max-w-2xl"
              >
                {service.name}
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#FAF5EF] py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div>
                <h2 className="font-serif text-2xl text-[#442B3B] mb-4">Overview</h2>
                <p className="text-[#756A73] leading-relaxed text-base">{service.fullDescription}</p>
              </div>

              {/* What It Covers */}
              <div>
                <h2 className="font-serif text-2xl text-[#442B3B] mb-5">What This Service Covers</h2>
                <ul className="space-y-3">
                  {service.whatItCovers.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle size={16} className="text-[#B9CBB7] flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-[#756A73] text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* When to Consult */}
              <div>
                <h2 className="font-serif text-2xl text-[#442B3B] mb-5">When to Consider a Consultation</h2>
                <ul className="space-y-3">
                  {service.whenToConsult.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EBC4CF] flex-shrink-0 mt-2" aria-hidden="true" />
                      <span className="text-[#756A73] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Prepare */}
              {service.howToPrepare.length > 0 && (
                <div className="bg-white border border-[#E9DFE3] rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <Clock size={20} className="text-[#70405B]" aria-hidden="true" />
                    <h2 className="font-serif text-2xl text-[#442B3B]">Preparing for Your Visit</h2>
                  </div>
                  <ul className="space-y-3">
                    {service.howToPrepare.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#F7E7EC] text-[#70405B] text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-[#756A73] text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Disclaimer */}
              <div className="flex gap-3 bg-[#EEF3EC] border border-[#B9CBB7]/40 rounded-2xl p-5">
                <AlertTriangle size={18} className="text-[#70405B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[#756A73] text-sm leading-relaxed">
                  <strong className="text-[#442B3B]">Important:</strong> This page provides general information about our services. It is not a substitute for professional medical advice. Please consult a qualified healthcare professional for any health concerns specific to your situation.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#442B3B] rounded-3xl p-8 text-center">
                <h3 className="font-serif text-xl text-white mb-3">Ready to Get Started?</h3>
                <p className="text-white/70 text-sm mb-6">
                  Request an appointment and our team will be in touch to confirm your booking.
                </p>
                <Link
                  to="/appointment"
                  id="service-detail-appointment-cta"
                  className="block w-full bg-[#EBC4CF] hover:bg-white text-[#442B3B] font-sans font-medium py-3 rounded-xl transition-all duration-200 text-sm text-center"
                >
                  Request an Appointment
                </Link>
                <Link
                  to="/contact"
                  className="block w-full mt-3 border border-white/30 text-white hover:bg-white/10 font-sans font-medium py-3 rounded-xl transition-all duration-200 text-sm text-center"
                >
                  Contact the Clinic
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E9DFE3]">
                <h3 className="font-sans font-semibold text-[#442B3B] text-sm mb-4">Other Services</h3>
                <ul className="space-y-2">
                  {services.filter((s) => s.visible && s.slug !== service.slug).slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="flex items-center gap-2 text-[#756A73] hover:text-[#70405B] text-sm transition-colors duration-200 py-1"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EBC4CF] flex-shrink-0" aria-hidden="true" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section aria-labelledby="related-services-heading" className="bg-white py-16">
          <div className="section-container">
            <h2 id="related-services-heading" className="font-serif text-2xl text-[#442B3B] mb-8">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        id="service-detail-cta"
        title="Not Sure Where to Start?"
        subtitle="Contact our team and we will help direct you to the most appropriate service for your needs."
        primaryLabel="Request an Appointment"
        primaryTo="/appointment"
        secondaryLabel="Explore All Services"
        secondaryTo="/services"
        variant="blush"
      />
    </div>
  );
}
