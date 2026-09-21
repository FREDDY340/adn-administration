import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SiteSettings } from '../../types';
import { Settings, Lock, CheckCircle2, Building2, Phone, Mail, Clock, AlertTriangle, Key } from '../IconHelper';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useData();

  const [companyName, setCompanyName] = useState(settings.companyName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [address, setAddress] = useState(settings.address);
  const [postalCode, setPostalCode] = useState(settings.postalCode);
  const [city, setCity] = useState(settings.city);
  const [phone, setPhone] = useState(settings.phone);
  const [phoneDisplay, setPhoneDisplay] = useState(settings.phoneDisplay);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);
  
  // Alert Banner
  const [alertEnabled, setAlertEnabled] = useState(settings.alertBanner.enabled);
  const [alertText, setAlertText] = useState(settings.alertBanner.text);
  const [alertType, setAlertType] = useState(settings.alertBanner.type);

  // Disclaimer
  const [disclaimerText, setDisclaimerText] = useState(settings.disclaimerText);

  // Admin PIN
  const [adminPin, setAdminPin] = useState(settings.adminPin);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: SiteSettings = {
      ...settings,
      companyName,
      tagline,
      address,
      postalCode,
      city,
      phone,
      phoneDisplay,
      whatsapp,
      email,
      disclaimerText,
      adminPin,
      alertBanner: {
        enabled: alertEnabled,
        text: alertText,
        type: alertType as any
      }
    };

    updateSettings(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Paramètres Généraux du Cabinet</h3>
          <p className="text-xs text-slate-500">
            Coordonnées, horaires, bannière d’alerte et sécurité d’accès.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isSaved ? 'Enregistré avec succès !' : 'Enregistrer tous les paramètres'}</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>Vos modifications ont été appliquées immédiatement sur l’ensemble du site internet !</span>
        </div>
      )}

      {/* 1. Identification & Coordonnées */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span>Coordonnées & Informations Légales</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Nom de l'entreprise :</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Slogan / Sous-titre :</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="space-y-1 sm:col-span-2">
            <label className="font-bold text-slate-700 block">Adresse physique :</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Code Postal & Ville :</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-24 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Téléphone (Format d'appel) :</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Téléphone (Affichage) :</label>
            <input
              type="text"
              value={phoneDisplay}
              onChange={(e) => setPhoneDisplay(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700 block">Numéro WhatsApp :</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-1 text-xs sm:text-sm">
          <label className="font-bold text-slate-700 block">Adresse E-mail de contact :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
          />
        </div>
      </div>

      {/* 2. Bannière d'alerte en haut du site */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Bannière d’Alerte & Annonces (Haut de page)</span>
        </h4>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={alertEnabled}
              onChange={(e) => setAlertEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600"
            />
            <span>Activer la bannière d’information en haut du site</span>
          </label>
        </div>

        {alertEnabled && (
          <div className="space-y-3 pt-2">
            <div className="space-y-1 text-xs sm:text-sm">
              <label className="font-bold text-slate-700 block">Texte de l'annonce :</label>
              <textarea
                rows={2}
                value={alertText}
                onChange={(e) => setAlertText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900"
              />
            </div>

            <div className="space-y-1 text-xs sm:text-sm">
              <label className="font-bold text-slate-700 block">Style d'alerte :</label>
              <select
                value={alertType}
                onChange={(e) => setAlertType(e.target.value as any)}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs"
              >
                <option value="info">Bleu / Neutre (Information)</option>
                <option value="warning">Ambre / Doré (Avertissement préfectoral)</option>
                <option value="success">Émeraude (Bonne nouvelle / Disponibilité)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 3. Sécurité PIN & Avertissement Légal */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-500" />
          <span>Sécurité d'accès & Avertissement Légal</span>
        </h4>

        <div className="space-y-1 text-xs sm:text-sm max-w-xs">
          <label className="font-bold text-slate-700 block">Code PIN Administrateur :</label>
          <input
            type="text"
            value={adminPin}
            onChange={(e) => setAdminPin(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900 tracking-widest text-base"
          />
        </div>

        <div className="space-y-1 text-xs sm:text-sm">
          <label className="font-bold text-slate-700 block">Texte de l'Avertissement Légal (Disclaimer) :</label>
          <textarea
            rows={3}
            value={disclaimerText}
            onChange={(e) => setDisclaimerText(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed"
          />
        </div>
      </div>

    </form>
  );
};
