import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Blossom Clinic database for Milestone 1 & 2...');

  // 1. Seed Doctors
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
      profileImage: '/assets/images/doctor-1.png',
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
      profileImage: '/assets/images/doctor-2.png',
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
      profileImage: '/assets/images/doctor-3.png',
      isActive: true,
    },
  ];

  const seededDoctors: Record<string, any> = {};
  for (const doc of doctorsData) {
    const d = await prisma.doctor.upsert({
      where: { slug: doc.slug },
      update: doc,
      create: doc,
    });
    seededDoctors[doc.slug] = d;
  }

  // 2. Seed Services
  const servicesData = [
    {
      name: 'General & Preventive Gynecology',
      slug: 'gynecology',
      category: 'Clinical Care',
      standardFee: 60.0,
      description: 'Routine examinations, Pap smears, HPV screening, pelvic pain assessment.',
      isActive: true,
    },
    {
      name: 'Antenatal & Pregnancy Care',
      slug: 'antenatal-care',
      category: 'Maternity Care',
      standardFee: 80.0,
      description: 'Complete prenatal care through every trimester, including developmental scans.',
      isActive: true,
    },
    {
      name: 'Menstrual Health & Cycle Disorders',
      slug: 'menstrual-health',
      category: 'Reproductive Endocrinology',
      standardFee: 65.0,
      description: 'Comprehensive evaluation and treatment for painful and heavy periods.',
      isActive: true,
    },
    {
      name: 'PCOS Management Program',
      slug: 'pcos',
      category: 'Reproductive Endocrinology',
      standardFee: 75.0,
      description: 'An integrated multidisciplinary approach combining gynecological & endocrine care.',
      isActive: true,
    },
    {
      name: 'Perimenopause & Menopause Care',
      slug: 'menopause-care',
      category: 'Midlife Health',
      standardFee: 70.0,
      description: 'Evidence-based care for hot flashes, sleep shifts, bone density, and HRT.',
      isActive: true,
    },
  ];

  const seededServices: Record<string, any> = {};
  for (const s of servicesData) {
    const srv = await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
    seededServices[s.slug] = srv;
  }

  // 3. Seed Staff Users (All 7 Clinic Roles)
  const defaultPassword = await bcrypt.hash('Staff@123', 10);

  const staffUsers = [
    {
      email: 'admin@blossomclinic.com',
      fullName: 'Victoria Adams (Clinic Administrator)',
      role: UserRole.CLINIC_ADMIN,
      phone: '+1 555-0100',
    },
    {
      email: 'superadmin@blossomclinic.com',
      fullName: 'Dr. Katherine Bell (Medical Director / Super Admin)',
      role: UserRole.SUPER_ADMIN,
      phone: '+1 555-0101',
    },
    {
      email: 'doctor.priya@blossomclinic.com',
      fullName: 'Dr. Priya Sharma',
      role: UserRole.DOCTOR,
      phone: '+1 555-0102',
      doctorId: seededDoctors['dr-priya-sharma']?.id,
    },
    {
      email: 'doctor.anita@blossomclinic.com',
      fullName: 'Dr. Anita Roy',
      role: UserRole.DOCTOR,
      phone: '+1 555-0103',
      doctorId: seededDoctors['dr-anita-roy']?.id,
    },
    {
      email: 'nurse.sarah@blossomclinic.com',
      fullName: 'Nurse Sarah Miller, RN',
      role: UserRole.NURSE,
      phone: '+1 555-0104',
    },
    {
      email: 'reception@blossomclinic.com',
      fullName: 'Clara Oswald (Head Receptionist)',
      role: UserRole.RECEPTIONIST,
      phone: '+1 555-0105',
    },
    {
      email: 'lab.tech@blossomclinic.com',
      fullName: 'David Chen (Senior Medical Technologist)',
      role: UserRole.LAB_STAFF,
      phone: '+1 555-0106',
    },
    {
      email: 'billing@blossomclinic.com',
      fullName: 'Emily Thorne (Billing & Insurance Lead)',
      role: UserRole.BILLING_STAFF,
      phone: '+1 555-0107',
    },
  ];

  for (const staff of staffUsers) {
    await prisma.user.upsert({
      where: { email: staff.email },
      update: {
        fullName: staff.fullName,
        role: staff.role,
        doctorId: staff.doctorId ?? null,
      },
      create: {
        email: staff.email,
        passwordHash: defaultPassword,
        fullName: staff.fullName,
        phone: staff.phone,
        role: staff.role,
        doctorId: staff.doctorId ?? null,
      },
    });
  }

  // 4. Seed Patients
  const patientsData = [
    {
      patientId: 'PAT-10021',
      fullName: 'Eleanor Vance',
      dob: new Date('1993-04-12'),
      gender: 'Female',
      bloodGroup: 'A+',
      phone: '+1 555-0211',
      email: 'eleanor.vance@example.com',
      address: '42 Blossom Meadow Road',
      emergencyContactName: 'Thomas Vance',
      emergencyContactPhone: '+1 555-0212',
      allergies: ['Penicillin'],
      medicalConditions: ['PCOS', 'Mild migraine'],
      currentMedications: ['Metformin 500mg'],
      menstrualHistory: '38-day cycle, irregular, heavy flow',
      pregnancyHistory: 'G0 P0',
    },
    {
      patientId: 'PAT-10022',
      fullName: 'Sophia Martinez',
      dob: new Date('1988-08-25'),
      gender: 'Female',
      bloodGroup: 'O+',
      phone: '+1 555-0221',
      email: 'sophia.m@example.com',
      address: '89 Rosewood Crest',
      emergencyContactName: 'Carlos Martinez',
      emergencyContactPhone: '+1 555-0222',
      allergies: [],
      medicalConditions: ['Pregnant - 24 weeks gestation'],
      currentMedications: ['Prenatal multivitamins', 'Iron supplement'],
      menstrualHistory: 'Regular prior to conception',
      pregnancyHistory: 'G2 P1 (1 living child)',
    },
    {
      patientId: 'PAT-10023',
      fullName: 'Margaret Chen',
      dob: new Date('1974-11-03'),
      gender: 'Female',
      bloodGroup: 'B+',
      phone: '+1 555-0231',
      email: 'margaret.chen@example.com',
      address: '104 Willow Glen Avenue',
      emergencyContactName: 'Arthur Chen',
      emergencyContactPhone: '+1 555-0232',
      allergies: ['Sulfa drugs'],
      medicalConditions: ['Perimenopause vasomotor symptoms', 'Osteopenia'],
      currentMedications: ['Calcium + Vitamin D3'],
      menstrualHistory: 'Cycles spaced 60-90 days, hot flashes',
      pregnancyHistory: 'G2 P2',
    },
  ];

  const seededPatients: Record<string, any> = {};
  for (const pat of patientsData) {
    const p = await prisma.patient.upsert({
      where: { patientId: pat.patientId },
      update: pat,
      create: pat,
    });
    seededPatients[pat.patientId] = p;
  }

  // 5. Seed Sample Appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const priyaDoctor = seededDoctors['dr-priya-sharma'];
  const pcosService = seededServices['pcos'];
  const matService = seededServices['antenatal-care'];

  if (priyaDoctor && pcosService && seededPatients['PAT-10021']) {
    const appt1 = await prisma.appointment.upsert({
      where: { appointmentNumber: 'APT-2026-1011' },
      update: {},
      create: {
        appointmentNumber: 'APT-2026-1011',
        patientId: seededPatients['PAT-10021'].id,
        doctorId: priyaDoctor.id,
        serviceId: pcosService.id,
        scheduledDate: today,
        scheduledTimeSlot: '10:00 AM',
        status: 'CONFIRMED',
        type: 'CONSULTATION',
        reason: 'PCOS follow-up and cycle assessment',
      },
    });

    // Seed Vitals for appt1
    const nurseUser = await prisma.user.findUnique({ where: { email: 'nurse.sarah@blossomclinic.com' } });
    if (nurseUser) {
      await prisma.vitalRecord.create({
        data: {
          patientId: seededPatients['PAT-10021'].id,
          appointmentId: appt1.id,
          recordedById: nurseUser.id,
          systolicBP: 118,
          diastolicBP: 76,
          heartRate: 72,
          temperature: 36.7,
          respiratoryRate: 16,
          spO2: 99,
          weightKg: 64.5,
          heightCm: 166.0,
          bmi: 23.4,
          nursingNotes: 'Patient relaxed, reports occasional bloating.',
        },
      });
    }

    // Seed Invoice
    await prisma.invoice.upsert({
      where: { invoiceNumber: 'INV-2026-1001' },
      update: {},
      create: {
        invoiceNumber: 'INV-2026-1001',
        patientId: seededPatients['PAT-10021'].id,
        appointmentId: appt1.id,
        subtotal: 75.0,
        discount: 0.0,
        tax: 0.0,
        total: 75.0,
        paidAmount: 75.0,
        balance: 0.0,
        status: 'PAID',
        items: {
          create: [
            {
              description: 'Specialist PCOS Consultation',
              quantity: 1,
              unitPrice: 75.0,
              totalPrice: 75.0,
            },
          ],
        },
        payments: {
          create: [
            {
              receiptNumber: 'REC-2026-1001',
              amount: 75.0,
              paymentMethod: 'CARD',
              transactionRef: 'AUTH-892110',
              receivedBy: 'Clara Oswald',
            },
          ],
        },
      },
    });
  }

  console.log('✅ Milestone 1 & 2 database seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
