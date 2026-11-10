import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Doctors', to: '/doctors' },
  { label: 'Health Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-[#E9DFE3]'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo / Brand */}
            <Link
              to="/"
              aria-label="Women's Healthcare Clinic — Home"
              className="flex items-center gap-3 group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EBC4CF] to-[#70405B] flex items-center justify-center flex-shrink-0 shadow-soft group-hover:shadow-card transition-shadow duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.7C17.3 17 22 13 22 8.5a5.5 5.5 0 0 0-11 0A5.5 5.5 0 0 0 2 8.5C2 13 6.7 17 12 21.7z"/>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-[#442B3B] text-base tracking-tight">
                  Blossom Women's
                </span>
                <span className="font-sans text-[#756A73] text-xs tracking-wider uppercase font-medium">
                  Health Clinic
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium font-sans transition-colors duration-200 rounded-lg group ${
                      isActive
                        ? 'text-[#70405B]'
                        : 'text-[#756A73] hover:text-[#70405B]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#EBC4CF] transition-transform duration-200 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA Button + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/portal/login"
                id="header-staff-portal-btn"
                className="hidden md:inline-flex items-center gap-1.5 border border-[#E9DFE3] hover:border-[#70405B] text-[#70405B] text-xs font-sans font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 hover:bg-[#FAF5EF]"
              >
                Staff Portal
              </Link>

              <Link
                to="/appointment"
                id="header-appointment-cta"
                className="hidden sm:inline-flex items-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white text-sm font-sans font-medium px-5 py-2.5 rounded-xl transition-all duration-200 shadow-soft hover:shadow-card"
              >
                Request Appointment
              </Link>

              {/* Mobile menu button */}
              <button
                id="mobile-menu-toggle"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 rounded-xl text-[#70405B] hover:bg-[#F7E7EC] transition-colors duration-200"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white border-t border-[#E9DFE3]"
            >
              <div className="section-container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-sans font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#F7E7EC] text-[#70405B]'
                          : 'text-[#756A73] hover:bg-[#FAF5EF] hover:text-[#70405B]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-3 pt-3 border-t border-[#E9DFE3]">
                  <Link
                    to="/appointment"
                    id="mobile-appointment-cta"
                    className="flex items-center justify-center gap-2 bg-[#70405B] hover:bg-[#442B3B] text-white text-sm font-sans font-medium px-5 py-3 rounded-xl transition-all duration-200 w-full"
                  >
                    Request an Appointment
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
}
