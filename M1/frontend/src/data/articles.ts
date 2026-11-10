// ============================================================
// ARTICLES DATA — Women's Healthcare Clinic
// ============================================================
// Content is general educational material only.
// This is not a substitute for professional medical advice.
// All content should be reviewed by a qualified clinician before publication.

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string; // Supports basic HTML markup
  image: string;
  publishedDate: string; // Placeholder — confirm before going live
  readingTime: string;
  relatedSlugs: string[];
  visible: boolean;
}

const articles: Article[] = [
  {
    id: 'understanding-menstrual-health',
    slug: 'understanding-menstrual-health',
    title: 'Understanding Your Menstrual Health: What Is Normal and When to Seek Support',
    category: 'Menstrual Health',
    excerpt: 'Your menstrual cycle is one of the most informative indicators of your overall health. Learn what a healthy cycle looks like and when it may be worth speaking with a healthcare professional.',
    body: `
      <h2>What Does a Healthy Cycle Look Like?</h2>
      <p>A typical menstrual cycle lasts between 21 and 35 days, with bleeding lasting between 2 and 7 days. However, significant variation exists between individuals, and what is "normal" for one person may differ from another. Tracking your cycle over time can help you understand your own patterns and identify changes that may warrant attention.</p>

      <h2>Common Menstrual Concerns</h2>
      <p>Many women experience occasional irregularities, which may be influenced by stress, illness, travel, significant weight changes, or other factors. However, persistent irregularities, very heavy bleeding, severe pain, or prolonged absence of periods may indicate an underlying condition that benefits from assessment.</p>

      <h2>When to Consider Speaking With a Healthcare Professional</h2>
      <ul>
        <li>Your periods are significantly heavier than usual or last longer than 7 days</li>
        <li>You are experiencing severe cramping that disrupts your daily activities</li>
        <li>Your cycle has become very irregular without a clear reason</li>
        <li>You are bleeding between periods or after intercourse</li>
        <li>Your periods have stopped for 3 or more consecutive months and pregnancy is not the reason</li>
      </ul>

      <p><strong>Important note:</strong> This article provides general educational information only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Please consult a qualified healthcare professional with any specific concerns about your health.</p>
    `,
    image: '/assets/images/article-1.png',
    publishedDate: '[Date to be confirmed]',
    readingTime: '5 min read',
    relatedSlugs: ['preparing-for-a-gynaecology-visit', 'understanding-pcos'],
    visible: true,
  },
  {
    id: 'preparing-for-a-gynaecology-visit',
    slug: 'preparing-for-a-gynaecology-visit',
    title: 'Preparing for Your First Gynaecology Appointment: What to Expect and How to Get the Most From Your Visit',
    category: 'Patient Guidance',
    excerpt: 'Knowing what to expect at a gynaecology appointment can help ease anxiety and ensure you get the most from your consultation. Here is a practical guide to preparing for your visit.',
    body: `
      <h2>Before Your Appointment</h2>
      <p>A little preparation can make your appointment more comfortable and productive. Consider noting down any symptoms, questions, or concerns you would like to discuss. You do not need to have everything perfectly organized — your clinician is there to help you explore what matters to you.</p>

      <h2>What to Bring</h2>
      <ul>
        <li>A note of the first day of your last menstrual period</li>
        <li>A list of any current medications, supplements, or contraceptives</li>
        <li>Any previous test results or medical letters, if relevant</li>
        <li>A trusted support person, if that would help you feel more comfortable</li>
      </ul>

      <h2>During Your Appointment</h2>
      <p>Your consultation is a confidential space. You are welcome to ask questions, request clarification, and discuss any concerns — no matter how small they may seem. A gynaecologist is trained to make you feel comfortable and to explain any examinations or investigations before proceeding.</p>

      <h2>After Your Appointment</h2>
      <p>You should leave with a clear understanding of any findings, a plan of next steps, and an opportunity to ask follow-up questions. If anything is unclear, do not hesitate to ask for further explanation before you leave.</p>

      <p><strong>Important note:</strong> This article provides general guidance only. Your experience may vary, and your clinician will tailor your care to your individual needs and preferences.</p>
    `,
    image: '/assets/images/article-2.png',
    publishedDate: '[Date to be confirmed]',
    readingTime: '4 min read',
    relatedSlugs: ['understanding-menstrual-health', 'womens-preventive-health'],
    visible: true,
  },
  {
    id: 'understanding-pcos',
    slug: 'understanding-pcos',
    title: 'Understanding Polycystic Ovary Syndrome (PCOS): Symptoms, Management, and What It Means for Your Health',
    category: 'Hormonal Health',
    excerpt: 'PCOS is one of the most common hormonal conditions affecting women of reproductive age. This guide explains what PCOS is, how it is identified, and how it can be managed effectively.',
    body: `
      <h2>What Is PCOS?</h2>
      <p>Polycystic Ovary Syndrome (PCOS) is a hormonal condition that affects many women during their reproductive years. It is characterized by an imbalance of reproductive hormones, which can affect the ovaries and lead to a range of symptoms. PCOS is not a single disease but a condition with varying presentations from person to person.</p>

      <h2>Common Symptoms</h2>
      <ul>
        <li>Irregular, infrequent, or absent menstrual periods</li>
        <li>Excess androgen levels, which may cause acne, excess facial or body hair (hirsutism), or hair thinning</li>
        <li>Polycystic-appearing ovaries on ultrasound</li>
        <li>Difficulty with weight management in some individuals</li>
        <li>Concerns related to fertility</li>
      </ul>

      <h2>How Is PCOS Managed?</h2>
      <p>There is no single cure for PCOS, but its symptoms and associated health factors can often be managed effectively with personalized care. Management may include lifestyle guidance, hormonal medication, and targeted treatment for specific symptoms. The right approach depends on your individual situation, health goals, and whether fertility is a consideration.</p>

      <h2>When to Seek Assessment</h2>
      <p>If you have irregular periods, symptoms of elevated androgens, or concerns about fertility and PCOS, a consultation with a women's health specialist can help clarify your situation and establish a management plan that works for you.</p>

      <p><strong>Important note:</strong> This article is for general educational purposes only. Please consult a qualified healthcare professional for assessment and advice tailored to your individual health circumstances.</p>
    `,
    image: '/assets/images/article-3.png',
    publishedDate: '[Date to be confirmed]',
    readingTime: '6 min read',
    relatedSlugs: ['understanding-menstrual-health', 'womens-preventive-health'],
    visible: true,
  },
  {
    id: 'womens-preventive-health',
    slug: 'womens-preventive-health',
    title: 'Women\'s Preventive Health: Why Regular Screenings Matter at Every Stage of Life',
    category: 'Preventive Health',
    excerpt: 'Preventive healthcare is one of the most impactful investments you can make in your long-term wellbeing. Discover the key screenings and health checks to consider at different life stages.',
    body: `
      <h2>The Importance of Preventive Screening</h2>
      <p>Many significant health conditions can be identified earlier when regular screenings are a part of your healthcare routine. Early detection provides more options and, in many cases, more straightforward management. Preventive care is not about creating anxiety — it is about giving you the information and peace of mind to make informed decisions about your health.</p>

      <h2>Key Screenings for Women</h2>
      <ul>
        <li><strong>Cervical screening:</strong> Recommended at intervals determined by your age and screening history to detect changes in cervical cells</li>
        <li><strong>Breast health:</strong> Regular self-awareness and, where indicated, clinical examination or imaging as appropriate for your age and risk factors</li>
        <li><strong>Blood pressure monitoring:</strong> A simple, important cardiovascular health indicator</li>
        <li><strong>Blood glucose and lipid profile:</strong> Useful for detecting early metabolic changes</li>
        <li><strong>Bone health:</strong> Particularly relevant in the perimenopause and menopause period</li>
        <li><strong>Thyroid health:</strong> Thyroid conditions are more common in women and can significantly affect wellbeing</li>
      </ul>

      <h2>Taking the First Step</h2>
      <p>If you are uncertain about which screenings are appropriate for your age and health history, a general women's health consultation is a good starting point. Your clinician can help you understand what is relevant for you and arrange appropriate investigations.</p>

      <p><strong>Important note:</strong> Screening recommendations vary based on individual health history, age, and risk factors. This article is for general information only. Please consult a qualified healthcare professional for personalized advice.</p>
    `,
    image: '/assets/images/article-1.png',
    publishedDate: '[Date to be confirmed]',
    readingTime: '5 min read',
    relatedSlugs: ['preparing-for-a-gynaecology-visit', 'understanding-menstrual-health'],
    visible: true,
  },
];

export default articles;
