import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  Activity,
  CreditCard,
  Bell,
  LifeBuoy,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Heart,
  ChevronRight,
} from 'lucide-react';

export default function PatientLayout() {
  const { patientUser, patientLogout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    patientLogout();
    navigate('/patient/login');
  };

  const navItems = [
    { label: 'Overview', to: '/patient/dashboard', icon: LayoutDashboard },
    { label: 'My Appointments', to: '/patient/appointments', icon: Calendar },
    { label: 'Medical Records', to: '/patient/consultations', icon: FileText },
    { label: 'Prescriptions', to: '/patient/prescriptions', icon: Pill },
    { label: 'Lab Reports', to: '/patient/reports', icon: Activity },
    { label: 'Billing & Invoices', to: '/patient/billing', icon: CreditCard },
    { label: 'Notifications', to: '/patient/notifications', icon: Bell },
    { label: 'Help & Support', to: '/patient/support', icon: LifeBuoy },
    { label: 'My Profile', to: '/patient/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex flex-col md:flex-row text-[#38343A]">
      {/* ─────────────────────────────────────────────────────────────
          SIDEBAR (Desktop)
         ───────────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E9DFE3] shrink-0 sticky top-0 h-screen">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E9DFE3] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#70405B] to-[#442B3B] flex items-center justify-center text-white shadow-sm">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <div className="font-serif text-sm font-bold text-[#442B3B] tracking-tight leading-tight">
                Blossom Health
              </div>
              <div className="text-[10px] tracking-widest text-[#756A73] uppercase font-semibold">
                Patient Portal
              </div>
            </div>
          </Link>
        </div>

        {/* Patient Pill */}
        <div className="px-5 py-4 border-b border-[#FAF0F3] bg-[#FCF8F9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBC4CF]/50 text-[#70405B] font-serif font-bold text-base flex items-center justify-center border border-[#EBC4CF]">
              {patientUser?.fullName ? patientUser.fullName.charAt(0).toUpperCase() : 'P'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-[#442B3B] truncate">
                {patientUser?.fullName || 'Patient'}
              </div>
              <div className="text-[10px] font-mono font-medium text-[#70405B] bg-rose-50/80 px-1.5 py-0.5 rounded w-fit mt-0.5 border border-[#EBC4CF]/40">
                {patientUser?.patientId || 'PATIENT'}
              </div>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#70405B] text-white shadow-sm font-semibold'
                      : 'text-[#756A73] hover:text-[#442B3B] hover:bg-rose-50/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#756A73]'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E9DFE3] space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#756A73] hover:text-[#70405B] transition-colors rounded-lg hover:bg-rose-50/50 font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Clinic Main Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-700 hover:text-rose-800 transition-colors rounded-lg hover:bg-rose-50 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE TOPBAR
         ───────────────────────────────────────────────────────────── */}
      <div className="md:hidden bg-white border-b border-[#E9DFE3] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Link to="/patient/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#70405B] flex items-center justify-center text-white">
            <Heart className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-sm text-[#442B3B]">Blossom Portal</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg border border-[#E9DFE3] text-[#70405B]"
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E9DFE3] px-4 py-3 space-y-1 shadow-lg z-20">
          <div className="pb-3 border-b border-[#E9DFE3] mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#442B3B]">{patientUser?.fullName}</span>
            <span className="text-[10px] font-mono text-[#70405B] bg-rose-50 px-2 py-0.5 rounded">
              {patientUser?.patientId}
            </span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium ${
                    isActive ? 'bg-[#70405B] text-white font-semibold' : 'text-[#756A73]'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
          <div className="pt-2 border-t border-[#E9DFE3] flex justify-between">
            <Link to="/" className="text-xs text-[#756A73] py-1.5">
              Clinic Website
            </Link>
            <button onClick={handleLogout} className="text-xs font-bold text-rose-700 py-1.5">
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA
         ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto min-h-screen pb-12">
        <Outlet />
      </main>
    </div>
  );
}

