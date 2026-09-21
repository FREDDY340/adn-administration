import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ChevronRight, Search, MessageSquare, Phone } from './IconHelper';

export const FaqSection: React.FC = () => {
  const { faqs, settings } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch = f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-14 sm:py-18 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with red underline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
            Foire Aux Questions
          </h2>
          <div className="w-9 h-[2.5px] bg-[#d32f2f] mx-auto mt-2.5 rounded-full"></div>
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            Des réponses claires, transparentes et directes sur notre mode de fonctionnement et vos démarches.
          </p>
        </div>

        {/* Search Bar & Category filters */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une question (titre de séjour, prix, préfecture...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-red-500 text-slate-900 shadow-2xs"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0c2340] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'Toutes les questions' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0c2340] text-xs sm:text-sm hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <span className="flex-1">{faq.question}</span>
                    <span className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-90 bg-red-50 text-[#d32f2f]' : 'text-slate-400'}`}>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      <p>{faq.answer}</p>
                      <div className="mt-3 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Catégorie : {faq.category}</span>
                        <span>ADN Conseils Assistance</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
              <p className="text-sm font-semibold text-slate-700">Aucune question ne correspond à votre recherche.</p>
              <p className="text-xs text-slate-500">Contactez directement notre équipe pour une réponse immédiate.</p>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0c2340]">Vous avez une question spécifique sur votre dossier ?</h4>
            <p className="text-xs text-slate-500">Nos conseillers vous répondent rapidement par WhatsApp ou téléphone.</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Bonjour%20ADN%20Conseil,%20j'ai%20une%20question.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="px-3.5 py-2 rounded-xl bg-[#0c2340] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Appeler</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
