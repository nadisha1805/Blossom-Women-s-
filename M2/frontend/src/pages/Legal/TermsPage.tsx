import { motion } from 'framer-motion';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By accessing and using the Blossom Women's Health Clinic website ("the website"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.

These Terms and Conditions apply to all visitors, users, and others who access or use the website.`,
  },
  {
    id: 'website-purpose',
    title: '2. Purpose of This Website',
    content: `This website is operated by Blossom Women's Health Clinic for the purpose of providing general information about the clinic's services, enabling the public to contact the clinic and submit appointment requests, and sharing general educational health information.

The content on this website is for general informational purposes only. It does not constitute medical advice, diagnosis, or treatment recommendations. Please consult a qualified healthcare professional for any specific health concerns.`,
  },
  {
    id: 'no-medical-advice',
    title: '3. No Medical Advice',
    content: `Nothing on this website constitutes or is intended to constitute professional medical advice, diagnosis, or treatment. The information provided is of a general educational nature only.

Do not disregard, avoid, or delay seeking medical advice from a qualified healthcare professional because of something you have read on this website.

If you are experiencing a medical emergency, call emergency services immediately.`,
  },
  {
    id: 'appointment-requests',
    title: '4. Appointment Requests',
    content: `Submitting an appointment request through our website does not constitute a confirmed appointment. Appointment requests are reviewed by the clinic team, and the clinic will contact you to confirm availability and finalize your appointment.

The clinic reserves the right to decline, redirect, or defer appointment requests at its discretion. Submission of an appointment request does not create a patient-clinic relationship.`,
  },
  {
    id: 'contact-forms',
    title: '5. Contact Forms',
    content: `Our contact form is intended for general, non-urgent enquiries only. Please do not submit sensitive medical details through the general contact form.

We aim to respond to contact enquiries within a reasonable timeframe, but we cannot guarantee a specific response time. The general contact form is not monitored continuously and should not be used for urgent health concerns.`,
  },
  {
    id: 'intellectual-property',
    title: '6. Intellectual Property',
    content: `All content on this website, including but not limited to text, images, logos, and design elements, is the property of Blossom Women's Health Clinic or its licensors and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, or use any content from this website without our prior written permission, except for personal, non-commercial use.`,
  },
  {
    id: 'third-party-links',
    title: '7. Third-Party Links',
    content: `This website may contain links to third-party websites for informational purposes. We are not responsible for the content, privacy practices, or accuracy of any third-party websites. Links do not constitute our endorsement of those websites or their content.`,
  },
  {
    id: 'limitation-liability',
    title: '8. Limitation of Liability',
    content: `[This section requires review and completion by qualified legal advisors before the website goes live. It should address the applicable limitations on the clinic's liability for the use of this website, including in relation to the accuracy of information and appointment request processes, in accordance with applicable law.]`,
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: `[The governing law applicable to these Terms and Conditions must be confirmed by the clinic and its legal advisors before the website goes live.]`,
  },
  {
    id: 'changes-terms',
    title: '10. Changes to These Terms',
    content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.`,
  },
  {
    id: 'contact-terms',
    title: '11. Contact',
    content: `If you have questions about these Terms and Conditions, please contact us at:

[Clinic contact details — to be confirmed before going live]

**These Terms and Conditions are a draft for development purposes only. They must be reviewed and approved by qualified legal advisors before the website is made publicly accessible.**`,
  },
];

export default function TermsPage() {
  return (
    <div>
      <section aria-labelledby="terms-hero-heading" className="bg-[#FAF5EF] py-16">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">Legal</p>
            <h1 id="terms-hero-heading" className="font-serif text-4xl text-[#442B3B] mb-4">Terms & Conditions</h1>
            <p className="text-[#756A73] text-sm leading-relaxed mb-2">Last reviewed: [Date to be confirmed before going live]</p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-6">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Important:</strong> This is a draft Terms and Conditions document for development purposes only. It must be reviewed and approved by qualified legal advisors before the website is made publicly accessible.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="section-container max-w-3xl mx-auto">
          <p className="text-[#756A73] text-base leading-relaxed mb-10">
            These Terms and Conditions govern your use of the Blossom Women's Health Clinic website. Please read these terms carefully before using the website.
          </p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <h2 className="font-sans font-semibold text-[#442B3B] text-lg mb-4 border-b border-[#E9DFE3] pb-3">
                  {section.title}
                </h2>
                <div className="text-[#756A73] text-sm leading-relaxed">
                  {section.content.split('\n').map((line, j) =>
                    line ? (
                      <p
                        key={j}
                        className="mt-3"
                        dangerouslySetInnerHTML={{
                          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#442B3B]">$1</strong>'),
                        }}
                      />
                    ) : null
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
