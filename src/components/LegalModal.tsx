import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ShieldCheck, X, FileText, Lock, Info, AlertTriangle } from './IconHelper';

export const LegalModal: React.FC = () => {
  const { isLegalModalOpen, setIsLegalModalOpen, settings } = useData();
  const [activeTab, setActiveTab] = useState<'mentions' | 'confidentialite' | 'cgs'>('mentions');

  if (!isLegalModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        id="legal-mentions-modal"
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Cadre Légal, Confidentialité & RGPD
              </h2>
              <p className="text-xs text-slate-400">
                Transparence réglementaire pour {settings.companyName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLegalModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center gap-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('mentions')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'mentions' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mentions Légales
          </button>
          <button
            onClick={() => setActiveTab('confidentialite')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'confidentialite' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Politique de Confidentialité (RGPD)
          </button>
          <button
            onClick={() => setActiveTab('cgs')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'cgs' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conditions Générales de Service
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {activeTab === 'mentions' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">1. Identification de l’Éditeur</h3>
                <p>
                  <strong>Dénomination sociale :</strong> {settings.companyName}<br />
                  <strong>Activité :</strong> Conseil et accompagnement aux démarches administratives<br />
                  <strong>Adresse du siège social :</strong> {settings.address}, {settings.postalCode} {settings.city} (France)<br />
                  <strong>Téléphone :</strong> {settings.phoneDisplay}<br />
                  <strong>E-mail de contact :</strong> {settings.email}<br />
                  <strong>Directeur de la publication :</strong> Direction Générale ADN Conseils
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">2. Hébergement du site</h3>
                <p>
                  Le site internet est hébergé sur une infrastructure sécurisée conforme aux standards européens de haute disponibilité et de protection des données (Google Cloud Platform / Cloud Run).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1 text-amber-950">
                <h4 className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  3. Avertissement de Non-Affiliation Administrative
                </h4>
                <p className="text-xs">
                  {settings.disclaimerText}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'confidentialite' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Collecte et Traitement des Données (RGPD)</h3>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD n° 2016/679) et à la loi Informatique et Libertés, les données recueillies sur ce site (formulaires de contact, devis, prise de rendez-vous, pièces justificatives téléversées) sont traitées exclusivement par l'équipe autorisée d'ADN Conseils.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Finalités du traitement</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Étude de faisabilité et diagnostic de votre dossier administratif</li>
                  <li>Établissement des devis personnalisés</li>
                  <li>Organisation et suivi de vos rendez-vous</li>
                  <li>Prise de contact par téléphone, e-mail ou WhatsApp selon votre choix</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Durée de conservation et Sécurité</h3>
                <p>
                  Vos documents d'identité et actes sensibles ne sont conservés que pour la durée stricte nécessaire au montage et à l'instruction de votre dossier. Vous disposez d'un droit d'accès, de rectification et de suppression totale de vos données en écrivant à <strong>{settings.email}</strong>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'cgs' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">1. Objet des prestations</h3>
                <p>
                  ADN Conseils délivre des prestations d'assistance matérielle, de formalisme administratif, de vérification documentaire, de domiciliation d'entreprise et de mise en relation avec des traducteurs experts assermentés.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">2. Obligation de moyens</h3>
                <p>
                  L'accompagnement fourni par ADN Conseils s'entend comme une obligation de moyens. L'issue finale de toute demande (octroi de titre de séjour, décret de naturalisation, certificat d'immatriculation) dépend exclusivement de l'appréciation souveraine de l'autorité préfectorale ou étatique compétente.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">3. Tarifs et Paiement</h3>
                <p>
                  Tous nos tarifs font l'objet d'un devis préalable validé par le client avant toute intervention. Les prestations de domiciliation d'entreprise font l'objet d'un contrat commercial d'une durée minimale de 3 mois conformément à la réglementation.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={() => setIsLegalModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
