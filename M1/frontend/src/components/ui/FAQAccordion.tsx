import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FAQItem } from '../../data/faqs';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3" role="list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `faq-item-${index}`;
        const contentId = `${id}-content`;

        return (
          <div
            key={index}
            role="listitem"
            className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
              isOpen
                ? 'border-[#EBC4CF] bg-[#FBF1F4]'
                : 'border-[#E9DFE3] bg-white hover:border-[#EBC4CF]'
            }`}
          >
            <button
              id={id}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
            >
              <span className="font-sans font-medium text-[#442B3B] text-sm leading-snug">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-[#70405B] transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-5">
                    <div className="h-px bg-[#E9DFE3] mb-4" aria-hidden="true" />
                    <p className="text-[#756A73] text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
