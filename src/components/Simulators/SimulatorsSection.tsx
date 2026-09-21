import React, { useState } from 'react';
import { NationalitySimulator } from './NationalitySimulator';
import { CarteGriseSimulator } from './CarteGriseSimulator';
import { TraductionEstimator } from './TraductionEstimator';
import { Award, Car, Languages, Sparkles } from '../IconHelper';

export const SimulatorsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nationality' | 'cartegrise' | 'traduction'>('nationality');

  return (
    <section id="simulators-section" className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Outils interactifs & Calculs instantanés
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
            Simulateurs & Tests d’Éligibilité
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Obtenez une première estimation claire et transparente de vos démarches avant de prendre rendez-vous.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            id="tab-sim-nationality"
            onClick={() => setActiveTab('nationality')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'nationality'
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Award className={`w-4 h-4 ${activeTab === 'nationality' ? 'text-amber-400' : 'text-blue-600'}`} />
            <span>Test Éligibilité Nationalité</span>
          </button>

          <button
            id="tab-sim-cartegrise"
            onClick={() => setActiveTab('cartegrise')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'cartegrise'
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Car className={`w-4 h-4 ${activeTab === 'cartegrise' ? 'text-amber-400' : 'text-amber-600'}`} />
            <span>Calculateur Carte Grise</span>
          </button>

          <button
            id="tab-sim-traduction"
            onClick={() => setActiveTab('traduction')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'traduction'
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Languages className={`w-4 h-4 ${activeTab === 'traduction' ? 'text-amber-400' : 'text-emerald-600'}`} />
            <span>Devis Traduction Assermentée</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'nationality' && <NationalitySimulator />}
          {activeTab === 'cartegrise' && <CarteGriseSimulator />}
          {activeTab === 'traduction' && <TraductionEstimator />}
        </div>

      </div>
    </section>
  );
};
