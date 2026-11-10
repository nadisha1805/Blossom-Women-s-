import { useState } from 'react';
import { motion } from 'framer-motion';
import FAQAccordion from '../../components/ui/FAQAccordion';
import faqs from '../../data/faqs';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqs[0]?.id ?? '');

  const currentCategory = faqs.find((cat) => cat.id === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section aria-labelledby="faq-hero-heading" className="bg-gradient-to-br from-[#DCD2EE]/40 to-[#FAF5EF] py-20">
        <div className="section-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#70405B] mb-5"
          >
            Questions & Answers
          </motion.p>
          <motion.h1
            id="faq-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-hero text-[#442B3B] text-balance leading-tight mb-6 max-w-2xl mx-auto"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[#756A73] text-lg leading-relaxed max-w-xl mx-auto"
          >
            Find answers to common questions about our clinic, appointments, services, and patient care.
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section aria-labelledby="faq-content-heading" className="bg-white py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Category Navigation */}
            <nav aria-label="FAQ categories" className="lg:col-span-1">
              <p className="font-sans text-xs font-semibold tracking-wider uppercase text-[#70405B] mb-4">
                Categories
              </p>
              <ul className="space-y-2">
                {faqs.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      aria-current={activeCategory === cat.id ? 'true' : undefined}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-sans font-medium transition-all duration-200 ${
                        activeCategory === cat.id
                          ? 'bg-[#70405B] text-white shadow-soft'
                          : 'text-[#756A73] hover:bg-[#FAF5EF] hover:text-[#70405B]'
                      }`}
                    >
                      {cat.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* FAQ Items */}
            <div className="lg:col-span-3">
              {currentCategory && (
                <div>
                  <h2 id="faq-content-heading" className="font-serif text-2xl text-[#442B3B] mb-6">
                    {currentCategory.title}
                  </h2>
                  <FAQAccordion items={currentCategory.items} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section aria-labelledby="faq-contact-heading" className="bg-[#FAF5EF] py-16">
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 id="faq-contact-heading" className="font-serif text-2xl text-[#442B3B] mb-4">
            Didn't Find Your Answer?
          </h2>
          <p className="text-[#756A73] text-base leading-relaxed mb-8">
            Our team is happy to help with any questions you have about our services, appointments, or patient care. Please get in touch and we will respond as promptly as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              id="faq-contact-cta"
              className="inline-flex items-center justify-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-soft text-sm"
            >
              Contact the Clinic
            </a>
            <a
              href="/appointment"
              id="faq-appointment-cta"
              className="inline-flex items-center justify-center gap-2 border border-[#E9DFE3] hover:border-[#EBC4CF] text-[#70405B] hover:bg-[#F7E7EC] font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 text-sm"
            >
              Request an Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
