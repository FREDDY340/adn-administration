import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, Key, AlertTriangle, CheckCircle2, ShieldCheck, X } from '../IconHelper';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setIsAdminModalOpen, settings } = useData();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (!success) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-md mx-auto space-y-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-lg border border-slate-800">
        <Lock className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-xl font-extrabold text-slate-900">Espace d’Administration Sécurisé</h3>
        <p className="text-xs text-slate-500 mt-1">
          Réservé à l’équipe de gestion d’ADN Conseils pour administrer les contenus et les demandes clients.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            Code d’accès PIN / Mot de passe :
          </label>
          <div className="relative">
            <input
              type="password"
              autoFocus
              required
              placeholder="Saisissez le code PIN..."
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-amber-400 font-mono text-center text-lg tracking-widest text-slate-900"
            />
          </div>
          {error && (
            <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Code PIN incorrect. Veuillez réessayer.</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Key className="w-4 h-4 text-amber-400" />
          <span>Accéder au panneau de gestion</span>
        </button>
      </form>

      {/* Demo helper */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left space-y-1">
        <div className="font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Code d’accès par défaut :</span>
        </div>
        <p className="text-[11px]">
          Utilisez le code <code className="bg-amber-200/80 px-1.5 py-0.5 rounded font-mono font-bold text-slate-900">{settings.adminPin}</code> pour déverrouiller l’espace (modifiable dans les paramètres).
        </p>
      </div>

    </div>
  );
};
