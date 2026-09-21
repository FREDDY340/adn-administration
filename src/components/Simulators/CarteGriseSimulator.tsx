import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Car, FileText, CheckCircle2, Clock, Sparkles, AlertTriangle } from '../IconHelper';

export const CarteGriseSimulator: React.FC = () => {
  const { setIsQuoteModalOpen, setPreselectedServiceCategory } = useData();

  const [vehicleType, setVehicleType] = useState<string>('vp'); // VP, moto, utilitaire
  const [powerCV, setPowerCV] = useState<number>(6);
  const [regionRate, setRegionRate] = useState<number>(54.95); // Île-de-France rate per CV
  const [isElectric, setIsElectric] = useState<boolean>(false);
  const [procedure, setProcedure] = useState<string>('titulaire'); // titulaire, duplicata, adresse, import
  const [ageCategory, setAgeCategory] = useState<string>('less10'); // less10, more10

  // Regional Tax Calculation
  const calculateFees = () => {
    let regionalTax = 0;
    const fixedGestion = 11.00; // Taxe Y.4
    const fixedAcheminement = 2.76; // Taxe Y.5 redevance
    const serviceFee = 35.00; // ADN Conseils service fee

    if (procedure === 'adresse') {
      return {
        fiscalTax: 0,
        fixedFees: 0,
        serviceFee: 15.00,
        total: 15.00,
        cpiTime: 'Sous 24h'
      };
    }

    if (procedure === 'duplicata') {
      return {
        fiscalTax: 0,
        fixedFees: fixedGestion + fixedAcheminement,
        serviceFee: 29.00,
        total: fixedGestion + fixedAcheminement + 29.00,
        cpiTime: 'Immédiat (24h)'
      };
    }

    if (isElectric) {
      regionalTax = 0; // 100% exonéré
    } else {
      let multiplier = 1;
      if (vehicleType === 'moto') multiplier = 0.5;
      if (ageCategory === 'more10') multiplier *= 0.5; // -50% pour les véhicules > 10 ans

      regionalTax = powerCV * regionRate * multiplier;
    }

    const fiscalTotal = Math.round(regionalTax + fixedGestion + fixedAcheminement);
    const total = fiscalTotal + serviceFee;

    return {
      fiscalTax: Math.round(regionalTax),
      fixedFees: fixedGestion + fixedAcheminement,
      serviceFee,
      total,
      cpiTime: 'Délivrance CPI sous 24h'
    };
  };

  const fees = calculateFees();

  const handleStartRequest = () => {
    setPreselectedServiceCategory('cartegrise');
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-100 text-amber-900 rounded-lg">
            <Car className="w-5 h-5" />
          </span>
          <h3 className="text-xl font-bold text-slate-900">Simulateur & Calculateur Carte Grise</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Estimez le coût des taxes officielles d’immatriculation et les frais de traitement pour votre véhicule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Controls */}
        <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm">
          
          {/* Procedure Type */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900 block">Type de démarche :</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'titulaire', label: 'Changement de titulaire (Achat)' },
                { id: 'duplicata', label: 'Duplicata (Perte / Vol)' },
                { id: 'adresse', label: 'Changement d’adresse' },
                { id: 'import', label: 'Véhicule importé (UE)' }
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProcedure(p.id)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    procedure === p.id
                      ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {procedure !== 'adresse' && procedure !== 'duplicata' && (
            <>
              {/* Vehicle Type & Energy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-900 block">Type de véhicule :</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="vp">Voiture particulière (VP)</option>
                    <option value="moto">Moto / Deux-roues (+125cc)</option>
                    <option value="utilitaire">Utilitaire (CTTE)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-900 block">Âge du véhicule :</label>
                  <select
                    value={ageCategory}
                    onChange={(e) => setAgeCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="less10">Moins de 10 ans (Tarif normal)</option>
                    <option value="more10">Plus de 10 ans (-50% taxe régionale)</option>
                  </select>
                </div>
              </div>

              {/* Horsepower & Electric toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Puissance fiscale (CV) :</span>
                    <span className="text-amber-700 font-extrabold">{powerCV} CV</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={powerCV}
                    onChange={(e) => setPowerCV(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 CV</span>
                    <span>12 CV</span>
                    <span>25 CV</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isElectric}
                      onChange={(e) => setIsElectric(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Véhicule 100% Électrique</span>
                      <span className="text-[10px] text-slate-500">Exonération totale taxe Y.1</span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Region selector */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900 block">Région d’immatriculation :</label>
            <select
              value={regionRate}
              onChange={(e) => setRegionRate(parseFloat(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-amber-400"
            >
              <option value={54.95}>Île-de-France (54,95 € / CV)</option>
              <option value={43.00}>Auvergne-Rhône-Alpes (43,00 € / CV)</option>
              <option value={51.20}>Provence-Alpes-Côte d’Azur (51,20 € / CV)</option>
              <option value={48.00}>Hauts-de-France (48,00 € / CV)</option>
              <option value={51.00}>Nouvelle-Aquitaine (51,00 € / CV)</option>
              <option value={55.00}>Occitanie (55,00 € / CV)</option>
            </select>
          </div>

        </div>

        {/* Estimation Summary Box */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl border border-slate-800">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Devis estimatif</span>
            <h4 className="text-xl font-black text-white mt-0.5">Détail du coût prévisionnel</h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Taxe régionale (Y.1) :</span>
              <span className="font-semibold text-white">{fees.fiscalTax.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Frais de gestion & acheminement ANTS :</span>
              <span className="font-semibold text-white">{fees.fixedFees.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-amber-300 pt-1 border-t border-slate-800 font-medium">
              <span>Accompagnement & saisie ADN Conseils :</span>
              <span className="font-bold">{fees.serviceFee.toFixed(2)} €</span>
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total estimé</span>
              <div className="text-2xl font-black text-amber-400">{fees.total.toFixed(2)} €</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3" />
                {fees.cpiTime}
              </span>
              <span className="text-[10px] text-slate-400">CPI officiel remis</span>
            </div>
          </div>

          {/* CT & Documents reminder */}
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 space-y-1">
            <p className="font-bold text-white">Pièces à fournir :</p>
            <p className="text-[10px] text-slate-400">
              Ancienne carte grise barrée + Certificat de cession + Contrôle technique valide (-6 mois) + Pièce d’identité & Permis.
            </p>
          </div>

          <button
            id="btn-start-cartegrise-request"
            type="button"
            onClick={handleStartRequest}
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>Faire ma carte grise en ligne</span>
          </button>
        </div>

      </div>

    </div>
  );
};
