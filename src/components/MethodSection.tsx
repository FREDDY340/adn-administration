import React from 'react';
import { FileText, CheckCircle2, ClipboardList, Check } from './IconHelper';

export const MethodSection: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Analyse de votre besoin',
      description: 'Vous nous expliquez votre situation et nous identifions la démarche la plus adaptée.',
      icon: ClipboardList
    },
    {
      num: 2,
      title: 'Préparation & accompagnement',
      description: 'Nous préparons votre dossier, vérifions les documents et vous guidons à chaque étape.',
      icon: FileText
    },
    {
      num: 3,
      title: 'Suivi & dépôt',
      description: "Nous assurons le suivi de votre demande et restons disponibles jusqu'à la fin de la procédure.",
      icon: Check
    }
  ];

  return (
    <section id="method-section" className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title with red underline */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
            Comment ça fonctionne ?
          </h2>
          <div className="w-9 h-[2.5px] bg-[#d32f2f] mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* 3 Connected Steps */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Connecting dotted line for desktop */}
          <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1.5px] border-t-2 border-dotted border-slate-300 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10 text-center">
            {steps.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center space-y-4 px-2">
                  
                  {/* Step header with Number circle & Icon box */}
                  <div className="flex items-center justify-center gap-3">
                    {/* Red number circle */}
                    <div className="w-7 h-7 rounded-full bg-[#d32f2f] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                      {step.num}
                    </div>

                    {/* Icon Card */}
                    <div className="w-13 h-13 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700">
                      <IconComp className="w-6 h-6 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Title & description */}
                  <div className="space-y-2 max-w-xs">
                    <h3 className="text-sm sm:text-base font-bold text-[#0c2340]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
