import { useState, useEffect } from 'react';
import { portalAppointmentsApi, portalVitalsApi } from '../../services/portalApi';
import { Activity, Clock, CheckCircle } from 'lucide-react';

export default function NurseDashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Vitals form
  const [systolicBP, setSystolicBP] = useState<number | ''>(120);
  const [diastolicBP, setDiastolicBP] = useState<number | ''>(80);
  const [heartRate, setHeartRate] = useState<number | ''>(74);
  const [temperature, setTemperature] = useState<number | ''>(36.8);
  const [respiratoryRate, setRespiratoryRate] = useState<number | ''>(16);
  const [spO2, setSpO2] = useState<number | ''>(99);
  const [weightKg, setWeightKg] = useState<number | ''>(62.0);
  const [heightCm, setHeightCm] = useState<number | ''>(165.0);
  const [nursingNotes, setNursingNotes] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCheckedInPatients();
  }, []);

  const loadCheckedInPatients = async () => {
    try {
      setLoading(true);
      const res = await portalAppointmentsApi.list();
      // Prioritize checked in patients awaiting doctor
      setAppointments(res || []);
      if (res?.length > 0 && !selectedAppt) {
        setSelectedAppt(res[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVitals = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppt) return;
    setSubmitting(true);
    setSavedMessage('');

    try {
      await portalVitalsApi.record({
        patientId: selectedAppt.patientId,
        appointmentId: selectedAppt.id,
        systolicBP: systolicBP ? Number(systolicBP) : undefined,
        diastolicBP: diastolicBP ? Number(diastolicBP) : undefined,
        heartRate: heartRate ? Number(heartRate) : undefined,
        temperature: temperature ? Number(temperature) : undefined,
        respiratoryRate: respiratoryRate ? Number(respiratoryRate) : undefined,
        spO2: spO2 ? Number(spO2) : undefined,
        weightKg: weightKg ? Number(weightKg) : undefined,
        heightCm: heightCm ? Number(heightCm) : undefined,
        nursingNotes,
      });

      setSavedMessage('✓ Patient vitals recorded successfully and attached to consultation.');
      loadCheckedInPatients();
    } catch (err: any) {
      alert(err.message || 'Failed to record vitals');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#442B3B]">Nurse Desk & Triage</h1>
        <p className="text-xs text-[#756A73] mt-1">
          Patient preparation, pre-consultation vital signs recording, nursing observations, and health checks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient queue */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-5 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-[#442B3B] flex items-center gap-2 border-b border-[#E9DFE3] pb-3">
            <Clock size={16} className="text-[#70405B]" />
            Patient Waiting Queue
          </h2>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="text-xs text-[#756A73] text-center py-4">Loading queue…</p>
            ) : appointments.length === 0 ? (
              <p className="text-xs text-[#756A73] text-center py-4">No patients waiting in queue.</p>
            ) : (
              appointments.map((a) => {
                const isSelected = selectedAppt?.id === a.id;
                return (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelectedAppt(a);
                      setSavedMessage('');
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#70405B] bg-[#F7E7EC]/70 shadow-xs'
                        : 'border-[#E9DFE3] bg-[#FAF5EF]/40 hover:bg-[#FAF5EF]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-xs text-[#442B3B] block">{a.patient?.fullName}</strong>
                        <span className="text-[10px] text-[#756A73] font-mono">{a.patient?.patientId}</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white text-[#70405B] border border-[#E9DFE3]">
                        {a.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#70405B] mt-1">Dr. {a.doctor?.name}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Vitals Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E9DFE3] p-6 shadow-sm space-y-5">
          {!selectedAppt ? (
            <div className="text-center py-20 text-[#756A73]">
              <Activity size={40} className="mx-auto mb-2 text-[#EBC4CF]" />
              <p className="text-xs">Select a patient from queue to log vital signs.</p>
            </div>
          ) : (
            <form onSubmit={handleSaveVitals} className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#FAF5EF] border border-[#E9DFE3] flex justify-between items-center">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#442B3B]">{selectedAppt.patient?.fullName}</h3>
                  <p className="text-xs text-[#756A73]">
                    ID: {selectedAppt.patient?.patientId} • Blood: {selectedAppt.patient?.bloodGroup || 'N/A'} • Age: {new Date().getFullYear() - new Date(selectedAppt.patient?.dob).getFullYear()} yrs
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F7E7EC] text-[#70405B]">
                  Appt #{selectedAppt.appointmentNumber}
                </span>
              </div>

              {savedMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                  {savedMessage}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Systolic BP (mmHg)</label>
                  <input
                    type="number"
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Diastolic BP (mmHg)</label>
                  <input
                    type="number"
                    value={diastolicBP}
                    onChange={(e) => setDiastolicBP(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Temperature (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">SpO2 (%)</label>
                  <input
                    type="number"
                    value={spO2}
                    onChange={(e) => setSpO2(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Resp. Rate (/min)</label>
                  <input
                    type="number"
                    value={respiratoryRate}
                    onChange={(e) => setRespiratoryRate(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Height (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Nursing Observations & Notes</label>
                <textarea
                  rows={3}
                  value={nursingNotes}
                  onChange={(e) => setNursingNotes(e.target.value)}
                  placeholder="Patient comfort, posture, pain scale (0-10), ambulation observations…"
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs resize-none"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-[#E9DFE3]">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle size={15} /> {submitting ? 'Recording…' : 'Record & Transmit Vitals'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
