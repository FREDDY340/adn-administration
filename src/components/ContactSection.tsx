import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Calendar,
  Send,
  CheckCircle2,
  ExternalLink
} from './IconHelper';

export const ContactSection: React.FC = () => {
  const { settings, addRequest, setIsAppointmentModalOpen } = useData();

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addRequest({
        type: 'contact',
        fullName: fullName.trim(),
        email: email.trim() || 'Non renseigné',
        phone: phone.trim(),
        preferredContact: 'phone',
        serviceCategory: 'Général',
        message: message.trim(),
        urgency: 'normal',
        attachments: []
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 500);
  };

  return (
    <section id="contact-section" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 3-Column Card Layout identical to mockup */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Interactive Styled Map (4 cols) */}
          <div className="lg:col-span-4 relative min-h-[260px] sm:min-h-[300px] bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200">
            <iframe
              title="Plan d'accès ADN Conseils Kremlin-Bicêtre"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.355%2C48.810%2C2.370%2C48.820&layer=mapnik&marker=48.8152%2C2.3618"
              className="w-full h-full min-h-[260px] border-0"
              loading="lazy"
            />
            {/* Custom Red Pin Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md">
              <div className="w-8 h-8 rounded-full bg-[#d32f2f] text-white flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
            </div>

            {/* Map Action Button */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent('119 avenue de Fontainebleau, 94270 Le Kremlin-Bicêtre')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 flex items-center gap-1.5"
            >
              <span>Ouvrir dans Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          {/* Center Column: Nous contacter (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div>
              <h3 className="text-xl font-black text-[#0c2340] mb-5 tracking-tight">
                Nous contacter
              </h3>

              <div className="space-y-4 text-xs sm:text-[13px] text-slate-700">
                
                {/* Phone */}
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 hover:text-[#d32f2f] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-red-50 group-hover:text-[#d32f2f] transition-colors shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">{settings.phoneDisplay}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 hover:text-[#d32f2f] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-red-50 group-hover:text-[#d32f2f] transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{settings.email}</span>
                </a>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{settings.address},</p>
                    <p className="text-slate-500">{settings.postalCode} {settings.city}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-900">Lundi - Vendredi 9h - 18h</p>
                    <p className="text-slate-500">Samedi 9h - 13h</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Action buttons */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                id="contact-toggle-form-btn"
                onClick={() => setShowInquiryForm(!showInquiryForm)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{showInquiryForm ? 'Masquer le formulaire' : 'Envoyer un message direct'}</span>
              </button>

              <button
                id="contact-appointment-direct-btn"
                onClick={() => setIsAppointmentModalOpen(true)}
                className="w-full py-2 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#d32f2f]" />
                <span>Prendre rendez-vous</span>
              </button>
            </div>
          </div>

          {/* Right Column: Office photo with 3D ADN CONSEILS wall branding (4 cols) */}
          <div className="lg:col-span-4 relative min-h-[260px] sm:min-h-[300px] overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
              alt="Bureau ADN Conseils au Kremlin-Bicêtre"
              className="w-full h-full object-cover brightness-95"
              referrerPolicy="no-referrer"
            />
            
            {/* 3D Wall Logo ADN CONSEILS on office wall */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-slate-950/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-2xl">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-widest block drop-shadow-md">
                  ADN
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-blue-200 tracking-[0.3em] uppercase block">
                  CONSEILS
                </span>
                <span className="text-[9px] text-slate-300 block mt-1">
                  119 Avenue de Fontainebleau • 94270
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Optional Collapsible Message Form */}
        {showInquiryForm && (
          <div className="mt-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-3xl mx-auto animate-in slide-in-from-top duration-300">
            {isSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message envoyé avec succès !</h4>
                <p className="text-xs text-slate-600">
                  Notre équipe vous contactera dans les plus brefs délais pour répondre à votre demande.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h4 className="text-base font-bold text-[#0c2340]">Formulaire de contact rapide</h4>
                  <p className="text-xs text-slate-500">Posez vos questions ou décrivez votre démarche administrative.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Nom & Prénom * :</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sarah Benali"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Téléphone * :</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 06 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Email :</label>
                  <input
                    type="email"
                    placeholder="Ex: sarah@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Votre message * :</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Précisez votre demande (titre de séjour, nationalité, domiciliation, carte grise...)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#d32f2f] hover:bg-[#b71c1c] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>{isSubmitting ? 'Envoi...' : 'Transmettre ma demande'}</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
