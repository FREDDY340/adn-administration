import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  DynamicIcon,
  X,
  Check,
  Clock,
  Calendar,
  FileText,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  MessageSquare
} from './IconHelper';

export const ServiceDetailModal: React.FC = () => {
  const {
    services,
    activeServiceSlug,
    setActiveServiceSlug,
    setIsAppointmentModalOpen,
    setIsQuoteModalOpen,
    setPreselectedServiceCategory,
    settings
  } = useData();

  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  if (!activeServiceSlug) return null;

  const service = services.find(s => s.slug === activeServiceSlug) || services[0];
  if (!service) return null;

  const toggleDoc = (doc: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [doc]: !prev[doc]
    }));
  };

  const handleBookAppointment = () => {
    setActiveServiceSlug(null);
    setIsAppointmentModalOpen(true);
  };

  const handleRequestQuote = () => {
    setActiveServiceSlug(null);
    setPreselectedServiceCategory(service.category);
    setIsQuoteModalOpen(true);
  };

  const totalDocs = service.requiredDocuments.length;
  const readyDocsCount = service.requiredDocuments.filter(d => !!checkedDocs[d]).length;
  const progressPercent = totalDocs > 0 ? Math.round((readyDocsCount / totalDocs) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        id="service-detail-modal"
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700 shrink-0">
              <DynamicIcon name={service.icon} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {service.category.toUpperCase()}
                </span>
                {service.badge && (
                  <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                    {service.badge}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {service.title}
              </h2>
            </div>
          </div>

          <button
            id="close-service-modal-btn"
            onClick={() => setActiveServiceSlug(null)}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-slate-700">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Tarif estimé</span>
              <strong className="text-slate-950 font-extrabold text-base">{service.priceEstimate}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Délai indicatif</span>
              <span className="text-slate-800 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {service.processingTime}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Modalités</span>
              <span className="text-slate-800 font-medium">Cabinet / À distance</span>
            </div>
          </div>

          {/* Full description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Présentation de la prestation</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              {service.fullDescription}
            </p>
          </div>

          {/* Interactive Document Checklist */}
          <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  Checklist interactive des pièces justificatives
                </h3>
                <p className="text-xs text-blue-700/80">Cochez les documents dont vous disposez déjà pour évaluer votre état de préparation.</p>
              </div>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-blue-200 text-blue-900">
                {readyDocsCount}/{totalDocs} ({progressPercent}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-blue-200/80 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-700 h-2 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checklist items */}
            <div className="space-y-2 pt-2">
              {service.requiredDocuments.map((doc, idx) => {
                const isChecked = !!checkedDocs[doc];
                return (
                  <label
                    key={idx}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer select-none text-xs sm:text-sm ${
                      isChecked
                        ? 'bg-white border-emerald-400 text-emerald-950 shadow-xs'
                        : 'bg-white/80 border-blue-200/80 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDoc(doc)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                      isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={isChecked ? 'line-through text-slate-500' : 'font-medium'}>
                      {doc}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Procedure Steps */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Déroulement de l’accompagnement (4 étapes)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.steps.map((st) => (
                <div key={st.step} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-extrabold text-xs flex items-center justify-center">
                      {st.step}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{st.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 pl-7">{st.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Guarantees */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Les engagements ADN Conseils
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal disclaimer note */}
          <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Rappel de transparence :</strong> ADN Conseils propose un accompagnement préparatoire et méthodologique. Cet accompagnement ne constitue pas une garantie absolue de décision administrative, qui relève de la compétence exclusive de l’État.
            </p>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-100 p-4 sm:p-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <a
            id="service-modal-whatsapp-btn"
            href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Bonjour%20ADN%20Conseil,%20je%20souhaite%20des%20informations%20sur%20le%20service%20:%20${encodeURIComponent(service.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Poser une question sur WhatsApp</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="service-modal-quote-btn"
              onClick={handleRequestQuote}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer"
            >
              Demander un devis & Déposer
            </button>
            <button
              id="service-modal-book-btn"
              onClick={handleBookAppointment}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Prendre RDV</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
