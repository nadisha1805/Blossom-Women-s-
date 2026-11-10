import { useState, useEffect } from 'react';
import { patientPortalApi } from '../../services/patientPortalApi';
import { Bell, Check, Calendar, Activity, Pill, CreditCard, Info } from 'lucide-react';

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await patientPortalApi.getNotifications();
      if (data && data.length > 0) {
        setNotifications(data);
      } else {
        // Fallback demo notifications
        setNotifications([
          {
            id: 'n-1',
            title: 'Welcome to Blossom Patient Portal',
            message: 'Your personal health records, appointment bookings, and prescriptions are now accessible online.',
            category: 'SYSTEM',
            isRead: true,
            createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          },
          {
            id: 'n-2',
            title: 'Diagnostic Report Released',
            message: 'Your Obstetric 3D/4D Morphology Ultrasound report has been finalized by Dr. Jenkins and is ready for download.',
            category: 'LAB',
            isRead: false,
            createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          },
          {
            id: 'n-3',
            title: 'Appointment Reminder',
            message: 'Reminder: You have a scheduled clinical visit tomorrow at 10:30 AM with Dr. Sarah Jenkins.',
            category: 'APPOINTMENT',
            isRead: false,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.warn('Error fetching notifications:', err);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await patientPortalApi.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'APPOINTMENT':
        return <Calendar className="w-4 h-4 text-[#70405B]" />;
      case 'LAB':
        return <Activity className="w-4 h-4 text-amber-600" />;
      case 'PRESCRIPTION':
        return <Pill className="w-4 h-4 text-purple-600" />;
      case 'BILLING':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      default:
        return <Info className="w-4 h-4 text-[#70405B]" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#442B3B]">
            Notifications & Alerts
          </h1>
          <p className="text-xs sm:text-sm text-[#756A73] mt-1">
            Stay informed with clinic updates, appointment reminders, and test results.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E9DFE3]">
            <Bell className="w-12 h-12 text-[#756A73] mx-auto mb-3 opacity-50" />
            <h3 className="font-serif text-base font-bold text-[#442B3B]">No Notifications</h3>
            <p className="text-xs text-[#756A73] mt-1">You are all caught up!</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                notif.isRead
                  ? 'bg-white border-[#E9DFE3] opacity-80'
                  : 'bg-[#FCF8F9] border-[#EBC4CF] shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E9DFE3] flex items-center justify-center shrink-0">
                  {getCategoryIcon(notif.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#442B3B]">{notif.title}</h3>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#70405B]" />
                    )}
                  </div>
                  <p className="text-xs text-[#756A73] mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-[#756A73] mt-2 block font-medium">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {!notif.isRead && (
                <button
                  onClick={() => handleMarkAsRead(notif.id)}
                  title="Mark as read"
                  className="p-1.5 rounded-lg border border-[#E9DFE3] hover:bg-white text-[#70405B] shrink-0"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
