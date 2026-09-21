import React from 'react';
import { useData } from '../context/DataContext';
import { FileText, Calendar } from './IconHelper';

export const DualCtaBanner: React.FC = () => {
  const { setIsQuoteModalOpen, setIsAppointmentModalOpen } = useData();

  const scrollToFaq = () => {
    const el = document.getElementById('faq-section');
    if (el) {
      const offset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-slate-50/70 border-b border-slate-100 relative overflow-hidden">
      {/* Decorative subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#0c2340_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Left Box: FAQ Callout */}
          <div className="space-y-3 md:pr-8 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-[#0c2340] leading-tight">
              Une question ?<br />
              Nous avons la réponse.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Consultez notre FAQ ou contactez-nous pour obtenir des informations fiables et à jour sur vos démarches.
            </p>
            <div className="pt-2">
              <button
                id="dual-cta-faq-btn"
                onClick={scrollToFaq}
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs transition-all cursor-pointer"
              >
                Voir la FAQ
              </button>
            </div>
          </div>

          {/* Right Box: Accompagnement / Devis / RDV */}
          <div className="pt-8 md:pt-0 md:pl-12 space-y-3 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-[#0c2340] leading-tight">
              Besoin d’un accompagnement ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Parlez-nous de votre situation
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                id="dual-cta-quote-btn"
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-4 py-2.5 rounded-lg bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Demander un devis</span>
              </button>

              <button
                id="dual-cta-appointment-btn"
                onClick={() => setIsAppointmentModalOpen(true)}
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-600" />
                <span>Prendre rendez-vous</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
