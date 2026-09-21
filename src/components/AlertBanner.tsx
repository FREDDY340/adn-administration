import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Info, AlertTriangle, CheckCircle2, X } from '../components/IconHelper';

export const AlertBanner: React.FC = () => {
  const { settings } = useData();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!settings.alertBanner?.enabled || isDismissed || !settings.alertBanner?.message) {
    return null;
  }

  const getTheme = () => {
    switch (settings.alertBanner.type) {
      case 'warning':
        return 'bg-amber-500 text-slate-950 border-amber-600';
      case 'success':
        return 'bg-emerald-600 text-white border-emerald-700';
      case 'info':
      default:
        return 'bg-slate-900 text-slate-100 border-slate-800';
    }
  };

  const getIcon = () => {
    switch (settings.alertBanner.type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-slate-950 shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  return (
    <div id="site-alert-banner" className={`w-full text-xs sm:text-sm py-2 px-4 border-b flex items-center justify-between transition-all ${getTheme()}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-1 text-center font-medium">
        {getIcon()}
        <span>{settings.alertBanner.message}</span>
      </div>
      <button
        id="dismiss-alert-banner-btn"
        onClick={() => setIsDismissed(true)}
        className="text-current opacity-70 hover:opacity-100 p-1 transition-opacity ml-2"
        aria-label="Fermer la bannière"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
