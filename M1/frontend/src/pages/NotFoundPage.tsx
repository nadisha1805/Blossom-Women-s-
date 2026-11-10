import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <section
      aria-labelledby="notfound-heading"
      className="bg-[#FAF5EF] min-h-[60vh] flex items-center justify-center py-20"
    >
      <div className="section-container text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="w-24 h-24 rounded-full bg-[#F7E7EC] flex items-center justify-center mx-auto mb-8"
            aria-hidden="true"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#70405B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#70405B] mb-4">
            404 — Page Not Found
          </p>
          <h1 id="notfound-heading" className="font-serif text-4xl text-[#442B3B] mb-5 text-balance">
            We Couldn't Find That Page
          </h1>
          <p className="text-[#756A73] text-base leading-relaxed mb-10">
            The page you are looking for may have moved or no longer exists. Please use the navigation to find what you need, or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              id="notfound-home-link"
              className="inline-flex items-center justify-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 shadow-soft text-sm"
            >
              Go to Homepage
            </Link>
            <Link
              to="/contact"
              id="notfound-contact-link"
              className="inline-flex items-center justify-center gap-2 border border-[#E9DFE3] hover:border-[#EBC4CF] text-[#70405B] hover:bg-[#F7E7EC] font-sans font-medium px-8 py-4 rounded-2xl transition-all duration-200 text-sm"
            >
              Contact the Clinic
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
