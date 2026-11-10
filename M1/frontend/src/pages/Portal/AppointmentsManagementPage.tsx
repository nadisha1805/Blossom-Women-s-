import { useState, useEffect } from 'react';
import {
  portalAppointmentsApi,
  portalPatientsApi,
  clinicDirectoryApi,
} from '../../services/portalApi';
import { Calendar, Plus, UserCheck, AlertCircle } from 'lucide-react';

export default function AppointmentsManagementPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'schedule' | 'requests'>('schedule');

  // Booking Modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [bookingForm, setBookingForm] = useState({
    patientId: '',
    doctorId: '',
    serviceId: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTimeSlot: '10:00 AM',
    reason: '',
    appointmentRequestId: '',
  });
  const [bookingError, setBookingError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [appts, reqs, docs, srvs, pats] = await Promise.all([
        portalAppointmentsApi.list(),
        portalAppointmentsApi.getPendingRequests(),
        clinicDirectoryApi.getDoctors(),
        clinicDirectoryApi.getServices(),
        portalPatientsApi.list({ limit: 100 }),
      ]);
      setAppointments(appts || []);
      setPendingRequests(reqs || []);
      setDoctors(docs || []);
      setServices(srvs || []);
      setPatients(pats.items || []);

      if (docs?.length > 0 && !bookingForm.doctorId) {
        setBookingForm((prev) => ({
          ...prev,
          doctorId: docs[0].id,
          serviceId: srvs[0]?.id || '',
        }));
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await portalAppointmentsApi.updateStatus(id, newStatus);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Status transition failed');
    }
  };

  const handleOpenConvert = (req: any) => {
    // Attempt match patient by phone or name
    const matchedPat = patients.find(
      (p) => p.phone === req.phone || p.fullName.toLowerCase() === req.patientName.toLowerCase(),
    );

    setBookingForm({
      patientId: matchedPat?.id || (patients[0]?.id ?? ''),
      doctorId: req.preferredDoctorId || (doctors[0]?.id ?? ''),
      serviceId: req.serviceId || (services[0]?.id ?? ''),
      scheduledDate: new Date(req.preferredDate).toISOString().split('T')[0],
      scheduledTimeSlot: req.preferredTime?.includes('Morning') ? '10:00 AM' : '02:30 PM',
      reason: req.reason || '',
      appointmentRequestId: req.id,
    });
    setShowBookingModal(true);
  };

  const handleSaveBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');
    setSubmitting(true);

    try {
      await portalAppointmentsApi.createBooking(bookingForm);
      setShowBookingModal(false);
      setBookingForm({
        patientId: patients[0]?.id || '',
        doctorId: doctors[0]?.id || '',
        serviceId: services[0]?.id || '',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTimeSlot: '10:00 AM',
        reason: '',
        appointmentRequestId: '',
      });
      loadData();
      setActiveTab('schedule');
    } catch (err: any) {
      setBookingError(err.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#442B3B]">Appointments Management</h1>
          <p className="text-xs text-[#756A73] mt-1">
            Doctor availability, schedule coordination, walk-ins, and incoming request confirmations
          </p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus size={16} /> New Appointment Booking
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E9DFE3] gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors border-b-2 ${
            activeTab === 'schedule'
              ? 'border-[#70405B] text-[#70405B]'
              : 'border-transparent text-[#756A73] hover:text-[#442B3B]'
          }`}
        >
          <Calendar size={15} />
          Scheduled Appointments ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 flex items-center gap-2 cursor-pointer transition-colors border-b-2 ${
            activeTab === 'requests'
              ? 'border-[#70405B] text-[#70405B]'
              : 'border-transparent text-[#756A73] hover:text-[#442B3B]'
          }`}
        >
          <AlertCircle size={15} className="text-rose-500" />
          Pending Website Requests ({pendingRequests.length})
        </button>
      </div>

      {/* TAB 1: SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-3xl border border-[#E9DFE3] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF5EF] text-[#756A73] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Appt #</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Doctor & Specialty</th>
                  <th className="py-3 px-4">Date & Time Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9DFE3]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#756A73]">Loading clinic appointments…</td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#756A73]">No scheduled appointments found.</td>
                  </tr>
                ) : (
                  appointments.map((a) => (
                    <tr key={a.id} className="hover:bg-[#FAF5EF]/50">
                      <td className="py-3 px-4 font-mono font-semibold text-[#70405B]">{a.appointmentNumber}</td>
                      <td className="py-3 px-4">
                        <strong className="block text-[#442B3B]">{a.patient?.fullName}</strong>
                        <span className="text-[10px] text-[#756A73] font-mono">{a.patient?.patientId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#442B3B]">{a.doctor?.name}</span>
                        <span className="block text-[10px] text-[#70405B]">{a.service?.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#442B3B]">{a.scheduledTimeSlot}</div>
                        <div className="text-[10px] text-[#756A73]">{new Date(a.scheduledDate).toLocaleDateString()}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F7E7EC] text-[#70405B]">
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          {a.status === 'CONFIRMED' && (
                            <button
                              onClick={() => handleUpdateStatus(a.id, 'CHECKED_IN')}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded text-[10px] font-semibold"
                            >
                              Check In
                            </button>
                          )}
                          {a.status === 'CHECKED_IN' && (
                            <button
                              onClick={() => handleUpdateStatus(a.id, 'IN_CONSULTATION')}
                              className="px-2 py-1 bg-[#F7E7EC] text-[#70405B] hover:bg-[#EBC4CF] border border-[#E9DFE3] rounded text-[10px] font-semibold"
                            >
                              Call to Desk
                            </button>
                          )}
                          {a.status !== 'COMPLETED' && a.status !== 'CANCELLED' && (
                            <button
                              onClick={() => handleUpdateStatus(a.id, 'CANCELLED')}
                              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-[10px]"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PENDING WEBSITE REQUESTS */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl border border-[#E9DFE3] overflow-hidden shadow-sm">
          <div className="p-4 bg-[#FAF5EF]/50 border-b border-[#E9DFE3] text-xs text-[#756A73]">
            Incoming public appointment enquiries submitted via the website form awaiting confirmation and assignment.
          </div>
          <div className="divide-y divide-[#E9DFE3]">
            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#756A73]">No pending requests right now.</div>
            ) : (
              pendingRequests.map((req) => (
                <div key={req.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#70405B] bg-[#F7E7EC] px-2 py-0.5 rounded">
                        {req.referenceId}
                      </span>
                      <strong className="text-sm text-[#442B3B]">{req.patientName}</strong>
                    </div>
                    <p className="text-xs text-[#756A73]">
                      Phone: {req.phone} • Email: {req.email}
                    </p>
                    <p className="text-xs text-[#442B3B]">
                      Service: <span className="font-semibold text-[#70405B]">{req.service?.name}</span> • Pref. Doctor: {req.preferredDoctor?.name || 'Any'}
                    </p>
                    <p className="text-[11px] text-[#756A73]">
                      Requested Date: {new Date(req.preferredDate).toLocaleDateString()} ({req.preferredTime || 'No preference'})
                    </p>
                    {req.reason && <p className="text-xs italic text-[#756A73]">Note: "{req.reason}"</p>}
                  </div>
                  <div>
                    <button
                      onClick={() => handleOpenConvert(req)}
                      className="px-3 py-1.5 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <UserCheck size={14} /> Assign & Confirm Booking
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-[#E9DFE3]">
            <h2 className="font-serif text-2xl font-bold text-[#442B3B] mb-1">Book / Confirm Appointment</h2>
            <p className="text-xs text-[#756A73] mb-4">Verifies doctor availability and creates active clinic appointment</p>

            {bookingError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {bookingError}
              </div>
            )}

            <form onSubmit={handleSaveBooking} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Patient *</label>
                <select
                  required
                  value={bookingForm.patientId}
                  onChange={(e) => setBookingForm({ ...bookingForm, patientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                >
                  <option value="">Select registered patient…</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.patientId} - {p.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Assigned Doctor *</label>
                  <select
                    required
                    value={bookingForm.doctorId}
                    onChange={(e) => setBookingForm({ ...bookingForm, doctorId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Service *</label>
                  <select
                    required
                    value={bookingForm.serviceId}
                    onChange={(e) => setBookingForm({ ...bookingForm, serviceId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Scheduled Date *</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.scheduledDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, scheduledDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Time Slot *</label>
                  <select
                    required
                    value={bookingForm.scheduledTimeSlot}
                    onChange={(e) => setBookingForm({ ...bookingForm, scheduledTimeSlot: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Reason / Clinical Note</label>
                <input
                  type="text"
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                  placeholder="e.g. Follow-up consultation or annual exam"
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs focus:ring-1 focus:ring-[#70405B]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E9DFE3]">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E9DFE3] text-xs font-semibold text-[#756A73] hover:bg-[#FAF5EF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold"
                >
                  {submitting ? 'Confirming…' : 'Confirm & Save Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
