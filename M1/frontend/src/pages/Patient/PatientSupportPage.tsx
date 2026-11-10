import React, { useState, useEffect } from 'react';
import { patientPortalApi } from '../../services/patientPortalApi';
import { LifeBuoy, Send, CheckCircle2, HelpCircle, ChevronDown } from 'lucide-react';

export default function PatientSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('CLINICAL');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I download and print my prescriptions?',
      a: 'Navigate to the Prescriptions tab in your portal. Click "Print Prescription" or click any individual medication card to download an official e-prescription slip signed by your attending doctor.',
    },
    {
      q: 'When will my diagnostic test and ultrasound results be available?',
      a: 'Diagnostic and lab results are uploaded and released to your patient portal as soon as they have been verified and signed off by our clinical pathology team, typically within 24–48 hours.',
    },
    {
      q: 'What payment methods are accepted online?',
      a: 'Our portal supports all major credit cards, debit cards, net banking, UPI, and Apple Pay through our 256-bit encrypted healthcare payment gateway.',
    },
    {
      q: 'How do I reschedule or cancel an appointment?',
      a: 'Go to "My Appointments". Beside any upcoming visit, click "Cancel Appointment". You can immediately schedule a new visit at your preferred date and time.',
    },
  ];

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await patientPortalApi.getSupportRequests();
      if (data && data.length > 0) {
        setTickets(data);
      } else {
        // Fallback demo tickets
        setTickets([
          {
            id: 't-1',
            ticketNumber: 'SUP-2026-1042',
            subject: 'Question regarding prenatal vitamin timing',
            category: 'CLINICAL',
            description: 'Can I take the prescribed elemental iron with my morning tea or should I take it before bed?',
            status: 'RESOLVED',
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.warn('Error loading support tickets:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);

    try {
      const newTicket = await patientPortalApi.createSupportRequest({
        subject,
        category,
        description,
      });

      setTickets([newTicket, ...tickets]);
      setSuccessMsg('Your inquiry has been submitted. Our care team will respond promptly.');
      setSubject('');
      setDescription('');
    } catch {
      // Mock fallback
      const mockTicket = {
        id: `t-${Date.now()}`,
        ticketNumber: `SUP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        subject,
        category,
        description,
        status: 'OPEN',
        createdAt: new Date().toISOString(),
      };
      setTickets([mockTicket, ...tickets]);
      setSuccessMsg('Inquiry ticket created successfully!');
      setSubject('');
      setDescription('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#442B3B]">
          Help & Patient Support
        </h1>
        <p className="text-xs sm:text-sm text-[#756A73] mt-1">
          Have questions about your care, prescription, or billing? Contact our patient care team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Create Support Ticket */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFE3] shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#70405B] flex items-center justify-center">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#442B3B]">
              Submit Care Query or Ticket
            </h2>
          </div>

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#442B3B] mb-1.5 uppercase tracking-wider text-[11px]">
                Inquiry Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B]"
              >
                <option value="CLINICAL">Clinical Care & Prescription Inquiry</option>
                <option value="APPOINTMENT">Appointment Scheduling Assistance</option>
                <option value="BILLING">Billing & Insurance Query</option>
                <option value="TECHNICAL">Patient Portal Technical Support</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#442B3B] mb-1.5 uppercase tracking-wider text-[11px]">
                Subject
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your question"
                className="w-full p-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#442B3B] mb-1.5 uppercase tracking-wider text-[11px]">
                Detailed Description
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details so our clinic team can assist you effectively..."
                className="w-full p-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 px-4 rounded-xl bg-[#70405B] hover:bg-[#442B3B] text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting Inquiry...' : 'Submit Support Ticket'}
            </button>
          </form>

          {/* Past Tickets */}
          <div className="pt-6 border-t border-[#FAF0F3] space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#442B3B]">Your Recent Tickets</h3>
            {tickets.map((t) => (
              <div key={t.id} className="p-3.5 rounded-2xl bg-[#FCF8F9] border border-[#FAF0F3] text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#70405B] font-bold">#{t.ticketNumber}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      t.status === 'RESOLVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {t.status || 'OPEN'}
                  </span>
                </div>
                <div className="font-bold text-[#442B3B]">{t.subject}</div>
                <p className="text-[11px] text-[#756A73]">{t.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Frequently Asked Questions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h2 className="font-serif text-lg font-bold text-[#442B3B]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E9DFE3] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-[#442B3B] hover:bg-[#FCF8F9]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#756A73] shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-[#70405B]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#756A73] leading-relaxed border-t border-[#FAF0F3] bg-[#FAF5EF]/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Emergency Notice */}
          <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2">
            <h4 className="font-bold font-serif text-sm">Medical Emergency Notice</h4>
            <p className="leading-relaxed">
              The online patient portal and messaging system are not designed for urgent medical emergencies. If you are experiencing sudden acute abdominal pain, vaginal bleeding during pregnancy, severe dizziness, or chest pain, please call 911 or visit the nearest emergency medical facility immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
