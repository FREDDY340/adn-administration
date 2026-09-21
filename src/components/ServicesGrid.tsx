import React from 'react';
import { useData } from '../context/DataContext';
import {
  Users,
  Building2,
  Car,
  FileText,
  ShieldCheck,
  Clock,
  MapPin,
  Award,
  ArrowRight
} from './IconHelper';

export const ServicesGrid: React.FC = () => {
  const { setActiveServiceSlug } = useData();

  const domainCards = [
    {
      id: 'etrangers',
      slug: 'droit-des-etrangers',
      title: 'Droit des étrangers',
      description: 'Titre de séjour, renouvellement, changement de statut, regroupement familial...',
      icon: Users,
      iconType: 'users'
    },
    {
      id: 'nationalite',
      slug: 'nationalite-francaise',
      title: 'Nationalité française',
      description: 'Naturalisation, déclaration par mariage, constitution de dossier...',
      icon: Award,
      iconType: 'flag'
    },
    {
      id: 'domiciliation-pro',
      slug: 'domiciliation-entreprise',
      title: "Domiciliation d'entreprise",
      description: 'Adresse professionnelle, réception courrier, salles de réunion...',
      icon: Building2,
      iconType: 'building'
    },
    {
      id: 'domiciliation-perso',
      slug: 'domiciliation-personnelle',
      title: 'Domiciliation personnelle',
      description: 'Adresse de correspondance, courrier administratif, accompagnement...',
      icon: Users,
      iconType: 'person'
    },
    {
      id: 'cartegrise',
      slug: 'carte-grise-immatriculation',
      title: 'Carte grise',
      description: "Changement de titulaire, changement d'adresse, duplicata, importation...",
      icon: Car,
      iconType: 'car'
    },
    {
      id: 'traduction',
      slug: 'traduction-assermentee',
      title: 'Traduction de documents',
      description: 'Traduction agréée toutes langues, documents officiels...',
      icon: FileText,
      iconType: 'document'
    }
  ];

  return (
    <section id="services-section" className="py-14 sm:py-18 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with red underline */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c2340] tracking-tight">
            Nos domaines d’expertise
          </h2>
          <div className="w-9 h-[2.5px] bg-[#d32f2f] mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* 6 Domain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4.5">
          {domainCards.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                id={`service-card-${item.id}`}
                onClick={() => setActiveServiceSlug(item.slug)}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group cursor-pointer text-center"
              >
                <div className="flex flex-col items-center">
                  {/* Round Blue Icon Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#1e40af] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    {item.iconType === 'flag' ? (
                      <span className="text-base font-bold">🇫🇷</span>
                    ) : (
                      <IconComp className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-black text-[#0c2340] leading-snug mb-2 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Link */}
                <div className="pt-4 mt-2">
                  <span className="text-[11.5px] font-bold text-[#1e40af] group-hover:text-blue-800 flex items-center justify-center gap-1">
                    <span>En savoir plus</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Reassurance Bar (4 Columns) */}
        <div className="mt-14 pt-10 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Trust 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-red-50 text-[#d32f2f] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#0c2340]">
                Accompagnement de confiance
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed">
                Écoute, transparence et confidentialité garanties.
              </p>
            </div>
          </div>

          {/* Trust 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-red-50 text-[#d32f2f] flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#0c2340]">
                1000+ Clients accompagnés
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed">
                Particuliers, entrepreneurs et entreprises.
              </p>
            </div>
          </div>

          {/* Trust 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-red-50 text-[#d32f2f] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#0c2340]">
                Délais respectés
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed">
                Un suivi rigoureux et des réponses rapides.
              </p>
            </div>
          </div>

          {/* Trust 4 */}
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-red-50 text-[#d32f2f] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#0c2340]">
                Proche de vous
              </h4>
              <p className="text-[11.5px] text-slate-500 leading-relaxed">
                119 avenue de Fontainebleau, Kremlin-Bicêtre, 94270 Île-de-France
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
