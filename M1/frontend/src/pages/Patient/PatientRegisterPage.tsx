import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { patientAuthApi } from '../../services/patientPortalApi';
import { Heart, Lock, Mail, User, Phone, Calendar, ArrowRight, AlertCircle } from 'lucide-react';

export default function PatientRegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('1995-05-12');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { patientLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('Please acknowledge the HIPAA & Electronic Health Record consent to proceed.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await patientAuthApi.register({
        fullName,
        email,
        phone,
        dob,
        password,
      });
      patientLogin(res.accessToken, res.patient);
      navigate('/patient/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please review your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#70405B] to-[#442B3B] flex items-center justify-center text-white shadow-md">
              <Heart className="w-6 h-6 fill-white/20" />
            </div>
          </Link>
        </div>
        <h2 className="mt-4 text-center font-serif text-3xl font-bold tracking-tight text-[#442B3B]">
          Create Patient Account
        </h2>
        <p className="mt-2 text-center text-xs text-[#756A73]">
          Connect your clinical records, book doctor visits, view prescriptions, and pay bills online.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-sm rounded-3xl border border-[#E9DFE3] sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-700 leading-relaxed font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#442B3B] uppercase tracking-wider mb-1.5">
                Full Legal Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#756A73]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B] focus:ring-1 focus:ring-[#70405B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#442B3B] uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#756A73]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B] focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#442B3B] uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#756A73]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B] focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#442B3B] uppercase tracking-wider mb-1.5">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#756A73]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B] focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#442B3B] uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#756A73]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF5EF]/50 border border-[#E9DFE3] rounded-xl text-xs text-[#38343A] focus:outline-none focus:border-[#70405B] focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#E9DFE3] text-[#70405B] focus:ring-[#70405B]"
                />
                <span className="text-[11px] text-[#756A73] leading-relaxed">
                  I consent to electronic health records management and certify that the details provided match my medical records with Blossom Women's Health Clinic.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-4 rounded-xl bg-[#70405B] hover:bg-[#442B3B] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register Patient Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-xs text-[#756A73]">Already have an account? </span>
            <Link
              to="/patient/login"
              className="text-xs font-bold text-[#70405B] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
