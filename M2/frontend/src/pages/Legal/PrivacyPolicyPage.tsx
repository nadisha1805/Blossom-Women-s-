import { motion } from 'framer-motion';

const sections = [
  {
    id: 'info-we-collect',
    title: '1. Information We Collect',
    content: `When you use our website and its public-facing forms, we may collect the following types of information:

• **Contact form submissions:** Your name, email address, phone number, and the content of your message.
• **Appointment request submissions:** Your name, email address, phone number, your preferred service and doctor, your preferred appointment date and time, and any optional non-sensitive message you choose to include.
• **Website usage data:** If analytics tools are configured on this website, we may collect anonymized information about how visitors interact with our pages. [To be confirmed — details of any analytics tools used must be added here before going live.]

We do not collect sensitive medical or health information through our public website forms.`,
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    content: `Information submitted through our website forms is used solely for the following purposes:

• To respond to your contact enquiry.
• To review your appointment request and contact you to discuss availability and confirm your appointment.
• To administer and improve our website experience.

We will not use your contact information for unsolicited marketing communications without your explicit consent. [Confirm marketing consent approach before going live.]`,
  },
  {
    id: 'data-sharing',
    title: '3. Sharing of Your Information',
    content: `We do not sell or rent your personal information to third parties. Your information may be shared only in the following limited circumstances:

• With members of our clinical and administrative team who need to respond to your enquiry or appointment request.
• With technology service providers who assist us in operating our website and communication systems, under appropriate data processing agreements.
• Where required by law or to protect the safety of our patients and staff.

[Details of any third-party processors, including form submission, hosting, or analytics providers, must be confirmed and listed here before going live.]`,
  },
  {
    id: 'data-protection',
    title: '4. Data Protection and Security',
    content: `We are committed to protecting your personal information and take reasonable technical and organisational measures to prevent unauthorised access, disclosure, or loss of your data.

[The clinic must confirm its applicable data protection regulatory framework — for example, the Information Technology (Amendment) Act 2008 and applicable Indian data protection rules, or other jurisdiction-specific requirements — and update this policy accordingly before going live.]`,
  },
  {
    id: 'retention',
    title: '5. How Long We Keep Your Information',
    content: `We retain contact and appointment request information only for as long as is necessary to respond to your enquiry and to comply with any applicable legal retention requirements.

[Specific retention periods must be confirmed by the clinic and its legal advisors before this policy goes live.]`,
  },
  {
    id: 'cookies',
    title: '6. Cookies and Website Analytics',
    content: `[This section must be completed before the website goes live, once the clinic has confirmed whether cookies, analytics tools, or third-party scripts are in use. If analytics tools such as Google Analytics are used, this must be disclosed here and appropriate cookie consent mechanisms must be implemented.]

This website currently operates in a development or pre-launch state. Cookie and analytics practices will be disclosed in full before public launch.`,
  },
  {
    id: 'your-rights',
    title: '7. Your Rights',
    content: `Depending on your location and applicable law, you may have rights in relation to your personal information, including:

• The right to access the information we hold about you.
• The right to request correction of inaccurate information.
• The right to request deletion of your information.
• The right to object to or restrict certain processing.

To exercise any of these rights, please contact us using the details below.`,
  },
  {
    id: 'contact-privacy',
    title: '8. Contact for Privacy Enquiries',
    content: `If you have questions about this Privacy Policy or how we handle your personal information, please contact us at:

[Clinic name and privacy contact details — to be confirmed before going live.]

[Email: to be confirmed]
[Address: to be confirmed]`,
  },
  {
    id: 'updates',
    title: '9. Updates to This Policy',
    content: `This Privacy Policy may be updated from time to time to reflect changes in our practices or applicable regulations. The date of the most recent update will be shown at the top of this page.

**This policy must be reviewed and approved by the clinic and its legal advisors before the website goes live. It does not constitute legal advice and should not be treated as a final or approved document.**`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      <section aria-labelledby="privacy-hero-heading" className="bg-[#FAF5EF] py-16">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">Legal</p>
            <h1 id="privacy-hero-heading" className="font-serif text-4xl text-[#442B3B] mb-4">Privacy Policy</h1>
            <p className="text-[#756A73] text-sm leading-relaxed mb-2">Last reviewed: [Date to be confirmed before going live]</p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-6">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Important:</strong> This is a draft Privacy Policy for development purposes only. It must be reviewed and approved by the clinic and qualified legal advisors before the website is made publicly accessible. Do not treat this as a final legal document.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="section-container max-w-3xl mx-auto">
          <p className="text-[#756A73] text-base leading-relaxed mb-10">
            Blossom Women's Health Clinic ("the clinic", "we", "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, store, and protect personal information submitted through our public website and contact forms. Please read this policy carefully.
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <h2 className="font-sans font-semibold text-[#442B3B] text-lg mb-4 border-b border-[#E9DFE3] pb-3">
                  {section.title}
                </h2>
                <div className="text-[#756A73] text-sm leading-relaxed whitespace-pre-line">
                  {section.content.split('\n').map((line, j) => {
                    if (line.startsWith('•')) {
                      return (
                        <p key={j} className="flex items-start gap-2 mt-2">
                          <span className="text-[#EBC4CF] flex-shrink-0 mt-1">•</span>
                          <span dangerouslySetInnerHTML={{ __html: line.slice(1).trim().replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#442B3B]">$1</strong>') }} />
                        </p>
                      );
                    }
                    return line ? (
                      <p key={j} className="mt-3" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#442B3B]">$1</strong>') }} />
                    ) : null;
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
