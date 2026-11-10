import { motion } from 'framer-motion';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean; // For use on dark backgrounds
  className?: string;
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${isCenter ? 'text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <p
          className={`font-sans text-xs font-semibold tracking-[0.15em] uppercase mb-3 ${
            light ? 'text-[#EBC4CF]' : 'text-[#70405B]'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`font-serif text-section font-normal leading-tight text-balance mb-4 ${
          light ? 'text-white' : 'text-[#442B3B]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-sans text-base leading-relaxed max-w-2xl ${
            isCenter ? 'mx-auto' : ''
          } ${light ? 'text-white/70' : 'text-[#756A73]'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
