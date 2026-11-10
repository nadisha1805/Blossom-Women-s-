import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const footerServices = [
  { label: 'Gynaecology', to: '/services/gynecology' },
  { label: 'Pregnancy & Antenatal Care', to: '/services/antenatal-care' },
  { label: 'Postnatal Care', to: '/services/postnatal-care' },
  { label: 'Menstrual Health', to: '/services/menstrual-health' },
  { label: 'PCOS Consultations', to: '/services/pcos' },
  { label: 'Fertility Consultations', to: '/services/fertility' },
  { label: 'Menopause Care', to: '/services/menopause-care' },
  { label: 'Preventive Screenings', to: '/services/preventive-screenings' },
];

const footerNav = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Doctors', to: '/doctors' },
  { label: 'Health Resources', to: '/resources' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Request an Appointment', to: '/appointment' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-[#442B3B] text-white">
      {/* Main Footer Grid */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand & Intro */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              aria-label="Blossom Women's Health Clinic — Home"
              className="flex items-center gap-3 mb-5 group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EBC4CF] to-[#C9859D] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.7C17.3 17 22 13 22 8.5a5.5 5.5 0 0 0-11 0A5.5 5.5 0 0 0 2 8.5C2 13 6.7 17 12 21.7z"/>
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-white text-base tracking-tight">Blossom Women's</span>
                <span className="text-[#C9859D] text-xs tracking-wider uppercase font-medium font-sans">Health Clinic</span>
              </div>
            </Link>
            <p className="text-[#C9859D]/80 text-sm leading-relaxed mb-6">
              A compassionate multispecialty women's healthcare clinic dedicated to providing respectful, expert care at every stage of life.
            </p>
            <div className="flex gap-3">
              {/* Social icons - placeholder links */}
              {[
                {
                  label: 'Instagram',
                  href: '#',
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#EBC4CF]">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: '#',
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#EBC4CF]">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Twitter / X',
                  href: '#',
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#EBC4CF]">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                    </svg>
                  ),
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#EBC4CF]/30 flex items-center justify-center transition-colors duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans font-semibold text-sm tracking-wider uppercase text-[#EBC4CF] mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#C9859D]/80 hover:text-white text-sm transition-colors duration-200 font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans font-semibold text-sm tracking-wider uppercase text-[#EBC4CF] mb-5">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerServices.map((svc) => (
                <li key={svc.to}>
                  <Link
                    to={svc.to}
                    className="text-[#C9859D]/80 hover:text-white text-sm transition-colors duration-200 font-sans"
                  >
                    {svc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-sans font-semibold text-sm tracking-wider uppercase text-[#EBC4CF] mb-5">
              Contact & Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={15} className="text-[#EBC4CF] mt-0.5 flex-shrink-0" />
                <span className="text-[#C9859D]/80 text-sm">
                  [Clinic Address]<br />
                  [City, State — Postcode]<br />
                  <span className="italic text-[#C9859D]/60 text-xs">To be confirmed by clinic</span>
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={15} className="text-[#EBC4CF] flex-shrink-0" />
                <span className="text-[#C9859D]/80 text-sm">
                  [Telephone — to be confirmed]
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={15} className="text-[#EBC4CF] flex-shrink-0" />
                <span className="text-[#C9859D]/80 text-sm">
                  [Email — to be confirmed]
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <Clock size={15} className="text-[#EBC4CF] mt-0.5 flex-shrink-0" />
                <span className="text-[#C9859D]/80 text-sm">
                  [Opening hours — to be confirmed by clinic]
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#C9859D]/60 text-xs font-sans text-center sm:text-left">
            © {currentYear} Blossom Women's Health Clinic. All rights reserved.
            <span className="block sm:inline sm:ml-1 text-[#C9859D]/40">
              Website content is for general information only and does not constitute medical advice.
            </span>
          </p>
          <div className="flex gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#C9859D]/60 hover:text-white text-xs font-sans transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
