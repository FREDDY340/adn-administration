import React, { useRef, useState } from 'react';
import { useData } from '../../context/DataContext';
import { Download, Upload, RefreshCw, CheckCircle2, AlertTriangle, Database } from '../IconHelper';

export const AdminBackup: React.FC = () => {
  const { exportDataJSON, importDataJSON, resetToDefaults } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adn_conseil_sauvegarde_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setFeedback({
      type: 'success',
      message: 'Sauvegarde JSON téléchargée avec succès sur votre appareil !'
    });
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const success = importDataJSON(content);
        if (success) {
          setFeedback({
            type: 'success',
            message: 'Données restaurées avec succès !'
          });
        } else {
          setFeedback({
            type: 'error',
            message: 'Fichier JSON invalide. Veuillez vérifier le format du fichier.'
          });
        }
      } catch (err) {
        setFeedback({
          type: 'error',
          message: 'Erreur lors de la lecture du fichier JSON.'
        });
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données aux valeurs par défaut d’ADN Conseils ?')) {
      resetToDefaults();
      setFeedback({
        type: 'success',
        message: 'Toutes les données ont été réinitialisées avec succès aux données d’usine.'
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h3 className="text-xl font-bold text-slate-900">Sauvegarde & Restauration (Export / Import)</h3>
        <p className="text-xs text-slate-500">
          Exportez l'intégralité du contenu du site, des demandes clients et des paramètres sous forme de fichier JSON, ou restaurez une sauvegarde précédente.
        </p>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2 ${
          feedback.type === 'success'
            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
            : 'bg-rose-50 text-rose-900 border-rose-300'
        }`}>
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-700 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Export */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Exporter les données</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Téléchargez un fichier JSON complet comprenant les services, articles de blog, FAQ, avis clients, demandes CRM et paramètres.
            </p>
          </div>

          <button
            onClick={handleExport}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Télécharger JSON</span>
          </button>
        </div>

        {/* Card 2: Import */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Upload className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Restaurer un fichier</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Importez un fichier JSON généré précédemment pour remplacer les données actuelles en quelques secondes.
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json,application/json"
              onChange={handleImportFile}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>Sélectionner le fichier JSON</span>
            </button>
          </div>
        </div>

        {/* Card 3: Reset */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Remise à zéro d'usine</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rétablit les données de démonstration initiales complètes d'ADN Conseils (services officiels, simulateurs, guides et avis vérifiés).
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-rose-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Réinitialiser aux valeurs par défaut</span>
          </button>
        </div>

      </div>

    </div>
  );
};
