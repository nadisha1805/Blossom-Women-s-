import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Activity,
  FlaskConical,
  CreditCard,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function PortalLayout() {
  const { user, logout, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  const navItems = [
    {
      label: 'Admin Overview',
      to: '/portal/admin',
      icon: LayoutDashboard,
      roles: ['SUPER_ADMIN', 'CLINIC_ADMIN'],
    },
    {
      label: 'Doctor Desk & EMR',
      to: '/portal/doctor',
      icon: Stethoscope,
      roles: ['SUPER_ADMIN', 'CLINIC_ADMIN', 'DOCTOR'],
    },
    {
      label: 'Nurse Desk & Vitals',
      to: '/portal/nurse',
      icon: Activity,
      roles: ['SUPER_ADMIN', 'CLINIC_ADMIN', 'NURSE'],
    },
    {
      label: 'Patients Directory',
      to: '/portal/patients',
      icon: Users,
      roles: ['SUPER_ADMIN', 'CLINIC_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
    },
    {
      label: 'Appointments & Requests',
      to: '/portal/appointments',
      icon: Calendar,
      roles: ['SUPER_ADMIN', 'CLINIC_ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST'],
    },
    {
      label: 'Laboratory & Orders',
      to: '/portal/lab',
      icon: FlaskConical,
      roles: ['SUPER_ADMIN', 'CLINIC_ADMIN', 'LAB_STAFF', 'DOCTOR'],
    },
    {
      label: 'Billing & Invoices',
      to: '/portal/billing',
      icon: CreditCard,
      roles: ['SUPER_ADMIN', 'CLINIC_ADMIN', 'BILLING_STAFF', 'RECEPTIONIST'],
    },
  ];

  const visibleNav = navItems.filter((item) => hasRole(...(item.roles as any)));

  return (
    <div className="min-h-screen bg-[#FAF5EF] flex font-sans text-[#442B3B]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E9DFE3] flex flex-col flex-shrink-0">
        {/* Brand */}
        <div className="p-6 border-b border-[#E9DFE3]">
          <Link to="/portal" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EBC4CF] to-[#70405B] flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.7C17.3 17 22 13 22 8.5a5.5 5.5 0 0 0-11 0A5.5 5.5 0 0 0 2 8.5C2 13 6.7 17 12 21.7z" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#442B3B] block leading-tight">Blossom Clinic</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#70405B] block">Management System</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold text-[#756A73]/70 uppercase tracking-wider mb-2">
            Clinical Workflows
          </p>
          {visibleNav.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F7E7EC] text-[#70405B] font-semibold'
                    : 'text-[#756A73] hover:bg-[#FAF5EF] hover:text-[#442B3B]'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-[#70405B]' : 'text-[#756A73]'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Public Website Shortcut */}
        <div className="p-4 border-t border-[#E9DFE3]">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs text-[#756A73] hover:text-[#70405B] hover:bg-[#FAF5EF] rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              Public Clinic Site
            </span>
            <ChevronRight size={14} />
          </a>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-[#E9DFE3] bg-[#FAF5EF]/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#EBC4CF] flex items-center justify-center text-[#70405B] font-bold text-xs">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#442B3B] truncate">{user?.fullName}</p>
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#F7E7EC] text-[#70405B]">
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-1.5 px-3 rounded-lg border border-[#E9DFE3] bg-white text-xs text-[#756A73] hover:text-red-700 hover:border-red-200 hover:bg-red-50 font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-[#E9DFE3] px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[#756A73]">
            <ShieldCheck size={16} className="text-[#70405B]" />
            <span>Authorized Clinical Gateway</span>
            <span className="text-[#E9DFE3]">|</span>
            <span className="font-medium text-[#442B3B]">{user?.role}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-[#756A73]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>PostgreSQL & API Online</span>
            </div>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
