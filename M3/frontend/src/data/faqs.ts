// ============================================================
// FAQ DATA — Women's Healthcare Clinic
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

const faqs: FAQCategory[] = [
  {
    id: 'appointments',
    title: 'Appointments',
    items: [
      {
        question: 'How do I request an appointment?',
        answer: 'You can request an appointment through our online appointment request form, by telephone, or by email. After submitting your request, the clinic team will review your enquiry and contact you to confirm your appointment. Please note that submitting a request does not automatically confirm a booking.',
      },
      {
        question: 'How long will I wait to receive a response to my appointment request?',
        answer: 'Our team aims to respond to all appointment requests within [X working days — to be confirmed by clinic]. If your enquiry is urgent, please contact the clinic directly by telephone.',
      },
      {
        question: 'Can I request a specific doctor?',
        answer: 'Yes. When completing your appointment request, you may indicate your preference for a specific clinician. We will do our best to accommodate your preference, subject to availability.',
      },
      {
        question: 'What should I do if I need to cancel or reschedule my appointment?',
        answer: 'If you need to cancel or reschedule, please contact the clinic as early as possible by telephone or email so that we can offer your appointment slot to another patient who may be waiting.',
      },
      {
        question: 'Are virtual or telephone consultations available?',
        answer: 'Please contact the clinic directly to enquire about consultation format options. Availability may vary depending on the type of consultation required. [To be confirmed by clinic.]',
      },
    ],
  },
  {
    id: 'clinic-services',
    title: 'Clinic Services',
    items: [
      {
        question: 'What services does the clinic provide?',
        answer: 'Our clinic offers a range of women\'s healthcare services including gynaecology, antenatal and postnatal care, menstrual health, PCOS consultations, fertility assessments, menopause care, and preventive screenings. Please visit our Services page for a full overview.',
      },
      {
        question: 'Is the clinic exclusively for women?',
        answer: 'Our services are focused on women\'s health and are primarily designed for individuals with female reproductive health needs. Please contact us if you have a specific enquiry.',
      },
      {
        question: 'Do you provide emergency or urgent care services?',
        answer: 'Our clinic provides planned consultations and is not an emergency facility. If you are experiencing a medical emergency, please call your emergency services or attend your nearest emergency department immediately.',
      },
      {
        question: 'Do you offer referrals to other specialists?',
        answer: 'Yes. Where appropriate, our clinicians can coordinate referrals to relevant specialist services or investigation providers. Your clinician will discuss this with you during your consultation.',
      },
    ],
  },
  {
    id: 'preparing-for-a-visit',
    title: 'Preparing for a Visit',
    items: [
      {
        question: 'What should I bring to my appointment?',
        answer: 'We recommend bringing a form of identification, a list of your current medications and supplements, any previous relevant medical records or test results, and a note of any symptoms or concerns you would like to discuss. For specific consultations, your booking confirmation will include any additional preparation guidance.',
      },
      {
        question: 'Can I bring someone with me to my appointment?',
        answer: 'Yes. You are welcome to bring a trusted support person to your appointment. Please let the clinic team know when booking if you plan to bring a companion.',
      },
      {
        question: 'What should I do before a pelvic examination?',
        answer: 'For most consultations, no special preparation is required. If a pelvic or cervical examination is planned, we recommend avoiding vaginal products or intercourse 24 hours beforehand if possible. Your clinician will provide any specific guidance relevant to your appointment.',
      },
      {
        question: 'Do I need a referral from another doctor to attend?',
        answer: 'Please contact the clinic to confirm current referral requirements. [To be confirmed by clinic.]',
      },
    ],
  },
  {
    id: 'general-patient-information',
    title: 'General Patient Information',
    items: [
      {
        question: 'How is my personal information protected?',
        answer: 'We are committed to protecting your personal and health information. Your data is handled in accordance with applicable data protection regulations and our Privacy Policy. Please review our Privacy Policy for full details.',
      },
      {
        question: 'Will my consultation be kept confidential?',
        answer: 'All consultations and your personal health information are treated with strict confidentiality in accordance with professional standards and applicable regulations. Exceptions apply only in limited circumstances required by law or patient safety, and these would always be discussed with you wherever possible.',
      },
      {
        question: 'What languages are consultations available in?',
        answer: '[Language options to be confirmed by clinic.]',
      },
      {
        question: 'Is the clinic accessible for patients with mobility needs?',
        answer: '[Accessibility information to be confirmed by clinic.]',
      },
    ],
  },
  {
    id: 'contact-and-location',
    title: 'Contact & Location',
    items: [
      {
        question: 'Where is the clinic located?',
        answer: '[Clinic address to be confirmed.] Please visit our Contact page for the clinic address and directions.',
      },
      {
        question: 'What are the clinic\'s opening hours?',
        answer: '[Opening hours to be confirmed by clinic.] Please check our Contact page or contact the clinic directly for current hours.',
      },
      {
        question: 'How can I contact the clinic?',
        answer: 'You can reach the clinic by telephone at [number to be confirmed], by email at [email to be confirmed], or through the contact form on our website. Please visit our Contact page for full details.',
      },
      {
        question: 'Is there parking available at the clinic?',
        answer: '[Parking information to be confirmed by clinic.]',
      },
    ],
  },
];

export default faqs;
