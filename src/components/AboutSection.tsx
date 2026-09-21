import React from 'react';
import { useData } from '../context/DataContext';
import { ShieldCheck, Award, Users, MapPin, Languages, Sparkles } from './IconHelper';

export const AboutSection: React.FC = () => {
  const { settings } = useData();

  return (
    <section id="about-section" className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title with red underline */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
            Le Cabinet ADN Conseils
          </h2>
          <div className="w-9 h-[2.5px] bg-[#d32f2f] mx-auto mt-2.5 rounded-full"></div>
          <p className="text-xs sm:text-sm text-slate-500 mt-3">
            Votre partenaire de confiance au Kremlin-Bicêtre pour toutes vos formalités administratives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Presentation */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-xl sm:text-2xl font-black text-[#0c2340] tracking-tight leading-tight">
              Une équipe d’experts dédiée à la réussite de vos démarches
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Implanté au <strong>119 avenue de Fontainebleau au Kremlin-Bicêtre (94270)</strong>, <strong>ADN Conseils</strong> est né d'une conviction forte : les formalités administratives et juridiques ne doivent plus être un parcours du combattant ou une source d'angoisse pour les particuliers, les ressortissants étrangers et les chefs d’entreprise.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Nous mettons à votre service notre expertise rigoureuse des procédures en Préfecture, des exigences de l'ANTS, des critères de nationalité et de la domiciliation d'entreprise pour vous offrir un accompagnement personnalisé, transparent et efficace.
            </p>

            {/* Core Values 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#0c2340] text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#d32f2f]" />
                  <span>Confidentialité Absolue</span>
                </div>
                <p className="text-[11.5px] text-slate-500">Vos actes civils et informations privées sont traités avec la plus stricte discrétion.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#0c2340] text-xs sm:text-sm">
                  <Award className="w-4 h-4 text-[#1e40af]" />
                  <span>Rigueur & Anti-rejet</span>
                </div>
                <p className="text-[11.5px] text-slate-500">Audit de conformité ligne par ligne pour éviter les suspensions et retards d'instruction.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#0c2340] text-xs sm:text-sm">
                  <Languages className="w-4 h-4 text-emerald-600" />
                  <span>Accueil Multilingue</span>
                </div>
                <p className="text-[11.5px] text-slate-500">Communication fluide en Français, Arabe, Anglais, Espagnol et Turc.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#0c2340] text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Transparence Totale</span>
                </div>
                <p className="text-[11.5px] text-slate-500">Aucun faux espoir : nous posons un diagnostic lucide et honnête dès le 1er échange.</p>
              </div>
            </div>

            {/* Languages spoken badges */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#0c2340] block mb-2">Langues parlées au cabinet :</span>
              <div className="flex flex-wrap gap-2">
                {settings.languagesSpoken.map((lang) => (
                  <span
                    key={lang}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Card / Localisation */}
          <div className="lg:col-span-5">
            <div className="bg-[#0c2340] text-white rounded-3xl p-7 sm:p-8 shadow-xl border border-slate-800 space-y-6 relative overflow-hidden">
              
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#d32f2f] tracking-wider">Notre engagement</span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  ADN Conseils — Le Kremlin-Bicêtre
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Situé aux portes de Paris, accessible en 2 minutes à pied du Métro Ligne 7 (Station Kremlin-Bicêtre ou Porte d’Italie).
                </p>
              </div>

              {/* Info details */}
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#d32f2f] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Adresse physique :</strong>
                    <span>{settings.address}, {settings.postalCode} {settings.city}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Award className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Accès Transports :</strong>
                    <span>Métro Ligne 7 • Bus 47, 125, 131, 185 • Tramway T3a (Porte d'Italie)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Modalités de réception :</strong>
                    <span>Sur rendez-vous du lundi au samedi • Accompagnement en ligne possible partout en France</span>
                  </div>
                </div>
              </div>

              {/* Status pill */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Dossiers traités : Île-de-France & National</span>
                </div>
                <span className="text-amber-400 font-bold text-[11px]">94270</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
