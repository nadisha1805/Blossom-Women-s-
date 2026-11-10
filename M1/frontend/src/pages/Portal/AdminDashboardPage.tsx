import { useState, useEffect } from 'react';
import { portalReportsApi } from '../../services/portalApi';
import {
  Users,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  DollarSign,
  AlertCircle,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const res = await portalReportsApi.getAdminMetrics();
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load clinic overview metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#70405B] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-[#756A73]">Aggregating real-time clinic metrics from database…</p>
        </div>
      </div>
    );
  }

  const m = data?.metrics || {};

  const cards = [
    { label: 'Total Registered Patients', value: m.totalPatients ?? 0, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: "Today's Appointments", value: m.todayAppointments ?? 0, icon: Calendar, color: 'text-[#70405B]', bg: 'bg-[#F7E7EC]' },
    { label: 'Upcoming Consultations', value: m.upcomingAppointments ?? 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed Consultations', value: m.completedConsultations ?? 0, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Web Requests', value: m.pendingRequests ?? 0, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Pending Invoices', value: m.pendingInvoices ?? 0, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Active Clinic Doctors', value: m.totalDoctors ?? 0, icon: UserCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Total Revenue Collected', value: `$${m.totalRevenueCollected ?? 0}`, icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#442B3B]">Clinic Administration</h1>
          <p className="text-xs text-[#756A73] mt-1">Real-time multispecialty operational and clinical summary</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/portal/patients"
            className="px-4 py-2 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            + Register New Patient
          </Link>
          <Link
            to="/portal/appointments"
            className="px-4 py-2 rounded-xl border border-[#E9DFE3] bg-white hover:bg-[#FAF5EF] text-xs font-semibold text-[#442B3B] transition-colors"
          >
            Manage Schedule
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          Notice: {error}. (Ensure database is seeded).
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="p-5 rounded-2xl bg-white border border-[#E9DFE3] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#756A73] font-medium">{c.label}</span>
              <div className={`w-8 h-8 rounded-xl ${c.bg} flex items-center justify-center ${c.color}`}>
                <c.icon size={16} />
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-[#442B3B]">{c.value}</div>
          </div>
        ))}
      </div>

      {/* 2 Column Schedules and Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Schedule */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#442B3B]">Recent Appointments</h2>
              <p className="text-xs text-[#756A73]">Latest consultations and visits booked</p>
            </div>
            <Link to="/portal/appointments" className="text-xs text-[#70405B] font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {(!data?.recentAppointments || data.recentAppointments.length === 0) ? (
              <p className="text-xs text-[#756A73] py-4 text-center">No appointments booked yet.</p>
            ) : (
              data.recentAppointments.map((a: any) => (
                <div key={a.id} className="p-3.5 rounded-2xl bg-[#FAF5EF]/70 border border-[#E9DFE3] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs text-[#442B3B]">{a.patient?.fullName}</strong>
                      <span className="text-[10px] text-[#756A73]">({a.patient?.patientId})</span>
                    </div>
                    <p className="text-[11px] text-[#756A73] mt-0.5">
                      {a.doctor?.name} • <span className="text-[#70405B]">{a.service?.name}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-[#442B3B] block">{a.scheduledTimeSlot}</span>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F7E7EC] text-[#70405B]">
                      {a.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#442B3B]">Recent Patient Registrations</h2>
              <p className="text-xs text-[#756A73]">Newly admitted patients in electronic health record</p>
            </div>
            <Link to="/portal/patients" className="text-xs text-[#70405B] font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {(!data?.recentPatients || data.recentPatients.length === 0) ? (
              <p className="text-xs text-[#756A73] py-4 text-center">No patients registered yet.</p>
            ) : (
              data.recentPatients.map((p: any) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-[#FAF5EF]/70 border border-[#E9DFE3] flex items-center justify-between">
                  <div>
                    <strong className="text-xs text-[#442B3B] block">{p.fullName}</strong>
                    <span className="text-[11px] text-[#756A73]">Phone: {p.phone} • DOB: {new Date(p.dob).toLocaleDateString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-[#70405B]">{p.patientId}</span>
                    <span className="text-[10px] text-[#756A73] block">Blood: {p.bloodGroup || 'N/A'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
