import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Calendar,
  FileText,
  ChevronRight,
  ArrowLeft,
  RotateCcw
} from '../IconHelper';

export const NationalitySimulator: React.FC = () => {
  const { setIsAppointmentModalOpen, setIsQuoteModalOpen, setPreselectedServiceCategory } = useData();

  const [residenceYears, setResidenceYears] = useState<string>('5plus');
  const [frenchLevel, setFrenchLevel] = useState<string>('b1plus');
  const [jobStatus, setJobStatus] = useState<string>('cdi');
  const [taxesStatus, setTaxesStatus] = useState<string>('clean');
  const [recordStatus, setRecordStatus] = useState<string>('clean');
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const calculateScore = () => {
    let score = 0;
    const pointsOfAttention: string[] = [];
    const strongPoints: string[] = [];

    // Residence
    if (residenceYears === '5plus') {
      score += 30;
      strongPoints.push('Condition de durée de résidence en France validée (5 ans et plus).');
    } else if (residenceYears === 'grad_fr') {
      score += 30;
      strongPoints.push('Réduction de stage à 2 ans validée grâce à votre diplôme d’études supérieures français.');
    } else if (residenceYears === '2to4') {
      score += 15;
      pointsOfAttention.push('Moins de 5 ans de résidence : nécessite une dérogation (diplôme supérieur, services exceptionnels ou réfugié).');
    } else {
      score += 5;
      pointsOfAttention.push('Durée de résidence trop courte pour une naturalisation par décret standard (minimum 5 ans requis).');
    }

    // French
    if (frenchLevel === 'b1plus' || frenchLevel === 'b2plus') {
      score += 25;
      strongPoints.push('Niveau de langue française conforme aux exigences préfectorales (B1 ou supérieur).');
    } else if (frenchLevel === 'a2') {
      score += 10;
      pointsOfAttention.push('Le niveau A2 est insuffisant pour la naturalisation (attestation B1 oral et écrit requise).');
    } else {
      score += 0;
      pointsOfAttention.push('Vous devez obtenir une certification de langue officielle (TCF, DELF) de niveau B1 minimum.');
    }

    // Job
    if (jobStatus === 'cdi' || jobStatus === 'indep_stable') {
      score += 25;
      strongPoints.push('Insertion professionnelle et autonomie financière stables.');
    } else if (jobStatus === 'cdd_interim') {
      score += 15;
      pointsOfAttention.push('L’administration examine la régularité et le montant moyen de vos revenus sur les 3 dernières années.');
    } else {
      score += 5;
      pointsOfAttention.push('L’absence de revenus propres stables peut constituer un motif de rejet ou d’ajournement.');
    }

    // Taxes
    if (taxesStatus === 'clean') {
      score += 10;
      strongPoints.push('Situation fiscale régulière (bordereau P237 sans arriérés).');
    } else {
      score += 0;
      pointsOfAttention.push('Attention : tout reliquat d’impôt ou retard de déclaration doit être soldé avant le dépôt.');
    }

    // Record
    if (recordStatus === 'clean') {
      score += 10;
      strongPoints.push('Casier judiciaire vierge.');
    } else {
      score += 0;
      pointsOfAttention.push('Toute mention au bulletin n°2 du casier judiciaire peut motiver un ajournement.');
    }

    return { score, strongPoints, pointsOfAttention };
  };

  const { score, strongPoints, pointsOfAttention } = calculateScore();

  const handleReset = () => {
    setResidenceYears('5plus');
    setFrenchLevel('b1plus');
    setJobStatus('cdi');
    setTaxesStatus('clean');
    setRecordStatus('clean');
    setHasCompleted(false);
  };

  const handleBook = () => {
    setIsAppointmentModalOpen(true);
  };

  const handleQuote = () => {
    setPreselectedServiceCategory('nationalite');
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-100 text-blue-900 rounded-lg">
              <Award className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">Simulateur d’Éligibilité à la Nationalité</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Évaluez vos chances d’acceptation selon les critères officiels de la naturalisation par décret.
          </p>
        </div>

        {hasCompleted && (
          <button
            onClick={handleReset}
            className="self-start sm:self-auto text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recommencer le test</span>
          </button>
        )}
      </div>

      {!hasCompleted ? (
        <div className="space-y-5">
          {/* Question 1: Durée de résidence */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-900 block">
              1. Depuis combien de temps résidez-vous régulièrement en France ?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: '5plus', label: '5 ans ou plus consécutifs' },
                { id: 'grad_fr', label: '2 ans + Diplômé de l’enseignement supérieur français (Master/Licence)' },
                { id: '2to4', label: 'Entre 2 et 4 ans' },
                { id: 'less2', label: 'Moins de 2 ans' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setResidenceYears(opt.id)}
                  className={`p-3 rounded-xl border text-left font-medium transition-all ${
                    residenceYears === opt.id
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Langue française */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-900 block">
              2. Quel est votre niveau de maîtrise de la langue française ?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'b2plus', label: 'B2 ou supérieur (Très à l’aise à l’oral et à l’écrit)' },
                { id: 'b1plus', label: 'B1 certifié (TCF, DELF ou diplôme équivalent)' },
                { id: 'a2', label: 'A2 (Conversation simple de base)' },
                { id: 'no_cert', label: 'Pas encore de diplôme ou certificat officiel' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFrenchLevel(opt.id)}
                  className={`p-3 rounded-xl border text-left font-medium transition-all ${
                    frenchLevel === opt.id
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Situation professionnelle */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-bold text-slate-900 block">
              3. Quelle est votre situation professionnelle actuelle ?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'cdi', label: 'En CDI stable (plus de 1 an)' },
                { id: 'indep_stable', label: 'Indépendant / Chef d’entreprise avec bilans positifs' },
                { id: 'cdd_interim', label: 'En CDD / Intérim / Missions' },
                { id: 'other', label: 'Étudiant / En recherche d’emploi / Sans activité' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setJobStatus(opt.id)}
                  className={`p-3 rounded-xl border text-left font-medium transition-all ${
                    jobStatus === opt.id
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4 & 5 inline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-900 block">
                4. Déclarations fiscales & impôts :
              </label>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setTaxesStatus('clean')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all ${
                    taxesStatus === 'clean'
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  À jour (3 derniers avis d’imposition sans dette)
                </button>
                <button
                  type="button"
                  onClick={() => setTaxesStatus('issue')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all ${
                    taxesStatus === 'issue'
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Retard ou régularisation en cours
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-900 block">
                5. Casier judiciaire :
              </label>
              <div className="space-y-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setRecordStatus('clean')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all ${
                    recordStatus === 'clean'
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Vierge (France et pays d’origine)
                </button>
                <button
                  type="button"
                  onClick={() => setRecordStatus('issue')}
                  className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all ${
                    recordStatus === 'issue'
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Incident mineur ou antécédent
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              id="btn-calculate-nationality-score"
              type="button"
              onClick={() => setHasCompleted(true)}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Calculer mon indice d’éligibilité</span>
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Score Badge */}
          <div className={`p-5 rounded-2xl border ${
            score >= 80
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : score >= 50
              ? 'bg-amber-50 border-amber-200 text-amber-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                  Résultat de l’évaluation préliminaire
                </span>
                <h4 className="text-2xl font-extrabold mt-1">
                  {score >= 80 ? 'Indice Très Favorable (Dossier Solide)' : score >= 50 ? 'Indice Favorable (Points à consolider)' : 'Préparation Préalable Requise'}
                </h4>
                <p className="text-xs sm:text-sm mt-1 opacity-90">
                  {score >= 80
                    ? 'Vos critères principaux correspondent aux exigences de la naturalisation par décret.'
                    : score >= 50
                    ? 'Votre profil présente de bons atouts mais certains éléments nécessitent un audit avant dépôt.'
                    : 'Certaines conditions fondamentales doivent être consolidées avant de déposer sur NATALI.'}
                </p>
              </div>
              <div className="text-center sm:text-right shrink-0 bg-white/80 p-3 rounded-xl border border-current/20">
                <div className="text-3xl font-black">{score} / 100</div>
                <div className="text-[10px] font-bold uppercase">Indice calculé</div>
              </div>
            </div>
          </div>

          {/* Details breakdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            
            {/* Strong Points */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Vos points forts identifiés ({strongPoints.length})
              </h5>
              <ul className="space-y-1.5 text-slate-700">
                {strongPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Points of attention */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Points de vigilance à vérifier ({pointsOfAttention.length})
              </h5>
              {pointsOfAttention.length > 0 ? (
                <ul className="space-y-1.5 text-slate-700">
                  {pointsOfAttention.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 italic">Aucun point de blocage majeur détecté.</p>
              )}
            </div>

          </div>

          {/* Next Steps CTA */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h5 className="font-bold text-amber-400 text-sm sm:text-base">Préparez votre dossier avec ADN Conseils</h5>
              <p className="text-xs text-slate-300">
                Nous vérifions vos actes civils étrangers, vos traductions assermentées et vous entraînons à l’entretien républicain.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleBook}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
              >
                Prendre rendez-vous
              </button>
              <button
                onClick={handleQuote}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 cursor-pointer"
              >
                Demander un devis
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
