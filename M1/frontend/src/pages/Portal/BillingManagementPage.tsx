import { useState, useEffect } from 'react';
import { portalBillingApi, portalPatientsApi } from '../../services/portalApi';
import { CreditCard, DollarSign, Plus, FileText } from 'lucide-react';

export default function BillingManagementPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // New Invoice Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [discount] = useState<number>(0);
  const [tax] = useState<number>(0);
  const [lineItems, setLineItems] = useState<any[]>([
    { description: 'Specialist Consultation Fee', unitPrice: 75, quantity: 1 },
  ]);

  // Payment Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [transactionRef, setTransactionRef] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      setLoading(true);
      const [invs, pats] = await Promise.all([
        portalBillingApi.listInvoices(),
        portalPatientsApi.list({ limit: 100 }),
      ]);
      setInvoices(invs || []);
      setPatients(pats.items || []);
      if (invs?.length > 0 && !selectedInvoice) {
        setSelectedInvoice(invs[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await portalBillingApi.createInvoice({
        patientId: selectedPatientId,
        discount: discount ? Number(discount) : 0,
        tax: tax ? Number(tax) : 0,
        items: lineItems.map((it) => ({
          ...it,
          unitPrice: Number(it.unitPrice),
          quantity: Number(it.quantity || 1),
        })),
      });

      setShowCreateModal(false);
      loadBillingData();
    } catch (err: any) {
      alert(err.message || 'Failed to create invoice');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || !paymentAmount) return;
    setSubmitting(true);

    try {
      await portalBillingApi.recordPayment({
        invoiceId: selectedInvoice.id,
        amount: Number(paymentAmount),
        paymentMethod: paymentMethod as any,
        transactionRef,
      });

      setShowPaymentModal(false);
      setPaymentAmount('');
      setTransactionRef('');
      loadBillingData();
      // reload selected invoice
      const updated = await portalBillingApi.getInvoice(selectedInvoice.id);
      setSelectedInvoice(updated);
    } catch (err: any) {
      alert(err.message || 'Payment submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: 'Laboratory / Scan Investigation', unitPrice: 45, quantity: 1 }]);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#442B3B]">Billing & Invoicing Desk</h1>
          <p className="text-xs text-[#756A73] mt-1">
            Consultation charges, diagnostic fees, payment receipts, partial settlements, and ledger records
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus size={16} /> Generate Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices List */}
        <div className="bg-white rounded-3xl border border-[#E9DFE3] p-5 shadow-sm space-y-4">
          <h2 className="font-serif text-base font-bold text-[#442B3B] flex items-center gap-2 border-b border-[#E9DFE3] pb-3">
            <FileText size={16} className="text-[#70405B]" />
            Clinic Invoices ({invoices.length})
          </h2>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
            {loading ? (
              <p className="text-xs text-[#756A73] text-center py-4">Loading invoices…</p>
            ) : invoices.length === 0 ? (
              <p className="text-xs text-[#756A73] text-center py-4">No invoices created yet.</p>
            ) : (
              invoices.map((inv) => {
                const isSelected = selectedInvoice?.id === inv.id;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedInvoice(inv)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#70405B] bg-[#F7E7EC]/70 shadow-xs'
                        : 'border-[#E9DFE3] bg-[#FAF5EF]/40 hover:bg-[#FAF5EF]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono text-xs font-bold text-[#70405B]">{inv.invoiceNumber}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <strong className="text-xs text-[#442B3B] block">{inv.patient?.fullName}</strong>
                    <div className="flex justify-between items-center mt-2 text-[10px] text-[#756A73]">
                      <span>Total: ${Number(inv.total).toFixed(2)}</span>
                      <span className="font-bold text-[#442B3B]">Bal: ${Number(inv.balance).toFixed(2)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Invoice Detail / Payment Terminal */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E9DFE3] p-6 shadow-sm space-y-5">
          {!selectedInvoice ? (
            <div className="text-center py-20 text-[#756A73]">
              <CreditCard size={40} className="mx-auto mb-2 text-[#EBC4CF]" />
              <p className="text-xs">Select an invoice from the left queue to view details or collect payment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="p-4 rounded-2xl bg-[#FAF5EF] border border-[#E9DFE3] flex justify-between items-center">
                <div>
                  <span className="font-mono text-xs font-bold text-[#70405B] bg-[#F7E7EC] px-2 py-0.5 rounded">
                    {selectedInvoice.invoiceNumber}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#442B3B] mt-1">{selectedInvoice.patient?.fullName}</h3>
                  <p className="text-xs text-[#756A73]">
                    Patient ID: {selectedInvoice.patient?.patientId} • Date: {new Date(selectedInvoice.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold font-serif text-[#442B3B] block">
                    ${Number(selectedInvoice.total).toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-rose-700">
                    Outstanding: ${Number(selectedInvoice.balance).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#70405B] mb-2">Itemized Charges</h4>
                <div className="border border-[#E9DFE3] rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#FAF5EF] text-[#756A73] uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3">Unit Price</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9DFE3]">
                      {selectedInvoice.items?.map((it: any) => (
                        <tr key={it.id}>
                          <td className="py-2.5 px-3 text-[#442B3B]">{it.description}</td>
                          <td className="py-2.5 px-3 text-[#756A73]">{it.quantity}</td>
                          <td className="py-2.5 px-3 text-[#756A73]">${Number(it.unitPrice).toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-right font-medium text-[#442B3B]">
                            ${Number(it.totalPrice).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment History */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#70405B] mb-2">Payment Receipts</h4>
                {selectedInvoice.payments?.length === 0 ? (
                  <p className="text-xs text-[#756A73]">No payments recorded on this invoice yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedInvoice.payments?.map((pay: any) => (
                      <div key={pay.id} className="p-3 rounded-xl bg-[#EEF3EC] border border-[#B9CBB7]/50 text-xs flex justify-between items-center">
                        <div>
                          <strong className="text-[#442B3B] block">{pay.receiptNumber}</strong>
                          <span className="text-[10px] text-[#756A73]">
                            Method: {pay.paymentMethod} • Date: {new Date(pay.paidAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="font-bold text-emerald-800 text-sm">${Number(pay.amount).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment CTA */}
              {Number(selectedInvoice.balance) > 0 && (
                <div className="flex justify-end pt-3 border-t border-[#E9DFE3]">
                  <button
                    onClick={() => {
                      setPaymentAmount(Number(selectedInvoice.balance));
                      setShowPaymentModal(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <DollarSign size={16} /> Collect Payment / Issue Receipt
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-[#E9DFE3]">
            <h2 className="font-serif text-2xl font-bold text-[#442B3B] mb-1">Record Payment</h2>
            <p className="text-xs text-[#756A73] mb-4">
              Invoice #{selectedInvoice.invoiceNumber} • Outstanding: ${Number(selectedInvoice.balance).toFixed(2)}
            </p>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Payment Amount ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  max={Number(selectedInvoice.balance)}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value ? Number(e.target.value) : '')}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs font-bold text-[#442B3B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                >
                  <option value="CARD">Debit / Credit Card</option>
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI / Instant Transfer</option>
                  <option value="INSURANCE">Insurance Settlement</option>
                  <option value="BANK_TRANSFER">Bank Wire / Electronic</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Transaction Reference (Optional)</label>
                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="POS auth code or wire ref"
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E9DFE3]">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E9DFE3] text-xs font-semibold text-[#756A73]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold"
                >
                  {submitting ? 'Recording…' : 'Confirm Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-[#E9DFE3]">
            <h2 className="font-serif text-2xl font-bold text-[#442B3B] mb-1">Generate Clinic Invoice</h2>
            <p className="text-xs text-[#756A73] mb-4">Calculates total, tax, and itemized ledger line items</p>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#442B3B] mb-1">Patient *</label>
                <select
                  required
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E9DFE3] text-xs"
                >
                  <option value="">Select patient…</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.patientId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-[#442B3B]">Itemized Services / Charges</label>
                  <button
                    type="button"
                    onClick={addLineItem}
                    className="text-[11px] text-[#70405B] font-semibold hover:underline"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {lineItems.map((it, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={it.description}
                        onChange={(e) => {
                          const copy = [...lineItems];
                          copy[idx].description = e.target.value;
                          setLineItems(copy);
                        }}
                        placeholder="Service charge description"
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#E9DFE3] text-xs"
                      />
                      <input
                        type="number"
                        required
                        value={it.unitPrice}
                        onChange={(e) => {
                          const copy = [...lineItems];
                          copy[idx].unitPrice = e.target.value ? Number(e.target.value) : 0;
                          setLineItems(copy);
                        }}
                        placeholder="Price"
                        className="w-20 px-2.5 py-1.5 rounded-lg border border-[#E9DFE3] text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E9DFE3]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E9DFE3] text-xs font-semibold text-[#756A73]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !selectedPatientId}
                  className="px-5 py-2 rounded-xl bg-[#70405B] hover:bg-[#5C324A] text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Generating…' : 'Generate & Save Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
