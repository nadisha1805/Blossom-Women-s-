import { useState, useEffect } from 'react';
import { portalDiagnosticsApi } from '../../services/portalApi';
import { FlaskConical } from 'lucide-react';

export default function LabStaffDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [resultsNotes, setResultsNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await portalDiagnosticsApi.list();
      setOrders(res || []);
      if (res?.length > 0 && !selectedOrder) {
        setSelectedOrder(res[0]);
        setResultsNotes(res[0].resultsNotes || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedOrder) return;
    setSubmitting(true);
    try {
      await portalDiagnosticsApi.update(selectedOrder.id, {
        status,
        resultsNotes,
      });
      loadOrders();
    } catch (err: any) {
      alert(err.message || 'Failed to update order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#442B3B]">Diagnostic & Laboratory Desk</h1>
        <p className="text-xs text-[#756A73] mt-1">
          Sample processing, specimen accessioning, imaging report generation, and pathology results entry
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders list */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-5 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-[#442B3B] flex items-center gap-2 border-b border-[#E9DFE3] pb-3">
            <FlaskConical size={16} className="text-[#70405B]" />
            Diagnostic Orders Queue
          </h2>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="text-xs text-[#756A73] text-center py-4">Loading lab orders…</p>
            ) : orders.length === 0 ? (
              <p className="text-xs text-[#756A73] text-center py-4">No diagnostic orders active.</p>
            ) : (
              orders.map((o) => {
                const isSelected = selectedOrder?.id === o.id;
                return (
                  <div
                    key={o.id}
                    onClick={() => {
                      setSelectedOrder(o);
                      setResultsNotes(o.resultsNotes || '');
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#70405B] bg-[#F7E7EC]/70 shadow-xs'
                        : 'border-[#E9DFE3] bg-[#FAF5EF]/40 hover:bg-[#FAF5EF]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-xs font-semibold text-[#70405B]">{o.orderNumber}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white text-[#70405B] border border-[#E9DFE3]">
                        {o.status}
                      </span>
                    </div>
                    <strong className="text-xs text-[#442B3B] block">{o.testName}</strong>
                    <div className="flex justify-between items-center mt-2 text-[10px] text-[#756A73]">
                      <span>{o.patient?.fullName}</span>
                      <span>Category: {o.testCategory}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Lab Processing Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E9DFE3] p-6 shadow-sm space-y-5">
          {!selectedOrder ? (
            <div className="text-center py-20 text-[#756A73]">
              <FlaskConical size={40} className="mx-auto mb-2 text-[#EBC4CF]" />
              <p className="text-xs">Select an investigation from the left queue to process.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#FAF5EF] border border-[#E9DFE3] flex justify-between items-center">
                <div>
                  <span className="font-mono text-xs font-bold text-[#70405B] bg-[#F7E7EC] px-2 py-0.5 rounded">
                    {selectedOrder.orderNumber}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#442B3B] mt-1">{selectedOrder.testName}</h3>
                  <p className="text-xs text-[#756A73]">
                    Patient: {selectedOrder.patient?.fullName} ({selectedOrder.patient?.patientId}) • Ordered by: Dr.{' '}
                    {selectedOrder.orderingDoctor?.name}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold block text-[#70405B]">{selectedOrder.testCategory}</span>
                  <span className="text-[10px] text-[#756A73]">Status: {selectedOrder.status}</span>
                </div>
              </div>

              {/* Status progression actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleUpdateStatus('SAMPLE_COLLECTED')}
                  className="px-3 py-1.5 rounded-xl border border-[#E9DFE3] bg-[#FAF5EF] hover:bg-[#F7E7EC] text-xs font-semibold text-[#442B3B]"
                >
                  Mark Sample Collected
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleUpdateStatus('PROCESSING')}
                  className="px-3 py-1.5 rounded-xl border border-[#E9DFE3] bg-[#FAF5EF] hover:bg-[#F7E7EC] text-xs font-semibold text-[#442B3B]"
                >
                  Mark In Processing
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleUpdateStatus('COMPLETED')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                >
                  Mark Completed & Upload
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">
                  Findings / Laboratory Notes / Diagnostic Parameters *
                </label>
                <textarea
                  rows={6}
                  value={resultsNotes}
                  onChange={(e) => setResultsNotes(e.target.value)}
                  placeholder="Enter pathology parameters, reference ranges, specimen adequacy, or ultrasound measurement findings…"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E9DFE3] text-xs resize-none"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-[#E9DFE3]">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleUpdateStatus(selectedOrder.status)}
                  className="px-5 py-2.5 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold"
                >
                  Save Findings & Update Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
