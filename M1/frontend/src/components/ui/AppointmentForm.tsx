import { useState } from 'react';
import { CheckCircle, AlertCircle, Info, Calendar, Clock, User, Check } from 'lucide-react';
import services from '../../data/services';
import doctors from '../../data/doctors';
import Button from '../ui/Button';
import { submitAppointmentRequest, AppointmentResponse } from '../../services/api';

interface FormData {
  patientName: string;
  email: string;
  phone: string;
  preferredService: string;
  preferredDoctor: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  privacyAcknowledged: boolean;
}

interface FormErrors {
  [key: string]: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const timeOptions = [
  'Morning (9:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 3:00 PM)',
  'Late Afternoon (3:00 PM – 6:00 PM)',
  'No preference',
];

function getMinDate(): string {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Minimum: tomorrow
  return today.toISOString().split('T')[0];
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  // Accepts common formats: +91XXXXXXXXXX, 0XXXXXXXXXX, XXXXXXXXXX (10 digits)
  return /^[\+]?[\d\s\-\(\)]{7,15}$/.test(phone.trim());
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    email: '',
    phone: '',
    preferredService: '',
    preferredDoctor: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    privacyAcknowledged: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmationData, setConfirmationData] = useState<AppointmentResponse['data'] | null>(null);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.patientName.trim()) newErrors.patientName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.preferredService) newErrors.preferredService = 'Please select a healthcare service.';
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date.';
    } else if (formData.preferredDate < getMinDate()) {
      newErrors.preferredDate = 'Please select a future date.';
    }
    if (!formData.privacyAcknowledged) {
      newErrors.privacyAcknowledged = 'You must acknowledge the privacy notice to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await submitAppointmentRequest({
        patientName: formData.patientName,
        email: formData.email,
        phone: formData.phone,
        serviceId: formData.preferredService,
        preferredDoctorId: formData.preferredDoctor || undefined,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime || undefined,
        reason: formData.message || undefined,
        consent: formData.privacyAcknowledged,
      });

      setConfirmationData(response.data);
      setSubmitStatus('success');
    } catch (err: any) {
      // Fallback grace mode: if backend is temporarily unreachable during standalone dev
      console.warn('API submission error:', err);
      setErrorMessage(err.message || 'Unable to submit request. Please try again.');
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="bg-[#EEF3EC] border border-[#B9CBB7] rounded-3xl p-8 sm:p-10 text-center"
      >
        <CheckCircle
          className="mx-auto mb-4 text-[#70405B]"
          size={52}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="font-sans text-xs font-semibold tracking-wider uppercase text-[#70405B] mb-2">
          Request Submitted
        </p>
        <h2 className="font-serif text-3xl text-[#442B3B] mb-3">
          Appointment Request Received
        </h2>
        
        {confirmationData?.referenceId && (
          <div className="inline-block bg-white border border-[#B9CBB7] rounded-xl px-5 py-2.5 my-4">
            <span className="text-xs uppercase text-[#756A73] tracking-wider block font-semibold">
              Your Reference Number
            </span>
            <span className="font-mono text-xl font-bold text-[#70405B]">
              {confirmationData.referenceId}
            </span>
          </div>
        )}

        <div className="bg-white/80 rounded-2xl p-5 max-w-lg mx-auto my-4 text-left border border-[#B9CBB7]/50 space-y-2 text-sm text-[#442B3B]">
          <div className="flex items-center gap-2">
            <User size={16} className="text-[#70405B]" />
            <span><strong>Patient:</strong> {confirmationData?.patientName || formData.patientName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-[#70405B]" />
            <span><strong>Service:</strong> {confirmationData?.service || formData.preferredService}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#70405B]" />
            <span><strong>Preferred Date:</strong> {formData.preferredDate}</span>
          </div>
          {formData.preferredTime && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#70405B]" />
              <span><strong>Preferred Time:</strong> {formData.preferredTime}</span>
            </div>
          )}
          <div className="pt-2 border-t border-[#B9CBB7]/30 text-xs text-[#756A73]">
            <strong>Status:</strong> <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#F7E7EC] text-[#70405B]">REQUESTED</span> (Awaiting clinic review)
          </div>
        </div>

        <p className="text-[#756A73] text-sm leading-relaxed max-w-md mx-auto mb-2">
          Thank you for trusting Blossom Women's Health Clinic. Our team will review your request and contact you directly via phone or email to confirm your consultation schedule.
        </p>
        <p className="text-[#756A73] text-xs leading-relaxed max-w-md mx-auto">
          <strong className="text-[#442B3B]">Important:</strong> This request does not automatically confirm an appointment slot until our clinical team verifies doctor availability and schedules the visit.
        </p>
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            setSubmitStatus('idle');
            setConfirmationData(null);
            setFormData({
              patientName: '',
              email: '',
              phone: '',
              preferredService: '',
              preferredDoctor: '',
              preferredDate: '',
              preferredTime: '',
              message: '',
              privacyAcknowledged: false,
            });
          }}
          className="mt-8"
          id="appointment-new-request-btn"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Appointment request form"
      className="space-y-6"
    >
      {/* Development notice */}
      <div className="flex gap-3 bg-[#F7E7EC] border border-[#EBC4CF]/50 rounded-2xl p-4" role="note">
        <Info size={18} className="text-[#70405B] flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-[#756A73] text-sm">
          <strong className="text-[#442B3B]">Appointment Request Only:</strong> Submitting this form sends an enquiry to the clinic. Your appointment will be confirmed by the clinic team after reviewing your request and availability.
        </p>
      </div>

      {submitStatus === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex gap-3 bg-red-50 border border-red-200 rounded-2xl p-4"
        >
          <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-red-700 text-sm">
            {errorMessage || 'There was a problem submitting your request. Please try again or contact the clinic directly.'}
          </p>
        </div>
      )}

      {/* Patient Name */}
      <FormField
        id="appointment-patient-name"
        label="Full Name"
        required
        error={errors.patientName}
      >
        <input
          id="appointment-patient-name"
          type="text"
          value={formData.patientName}
          onChange={(e) => updateField('patientName', e.target.value)}
          placeholder="Your full name"
          autoComplete="name"
          className={inputClass(!!errors.patientName)}
          aria-describedby={errors.patientName ? 'appointment-patient-name-error' : undefined}
          aria-invalid={!!errors.patientName}
        />
        {errors.patientName && (
          <FieldError id="appointment-patient-name-error" message={errors.patientName} />
        )}
      </FormField>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="appointment-email"
          label="Email Address"
          required
          error={errors.email}
        >
          <input
            id="appointment-email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            aria-describedby={errors.email ? 'appointment-email-error' : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <FieldError id="appointment-email-error" message={errors.email} />
          )}
        </FormField>

        <FormField
          id="appointment-phone"
          label="Phone Number"
          required
          error={errors.phone}
        >
          <input
            id="appointment-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+91 XXXXXXXXXX"
            autoComplete="tel"
            className={inputClass(!!errors.phone)}
            aria-describedby={errors.phone ? 'appointment-phone-error' : undefined}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <FieldError id="appointment-phone-error" message={errors.phone} />
          )}
        </FormField>
      </div>

      {/* Service & Doctor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="appointment-service"
          label="Preferred Healthcare Service"
          required
          error={errors.preferredService}
        >
          <select
            id="appointment-service"
            value={formData.preferredService}
            onChange={(e) => updateField('preferredService', e.target.value)}
            className={inputClass(!!errors.preferredService)}
            aria-describedby={errors.preferredService ? 'appointment-service-error' : undefined}
            aria-invalid={!!errors.preferredService}
          >
            <option value="">Select a service…</option>
            {services.filter((s) => s.visible).map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          {errors.preferredService && (
            <FieldError id="appointment-service-error" message={errors.preferredService} />
          )}
        </FormField>

        <FormField
          id="appointment-doctor"
          label="Preferred Doctor (optional)"
        >
          <select
            id="appointment-doctor"
            value={formData.preferredDoctor}
            onChange={(e) => updateField('preferredDoctor', e.target.value)}
            className={inputClass(false)}
          >
            <option value="">No preference</option>
            {doctors.filter((d) => d.visible).map((d) => (
              <option key={d.id} value={d.id}>{d.title}</option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          id="appointment-date"
          label="Preferred Date"
          required
          error={errors.preferredDate}
        >
          <input
            id="appointment-date"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => updateField('preferredDate', e.target.value)}
            min={getMinDate()}
            className={inputClass(!!errors.preferredDate)}
            aria-describedby={errors.preferredDate ? 'appointment-date-error' : undefined}
            aria-invalid={!!errors.preferredDate}
          />
          {errors.preferredDate && (
            <FieldError id="appointment-date-error" message={errors.preferredDate} />
          )}
        </FormField>

        <FormField
          id="appointment-time"
          label="Preferred Time"
        >
          <select
            id="appointment-time"
            value={formData.preferredTime}
            onChange={(e) => updateField('preferredTime', e.target.value)}
            className={inputClass(false)}
          >
            <option value="">Select a time preference…</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Optional Message */}
      <FormField
        id="appointment-message"
        label="Additional Information (optional)"
        hint="You may briefly describe the reason for your visit. Please do not include sensitive medical details."
      >
        <textarea
          id="appointment-message"
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Briefly describe what you would like to discuss at your appointment…"
          rows={4}
          maxLength={500}
          className={`${inputClass(false)} resize-none`}
          aria-describedby="appointment-message-hint"
        />
        <p className="text-xs text-[#756A73]/60 text-right mt-1">
          {formData.message.length}/500
        </p>
      </FormField>

      {/* Privacy Acknowledgement */}
      <div className="border border-[#E9DFE3] rounded-2xl p-5">
        <label className="flex gap-4 cursor-pointer" htmlFor="appointment-privacy">
          <input
            id="appointment-privacy"
            type="checkbox"
            checked={formData.privacyAcknowledged}
            onChange={(e) => updateField('privacyAcknowledged', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-[#70405B] flex-shrink-0"
            aria-describedby={errors.privacyAcknowledged ? 'appointment-privacy-error' : 'appointment-privacy-hint'}
            aria-invalid={!!errors.privacyAcknowledged}
          />
          <span className="text-[#756A73] text-sm leading-relaxed">
            I acknowledge that I have read the{' '}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#70405B] underline underline-offset-2 hover:text-[#442B3B]"
            >
              Privacy Policy
            </a>{' '}
            and consent to the clinic using my contact information to respond to this appointment request.{' '}
            <strong className="text-[#442B3B]">
              I understand this request does not confirm an appointment.
            </strong>
          </span>
        </label>
        {errors.privacyAcknowledged && (
          <FieldError id="appointment-privacy-error" message={errors.privacyAcknowledged} />
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={submitStatus === 'loading'}
        disabled={submitStatus === 'loading'}
        className="w-full"
        id="appointment-submit-btn"
      >
        {submitStatus === 'loading' ? 'Submitting Request…' : 'Submit Appointment Request'}
      </Button>
    </form>
  );
}

// ---- Helper sub-components ----

function FormField({
  id,
  label,
  required,
  error: _error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-sm font-medium text-[#442B3B] mb-1.5">
        {label}
        {required && <span className="text-[#C9859D] ml-1" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-[#756A73] mb-2">
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  );
}

function inputClass(hasError: boolean): string {
  return `w-full px-4 py-3 rounded-xl border font-sans text-sm text-[#442B3B] bg-white placeholder:text-[#756A73]/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#70405B]/20 focus:border-[#70405B] ${
    hasError
      ? 'border-red-300 bg-red-50/30'
      : 'border-[#E9DFE3] hover:border-[#C9859D]'
  }`;
}
