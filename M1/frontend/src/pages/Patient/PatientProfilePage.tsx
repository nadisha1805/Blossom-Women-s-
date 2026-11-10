import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PatientProfilePage() {
  const { patientUser } = useAuth();
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState(patientUser?.fullName || 'Eleanor Vance');
  const [phone, setPhone] = useState(patientUser?.phone || '+1 (555) 234-5678');
  const [dob, setDob] = useState(patientUser?.dob || '1992-06-15');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('Penicillin, Latex (mild)');
  const [emergencyContact, setEmergencyContact] = useState('Thomas Vance (Spouse) - +1 (555) 876-5432');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#442B3B]">
          My Patient Profile & Health Baseline
        </h1>
        <p className="text-xs sm:text-sm text-[#756A73] mt-1">
          Review your registered demographic file, emergency contacts, and electronic health record settings.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          Profile preferences updated successfully.
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFE3] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-[#FAF0F3]">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#70405B] to-[#442B3B] text-white font-serif font-bold text-2xl flex items-center justify-center shadow-sm">
            {fullName.charAt(0)}
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#442B3B]">{fullName}</h2>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-[#70405B] font-bold bg-rose-50 px-2 py-0.5 rounded border border-[#EBC4CF]">
                {patientUser?.patientId || 'PAT-10824'}
              </span>
              <span className="text-[#756A73]">{patientUser?.email || 'eleanor.vance@example.com'}</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Identity Verified
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#442B3B] uppercase tracking-wider text-[11px] mb-1.5">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#756A73] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#442B3B] uppercase tracking-wider text-[11px] mb-1.5">
                Primary Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#756A73] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#442B3B] uppercase tracking-wider text-[11px] mb-1.5">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#756A73] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="date"
                  value={dob.split('T')[0]}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#442B3B] uppercase tracking-wider text-[11px] mb-1.5">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full p-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A]"
              >
                <option value="O+">O Positive (O+)</option>
                <option value="O-">O Negative (O-)</option>
                <option value="A+">A Positive (A+)</option>
                <option value="A-">A Negative (A-)</option>
                <option value="B+">B Positive (B+)</option>
                <option value="B-">B Negative (B-)</option>
                <option value="AB+">AB Positive (AB+)</option>
                <option value="AB-">AB Negative (AB-)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#442B3B] uppercase tracking-wider text-[11px] mb-1.5">
                Allergies & Contraindications
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#442B3B] uppercase tracking-wider text-[11px] mb-1.5">
              Emergency Contact & Relationship
            </label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              className="w-full p-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A]"
            />
          </div>

          {/* HIPAA & Privacy Consent Section */}
          <div className="pt-4 border-t border-[#FAF0F3] space-y-2">
            <h3 className="font-serif text-sm font-bold text-[#442B3B]">
              HIPAA & Electronic Health Record Consent
            </h3>
            <p className="text-[11px] text-[#756A73] leading-relaxed">
              Your patient health records, laboratory orders, and clinical summaries are encrypted under HIPAA and strict healthcare privacy standards. Only authorized Blossom Clinic physicians and care providers assigned to your health journey have clearance to inspect your records.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#70405B] hover:bg-[#442B3B] text-white font-semibold shadow-sm transition-all"
            >
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
