import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Languages, FileText, CheckCircle2, Clock, Upload, ShieldCheck } from '../IconHelper';

export const TraductionEstimator: React.FC = () => {
  const { setIsQuoteModalOpen, setPreselectedServiceCategory } = useData();

  const [sourceLang, setSourceLang] = useState<string>('ar');
  const [targetLang, setTargetLang] = useState<string>('fr');
  const [docType, setDocType] = useState<string>('birth');
  const [pageCount, setPageCount] = useState<number>(1);
  const [isExpress, setIsExpress] = useState<boolean>(false);

  const calculateQuote = () => {
    let basePerPage = 30; // base price

    if (docType === 'jugement' || docType === 'contrat') {
      basePerPage = 38;
    } else if (docType === 'diploma') {
      basePerPage = 32;
    }

    if (sourceLang === 'ru' || sourceLang === 'zh' || sourceLang === 'tr') {
      basePerPage += 5;
    }

    let subtotal = basePerPage * pageCount;
    if (isExpress) {
      subtotal += 20; // 24h express fee
    }

    return {
      pricePerPage: basePerPage,
      total: subtotal,
      delay: isExpress ? '24h ouvrées (Express)' : '48h à 72h ouvrées (Standard)',
    };
  };

  const quote = calculateQuote();

  const handleOrder = () => {
    setPreselectedServiceCategory('traduction');
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-100 text-emerald-900 rounded-lg">
            <Languages className="w-5 h-5" />
          </span>
          <h3 className="text-xl font-bold text-slate-900">Estimateur Traduction Assermentée</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Traductions officielles certifiées par des traducteurs assermentés près une Cour d’appel (conformes Préfectures & Mairies).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Input Parameters */}
        <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm">
          
          {/* Language Pair */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">Langue d’origine (Source) :</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-400"
              >
                <option value="ar">Arabe (العربية)</option>
                <option value="en">Anglais (English)</option>
                <option value="es">Espagnol (Español)</option>
                <option value="pt">Portugais (Português)</option>
                <option value="tr">Turc (Türkçe)</option>
                <option value="ru">Russe (Русский)</option>
                <option value="zh">Chinois (中文)</option>
                <option value="ro">Roumain (Română)</option>
                <option value="it">Italien (Italiano)</option>
                <option value="de">Allemand (Deutsch)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 block">Langue cible :</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-emerald-400"
              >
                <option value="fr">Français (Pour démarches en France)</option>
                <option value="en">Anglais (Pour ambassades / international)</option>
                <option value="ar">Arabe (Pour consulats)</option>
                <option value="es">Espagnol</option>
              </select>
            </div>
          </div>

          {/* Document Type */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900 block">Type de document :</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'birth', label: 'Acte de naissance / Mariage' },
                { id: 'diploma', label: 'Diplôme / Relevé de notes' },
                { id: 'record', label: 'Casier judiciaire' },
                { id: 'permis', label: 'Permis de conduire' },
                { id: 'jugement', label: 'Jugement / Divorce' },
                { id: 'contrat', label: 'Contrat commercial / Statuts' }
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDocType(d.id)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    docType === d.id
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page count & Express toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-2">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 flex justify-between">
                <span>Nombre de pages :</span>
                <span className="text-emerald-700 font-extrabold">{pageCount} page(s)</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={pageCount}
                  onChange={(e) => setPageCount(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 page</span>
                <span>5 pages</span>
                <span>10 pages</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={(e) => setIsExpress(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-400"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Délai Express 24h</span>
                  <span className="text-[10px] text-slate-500">Prise en charge prioritaire (+20 €)</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Translation Quote Box */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl border border-slate-800">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Devis indicatif immédiat</span>
            <h4 className="text-xl font-black text-white mt-0.5">Traduction Assermentée</h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Tarif par page certifiée :</span>
              <span className="font-semibold text-white">{quote.pricePerPage} € / page</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Pages sélectionnées :</span>
              <span className="font-semibold text-white">{pageCount}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Délai garanti :</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {quote.delay}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total estimé TTC</span>
              <div className="text-2xl font-black text-emerald-400">{quote.total} €</div>
            </div>
            <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
              Tampon officiel inclus
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 space-y-1">
            <p className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Validité 100% garantie
            </p>
            <p className="text-[10px] text-slate-400">
              Traducteur inscrit près la Cour d’appel. Livré au format PDF certifié + expédition postale sur demande.
            </p>
          </div>

          <button
            id="btn-start-translation-quote"
            type="button"
            onClick={handleOrder}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-slate-950" />
            <span>Déposer mon document & Confirmer</span>
          </button>
        </div>

      </div>

    </div>
  );
};
