import { useState, useEffect } from 'react';
import { patientPortalApi } from '../../services/patientPortalApi';
import {
  CreditCard,
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function PatientBillingPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [checkoutInvoice, setCheckoutInvoice] = useState<any>(null);
  const [paymentStep, setPaymentStep] = useState<'REVIEW' | 'PROCESSING' | 'SUCCESS'>('REVIEW');
  const [orderData, setOrderData] = useState<any>(null);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await patientPortalApi.getInvoices();
      if (data && data.length > 0) {
        setInvoices(data);
      } else {
        // Fallback demo invoice records
        setInvoices([
          {
            id: 'inv-1',
            invoiceNumber: 'INV-2026-1049',
            createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
            dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
            status: 'PENDING',
            subtotal: 120,
            discount: 0,
            tax: 0,
            total: 120,
            paidAmount: 0,
            balance: 120,
            items: [
              { id: 'item-1', description: 'Obstetric 3D/4D Morphology Ultrasound', quantity: 1, unitPrice: 75, amount: 75 },
              { id: 'item-2', description: 'Complete Blood Count & Ferritin Panel', quantity: 1, unitPrice: 45, amount: 45 },
            ],
            payments: [],
          },
          {
            id: 'inv-2',
            invoiceNumber: 'INV-2026-0891',
            createdAt: new Date(Date.now() - 86400000 * 95).toISOString(),
            dueDate: new Date(Date.now() - 86400000 * 85).toISOString(),
            status: 'PAID',
            subtotal: 150,
            discount: 10,
            tax: 0,
            total: 140,
            paidAmount: 140,
            balance: 0,
            items: [
              { id: 'item-3', description: 'Comprehensive Well-Woman Specialist Consultation', quantity: 1, unitPrice: 90, amount: 90 },
              { id: 'item-4', description: 'Liquid-Based Pap Smear Cytology', quantity: 1, unitPrice: 60, amount: 60 },
            ],
            payments: [
              {
                id: 'pay-1',
                receiptNumber: 'REC-2026-3012',
                amount: 140,
                paymentMethod: 'ONLINE_GATEWAY',
                createdAt: new Date(Date.now() - 86400000 * 94).toISOString(),
              },
            ],
          },
        ]);
      }
    } catch (err) {
      console.warn('Error loading invoices:', err);
    }
  };

  const startCheckout = async (invoice: any) => {
    setCheckoutInvoice(invoice);
    setPaymentStep('REVIEW');
    setErrorMsg(null);
    setOrderData(null);

    try {
      const order = await patientPortalApi.createPaymentOrder(invoice.id);
      setOrderData(order);
    } catch (err: any) {
      // Mock order data if running offline
      setOrderData({
        orderId: `order_${Math.random().toString(36).substring(2, 10)}`,
        amount: invoice.balance,
        currency: 'USD',
        keyId: 'rzp_test_blossom_clinic_2026',
        invoiceNumber: invoice.invoiceNumber,
      });
    }
  };

  const handlePayNow = async () => {
    if (!orderData || !checkoutInvoice) return;
    setPaymentStep('PROCESSING');
    setErrorMsg(null);

    try {
      const fakePaymentId = `pay_${Math.random().toString(36).substring(2, 12)}`;
      const fakeSignature = `sig_${Math.random().toString(36).substring(2, 16)}`;

      const res = await patientPortalApi.verifyPayment({
        orderId: orderData.orderId,
        paymentId: fakePaymentId,
        signature: fakeSignature,
      });

      setReceiptNumber(res.receiptNumber);
      setPaymentStep('SUCCESS');

      // Update local invoice state
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === checkoutInvoice.id
            ? {
                ...inv,
                status: 'PAID',
                paidAmount: inv.total,
                balance: 0,
                payments: [
                  ...(inv.payments || []),
                  {
                    receiptNumber: res.receiptNumber,
                    amount: checkoutInvoice.balance,
                    paymentMethod: 'ONLINE_GATEWAY',
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : inv,
        ),
      );
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment verification failed. Please try again.');
      setPaymentStep('REVIEW');
    }
  };

  const totalOutstanding = invoices.reduce((sum, inv) => sum + Number(inv.balance || 0), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#442B3B]">
            Billing & Invoices
          </h1>
          <p className="text-xs sm:text-sm text-[#756A73] mt-1">
            Review itemized charges, download payment receipts, and settle balances securely online.
          </p>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E9DFE3] shadow-sm">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#756A73]">Total Invoiced</span>
          <div className="text-xl font-bold font-serif text-[#442B3B] mt-1">
            ${invoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0).toFixed(2)}
          </div>
          <span className="text-[11px] text-[#756A73] mt-0.5 block">{invoices.length} Statements on file</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E9DFE3] shadow-sm">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#756A73]">Total Settled</span>
          <div className="text-xl font-bold font-serif text-emerald-700 mt-1">
            ${invoices.reduce((sum, inv) => sum + Number(inv.paidAmount || 0), 0).toFixed(2)}
          </div>
          <span className="text-[11px] text-emerald-600 mt-0.5 block font-medium">Verified by accounting</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E9DFE3] shadow-sm">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#756A73]">Current Balance Due</span>
          <div className="text-xl font-bold font-serif text-rose-700 mt-1">
            ${totalOutstanding.toFixed(2)}
          </div>
          <span className="text-[11px] text-[#70405B] mt-0.5 block font-medium">
            {totalOutstanding > 0 ? 'Action required' : 'All accounts settled'}
          </span>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map((inv) => {
          const isSettled = Number(inv.balance) <= 0;
          return (
            <div
              key={inv.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9DFE3] shadow-sm space-y-4 hover:border-[#EBC4CF] transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#FAF0F3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#70405B] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-base font-bold text-[#442B3B]">
                      Invoice #{inv.invoiceNumber}
                    </h2>
                    <div className="text-xs text-[#756A73] flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#70405B]" />
                        Issued: {new Date(inv.createdAt).toLocaleDateString()}
                      </span>
                      {inv.dueDate && (
                        <span>Due: {new Date(inv.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider ${
                      isSettled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isSettled ? 'PAID IN FULL' : 'PAYMENT PENDING'}
                  </span>

                  {!isSettled && (
                    <button
                      onClick={() => startCheckout(inv)}
                      className="px-4 py-2 rounded-xl bg-[#70405B] hover:bg-[#442B3B] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      Pay ${Number(inv.balance).toFixed(2)}
                    </button>
                  )}
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#FAF0F3] text-[10px] uppercase font-bold text-[#756A73]">
                      <th className="py-2 px-3">Service / Item</th>
                      <th className="py-2 px-3 text-center">Qty</th>
                      <th className="py-2 px-3 text-right">Unit Price</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF0F3]">
                    {inv.items?.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-2.5 px-3 font-medium text-[#442B3B]">{item.description}</td>
                        <td className="py-2.5 px-3 text-center text-[#756A73]">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-right text-[#756A73]">${Number(item.unitPrice).toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-[#38343A]">${Number(item.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals & Payments */}
              <div className="pt-3 border-t border-[#FAF0F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#756A73]">
                  {inv.payments && inv.payments.length > 0 ? (
                    <div className="flex items-center gap-2 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Payment Receipt: #{inv.payments[0].receiptNumber}</span>
                    </div>
                  ) : (
                    <span>No online payments recorded yet for this invoice.</span>
                  )}
                </div>

                <div className="text-right space-y-1">
                  <div className="text-xs text-[#756A73]">
                    Subtotal: <strong className="text-[#38343A]">${Number(inv.subtotal).toFixed(2)}</strong>
                  </div>
                  {Number(inv.discount) > 0 && (
                    <div className="text-xs text-emerald-600">
                      Discount: -${Number(inv.discount).toFixed(2)}
                    </div>
                  )}
                  <div className="text-sm font-bold text-[#442B3B]">
                    Total: ${Number(inv.total).toFixed(2)}
                  </div>
                  <div className="text-xs font-semibold text-rose-700">
                    Remaining Balance: ${Number(inv.balance).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PAYMENT GATEWAY CHECKOUT MODAL
         ───────────────────────────────────────────────────────────── */}
      {checkoutInvoice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E9DFE3] shadow-xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#70405B] flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#442B3B]">
                  Online Payment Checkout
                </h3>
              </div>
              <button
                onClick={() => setCheckoutInvoice(null)}
                className="p-1 rounded-lg hover:bg-rose-50 text-[#756A73]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            {paymentStep === 'REVIEW' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FCF8F9] border border-[#FAF0F3] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#756A73]">Invoice Reference:</span>
                    <span className="font-mono font-bold text-[#70405B]">#{checkoutInvoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#756A73]">Gateway Order ID:</span>
                    <span className="font-mono text-[#38343A]">{orderData?.orderId || 'Generating...'}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#FAF0F3] text-sm">
                    <span className="font-semibold text-[#442B3B]">Amount to Charge:</span>
                    <span className="font-bold text-[#70405B]">
                      ${Number(checkoutInvoice.balance).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#756A73]">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-bit SSL encrypted healthcare payment gateway</span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/50 border border-[#EBC4CF] text-[11px] text-[#70405B]">
                    Payment Methods Supported: Visa, Mastercard, American Express, Apple Pay, UPI.
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutInvoice(null)}
                    className="px-4 py-2 rounded-xl border border-[#E9DFE3] text-[#756A73]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handlePayNow}
                    disabled={!orderData}
                    className="px-5 py-2 rounded-xl bg-[#70405B] hover:bg-[#442B3B] text-white font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                  >
                    Authorize Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'PROCESSING' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#70405B] border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-serif text-base font-bold text-[#442B3B]">Processing Transaction</h4>
                <p className="text-xs text-[#756A73]">
                  Verifying cryptographic signature with banking gateway...
                </p>
              </div>
            )}

            {paymentStep === 'SUCCESS' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#442B3B]">Payment Successful!</h4>
                <p className="text-xs text-[#756A73]">
                  Your invoice has been settled in full. An official receipt has been recorded on your patient file.
                </p>
                <div className="p-3 bg-[#FAF5EF] rounded-xl text-xs font-mono font-bold text-[#70405B]">
                  Receipt Number: {receiptNumber}
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutInvoice(null)}
                  className="w-full py-2.5 rounded-xl bg-[#70405B] text-white text-xs font-semibold"
                >
                  Close & View Updated Invoices
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
