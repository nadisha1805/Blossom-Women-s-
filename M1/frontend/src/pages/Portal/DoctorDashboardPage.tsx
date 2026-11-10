import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  portalReportsApi,
  portalConsultationsApi,
  portalPrescriptionsApi,
  portalDiagnosticsApi,
} from '../../services/portalApi';
import {
  Stethoscope,
  Clock,
  Activity,
  FileText,
  Pill,
  FlaskConical,
  CheckCircle,
} from 'lucide-react';

export default function DoctorDashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedAppt, setSelectedAppt] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Consultation form state
  const [activeTab, setActiveTab] = useState<'clinical' | 'specialty' | 'rx' | 'lab'>('clinical');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [clinicalFindings, setClinicalFindings] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [specialtyType, setSpecialtyType] = useState('GYNECOLOGY');
  const [specialtyDetails, setSpecialtyDetails] = useState<any>({
    lmp: '',
    cycleInterval: '28 days',
    gestationalWeeks: '',
    fetalHeartSound: '',
    symptomsSeverity: 'Moderate',
  });
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');

  // Prescription items state
  const [rxItems, setRxItems] = useState<any[]>([
    { medicationName: '', dosage: '', frequency: 'Twice daily', duration: '5 days', instructions: 'After meals' },
  ]);

  // Lab order state
  const [labTestName, setLabTestName] = useState('');
  const [labCategory, setLabCategory] = useState('IMAGING');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDoctorData();
  }, [user]);

  const loadDoctorData = async () => {
    try {
      setLoading(true);
      // Retrieve appointments for logged in doctor
      const res = await portalReportsApi.getMyDoctorMetrics();
      setAppointments(res.appointments || []);
      if (res.appointments?.length > 0 && !selectedAppt) {
        handleSelectAppt(res.appointments[0]);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAppt = async (appt: any) => {
    setSelectedAppt(appt);
    setMessage('');
    // Check if consultation exists
    try {
      const existing = await portalConsultationsApi.getByAppointment(appt.id);
      if (existing) {
        setChiefComplaint(existing.chiefComplaint || '');
        setSymptoms(existing.symptoms || '');
        setClinicalFindings(existing.clinicalFindings || '');
        setDiagnosis(existing.diagnosis || '');
        setTreatmentPlan(existing.treatmentPlan || '');
        setSpecialtyType(existing.specialtyType || 'GYNECOLOGY');
        setSpecialtyDetails(existing.specialtyDetails || {});
        setFollowUpDate(existing.followUpDate ? new Date(existing.followUpDate).toISOString().split('T')[0] : '');
        setFollowUpNotes(existing.followUpNotes || '');
      } else {
        setChiefComplaint(appt.reason || '');
        setSymptoms('');
        setClinicalFindings('');
        setDiagnosis('');
        setTreatmentPlan('');
      }
    } catch (err) {
      // none yet
    }
  };

  const handleSaveConsultation = async (status: 'DRAFT' | 'SIGNED') => {
    if (!selectedAppt) return;
    setSaving(true);
    setMessage('');

    try {
      await portalConsultationsApi.save({
        appointmentId: selectedAppt.id,
        chiefComplaint,
        symptoms,
        clinicalFindings,
        diagnosis: diagnosis.trim() || 'General Clinical Assessment',
        treatmentPlan: treatmentPlan.trim() || 'Counseling and lifestyle guidance provided.',
        specialtyType,
        specialtyDetails,
        status,
        followUpDate: followUpDate || undefined,
        followUpNotes: followUpNotes || undefined,
      });

      // Also create prescription if items populated
      const validItems = rxItems.filter((it) => it.medicationName.trim());
      if (validItems.length > 0) {
        await portalPrescriptionsApi.create({
          patientId: selectedAppt.patientId,
          items: validItems,
        });
      }

      // Also create lab order if entered
      if (labTestName.trim()) {
        await portalDiagnosticsApi.create({
          patientId: selectedAppt.patientId,
          orderingDoctorId: selectedAppt.doctorId,
          testName: labTestName.trim(),
          testCategory: labCategory,
        });
        setLabTestName('');
      }

      setMessage(status === 'SIGNED' ? '✓ Consultation finalized and signed.' : '✓ Draft saved successfully.');
      loadDoctorData();
    } catch (err: any) {
      alert(err.message || 'Failed to save consultation');
    } finally {
      setSaving(false);
    }
  };

  const addRxRow = () => {
    setRxItems([
      ...rxItems,
      { medicationName: '', dosage: '', frequency: 'Twice daily', duration: '5 days', instructions: 'After meals' },
    ]);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#442B3B]">Doctor Consultation Desk</h1>
        <p className="text-xs text-[#756A73] mt-1">
          Assigned patient appointments, electronic health record review, clinical assessments, prescriptions, and lab orders
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Queue / Patient List */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#E9DFE3] pb-3">
            <h2 className="font-serif text-base font-bold text-[#442B3B] flex items-center gap-2">
              <Clock size={16} className="text-[#70405B]" />
              Assigned Consultations
            </h2>
            <span className="text-xs bg-[#F7E7EC] text-[#70405B] px-2 py-0.5 rounded font-bold font-mono">
              {appointments.length}
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="text-xs text-[#756A73] py-4 text-center">Loading queue…</p>
            ) : appointments.length === 0 ? (
              <p className="text-xs text-[#756A73] py-4 text-center">No assigned appointments scheduled.</p>
            ) : (
              appointments.map((a) => {
                const isSelected = selectedAppt?.id === a.id;
                return (
                  <div
                    key={a.id}
                    onClick={() => handleSelectAppt(a)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#70405B] bg-[#F7E7EC]/70 shadow-xs'
                        : 'border-[#E9DFE3] bg-[#FAF5EF]/40 hover:bg-[#FAF5EF]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-[#442B3B]">{a.patient?.fullName}</strong>
                      <span className="text-[10px] font-mono text-[#756A73]">{a.scheduledTimeSlot}</span>
                    </div>
                    <p className="text-[11px] text-[#70405B] font-medium">{a.service?.name}</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E9DFE3]/50 text-[10px]">
                      <span className="text-[#756A73]">{a.patient?.patientId}</span>
                      <span className="px-1.5 py-0.5 rounded font-semibold bg-white text-[#70405B] border border-[#E9DFE3]">
                        {a.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 2 Columns: Clinical Consultation Interface */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E9DFE3] p-6 shadow-sm space-y-5">
          {!selectedAppt ? (
            <div className="text-center py-20 text-[#756A73]">
              <Stethoscope size={40} className="mx-auto mb-2 text-[#EBC4CF]" />
              <p className="text-xs">Select an assigned patient consultation from the left queue.</p>
            </div>
          ) : (
            <>
              {/* Patient Banner */}
              <div className="p-4 rounded-2xl bg-[#FAF5EF] border border-[#E9DFE3] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#70405B] bg-[#F7E7EC] px-2 py-0.5 rounded">
                      {selectedAppt.patient?.patientId}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#442B3B]">{selectedAppt.patient?.fullName}</h3>
                  </div>
                  <p className="text-xs text-[#756A73] mt-0.5">
                    DOB: {new Date(selectedAppt.patient?.dob).toLocaleDateString()} • Phone: {selectedAppt.patient?.phone}
                  </p>
                </div>

                {/* Vitals Quick Chip */}
                {selectedAppt.vitalRecords?.[0] && (
                  <div className="text-[11px] bg-[#EEF3EC] border border-[#B9CBB7]/50 rounded-xl px-3 py-1.5 text-[#442B3B]">
                    <span className="font-bold text-[#70405B]">Nurse Vitals: </span>
                    BP {selectedAppt.vitalRecords[0].systolicBP}/{selectedAppt.vitalRecords[0].diastolicBP} • Pulse{' '}
                    {selectedAppt.vitalRecords[0].heartRate} bpm • Temp {selectedAppt.vitalRecords[0].temperature}°C
                  </div>
                )}
              </div>

              {message && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                  {message}
                </div>
              )}

              {/* Consultation Navigation Tabs */}
              <div className="flex border-b border-[#E9DFE3] gap-6 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('clinical')}
                  className={`pb-2.5 flex items-center gap-1.5 cursor-pointer border-b-2 ${
                    activeTab === 'clinical' ? 'border-[#70405B] text-[#70405B]' : 'border-transparent text-[#756A73]'
                  }`}
                >
                  <FileText size={14} /> Clinical Assessment
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('specialty')}
                  className={`pb-2.5 flex items-center gap-1.5 cursor-pointer border-b-2 ${
                    activeTab === 'specialty' ? 'border-[#70405B] text-[#70405B]' : 'border-transparent text-[#756A73]'
                  }`}
                >
                  <Activity size={14} /> Women's Health Specialty
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('rx')}
                  className={`pb-2.5 flex items-center gap-1.5 cursor-pointer border-b-2 ${
                    activeTab === 'rx' ? 'border-[#70405B] text-[#70405B]' : 'border-transparent text-[#756A73]'
                  }`}
                >
                  <Pill size={14} /> Electronic Prescription
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('lab')}
                  className={`pb-2.5 flex items-center gap-1.5 cursor-pointer border-b-2 ${
                    activeTab === 'lab' ? 'border-[#70405B] text-[#70405B]' : 'border-transparent text-[#756A73]'
                  }`}
                >
                  <FlaskConical size={14} /> Diagnostic & Lab Orders
                </button>
              </div>

              {/* TAB 1: CLINICAL */}
              {activeTab === 'clinical' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Chief Complaint *</label>
                    <input
                      type="text"
                      value={chiefComplaint}
                      onChange={(e) => setChiefComplaint(e.target.value)}
                      placeholder="e.g. Irregular cycles, pelvic pain, routine antenatal checkup"
                      className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Symptoms & History</label>
                      <textarea
                        rows={3}
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="Patient-reported duration, severity, trigger factors…"
                        className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs resize-none focus:ring-1 focus:ring-[#70405B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Clinical Observations & Exam</label>
                      <textarea
                        rows={3}
                        value={clinicalFindings}
                        onChange={(e) => setClinicalFindings(e.target.value)}
                        placeholder="Abdominal exam, speculum/bimanual findings, uterine mobility…"
                        className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs resize-none focus:ring-1 focus:ring-[#70405B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Clinical Assessment / Diagnosis *</label>
                    <input
                      type="text"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="e.g. Polycystic Ovary Syndrome (PCOS), Dysfunctional Uterine Bleeding"
                      className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Treatment Plan & Recommendations *</label>
                    <textarea
                      rows={3}
                      value={treatmentPlan}
                      onChange={(e) => setTreatmentPlan(e.target.value)}
                      placeholder="Management strategy, lifestyle advice, medications, precautions…"
                      className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs resize-none focus:ring-1 focus:ring-[#70405B]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Follow-Up Date (if recommended)</label>
                      <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Follow-Up Instructions</label>
                      <input
                        type="text"
                        value={followUpNotes}
                        onChange={(e) => setFollowUpNotes(e.target.value)}
                        placeholder="e.g. Return in 4 weeks with pelvic ultrasound scan report"
                        className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SPECIALTY */}
              {activeTab === 'specialty' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Specialty Workflow Category</label>
                    <select
                      value={specialtyType}
                      onChange={(e) => setSpecialtyType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs font-semibold text-[#70405B]"
                    >
                      <option value="GYNECOLOGY">General Gynecology & Pelvic Health</option>
                      <option value="OBSTETRICS_ANTENATAL">Obstetrics & Antenatal Maternity Care</option>
                      <option value="PCOS">Menstrual Health & PCOS Management</option>
                      <option value="MENOPAUSE">Perimenopause & Menopause Care</option>
                      <option value="FERTILITY">Fertility Consultation & Preconception</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF5EF] border border-[#E9DFE3]">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Last Menstrual Period (LMP)</label>
                      <input
                        type="date"
                        value={specialtyDetails.lmp || ''}
                        onChange={(e) => setSpecialtyDetails({ ...specialtyDetails, lmp: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E9DFE3] bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Cycle Regularity / Interval</label>
                      <input
                        type="text"
                        value={specialtyDetails.cycleInterval || ''}
                        onChange={(e) => setSpecialtyDetails({ ...specialtyDetails, cycleInterval: e.target.value })}
                        placeholder="e.g. 28-32 days, heavy on day 2"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E9DFE3] bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Gestational Age (weeks, if pregnant)</label>
                      <input
                        type="text"
                        value={specialtyDetails.gestationalWeeks || ''}
                        onChange={(e) => setSpecialtyDetails({ ...specialtyDetails, gestationalWeeks: e.target.value })}
                        placeholder="e.g. 24 weeks + 3 days"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E9DFE3] bg-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Fetal Heart Rate / Movements</label>
                      <input
                        type="text"
                        value={specialtyDetails.fetalHeartSound || ''}
                        onChange={(e) => setSpecialtyDetails({ ...specialtyDetails, fetalHeartSound: e.target.value })}
                        placeholder="e.g. 144 bpm, active fetal movements"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E9DFE3] bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRESCRIPTIONS */}
              {activeTab === 'rx' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#70405B]">Prescribe Medications</p>
                    <button
                      type="button"
                      onClick={addRxRow}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF5EF] border border-[#E9DFE3] text-xs font-semibold text-[#70405B] hover:bg-[#F7E7EC]"
                    >
                      + Add Medication
                    </button>
                  </div>

                  <div className="space-y-3">
                    {rxItems.map((rx, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-[#E9DFE3] bg-[#FAF5EF]/50 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] text-[#756A73]">Medication Name</label>
                          <input
                            type="text"
                            value={rx.medicationName}
                            onChange={(e) => {
                              const copy = [...rxItems];
                              copy[idx].medicationName = e.target.value;
                              setRxItems(copy);
                            }}
                            placeholder="e.g. Medroxyprogesterone acetate"
                            className="w-full px-2 py-1.5 rounded border border-[#E9DFE3] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-[#756A73]">Dosage</label>
                          <input
                            type="text"
                            value={rx.dosage}
                            onChange={(e) => {
                              const copy = [...rxItems];
                              copy[idx].dosage = e.target.value;
                              setRxItems(copy);
                            }}
                            placeholder="10 mg"
                            className="w-full px-2 py-1.5 rounded border border-[#E9DFE3] bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-[#756A73]">Frequency / Duration</label>
                          <input
                            type="text"
                            value={rx.frequency}
                            onChange={(e) => {
                              const copy = [...rxItems];
                              copy[idx].frequency = e.target.value;
                              setRxItems(copy);
                            }}
                            placeholder="Once daily"
                            className="w-full px-2 py-1.5 rounded border border-[#E9DFE3] bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LAB ORDERS */}
              {activeTab === 'lab' && (
                <div className="space-y-4 p-4 rounded-2xl bg-[#FAF5EF] border border-[#E9DFE3]">
                  <p className="text-xs font-semibold text-[#70405B]">Order Diagnostic Investigation</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Test Name</label>
                      <input
                        type="text"
                        value={labTestName}
                        onChange={(e) => setLabTestName(e.target.value)}
                        placeholder="e.g. Pelvic Ultrasound, Anti-Müllerian Hormone (AMH)"
                        className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Category</label>
                      <select
                        value={labCategory}
                        onChange={(e) => setLabCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] bg-white text-xs"
                      >
                        <option value="IMAGING">Ultrasound / Imaging</option>
                        <option value="ENDOCRINE">Hormone Panel / Endocrinology</option>
                        <option value="PATHOLOGY">Hematology / Blood Chemistry</option>
                        <option value="CYTOLOGY">Pap Smear / Cytology</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E9DFE3]">
                <span className="text-[11px] text-[#756A73]">
                  Signing will finalize the medical record and update appointment status to COMPLETED.
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveConsultation('DRAFT')}
                    className="px-4 py-2 rounded-xl border border-[#E9DFE3] text-xs font-semibold text-[#442B3B] hover:bg-[#FAF5EF]"
                  >
                    Save Draft
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleSaveConsultation('SIGNED')}
                    className="px-5 py-2 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle size={15} /> Finalize & Sign Record
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
