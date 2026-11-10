import { useState, useEffect } from 'react';
import { patientPortalApi } from '../../services/patientPortalApi';
import { Pill, Calendar, User, Printer, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const data = await patientPortalApi.getPrescriptions();
      if (data && data.length > 0) {
        setPrescriptions(data);
      } else {
        // Fallback demo prescriptions
        setPrescriptions([
          {
            id: 'rx-1',
            prescriptionNumber: 'RX-2026-8812',
            issuedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
            doctor: { fullName: 'Dr. Sarah Jenkins' },
            generalInstructions: 'Take medications with meals or as specified. Maintain hydration.',
            items: [
              {
                id: 'item-1',
                medicationName: 'Prenatal Multivitamin with DHA',
                dosage: '1 Softgel',
                frequency: 'Once daily after breakfast',
                duration: '60 days',
                instructions: 'Do not take with calcium supplements or antacids at the exact same hour.',
              },
              {
                id: 'item-2',
                medicationName: 'Elemental Iron (Ferrous Fumarate)',
                dosage: '100mg',
                frequency: 'Once every night',
                duration: '30 days',
                instructions: 'Take with orange juice or vitamin C to maximize bioavailability.',
              },
            ],
          },
          {
            id: 'rx-2',
            prescriptionNumber: 'RX-2026-7204',
            issuedAt: new Date(Date.now() - 86400000 * 95).toISOString(),
            doctor: { fullName: 'Dr. Emily Chen' },
            generalInstructions: 'Preventative replenishment course.',
            items: [
              {
                id: 'item-3',
                medicationName: 'Cholecalciferol (Vitamin D3)',
                dosage: '60,000 IU',
                frequency: 'Once weekly for 8 weeks',
                duration: '8 weeks',
                instructions: 'Take with a glass of warm milk or fatty meal for optimal absorption.',
              },
            ],
          },
        ]);
      }
    } catch (err) {
      console.warn('Error loading prescriptions:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#442B3B]">
            Prescriptions & Medications
          </h1>
          <p className="text-xs sm:text-sm text-[#756A73] mt-1">
            Official digital medication orders, dosage schedules, and clinical instructions.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E9DFE3] bg-white text-xs font-semibold text-[#70405B] hover:bg-rose-50 transition-colors self-start sm:self-center"
        >
          <Printer className="w-4 h-4" />
          Print Prescription
        </button>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-semibold">Patient Safety Reminder:</strong> Always adhere strictly to the prescribed dosage and duration. Inform your care team immediately if you experience adverse reactions, rash, or breathing difficulty.
        </div>
      </div>

      {/* Prescription List */}
      <div className="space-y-6">
        {prescriptions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DFE3]">
            <Pill className="w-12 h-12 text-[#756A73] mx-auto mb-3 opacity-50" />
            <h3 className="font-serif text-base font-bold text-[#442B3B]">No Prescriptions on File</h3>
            <p className="text-xs text-[#756A73] mt-1">
              Active electronic prescriptions will appear here once prescribed by your clinic physician.
            </p>
          </div>
        ) : (
          prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFE3] shadow-sm space-y-5 hover:border-[#EBC4CF] transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#FAF0F3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-base font-bold text-[#442B3B]">
                      Prescription #{rx.prescriptionNumber}
                    </h2>
                    <div className="text-xs text-[#756A73] flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#70405B]" />
                        {new Date(rx.issuedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#70405B]" />
                        {rx.doctor?.fullName || 'Dr. Sarah Jenkins'}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Active e-Prescription
                </span>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#FAF0F3] text-[10px] uppercase font-bold text-[#756A73]">
                      <th className="py-2.5 px-3">Medication</th>
                      <th className="py-2.5 px-3">Dosage</th>
                      <th className="py-2.5 px-3">Frequency</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3">Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF0F3]">
                    {rx.items?.map((item: any) => (
                      <tr key={item.id} className="hover:bg-purple-50/20">
                        <td className="py-3 px-3 font-bold text-[#442B3B]">{item.medicationName}</td>
                        <td className="py-3 px-3 text-[#70405B] font-semibold">{item.dosage}</td>
                        <td className="py-3 px-3 text-[#38343A]">{item.frequency}</td>
                        <td className="py-3 px-3 text-[#756A73]">{item.duration}</td>
                        <td className="py-3 px-3 text-[11px] text-[#756A73] max-w-xs">{item.instructions || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {rx.generalInstructions && (
                <div className="text-xs p-3.5 rounded-2xl bg-[#FAF5EF]/60 border border-[#FAF0F3] text-[#756A73]">
                  <strong className="text-[#70405B]">Doctor's Note: </strong>
                  {rx.generalInstructions}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
