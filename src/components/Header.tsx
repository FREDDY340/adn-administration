import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { AdnLogo } from './AdnLogo';
import {
  Phone,
  Calendar,
  Lock,
  ChevronDown,
  Menu,
  X,
  FileText,
  Clock,
  MapPin,
  MessageSquare
} from './IconHelper';

export const Header: React.FC = () => {
  const {
    settings,
    services,
    setIsAppointmentModalOpen,
    setIsQuoteModalOpen,
    setIsAdminModalOpen,
    setActiveServiceSlug,
    stats,
    isAdminLoggedIn
  } = useData();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleServiceSelect = (slug: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setActiveServiceSlug(slug);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top micro bar with Admin & Quick info */}
      <div className="bg-[#0c2340] text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-300">
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#d32f2f]" />
              <span>{settings.address}, {settings.postalCode} {settings.city}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Lun - Ven : 09h-18h | Sam : 09h-13h</span>
            </span>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="header-admin-portal-btn"
              onClick={() => setIsAdminModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                isAdminLoggedIn
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>{isAdminLoggedIn ? 'Espace Gestion (Connecté)' : 'Espace Admin'}</span>
              {(stats.newRequestsCount + stats.pendingAppointmentsCount > 0 && !isAdminLoggedIn) && (
                <span className="bg-[#d32f2f] text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {stats.newRequestsCount + stats.pendingAppointmentsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`bg-white transition-all duration-200 border-b border-slate-200 ${
          isScrolled ? 'shadow-md py-3' : 'shadow-xs py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo ADN CONSEILS */}
          <button
            id="nav-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left focus:outline-hidden cursor-pointer"
          >
            <AdnLogo variant="dark" size="md" />
          </button>

          {/* Desktop Nav links */}
          <div className="hidden lg:flex items-center gap-8 text-[13.5px] font-medium text-slate-700">
            <button
              id="nav-home-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#d32f2f] font-semibold border-b-2 border-[#d32f2f] pb-1 cursor-pointer transition-colors"
            >
              Accueil
            </button>

            <button
              id="nav-about-btn"
              onClick={() => scrollToSection('about-section')}
              className="hover:text-[#d32f2f] transition-colors pb-1 cursor-pointer text-slate-700 font-medium"
            >
              À propos
            </button>

            {/* Nos services dropdown */}
            <div className="relative group">
              <button
                id="nav-services-dropdown-btn"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="flex items-center gap-1 hover:text-[#d32f2f] transition-colors pb-1 cursor-pointer text-slate-700 font-medium"
              >
                <span>Nos services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#d32f2f]" />
              </button>

              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Domaines d'expertise
                  </div>
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service.slug)}
                      className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0c2340] font-medium transition-colors flex items-center justify-between"
                    >
                      <span>{service.title}</span>
                      <span className="text-[10px] text-blue-600 font-semibold">Voir →</span>
                    </button>
                  ))}
                  <div className="pt-1.5 mt-1 border-t border-slate-100 px-3.5">
                    <button
                      onClick={() => scrollToSection('services-section')}
                      className="text-xs text-[#d32f2f] font-bold hover:underline"
                    >
                      Tous les domaines d'expertise →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-faq-btn"
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-[#d32f2f] transition-colors pb-1 cursor-pointer text-slate-700 font-medium"
            >
              FAQ
            </button>

            <button
              id="nav-news-btn"
              onClick={() => scrollToSection('blog-section')}
              className="hover:text-[#d32f2f] transition-colors pb-1 cursor-pointer text-slate-700 font-medium"
            >
              Actualités
            </button>

            <button
              id="nav-contact-btn"
              onClick={() => scrollToSection('contact-section')}
              className="hover:text-[#d32f2f] transition-colors pb-1 cursor-pointer text-slate-700 font-medium"
            >
              Contact
            </button>
          </div>

          {/* Action CTAs: Phone button + Red Appointment CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="header-phone-pill-btn"
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400 text-xs font-semibold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>{settings.phoneDisplay}</span>
            </a>

            <button
              id="header-appointment-cta-btn"
              onClick={() => setIsAppointmentModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d32f2f] hover:bg-[#b71c1c] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Prendre rendez-vous</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="header-mobile-appointment-btn"
              onClick={() => setIsAppointmentModalOpen(true)}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#d32f2f] rounded-lg sm:hidden"
            >
              RDV
            </button>
            <button
              id="header-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 mt-3 space-y-3 shadow-xl">
            <div className="flex flex-col space-y-1 text-sm font-semibold text-slate-800">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 text-[#d32f2f] font-bold"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('about-section')}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                À propos
              </button>
              <button
                onClick={() => scrollToSection('services-section')}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Nos services (6 domaines)
              </button>
              <button
                onClick={() => scrollToSection('method-section')}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Comment ça fonctionne ?
              </button>
              <button
                onClick={() => scrollToSection('faq-section')}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection('blog-section')}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Actualités
              </button>
              <button
                onClick={() => scrollToSection('contact-section')}
                className="text-left px-3 py-2 hover:bg-slate-50 rounded-lg"
              >
                Contact & Localisation
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAppointmentModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-[#d32f2f] text-white font-bold text-xs text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre rendez-vous</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Demander un devis</span>
              </button>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="w-full py-2 rounded-lg bg-slate-50 text-slate-800 font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>{settings.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
