import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { patientPortalApi } from '../../services/patientPortalApi';
import {
  Calendar,
  Pill,
  Activity,
  CreditCard,
  PlusCircle,
  Clock,
  User,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function PatientDashboardPage() {
  const { patientUser } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await patientPortalApi.getDashboard();
      setDashboardData(data);
    } catch (err) {
      console.warn('Dashboard fetch fallback to local state:', err);
      // Fallback mock representation for offline display
      setDashboardData({
        patient: {
          fullName: patientUser?.fullName || 'Eleanor Vance',
          patientId: patientUser?.patientId || 'PAT-10824',
          bloodGroup: 'O+',
          allergies: 'Penicillin, Latex (mild)',
        },
        upcomingAppointments: [
          {
            id: 'appt-demo-1',
            appointmentNumber: 'APT-2026-4019',
            scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString(),
            scheduledTimeSlot: '10:30 AM',
            status: 'CONFIRMED',
            reason: 'Third Trimester Ultrasound & Consultation',
            doctor: { name: 'Dr. Sarah Jenkins', specialty: 'Obstetrics & High-Risk Pregnancy' },
            service: { name: 'Prenatal Ultrasound & Check' },
          },
        ],
        recentConsultations: [
          {
            id: 'cons-demo-1',
            createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
            chiefComplaint: 'Routine 24-week gestational screening',
            diagnosis: 'Gestational progress within optimal percentiles',
            treatmentPlan: 'Maintain prenatal multivitamins with DHA, continue moderate walking.',
            doctor: { name: 'Dr. Sarah Jenkins' },
          },
        ],
        activePrescriptions: [
          {
            id: 'rx-demo-1',
            prescriptionNumber: 'RX-2026-8812',
            issuedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
            doctor: { fullName: 'Dr. Sarah Jenkins' },
            items: [
              {
                medicationName: 'Prenatal Multivitamin with DHA',
                dosage: '1 Softgel',
                frequency: 'Once daily after breakfast',
                duration: '60 days',
              },
              {
                medicationName: 'Elemental Iron (Ferrous Fumarate)',
                dosage: '100mg',
                frequency: 'Once every night with citrus water',
                duration: '30 days',
              },
            ],
          },
        ],
        diagnosticReports: [
          {
            id: 'diag-demo-1',
            testName: 'Complete Blood Count & Serum Ferritin',
            status: 'COMPLETED',
            resultSummary: 'Hemoglobin 12.2 g/dL, Ferritin 48 ng/mL (Normal)',
            orderedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
          },
        ],
        pendingInvoices: [
          {
            id: 'inv-demo-1',
            invoiceNumber: 'INV-2026-1049',
            total: 120,
            balance: 120,
            dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
          },
        ],
        totalOutstandingBalance: 120,
        notifications: [
          {
            id: 'n-1',
            title: 'Diagnostic Report Released',
            message: 'Your Complete Blood Count & Serum Ferritin report is now available for review.',
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
  };

  const patient = dashboardData?.patient || {};
  const upcomingAppointments = dashboardData?.upcomingAppointments || [];
  const recentConsultations = dashboardData?.recentConsultations || [];
  const activePrescriptions = dashboardData?.activePrescriptions || [];
  const pendingInvoices = dashboardData?.pendingInvoices || [];
  const totalBalance = dashboardData?.totalOutstandingBalance || 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          1. WELCOME BANNER & HEALTH SUMMARY
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#70405B] to-[#442B3B] rounded-3xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-rose-200 text-xs font-semibold mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Patient Health Account
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {patientUser?.fullName || patient?.fullName || 'Patient'}
            </h1>
            <p className="text-xs sm:text-sm text-rose-100/90 mt-1.5 max-w-xl leading-relaxed">
              Here is your centralized medical overview, upcoming care visits, released prescriptions, and payment portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/patient/appointments"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#70405B] hover:bg-rose-50 text-xs font-semibold shadow-sm transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4 text-[#70405B]" />
              Book Appointment
            </Link>
            <Link
              to="/patient/billing"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all duration-200"
            >
              <CreditCard className="w-4 h-4" />
              Pay Invoices
            </Link>
          </div>
        </div>

        {/* Clinical Baseline strip */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap gap-4 sm:gap-8 text-xs">
          <div>
            <span className="text-rose-200 block text-[10px] uppercase tracking-wider">Patient File ID</span>
            <span className="font-mono font-bold">{patientUser?.patientId || patient?.patientId || 'PAT-10824'}</span>
          </div>
          <div>
            <span className="text-rose-200 block text-[10px] uppercase tracking-wider">Blood Group</span>
            <span className="font-semibold">{patient?.bloodGroup || 'O Positive (O+)'}</span>
          </div>
          <div>
            <span className="text-rose-200 block text-[10px] uppercase tracking-wider">Known Allergies</span>
            <span className="font-semibold text-rose-200">{patient?.allergies || 'Penicillin, Latex'}</span>
          </div>
          <div>
            <span className="text-rose-200 block text-[10px] uppercase tracking-wider">Status</span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" /> EMR Active
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. METRIC SUMMARY CARDS
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Visit */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9DFE3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#756A73]">Next Visit</span>
            <div className="text-xl font-bold font-serif text-[#442B3B] mt-1">
              {upcomingAppointments.length > 0
                ? new Date(upcomingAppointments[0].scheduledDate).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                : 'None Scheduled'}
            </div>
            <span className="text-[11px] text-[#70405B] mt-0.5 block font-medium">
              {upcomingAppointments.length > 0 ? upcomingAppointments[0].scheduledTimeSlot : 'Book when ready'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#70405B] flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9DFE3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#756A73]">Active Rx</span>
            <div className="text-xl font-bold font-serif text-[#442B3B] mt-1">
              {activePrescriptions.length} Digital Orders
            </div>
            <Link to="/patient/prescriptions" className="text-[11px] text-[#70405B] hover:underline mt-0.5 block font-medium">
              View instructions →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Pill className="w-6 h-6" />
          </div>
        </div>

        {/* Diagnostic Reports */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9DFE3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#756A73]">Lab Reports</span>
            <div className="text-xl font-bold font-serif text-[#442B3B] mt-1">
              Released
            </div>
            <Link to="/patient/reports" className="text-[11px] text-[#70405B] hover:underline mt-0.5 block font-medium">
              View latest tests →
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        {/* Outstanding Balance */}
        <div className="bg-white p-5 rounded-2xl border border-[#E9DFE3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#756A73]">Balance Due</span>
            <div className="text-xl font-bold font-serif text-[#442B3B] mt-1">
              ${Number(totalBalance).toFixed(2)}
            </div>
            <Link to="/patient/billing" className="text-[11px] font-semibold text-rose-700 hover:underline mt-0.5 block">
              {totalBalance > 0 ? 'Pay online now →' : 'No balance due'}
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. UPCOMING APPOINTMENTS & QUICK ACTIONS
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Upcoming Visits & Recent Summaries */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9DFE3] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#442B3B]">Upcoming Appointments</h2>
                <p className="text-xs text-[#756A73]">Confirmed visits and pending scheduling requests</p>
              </div>
              <Link
                to="/patient/appointments"
                className="text-xs font-semibold text-[#70405B] hover:underline flex items-center gap-1"
              >
                All Visits <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {upcomingAppointments.length === 0 ? (
              <div className="py-8 text-center bg-[#FAF5EF]/60 rounded-2xl border border-dashed border-[#E9DFE3]">
                <Calendar className="w-8 h-8 text-[#756A73] mx-auto mb-2 opacity-60" />
                <p className="text-xs text-[#756A73]">No appointments currently scheduled.</p>
                <Link
                  to="/patient/appointments"
                  className="mt-3 inline-block px-4 py-2 bg-[#70405B] text-white text-xs font-semibold rounded-xl"
                >
                  Schedule Your Visit
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingAppointments.map((appt: any) => (
                  <div
                    key={appt.id}
                    className="p-4 rounded-2xl bg-[#FCF8F9] border border-[#FAF0F3] hover:border-[#EBC4CF] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#EBC4CF] flex flex-col items-center justify-center shrink-0 text-[#70405B]">
                        <span className="text-[10px] font-bold uppercase leading-none">
                          {new Date(appt.scheduledDate).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="font-serif font-bold text-sm leading-tight">
                          {new Date(appt.scheduledDate).getDate()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#442B3B]">
                            {appt.service?.name || 'Clinical Consultation'}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              appt.status === 'CONFIRMED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {appt.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#756A73] mt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#70405B]" /> {appt.scheduledTimeSlot}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-[#70405B]" /> {appt.doctor?.name || 'Dr. Jenkins'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        to="/patient/appointments"
                        className="px-3 py-1.5 rounded-lg border border-[#E9DFE3] text-[11px] font-semibold text-[#70405B] hover:bg-white transition-colors"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Consultation Summaries */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9DFE3] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#442B3B]">Released Medical Records</h2>
                <p className="text-xs text-[#756A73]">Doctor clinical summaries and care recommendations</p>
              </div>
              <Link
                to="/patient/consultations"
                className="text-xs font-semibold text-[#70405B] hover:underline flex items-center gap-1"
              >
                Full History <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentConsultations.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#756A73]">No clinical notes released yet.</div>
            ) : (
              <div className="space-y-3">
                {recentConsultations.map((cons: any) => (
                  <div key={cons.id} className="p-4 rounded-2xl border border-[#E9DFE3] bg-[#FAF5EF]/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#442B3B]">{cons.doctor?.name || 'Attending Physician'}</span>
                      <span className="text-[11px] text-[#756A73]">
                        {new Date(cons.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {cons.diagnosis && (
                      <p className="text-xs text-[#38343A] leading-relaxed">
                        <strong className="text-[#70405B]">Diagnosis:</strong> {cons.diagnosis}
                      </p>
                    )}
                    {cons.treatmentPlan && (
                      <p className="text-xs text-[#756A73] leading-relaxed">
                        <strong className="text-[#442B3B]">Plan:</strong> {cons.treatmentPlan}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Digital Prescriptions & Billing Quick Pay */}
        <div className="space-y-6">
          {/* Active Prescriptions Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9DFE3] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-base font-bold text-[#442B3B]">Current Prescriptions</h2>
              <Link to="/patient/prescriptions" className="text-xs text-[#70405B] font-semibold hover:underline">
                View All
              </Link>
            </div>
            {activePrescriptions.length === 0 ? (
              <p className="text-xs text-[#756A73] py-4">No active prescriptions.</p>
            ) : (
              <div className="space-y-3">
                {activePrescriptions[0]?.items?.map((med: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-xs">
                    <div className="font-bold text-[#442B3B]">{med.medicationName}</div>
                    <div className="text-[11px] text-purple-900 mt-0.5">
                      {med.dosage} • {med.frequency}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Pay / Invoices Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9DFE3] shadow-sm">
            <h2 className="font-serif text-base font-bold text-[#442B3B] mb-2">Billing & Invoices</h2>
            <p className="text-xs text-[#756A73] mb-4">
              Pay clinic invoices securely using credit card, debit card, or UPI online gateway.
            </p>
            {pendingInvoices.length > 0 ? (
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-[#EBC4CF] mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-[#70405B]">{pendingInvoices[0].invoiceNumber}</span>
                  <span className="font-bold text-[#442B3B]">${Number(pendingInvoices[0].balance).toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-[#756A73]">Due: {new Date(pendingInvoices[0].dueDate).toLocaleDateString()}</div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                All invoices settled in full.
              </div>
            )}
            <Link
              to="/patient/billing"
              className="w-full py-2.5 px-4 rounded-xl bg-[#70405B] hover:bg-[#442B3B] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Manage Invoices & Pay
            </Link>
          </div>

          {/* Support Ticket Quick Link */}
          <div className="bg-[#FAF5EF] rounded-3xl p-6 border border-[#E9DFE3]">
            <h3 className="font-serif text-sm font-bold text-[#442B3B] mb-1">Need Clinical Advice?</h3>
            <p className="text-xs text-[#756A73] mb-3 leading-relaxed">
              Have questions about your prescription or upcoming procedure? Open a direct inquiry.
            </p>
            <Link
              to="/patient/support"
              className="text-xs font-semibold text-[#70405B] hover:underline flex items-center gap-1"
            >
              Contact Care Team →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
