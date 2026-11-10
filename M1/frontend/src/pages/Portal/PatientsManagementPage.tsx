import { useState, useEffect } from 'react';
import { portalPatientsApi } from '../../services/portalApi';
import { Search, Plus, User, X, Activity, FileText } from 'lucide-react';

export default function PatientsManagementPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  // New patient form state
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    allergies: '',
    medicalConditions: '',
    currentMedications: '',
    medicalHistory: '',
    menstrualHistory: '',
    pregnancyHistory: '',
    previousSurgeries: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPatients();
  }, [search]);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const res = await portalPatientsApi.list({ search });
      setPatients(res.items || []);
      setTotal(res.total || 0);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPatient = async (id: string) => {
    try {
      const full = await portalPatientsApi.getOne(id);
      setSelectedPatient(full);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSubmitPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      await portalPatientsApi.create({
        ...formData,
        allergies: formData.allergies ? formData.allergies.split(',').map((s) => s.trim()) : [],
        medicalConditions: formData.medicalConditions ? formData.medicalConditions.split(',').map((s) => s.trim()) : [],
        currentMedications: formData.currentMedications ? formData.currentMedications.split(',').map((s) => s.trim()) : [],
      });

      setShowModal(false);
      setFormData({
        fullName: '',
        dob: '',
        gender: 'Female',
        bloodGroup: 'A+',
        phone: '',
        email: '',
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        allergies: '',
        medicalConditions: '',
        currentMedications: '',
        medicalHistory: '',
        menstrualHistory: '',
        pregnancyHistory: '',
        previousSurgeries: '',
      });
      loadPatients();
    } catch (err: any) {
      setFormError(err.message || 'Failed to register patient');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#442B3B]">Patients Directory</h1>
          <p className="text-xs text-[#756A73] mt-1">
            Registered patient records, electronic health history, and women's health baseline
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus size={16} /> Register New Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3.5 top-3 text-[#756A73]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, patient ID, phone, or email…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9DFE3] bg-white text-xs text-[#442B3B] focus:outline-none focus:ring-2 focus:ring-[#70405B]/20 focus:border-[#70405B]"
        />
      </div>

      {/* Main Grid: List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E9DFE3] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[#E9DFE3] flex justify-between items-center bg-[#FAF5EF]/50">
            <span className="text-xs font-semibold text-[#442B3B]">{total} Patients Found</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF5EF] text-[#756A73] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Phone / Email</th>
                  <th className="py-3 px-4">Age / DOB</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9DFE3]">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#756A73]">
                      Loading patient records…
                    </td>
                  </tr>
                ) : patients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#756A73]">
                      No patient records matched your search.
                    </td>
                  </tr>
                ) : (
                  patients.map((p) => {
                    const age = Math.floor(
                      (new Date().getTime() - new Date(p.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
                    );
                    const isSelected = selectedPatient?.id === p.id;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => handleSelectPatient(p.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#F7E7EC]' : 'hover:bg-[#FAF5EF]/60'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-semibold text-[#70405B]">{p.patientId}</td>
                        <td className="py-3 px-4 font-medium text-[#442B3B]">
                          {p.fullName}
                          {p.allergies?.length > 0 && (
                            <span className="block text-[10px] text-rose-600 font-normal">
                              Allergies: {p.allergies.join(', ')}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-[#756A73]">
                          <div>{p.phone}</div>
                          <div className="text-[10px]">{p.email || '—'}</div>
                        </td>
                        <td className="py-3 px-4 text-[#756A73]">
                          {age} yrs
                          <span className="block text-[10px]">{new Date(p.dob).toLocaleDateString()}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPatient(p.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#E9DFE3] text-[11px] font-semibold text-[#70405B] hover:bg-[#FAF5EF]"
                          >
                            View Record
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Patient Clinical Record Drawer */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-6 shadow-sm">
          {!selectedPatient ? (
            <div className="text-center py-16 text-[#756A73]">
              <User size={36} className="mx-auto mb-2 text-[#EBC4CF]" />
              <p className="text-xs font-medium">Select a patient to inspect their full EMR, vitals history, and consultations.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="border-b border-[#E9DFE3] pb-4">
                <span className="font-mono text-xs font-bold text-[#70405B] bg-[#F7E7EC] px-2 py-0.5 rounded">
                  {selectedPatient.patientId}
                </span>
                <h2 className="font-serif text-xl font-bold text-[#442B3B] mt-1">{selectedPatient.fullName}</h2>
                <p className="text-xs text-[#756A73]">
                  Blood: {selectedPatient.bloodGroup || 'Not recorded'} • Phone: {selectedPatient.phone}
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="text-xs bg-[#FAF5EF] p-3 rounded-xl border border-[#E9DFE3]">
                <strong className="block text-[#442B3B] mb-0.5">Emergency Contact:</strong>
                <p className="text-[#756A73]">
                  {selectedPatient.emergencyContactName || 'None listed'} ({selectedPatient.emergencyContactPhone || '—'})
                </p>
              </div>

              {/* Clinical Alerts */}
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-rose-700 block">Known Allergies:</strong>
                  <p className="text-[#756A73]">
                    {selectedPatient.allergies?.length > 0 ? selectedPatient.allergies.join(', ') : 'No known allergies reported'}
                  </p>
                </div>
                <div>
                  <strong className="text-[#442B3B] block">Medical Conditions:</strong>
                  <p className="text-[#756A73]">
                    {selectedPatient.medicalConditions?.length > 0 ? selectedPatient.medicalConditions.join(', ') : 'None documented'}
                  </p>
                </div>
                <div>
                  <strong className="text-[#442B3B] block">Menstrual & Reproductive History:</strong>
                  <p className="text-[#756A73]">{selectedPatient.menstrualHistory || 'Not documented'}</p>
                </div>
                <div>
                  <strong className="text-[#442B3B] block">Obstetric / Pregnancy History:</strong>
                  <p className="text-[#756A73]">{selectedPatient.pregnancyHistory || 'G0 P0'}</p>
                </div>
              </div>

              {/* Recent Vitals */}
              <div className="border-t border-[#E9DFE3] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#70405B] mb-2 flex items-center gap-1.5">
                  <Activity size={14} /> Latest Vitals
                </h3>
                {selectedPatient.vitalRecords?.length === 0 ? (
                  <p className="text-[11px] text-[#756A73]">No vitals on file yet.</p>
                ) : (
                  <div className="bg-[#EEF3EC] p-3 rounded-xl border border-[#B9CBB7]/40 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>BP: <strong>{selectedPatient.vitalRecords[0].systolicBP}/{selectedPatient.vitalRecords[0].diastolicBP} mmHg</strong></span>
                      <span>Pulse: <strong>{selectedPatient.vitalRecords[0].heartRate} bpm</strong></span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temp: <strong>{selectedPatient.vitalRecords[0].temperature} °C</strong></span>
                      <span>SpO2: <strong>{selectedPatient.vitalRecords[0].spO2}%</strong></span>
                    </div>
                    <div className="text-[10px] text-[#756A73] pt-1">
                      Recorded by: {selectedPatient.vitalRecords[0].recordedBy?.fullName} on {new Date(selectedPatient.vitalRecords[0].recordedAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Consultation History */}
              <div className="border-t border-[#E9DFE3] pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#70405B] mb-2 flex items-center gap-1.5">
                  <FileText size={14} /> Consultations ({selectedPatient.consultations?.length || 0})
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedPatient.consultations?.map((c: any) => (
                    <div key={c.id} className="p-2.5 rounded-lg border border-[#E9DFE3] text-xs">
                      <div className="flex justify-between font-semibold text-[#442B3B]">
                        <span>{c.consultationNumber}</span>
                        <span className="text-[10px] text-[#70405B] font-mono">{c.status}</span>
                      </div>
                      <p className="text-[11px] text-[#756A73] mt-0.5">Dx: {c.diagnosis}</p>
                      <p className="text-[10px] text-[#756A73]">Dr. {c.doctor?.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-[#E9DFE3]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9DFE3] mb-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#442B3B]">Register New Patient</h2>
                <p className="text-xs text-[#756A73]">Creates unique patient ID & electronic medical profile</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-[#FAF5EF] flex items-center justify-center text-[#756A73] hover:text-[#442B3B]"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitPatient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Patient full name"
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555-0100"
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patient@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street, City, Postal Code"
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    placeholder="Name of contact"
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    placeholder="+1 555-0199"
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
              </div>

              <div className="border-t border-[#E9DFE3] pt-4">
                <p className="text-xs font-bold text-[#70405B] mb-2 uppercase tracking-wider">
                  Women's Health & Medical Baseline
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Allergies (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      placeholder="e.g. Penicillin, Latex"
                      className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Menstrual History</label>
                    <input
                      type="text"
                      value={formData.menstrualHistory}
                      onChange={(e) => setFormData({ ...formData, menstrualHistory: e.target.value })}
                      placeholder="e.g. 28-day regular, painful day 1"
                      className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E9DFE3]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E9DFE3] text-xs font-semibold text-[#756A73] hover:bg-[#FAF5EF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold"
                >
                  {submitting ? 'Registering…' : 'Register Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
