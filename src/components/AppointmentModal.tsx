import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { AppointmentType } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  Building2,
  Check,
  X,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  User,
  Mail
} from './IconHelper';
import confetti from 'canvas-confetti';

export const AppointmentModal: React.FC = () => {
  const {
    isAppointmentModalOpen,
    setIsAppointmentModalOpen,
    services,
    addAppointment,
    settings
  } = useData();

  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'droit-etrangers');
  const [appointmentType, setAppointmentType] = useState<AppointmentType>('cabinet');
  
  // Date selection (default tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(defaultDateStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 - 10:45');

  // Contact info
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  if (!isAppointmentModalOpen) return null;

  const timeSlots = [
    '09:30 - 10:15',
    '10:30 - 11:15',
    '11:30 - 12:15',
    '14:15 - 15:00',
    '15:15 - 16:00',
    '16:15 - 17:00',
    '17:15 - 18:00',
  ];

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addAppointment({
        fullName: fullName.trim(),
        email: email.trim() || 'Non renseigné',
        phone: phone.trim(),
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        appointmentType,
        date: selectedDate,
        timeSlot: selectedSlot,
        notes: notes.trim()
      });

      setIsSubmitting(false);
      setIsConfirmed(true);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore confetti failure if environment restricts
      }
    }, 600);
  };

  const handleClose = () => {
    setIsAppointmentModalOpen(false);
    setStep(1);
    setIsConfirmed(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        id="appointment-booking-modal"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Prise de Rendez-vous en Ligne
              </h2>
              <p className="text-xs text-slate-400">
                Cabinet ADN Conseils • Le Kremlin-Bicêtre & À distance
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (if not finished) */}
        {!isConfirmed && (
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600 shrink-0">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-slate-950 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-slate-900 text-amber-400' : 'bg-slate-300'}`}>1</span>
              <span>Prestation & Lieu</span>
            </div>
            <div className="w-8 h-px bg-slate-300" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-slate-950 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-slate-900 text-amber-400' : 'bg-slate-300'}`}>2</span>
              <span>Date & Horaire</span>
            </div>
            <div className="w-8 h-px bg-slate-300" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-slate-950 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-slate-900 text-amber-400' : 'bg-slate-300'}`}>3</span>
              <span>Coordonnées</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {isConfirmed ? (
            /* Confirmation Screen */
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950">Votre rendez-vous est pré-réservé !</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Un e-mail et un SMS de confirmation avec le récapitulatif des pièces à apporter vous ont été adressés.
              </p>

              {/* Summary Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Démarche :</span>
                  <strong className="text-slate-900 font-bold">{selectedService.title}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Date & Heure :</span>
                  <strong className="text-slate-900 font-bold">
                    {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {selectedSlot}
                  </strong>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Format :</span>
                  <span className="font-semibold text-slate-900">
                    {appointmentType === 'cabinet' ? 'Au cabinet (119 Av. de Fontainebleau)' : appointmentType === 'telephone' ? 'Entretien téléphonique' : 'Visioconférence'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Client :</span>
                  <span className="font-semibold text-slate-900">{fullName} ({phone})</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm cursor-pointer"
                >
                  Terminer
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Select Service & Type */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-900 block">
                      1. Choisissez la démarche concernée :
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {services.filter(s => s.active).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSelectedServiceId(s.id)}
                          className={`p-3 rounded-xl border text-left font-medium transition-all ${
                            selectedServiceId === s.id
                              ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className="font-bold">{s.title}</div>
                          <div className={`text-[11px] mt-0.5 ${selectedServiceId === s.id ? 'text-amber-300' : 'text-slate-500'}`}>
                            {s.processingTime}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-900 block">
                      2. Modalité de rendez-vous :
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'cabinet', label: 'Au Cabinet', desc: 'Kremlin-Bicêtre', icon: Building2 },
                        { id: 'telephone', label: 'Par Téléphone', desc: 'On vous appelle', icon: Phone },
                        { id: 'visio', label: 'Visioconférence', desc: 'Lien Google Meet', icon: Video },
                      ].map((t) => {
                        const IconCmp = t.icon;
                        const isSelected = appointmentType === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setAppointmentType(t.id as any)}
                            className={`p-3 rounded-xl border text-center font-medium transition-all flex flex-col items-center gap-1.5 ${
                              isSelected
                                ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-xs'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <IconCmp className={`w-5 h-5 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                            <span className="font-bold text-xs">{t.label}</span>
                            <span className="text-[10px] text-slate-500">{t.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Slot */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-900 block">
                      1. Sélectionnez un jour de rendez-vous :
                    </label>
                    <input
                      type="date"
                      min={defaultDateStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-xs sm:text-sm font-bold text-slate-900 block flex items-center justify-between">
                      <span>2. Choisissez un créneau disponible :</span>
                      <span className="text-xs text-slate-500 font-normal">Durée : 45 min</span>
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-xl border text-center font-bold transition-all ${
                            selectedSlot === slot
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Info */}
              {step === 3 && (
                <form onSubmit={handleConfirmBooking} className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Nom & Prénom * :</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Tariq Ozturk"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Téléphone * :</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 06 50 40 30 20"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm">
                    <label className="font-bold text-slate-700 block">Adresse E-mail :</label>
                    <input
                      type="email"
                      placeholder="Ex: tariq.ozturk@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm">
                    <label className="font-bold text-slate-700 block">Détails ou précisions pour le conseiller :</label>
                    <textarea
                      rows={2}
                      placeholder="Ex: J’ai déjà un récépissé ANEF qui expire le mois prochain..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                    />
                  </div>

                  {/* Summary of choices */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-0.5">
                    <div><strong>Rendez-vous :</strong> {selectedService.title}</div>
                    <div><strong>Date & Heure :</strong> {selectedDate} à {selectedSlot}</div>
                    <div><strong>Lieu :</strong> {appointmentType === 'cabinet' ? '119 avenue de Fontainebleau, 94270 Kremlin-Bicêtre' : appointmentType === 'telephone' ? 'Téléphone' : 'Visioconférence'}</div>
                  </div>
                </form>
              )}
            </>
          )}

        </div>

        {/* Modal Navigation Buttons */}
        {!isConfirmed && (
          <div className="bg-slate-100 p-4 sm:p-5 border-t border-slate-200 flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-200 cursor-pointer"
              >
                Retour
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Continuer</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting || !fullName.trim() || !phone.trim()}
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{isSubmitting ? 'Validation...' : 'Confirmer mon rendez-vous'}</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
