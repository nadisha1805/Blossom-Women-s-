import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { portalAuthApi } from '../../services/portalApi';
import { Lock, Mail, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';

export default function PortalLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/portal';

  const demoAccounts = [
    { label: 'Clinic Admin', email: 'admin@blossomclinic.com', role: 'CLINIC_ADMIN' },
    { label: 'Doctor (Obstetrics/Gyn)', email: 'doctor.priya@blossomclinic.com', role: 'DOCTOR' },
    { label: 'Nurse (RN)', email: 'nurse.sarah@blossomclinic.com', role: 'NURSE' },
    { label: 'Receptionist', email: 'reception@blossomclinic.com', role: 'RECEPTIONIST' },
    { label: 'Lab Technologist', email: 'lab.tech@blossomclinic.com', role: 'LAB_STAFF' },
    { label: 'Billing Staff', email: 'billing@blossomclinic.com', role: 'BILLING_STAFF' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await portalAuthApi.login({ email, password });
      login(res.accessToken, res.user);

      // Role-specific landing redirect
      if (from !== '/portal') {
        navigate(from, { replace: true });
      } else {
        switch (res.user.role) {
          case 'DOCTOR':
            navigate('/portal/doctor', { replace: true });
            break;
          case 'NURSE':
            navigate('/portal/nurse', { replace: true });
            break;
          case 'LAB_STAFF':
            navigate('/portal/lab', { replace: true });
            break;
          case 'BILLING_STAFF':
            navigate('/portal/billing', { replace: true });
            break;
          case 'RECEPTIONIST':
            navigate('/portal/reception', { replace: true });
            break;
          default:
            navigate('/portal/admin', { replace: true });
            break;
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Staff@123');
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Clinic Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-full bg-gradient-to-br from-[#EBC4CF] to-[#70405B] items-center justify-center text-white mb-3 shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21.7C17.3 17 22 13 22 8.5a5.5 5.5 0 0 0-11 0A5.5 5.5 0 0 0 2 8.5C2 13 6.7 17 12 21.7z" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl text-[#442B3B] font-bold">Blossom Clinic Portal</h1>
          <p className="font-sans text-xs tracking-wider uppercase text-[#70405B] font-semibold mt-1">
            Clinical Operations & Staff Gateway
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex gap-2.5 items-start">
              <ShieldAlert size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#442B3B] mb-1.5">
                Staff Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-[#756A73]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@blossomclinic.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9DFE3] text-sm text-[#442B3B] focus:outline-none focus:ring-2 focus:ring-[#70405B]/20 focus:border-[#70405B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#442B3B] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#756A73]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9DFE3] text-sm text-[#442B3B] focus:outline-none focus:ring-2 focus:ring-[#70405B]/20 focus:border-[#70405B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white font-medium text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? 'Authenticating…' : 'Sign In to Portal'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Staff Logins */}
          <div className="mt-8 pt-6 border-t border-[#E9DFE3]">
            <p className="text-xs font-semibold text-[#756A73] mb-3 flex items-center gap-1.5">
              <UserCheck size={14} className="text-[#70405B]" />
              Quick Demo Staff Accounts (Password: <code>Staff@123</code>)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => fillDemo(d.email)}
                  className="p-2 text-left rounded-lg bg-[#FAF5EF] hover:bg-[#F7E7EC] border border-[#E9DFE3] text-[11px] text-[#442B3B] transition-colors"
                >
                  <strong className="block text-[#70405B] truncate">{d.label}</strong>
                  <span className="text-[#756A73] truncate block">{d.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Public site link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-[#70405B] hover:underline font-medium"
          >
            ← Return to Clinic Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
