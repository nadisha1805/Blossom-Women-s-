import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  variant?: 'plum' | 'blush' | 'lavender';
  id?: string;
}

const variants = {
  plum: {
    bg: 'bg-[#442B3B]',
    eyebrow: 'text-[#EBC4CF]',
    title: 'text-white',
    subtitle: 'text-white/70',
    primary: 'bg-[#EBC4CF] hover:bg-white text-[#442B3B] shadow-soft hover:shadow-card',
    secondary: 'border border-white/30 text-white hover:bg-white/10',
  },
  blush: {
    bg: 'bg-[#F7E7EC]',
    eyebrow: 'text-[#70405B]',
    title: 'text-[#442B3B]',
    subtitle: 'text-[#756A73]',
    primary: 'bg-[#70405B] hover:bg-[#442B3B] text-white shadow-soft hover:shadow-card',
    secondary: 'border border-[#E9DFE3] text-[#70405B] hover:bg-[#EBC4CF]/30',
  },
  lavender: {
    bg: 'bg-[#DCD2EE]',
    eyebrow: 'text-[#70405B]',
    title: 'text-[#442B3B]',
    subtitle: 'text-[#756A73]',
    primary: 'bg-[#70405B] hover:bg-[#442B3B] text-white shadow-soft hover:shadow-card',
    secondary: 'border border-[#70405B]/20 text-[#70405B] hover:bg-white/40',
  },
};

export default function CTASection({
  eyebrow,
  title,
  subtitle,
  primaryLabel = 'Request an Appointment',
  primaryTo = '/appointment',
  secondaryLabel,
  secondaryTo,
  variant = 'plum',
  id,
}: CTASectionProps) {
  const v = variants[variant];

  return (
    <section id={id} className={`${v.bg} py-20`} aria-labelledby={id ? `${id}-heading` : undefined}>
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <p className={`font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-4 ${v.eyebrow}`}>
              {eyebrow}
            </p>
          )}
          <h2
            id={id ? `${id}-heading` : undefined}
            className={`font-serif text-section leading-tight mb-5 text-balance ${v.title}`}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`font-sans text-base leading-relaxed max-w-xl mx-auto mb-10 ${v.subtitle}`}>
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={primaryTo}
              className={`inline-flex items-center justify-center gap-2 font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 text-sm ${v.primary}`}
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link
                to={secondaryTo}
                className={`inline-flex items-center justify-center gap-2 font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 text-sm ${v.secondary}`}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
