import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Doctors
  const doctorsData = [
    {
      name: 'Dr. Priya Sharma',
      slug: 'dr-priya-sharma',
      qualification: 'MBBS, MS (Obstetrics & Gynaecology), FRCOG',
      specialty: 'Senior Consultant Gynecologist & Obstetrician',
      experienceYears: 18,
      biography:
        'Dr. Priya Sharma is a senior consultant gynecologist and obstetrician with over 18 years of clinical experience. She specializes in high-risk pregnancies, comprehensive maternal care, and minimally invasive gynecological procedures.',
      areasOfExpertise: [
        'High-Risk Pregnancy Care',
        'Laparoscopic & Hysteroscopic Surgeries',
        'Adolescent Gynecology',
        'Endometriosis Management',
      ],
      profileImage: '/images/doctors/dr-priya-sharma.jpg',
      isActive: true,
    },
    {
      name: 'Dr. Anita Roy',
      slug: 'dr-anita-roy',
      qualification: 'MBBS, MD (Obstetrics & Gynaecology), Fellowship in Reproductive Medicine',
      specialty: 'Fertility Specialist & Reproductive Endocrinologist',
      experienceYears: 14,
      biography:
        'Dr. Anita Roy is an empathetic reproductive medicine specialist committed to supporting individuals and couples through fertility challenges, recurrent pregnancy loss, and endocrine concerns.',
      areasOfExpertise: [
        'Infertility Evaluation & Treatment',
        'Recurrent Implantation Failure',
        'PCOS & Ovulatory Disorders',
        'Fertility Preservation',
      ],
      profileImage: '/images/doctors/dr-anita-roy.jpg',
      isActive: true,
    },
    {
      name: 'Dr. Sunita Patel',
      slug: 'dr-sunita-patel',
      qualification: 'MBBS, MD, Certified Menopause Practitioner (NCMP)',
      specialty: 'Menopause Specialist & Women\'s Preventive Health Consultant',
      experienceYears: 16,
      biography:
        'Dr. Sunita Patel has dedicated her practice to supporting women during midlife transitions, perimenopause, menopause, bone health, and healthy longevity.',
      areasOfExpertise: [
        'Perimenopause & Menopause Symptom Care',
        'Hormone Replacement Therapy (HRT)',
        'Osteoporosis Screening & Prevention',
        'Cardiovascular Risk in Women',
      ],
      profileImage: '/images/doctors/dr-sunita-patel.jpg',
      isActive: true,
    },
    {
      name: 'Dr. Meera Nambiar',
      slug: 'dr-meera-nambiar',
      qualification: 'MBBS, DGO, DNB (Obstetrics & Gynaecology)',
      specialty: 'Consultant in Menstrual Health & PCOS Care',
      experienceYears: 11,
      biography:
        'Dr. Meera Nambiar focuses on menstrual health, cycle irregularity, pelvic pain, and multidisciplinary lifestyle and medical management for Polycystic Ovary Syndrome.',
      areasOfExpertise: [
        'PCOS Diagnosis & Integrated Management',
        'Heavy & Painful Menstrual Bleeding',
        'Premenstrual Dysphoric Disorder (PMDD)',
        'Contraception Counseling',
      ],
      profileImage: '/images/doctors/dr-meera-nambiar.jpg',
      isActive: true,
    },
  ];

  for (const doc of doctorsData) {
    await prisma.doctor.upsert({
      where: { slug: doc.slug },
      update: doc,
      create: doc,
    });
  }

  // 2. Services
  const servicesData = [
    {
      name: 'General & Preventive Gynecology',
      slug: 'gynecology',
      category: 'Clinical Care',
      description:
        'Routine examinations, Pap smears, HPV screening, pelvic pain assessment, and compassionate consultations for all women.',
      benefits:
        'Early detection of cervical changes, reassurance, personalized guidance, and proactive management of reproductive health.',
      whatToExpect:
        'A thorough and gentle consultation in a private, unhurried environment with detailed explanations and non-judgmental guidance.',
      isActive: true,
    },
    {
      name: 'Antenatal & Pregnancy Care',
      slug: 'antenatal-care',
      category: 'Maternity Care',
      description:
        'Complete prenatal care through every trimester, including developmental scans, nutritional counseling, and high-risk monitoring.',
      benefits:
        'Continuous clinical oversight, proactive screening for gestational diabetes and preeclampsia, and birth preparation support.',
      whatToExpect:
        'Regular milestone visits, ultrasound scans, blood work reviews, fetal heart monitoring, and birth planning consultations.',
      isActive: true,
    },
    {
      name: 'Postnatal & Recovery Care',
      slug: 'postnatal-care',
      category: 'Maternity Care',
      description:
        'Specialized postpartum support covering physical healing, pelvic floor assessment, lactation assistance, and emotional wellness.',
      benefits:
        'Safe healing after vaginal or cesarean birth, lactation troubleshooting, screening for postpartum mood changes, and contraceptive advice.',
      whatToExpect:
        'Gentle physical exam, mental health check-in, infant feeding review, and actionable recovery guidance.',
      isActive: true,
    },
    {
      name: 'Menstrual Health & Cycle Disorders',
      slug: 'menstrual-health',
      category: 'Reproductive Endocrinology',
      description:
        'Comprehensive evaluation and treatment for painful periods (dysmenorrhea), heavy menstrual bleeding, and cycle irregularities.',
      benefits:
        'Accurate root-cause diagnosis, targeted symptom relief, non-surgical and surgical options, and restored quality of life.',
      whatToExpect:
        'Hormone profiles, pelvic ultrasound evaluation, personalized treatment plans including medical and lifestyle options.',
      isActive: true,
    },
    {
      name: 'PCOS Management Program',
      slug: 'pcos',
      category: 'Reproductive Endocrinology',
      description:
        'An integrated multidisciplinary approach combining gynecological assessment, endocrine evaluation, and metabolic support.',
      benefits:
        'Balanced hormonal health, improved fertility potential, regulation of cycles, and reduction in long-term cardiovascular risks.',
      whatToExpect:
        'Diagnostic ultrasound, metabolic panels, insulin resistance checks, and personalized ongoing management.',
      isActive: true,
    },
    {
      name: 'Fertility Consultation & Planning',
      slug: 'fertility',
      category: 'Fertility Care',
      description:
        'Thorough pre-conception assessments, ovulation tracking, ovarian reserve screening (AMH), and fertility guidance.',
      benefits:
        'Clarity on reproductive health status, evidence-based recommendations, and compassionate guidance without undue pressure.',
      whatToExpect:
        'Detailed medical and reproductive history, pelvic sonography, ovarian reserve tests, and clear explanation of options.',
      isActive: true,
    },
    {
      name: 'Perimenopause & Menopause Care',
      slug: 'menopause-care',
      category: 'Midlife Health',
      description:
        'Evidence-based care for hot flashes, night sweats, sleep disturbances, mood changes, bone density, and individualized HRT.',
      benefits:
        'Significant symptom relief, proactive cardiovascular and bone health management, and improved vitality through midlife.',
      whatToExpect:
        'Comprehensive symptom mapping, risk-benefit discussion on hormone therapies, bone density review, and lifestyle strategies.',
      isActive: true,
    },
    {
      name: 'Preventive Health Screenings',
      slug: 'preventive-screenings',
      category: 'Preventive Health',
      description:
        'Tailored health packages including cervical cytology, breast health checks, thyroid, lipid, and bone density assessments.',
      benefits:
        'Proactive wellness, peace of mind, early detection of asymptomatic conditions, and actionable longevity plans.',
      whatToExpect:
        'Dedicated nurse and physician consultation, screening panel overview, and a clear, understandable report with next steps.',
      isActive: true,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 3. Educational Articles
  const articlesData = [
    {
      title: 'Understanding PCOS: Symptoms, Diagnosis, and Evidence-Based Management',
      slug: 'understanding-pcos-symptoms-management',
      category: 'Hormonal Health',
      readTime: '6 min read',
      excerpt:
        'Polycystic Ovary Syndrome affects roughly 1 in 10 women of reproductive age. Learn about the Rotterdam diagnostic criteria, insulin resistance, and sustainable lifestyle strategies.',
      content: `Polycystic Ovary Syndrome (PCOS) is a common endocrine condition affecting roughly 8–13% of women of reproductive age worldwide. Despite its name, PCOS is not purely an ovarian condition; it is primarily a metabolic and hormonal disorder characterized by an imbalance in reproductive hormones.

### Common Signs and Symptoms
- Irregular or absent menstrual cycles (oligomenorrhea or amenorrhea)
- Elevated androgen levels (excess facial or body hair, adult acne, androgenic alopecia)
- Polycystic appearance of ovaries on ultrasound
- Insulin resistance, weight changes, and fatigue

### Evidence-Based Management
1. **Lifestyle and Nutritional Optimization:** Balanced low-glycemic nutrition, resistance training, and consistent circadian rhythms help improve insulin sensitivity.
2. **Medical Management:** Combined oral contraceptives, cyclic progestins, or metformin may be recommended based on individual goals.
3. **Fertility Support:** For women seeking pregnancy, ovulation induction with letrozole or clomiphene citrate offers proven success under clinical supervision.

*Note: This article is educational and should not replace personalized medical advice from your gynecologist.*`,
      featuredImage: '/images/articles/pcos-guide.jpg',
      published: true,
    },
    {
      title: 'Perimenopause Explained: What Every Woman Needs to Know in Her 40s',
      slug: 'perimenopause-explained-guide',
      category: 'Menopause',
      readTime: '7 min read',
      excerpt:
        'Perimenopause marks the transition leading up to menopause. Here is what to expect with fluctuating estrogen levels, sleep shifts, vasomotor symptoms, and modern treatment options.',
      content: `Perimenopause refers to the transition phase leading up to natural menopause, typically beginning in a woman's 40s (and sometimes late 30s). During this time, estrogen and progesterone levels fluctuate unpredictably rather than declining smoothly.

### Recognizing Perimenopausal Changes
- Cycle variability (shortened or lengthened intervals, heavier or lighter flow)
- Vasomotor symptoms (hot flashes, night sweats)
- Sleep disturbances and nocturnal awakenings
- Mood variability, brain fog, and fatigue
- Vaginal dryness and changes in bladder comfort

### Supportive Strategies
- **Hormone Therapy (MHT):** Modern bioidentical estrogens and micronized progesterone are safe and highly effective for most healthy women within 10 years of menopause onset.
- **Non-Hormonal Options:** Selective neurokinin-3 receptor antagonists and SSRIs/SNRIs offer relief for women who cannot or prefer not to use hormones.
- **Bone and Heart Health:** Regular weight-bearing exercise, adequate calcium, vitamin D, and cardiovascular screenings are essential.`,
      featuredImage: '/images/articles/menopause-guide.jpg',
      published: true,
    },
    {
      title: 'Cervical Cancer Screening: Why Regular Pap and HPV Tests Save Lives',
      slug: 'cervical-cancer-screening-pap-hpv-guide',
      category: 'Preventive Care',
      readTime: '5 min read',
      excerpt:
        'Cervical cancer is one of the most preventable gynecological cancers. Learn the difference between Pap cytology, high-risk HPV testing, and current screening guidelines.',
      content: `Cervical cancer prevention is one of modern medicine's greatest success stories. Because cervical cancer typically develops slowly over 10 to 15 years from persistent infection with high-risk Human Papillomavirus (HPV) strains, routine screening can detect abnormal cell changes long before cancer develops.

### Pap Smear vs. HPV Testing
- **Pap Cytology:** Examines cervical cells under a microscope to identify precancerous changes (dysplasia).
- **HPV DNA Test:** Identifies high-risk oncogenic HPV types (such as types 16 and 18) directly.
- **Co-testing:** Combining both tests gives the highest accuracy for women aged 30 and older.

### Screening Guidelines
- Women aged 21–29: Pap smear every 3 years.
- Women aged 30–65: HPV test or co-testing every 5 years (or Pap smear every 3 years).
- HPV Vaccination: Highly recommended and protects against the most common cancer-causing strains.`,
      featuredImage: '/images/articles/cervical-screening.jpg',
      published: true,
    },
  ];

  for (const art of articlesData) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: art,
      create: art,
    });
  }

  console.log('✅ Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

