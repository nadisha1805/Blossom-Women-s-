// ============================================================
// DOCTORS DATA — Women's Healthcare Clinic
// ============================================================
// Replace placeholder content with verified doctor details before going live.
// Do NOT publish fabricated credentials, registration numbers, or qualifications.

export interface Doctor {
  id: string;
  slug: string;
  name: string; // PLACEHOLDER — replace with verified name
  title: string; // PLACEHOLDER — replace with verified title
  specialty: string;
  qualifications: string; // PLACEHOLDER — replace with verified qualifications
  biography: string;
  clinicalInterests: string[];
  consultationInfo: string;
  image: string;
  serviceSlug: string;
  visible: boolean;
}

const doctors: Doctor[] = [
  {
    id: 'dr-placeholder-one',
    slug: 'dr-amara-singh',
    name: '[Consultant Gynaecologist — Name to be confirmed]',
    title: 'Consultant Gynaecologist',
    specialty: 'Gynaecology & Menstrual Health',
    qualifications: '[Qualifications to be confirmed by clinic]',
    biography: `Our lead gynaecologist brings a warm, patient-centred approach to every consultation. With a particular interest in menstrual health and minimally invasive gynecological care, she is dedicated to ensuring every patient feels heard, respected, and fully informed. She is committed to providing evidence-based care in a private, compassionate environment. Please contact the clinic for confirmed details.`,
    clinicalInterests: [
      'Menstrual health and heavy bleeding management',
      'Minimally invasive gynecological procedures',
      'Pelvic pain and endometriosis',
      'Contraception counselling',
      'Cervical health',
    ],
    consultationInfo: 'Consultations available by appointment. Please contact the clinic for current availability.',
    image: '/assets/images/doctor-1.png',
    serviceSlug: 'gynecology',
    visible: true,
  },
  {
    id: 'dr-placeholder-two',
    slug: 'dr-priya-nair',
    name: '[Obstetrician & Antenatal Specialist — Name to be confirmed]',
    title: 'Obstetrician & Antenatal Specialist',
    specialty: 'Obstetrics, Antenatal & Postnatal Care',
    qualifications: '[Qualifications to be confirmed by clinic]',
    biography: `Our obstetrician and antenatal specialist is passionate about supporting women through the journey of pregnancy and early parenthood. She provides thorough, attentive antenatal monitoring and postnatal care, with a focus on patient wellbeing and informed decision-making at every stage. Please contact the clinic for confirmed details.`,
    clinicalInterests: [
      'High-risk pregnancy monitoring',
      'Antenatal and postnatal wellbeing',
      'Gestational diabetes management',
      'Perinatal mental health support and signposting',
      'Birth plan guidance',
    ],
    consultationInfo: 'Antenatal and postnatal appointments available. Please contact the clinic for scheduling.',
    image: '/assets/images/doctor-2.png',
    serviceSlug: 'antenatal-care',
    visible: true,
  },
  {
    id: 'dr-placeholder-three',
    slug: 'dr-lakshmi-reddy',
    name: '[Women\'s Health Specialist — Name to be confirmed]',
    title: 'Women\'s Health Specialist',
    specialty: 'PCOS, Fertility & Menopause',
    qualifications: '[Qualifications to be confirmed by clinic]',
    biography: `Our women's health specialist has a dedicated interest in hormonal health across the lifespan. She works closely with patients managing PCOS, fertility concerns, and the perimenopause and menopause transition, providing individualized, evidence-informed care with sensitivity and expertise. Please contact the clinic for confirmed details.`,
    clinicalInterests: [
      'Polycystic Ovary Syndrome (PCOS) management',
      'Fertility assessment and pre-conception counselling',
      'Menopause and perimenopause care',
      'Hormonal health and endocrine conditions',
      'Preventive women\'s health',
    ],
    consultationInfo: 'Specialist consultations by appointment. Please contact the clinic for confirmed availability.',
    image: '/assets/images/doctor-3.png',
    serviceSlug: 'menopause-care',
    visible: true,
  },
];

export default doctors;
