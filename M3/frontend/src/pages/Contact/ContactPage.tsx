import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import CTASection from '../../components/ui/CTASection';
import Button from '../../components/ui/Button';
import { submitContactMessage } from '../../services/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacyAcknowledged: boolean;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border font-sans text-sm text-[#442B3B] bg-white placeholder:text-[#756A73]/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#70405B]/20 focus:border-[#70405B] ${
    hasError ? 'border-red-300 bg-red-50/30' : 'border-[#E9DFE3] hover:border-[#C9859D]'
  }`;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', phone: '', subject: '', message: '', privacyAcknowledged: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const update = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim()) newErrors.message = 'Please enter your message.';
    else if (formData.message.trim().length < 10) newErrors.message = 'Please provide a bit more detail in your message.';
    if (!formData.privacyAcknowledged) newErrors.privacyAcknowledged = 'Please acknowledge the privacy notice.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
        consent: formData.privacyAcknowledged,
      });
      setSubmitStatus('success');
    } catch (err: any) {
      console.warn('Contact API submission error:', err);
      setErrorMessage(err.message || 'Unable to send message. Please try again.');
      setSubmitStatus('error');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section aria-labelledby="contact-hero-heading" className="bg-[#442B3B] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#EBC4CF]/10 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="section-container text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-[#EBC4CF] mb-5"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            id="contact-hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-hero text-white text-balance leading-tight mb-6 max-w-2xl mx-auto"
          >
            Contact the Clinic
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-white/70 text-lg max-w-xl mx-auto"
          >
            We would love to hear from you. Please use the form below or contact us directly using the information provided.
          </motion.p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-[#FAF5EF] py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Details */}
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#442B3B]">Clinic Information</h2>

              {[
                { Icon: MapPin, label: 'Address', value: '[Clinic Address]\n[City, State – Postcode]\nTo be confirmed by clinic' },
                { Icon: Phone, label: 'Telephone', value: '[Telephone number — to be confirmed]' },
                { Icon: Mail, label: 'Email', value: '[Email address — to be confirmed]' },
                {
                  Icon: Clock, label: 'Opening Hours',
                  value: '[Opening hours to be confirmed by clinic]\n\nFor urgent medical concerns, please contact emergency services.',
                },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-4 p-5 bg-white rounded-2xl border border-[#E9DFE3]">
                  <div className="w-10 h-10 rounded-xl bg-[#F7E7EC] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#70405B]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-sans font-medium text-[#442B3B] text-sm mb-1">{label}</p>
                    <p className="text-[#756A73] text-sm leading-relaxed whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-[#E9DFE3] rounded-2xl overflow-hidden h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-[#756A73] mx-auto mb-2" aria-hidden="true" />
                  <p className="text-[#756A73] text-sm">[Map to be embedded when clinic address is confirmed]</p>
                </div>
              </div>

              <div className="p-5 bg-[#EEF3EC] rounded-2xl border border-[#B9CBB7]/40">
                <p className="text-[#756A73] text-sm">
                  <strong className="text-[#442B3B]">For appointments:</strong> Please use our{' '}
                  <a href="/appointment" className="text-[#70405B] underline underline-offset-2 hover:text-[#442B3B]">
                    appointment request form
                  </a>{' '}
                  for a faster response.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-[#442B3B] mb-8">Send Us a Message</h2>

              {submitStatus === 'success' ? (
                <div role="alert" aria-live="polite" className="bg-[#EEF3EC] border border-[#B9CBB7] rounded-3xl p-10 text-center">
                  <CheckCircle className="mx-auto mb-4 text-[#70405B]" size={48} strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="font-serif text-2xl text-[#442B3B] mb-3">Message Received</h3>
                  <p className="text-[#756A73] text-sm leading-relaxed max-w-md mx-auto">
                    Thank you for your message. Our team will aim to respond within 2–3 working days.
                  </p>
                  <Button variant="primary" size="md" onClick={() => setSubmitStatus('idle')} className="mt-6" id="contact-new-message-btn">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="space-y-6">
                  <div className="flex gap-3 bg-[#F7E7EC] border border-[#EBC4CF]/50 rounded-2xl p-4">
                    <Info size={16} className="text-[#70405B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[#756A73] text-sm">
                      Please do not include sensitive medical details in this general contact form. For appointment requests, use our{' '}
                      <a href="/appointment" className="text-[#70405B] underline underline-offset-2">appointment request form</a>.
                    </p>
                  </div>

                  {submitStatus === 'error' && (
                    <div role="alert" className="flex gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0" aria-hidden="true" />
                      <p className="text-red-700 text-sm">
                        {errorMessage || 'There was a problem sending your message. Please try again or contact us directly.'}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block font-sans text-sm font-medium text-[#442B3B] mb-1.5">
                        Full Name <span className="text-[#C9859D]" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Your full name"
                        autoComplete="name"
                        className={inputClass(!!errors.name)}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle size={11} aria-hidden="true"/>{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block font-sans text-sm font-medium text-[#442B3B] mb-1.5">
                        Email Address <span className="text-[#C9859D]" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="your@email.com"
                        autoComplete="email"
                        className={inputClass(!!errors.email)}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle size={11} aria-hidden="true"/>{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-phone" className="block font-sans text-sm font-medium text-[#442B3B] mb-1.5">
                        Phone Number <span className="text-[#756A73] text-xs font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="+91 XXXXXXXXXX"
                        autoComplete="tel"
                        className={inputClass(false)}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block font-sans text-sm font-medium text-[#442B3B] mb-1.5">
                        Subject <span className="text-[#C9859D]" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => update('subject', e.target.value)}
                        placeholder="How can we help?"
                        className={inputClass(!!errors.subject)}
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle size={11} aria-hidden="true"/>{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-sans text-sm font-medium text-[#442B3B] mb-1.5">
                      Message <span className="text-[#C9859D]" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => update('message', e.target.value)}
                      rows={5}
                      maxLength={1000}
                      placeholder="Please type your message here…"
                      className={`${inputClass(!!errors.message)} resize-none`}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><AlertCircle size={11} aria-hidden="true"/>{errors.message}</p>}
                    <p className="text-xs text-[#756A73]/60 text-right mt-1">{formData.message.length}/1000</p>
                  </div>

                  {/* Privacy */}
                  <div className="border border-[#E9DFE3] rounded-2xl p-5">
                    <label className="flex gap-4 cursor-pointer" htmlFor="contact-privacy">
                      <input
                        id="contact-privacy"
                        type="checkbox"
                        checked={formData.privacyAcknowledged}
                        onChange={(e) => update('privacyAcknowledged', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded accent-[#70405B] flex-shrink-0"
                        aria-invalid={!!errors.privacyAcknowledged}
                      />
                      <span className="text-[#756A73] text-sm leading-relaxed">
                        I have read the{' '}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#70405B] underline underline-offset-2 hover:text-[#442B3B]">
                          Privacy Policy
                        </a>{' '}
                        and consent to the clinic using my contact information to respond to my enquiry.
                      </span>
                    </label>
                    {errors.privacyAcknowledged && <p className="text-xs text-red-600 mt-2 ml-8 flex items-center gap-1"><AlertCircle size={11} aria-hidden="true"/>{errors.privacyAcknowledged}</p>}
                  </div>

                  <Button type="submit" variant="primary" size="lg" loading={submitStatus === 'loading'} disabled={submitStatus === 'loading'} className="w-full" id="contact-submit-btn">
                    {submitStatus === 'loading' ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        id="contact-appointment-cta"
        eyebrow="Ready to Book?"
        title="Request an Appointment"
        subtitle="Use our appointment request form for the fastest response from the clinic team."
        primaryLabel="Request an Appointment"
        primaryTo="/appointment"
        variant="plum"
      />
    </div>
  );
}
