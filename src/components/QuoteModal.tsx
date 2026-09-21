import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { FileAttachment } from '../types';
import {
  FileText,
  Upload,
  X,
  Trash2,
  Check,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  Phone,
  MessageSquare
} from './IconHelper';
import confetti from 'canvas-confetti';

export const QuoteModal: React.FC = () => {
  const {
    isQuoteModalOpen,
    setIsQuoteModalOpen,
    preselectedServiceCategory,
    setPreselectedServiceCategory,
    addRequest,
    settings
  } = useData();

  const [serviceCategory, setServiceCategory] = useState<string>(
    preselectedServiceCategory === 'etrangers' ? 'Droit des Étrangers' :
    preselectedServiceCategory === 'nationalite' ? 'Nationalité Française' :
    preselectedServiceCategory === 'domiciliation' ? 'Domiciliation d’Entreprise' :
    preselectedServiceCategory === 'cartegrise' ? 'Carte Grise & Immatriculation' :
    preselectedServiceCategory === 'traduction' ? 'Traduction Assermentée' : 'Droit des Étrangers'
  );

  const [serviceDetail, setServiceDetail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [message, setMessage] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');

  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isQuoteModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      // Create reader for dataUrl preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAttachment: FileAttachment = {
          id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: event.target?.result as string
        };
        setAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      addRequest({
        type: 'devis',
        fullName: fullName.trim(),
        email: email.trim() || 'Non renseigné',
        phone: phone.trim(),
        preferredContact,
        serviceCategory,
        serviceDetail: serviceDetail.trim() || undefined,
        message: message.trim() || 'Demande de devis avec pièces justificatives.',
        urgency,
        attachments
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }, 600);
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setPreselectedServiceCategory(null);
    setIsSuccess(false);
    setAttachments([]);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setServiceDetail('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        id="quote-request-modal"
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                Demande de Devis & Dépôt de Documents
              </h2>
              <p className="text-xs text-slate-400">
                Transmission sécurisée et chiffrée • Réponse sous 24h ouvrées
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

        {/* Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          
          {isSuccess ? (
            /* Success state */
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950">Votre demande de devis est transmise !</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Nos juristes et conseillers examinent vos informations et documents déposés. Vous recevrez une proposition personnalisée sous 24h.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-xs text-left space-y-1">
                <div><strong>Prestation :</strong> {serviceCategory}</div>
                <div><strong>Contact :</strong> {fullName} ({phone}) via {preferredContact.toUpperCase()}</div>
                <div><strong>Pièces transmises :</strong> {attachments.length} fichier(s)</div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Category & Subtype */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Catégorie de la démarche * :</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs font-semibold text-slate-900"
                  >
                    <option value="Droit des Étrangers">Droit des Étrangers (Titre de séjour)</option>
                    <option value="Nationalité Française">Nationalité Française & Naturalisation</option>
                    <option value="Domiciliation d’Entreprise">Domiciliation d’Entreprise</option>
                    <option value="Aide à l’Adresse">Aide à l’Adresse & Correspondance</option>
                    <option value="Carte Grise & Immatriculation">Carte Grise & Immatriculation</option>
                    <option value="Traduction Assermentée">Traduction Assermentée</option>
                    <option value="Autre formalité">Autre formalité administrative</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Précision de l'acte / objet :</label>
                  <input
                    type="text"
                    placeholder="Ex: Renouvellement salarié, Acte de naissance..."
                    value={serviceDetail}
                    onChange={(e) => setServiceDetail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                  />
                </div>
              </div>

              {/* Secure Document Dropzone */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block text-xs sm:text-sm flex items-center justify-between">
                  <span>Dépôt sécurisé de vos documents (Facultatif) :</span>
                  <span className="text-[10px] text-slate-400">PDF, JPG, PNG (Max 15 Mo)</span>
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-600 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/70 hover:bg-blue-50/30 transition-colors"
                >
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    Cliquez ou glissez-déposez vos fichiers ici
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pièce d'identité, titre de séjour, certificat de cession, acte à traduire...
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    accept=".pdf,image/png,image/jpeg,image/jpg"
                    className="hidden"
                  />
                </div>

                {/* Uploaded attachments preview list */}
                {attachments.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-600">Documents ajoutés ({attachments.length}) :</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="truncate font-medium text-slate-800">{att.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(att.id)}
                            className="text-rose-500 hover:text-rose-700 p-1 shrink-0 ml-2"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Nom complet * :</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Yassine Mansouri"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Numéro de téléphone * :</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: 06 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Adresse email :</label>
                  <input
                    type="email"
                    placeholder="Ex: yassine@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Canal de réponse préféré :</label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs font-semibold text-slate-900"
                  >
                    <option value="whatsapp">WhatsApp (Très rapide)</option>
                    <option value="phone">Téléphone direct</option>
                    <option value="email">Par E-mail</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1 text-xs sm:text-sm">
                <label className="font-bold text-slate-700 block">Commentaire / Contexte de votre demande :</label>
                <textarea
                  rows={3}
                  placeholder="Indiquez vos délais souhaités, les spécificités de votre situation..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !fullName.trim() || !phone.trim()}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>{isSubmitting ? 'Transmission en cours...' : 'Envoyer ma demande de devis'}</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
