import React from 'react';
import { useData } from '../context/DataContext';
import {
  Calendar,
  FileText,
  Phone,
  MessageSquare,
  Users,
  ShieldCheck,
  Clock
} from './IconHelper';

export const HeroSection: React.FC = () => {
  const {
    settings,
    setIsAppointmentModalOpen,
    setIsQuoteModalOpen
  } = useData();

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) {
      const offset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-white pt-8 pb-14 sm:pt-12 sm:pb-20 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headings, Paragraph & 2x2 Buttons */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow with red dash */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2.5px] bg-[#d32f2f] inline-block rounded-full"></span>
              <span className="text-[#0c2340] font-black text-xs sm:text-sm tracking-wider uppercase">
                ADN CONSEILS
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0c2340] leading-[1.12] tracking-tight">
              Vos démarches<br className="hidden sm:inline" /> administratives<br className="hidden sm:inline" /> simplifiées.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              ADN Conseils vous accompagne avec sérieux et bienveillance dans vos démarches liées au droit des étrangers, à la nationalité française, à la domiciliation, aux cartes grises et aux traductions de documents.
            </p>

            {/* 4 Action Buttons Grid (2x2) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              {/* Row 1 */}
              <button
                id="hero-appointment-cta"
                onClick={() => setIsAppointmentModalOpen(true)}
                className="py-3 px-4 rounded-xl bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold text-xs sm:text-[13px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white shrink-0" />
                <span>Prendre rendez-vous</span>
              </button>

              <button
                id="hero-quote-cta"
                onClick={() => setIsQuoteModalOpen(true)}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-[13px] border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                <span>Demander un devis</span>
              </button>

              {/* Row 2 */}
              <a
                id="hero-phone-cta"
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-[13px] border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-slate-600 shrink-0" />
                <span>{settings.phoneDisplay}</span>
              </a>

              <button
                id="hero-contact-message-cta"
                onClick={scrollToContact}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-[13px] border border-slate-300 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-slate-600 shrink-0" />
                <span>Envoyer un message</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual with floating reassurance badges */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-md lg:max-w-lg">
              
              {/* Main Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[4/3] sm:aspect-[14/11] bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85"
                  alt="Conseillère ADN Conseils au Kremlin-Bicêtre"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Pill Badges (Right & Top) */}
              <div className="absolute -top-3 -right-2 sm:-right-4 z-10 flex flex-col gap-2.5 max-w-[210px] sm:max-w-[230px]">
                
                {/* Badge 1: Blue */}
                <div className="bg-[#1e40af] text-white p-2.5 sm:p-3 rounded-xl shadow-lg flex items-center gap-2.5 border border-blue-600/40 animate-in fade-in slide-in-from-right-2 duration-300">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/40 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold leading-tight">
                      Accompagnement
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-blue-200 leading-tight">
                      personnalisé
                    </div>
                  </div>
                </div>

                {/* Badge 2: White Confidentialité */}
                <div className="bg-white/95 backdrop-blur-xs text-slate-800 p-2.5 sm:p-3 rounded-xl shadow-lg flex items-center gap-2.5 border border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-slate-700" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold leading-tight text-slate-900">
                      Confidentialité
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 leading-tight">
                      garantie
                    </div>
                  </div>
                </div>

                {/* Badge 3: White Réactivité */}
                <div className="bg-white/95 backdrop-blur-xs text-slate-800 p-2.5 sm:p-3 rounded-xl shadow-lg flex items-center gap-2.5 border border-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-slate-700" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold leading-tight text-slate-900">
                      Réactivité
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 leading-tight">
                      & disponibilité
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
