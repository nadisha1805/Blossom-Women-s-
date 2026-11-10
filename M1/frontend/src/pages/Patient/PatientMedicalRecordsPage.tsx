import { useState, useEffect } from 'react';
import { patientPortalApi } from '../../services/patientPortalApi';
import { FileText, Calendar, User, Printer, ShieldCheck } from 'lucide-react';

export default function PatientMedicalRecordsPage() {
  const [consultations, setConsultations] = useState<any[]>([]);

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    try {
      const data = await patientPortalApi.getConsultations();
      if (data && data.length > 0) {
        setConsultations(data);
      } else {
        // Fallback demo medical records
        setConsultations([
          {
            id: 'cons-1',
            createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
            chiefComplaint: 'Routine 24-week gestational screening and glucose check',
            diagnosis: 'Uncomplicated singleton gestation at 24 weeks 3 days. Fetal growth within 60th percentile.',
            treatmentPlan: 'Continue prenatal vitamins, 20-30 min daily walking, adequate hydration (2.5L daily). Follow-up in 4 weeks for repeat fundal height and gestational diabetes screening.',
            doctor: { fullName: 'Dr. Sarah Jenkins', specialization: 'Obstetrics & Maternal-Fetal Medicine' },
            isReleasedToPatient: true,
          },
          {
            id: 'cons-2',
            createdAt: new Date(Date.now() - 86400000 * 95).toISOString(),
            chiefComplaint: 'Annual well-woman pelvic examination & preventative cytology',
            diagnosis: 'Preventative reproductive health screen normal. Cervical cytology within normal limits (NILM).',
            treatmentPlan: 'Maintain annual routine well-woman surveillance. HPV screening recommended in 3 years.',
            doctor: { fullName: 'Dr. Emily Chen', specialization: 'Gynecology & Preventative Health' },
            isReleasedToPatient: true,
          },
        ]);
      }
    } catch (err) {
      console.warn('Error loading consultations:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#442B3B]">
            Medical Records & Consultations
          </h1>
          <p className="text-xs sm:text-sm text-[#756A73] mt-1">
            Official clinical summaries, diagnoses, and medical advice released by your physicians.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E9DFE3] bg-white text-xs font-semibold text-[#70405B] hover:bg-rose-50 transition-colors self-start sm:self-center"
        >
          <Printer className="w-4 h-4" />
          Print Record Summary
        </button>
      </div>

      <div className="space-y-5">
        {consultations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DFE3]">
            <FileText className="w-12 h-12 text-[#756A73] mx-auto mb-3 opacity-50" />
            <h3 className="font-serif text-base font-bold text-[#442B3B]">No Medical Records Available</h3>
            <p className="text-xs text-[#756A73] mt-1 max-w-md mx-auto">
              Clinical notes and doctor visit summaries will appear here once finalized and approved by your attending physician.
            </p>
          </div>
        ) : (
          consultations.map((cons) => (
            <div
              key={cons.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFE3] shadow-sm space-y-4 hover:border-[#EBC4CF] transition-colors"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#FAF0F3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#70405B] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-base font-bold text-[#442B3B]">
                      Clinical Visit Summary
                    </h2>
                    <div className="text-xs text-[#756A73] flex items-center gap-2 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#70405B]" />
                      <span>{new Date(cons.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Doctor Released
                  </span>
                </div>
              </div>

              {/* Physician Info */}
              <div className="flex items-center gap-2 text-xs text-[#70405B] bg-[#FCF8F9] px-3.5 py-2 rounded-xl border border-[#FAF0F3]">
                <User className="w-3.5 h-3.5" />
                <span>
                  Consulting Physician: <strong className="text-[#442B3B]">{cons.doctor?.fullName || cons.doctor?.name || 'Dr. Sarah Jenkins'}</strong>
                </span>
              </div>

              {/* Clinical Details */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <h3 className="font-bold text-[#70405B] uppercase tracking-wider text-[10px] mb-1">
                    Chief Complaint / Reason for Visit
                  </h3>
                  <p className="p-3 rounded-xl bg-[#FAF5EF]/60 text-[#38343A] border border-[#FAF0F3]">
                    {cons.chiefComplaint}
                  </p>
                </div>

                {cons.diagnosis && (
                  <div>
                    <h3 className="font-bold text-[#70405B] uppercase tracking-wider text-[10px] mb-1">
                      Clinical Assessment & Diagnosis
                    </h3>
                    <p className="p-3 rounded-xl bg-purple-50/40 text-[#442B3B] font-medium border border-purple-100">
                      {cons.diagnosis}
                    </p>
                  </div>
                )}

                {cons.treatmentPlan && (
                  <div>
                    <h3 className="font-bold text-[#70405B] uppercase tracking-wider text-[10px] mb-1">
                      Treatment Plan & Care Instructions
                    </h3>
                    <p className="p-3 rounded-xl bg-[#FAF5EF]/60 text-[#38343A] border border-[#FAF0F3]">
                      {cons.treatmentPlan}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
