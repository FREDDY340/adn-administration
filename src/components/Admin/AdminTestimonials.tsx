import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Testimonial } from '../../types';
import { Users, Plus, Trash2, CheckCircle2, Star, X, Check } from '../IconHelper';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = useData();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [clientName, setClientName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [approved, setApproved] = useState(true);
  const [verified, setVerified] = useState(true);

  const handleStartCreate = () => {
    const newT: Testimonial = {
      id: `t-${Date.now()}`,
      clientName: 'Nouveau Client',
      serviceCategory: 'Titre de Séjour',
      rating: 5,
      comment: 'Excellent accompagnement, dossier accepté du premier coup !',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      verified: true,
      approved: true
    };
    setEditingTestimonial(newT);
    setClientName(newT.clientName);
    setServiceCategory(newT.serviceCategory);
    setRating(newT.rating);
    setComment(newT.comment);
    setApproved(newT.approved);
    setVerified(newT.verified);
  };

  const handleStartEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setClientName(t.clientName);
    setServiceCategory(t.serviceCategory);
    setRating(t.rating);
    setComment(t.comment);
    setApproved(t.approved);
    setVerified(t.verified);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim() || !editingTestimonial) return;

    saveTestimonial({
      ...editingTestimonial,
      clientName: clientName.trim(),
      serviceCategory: serviceCategory.trim(),
      rating,
      comment: comment.trim(),
      approved,
      verified
    });

    setEditingTestimonial(null);
  };

  const toggleApproval = (t: Testimonial) => {
    saveTestimonial({
      ...t,
      approved: !t.approved
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Modération des Avis & Témoignages</h3>
          <p className="text-xs text-slate-500">
            Validez les avis déposés par vos clients ou ajoutez des recommandations certifiées.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Ajouter un avis manuellement</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
              t.approved
                ? 'bg-white border-slate-200 shadow-2xs'
                : 'bg-amber-50/50 border-amber-300 shadow-xs'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {t.serviceCategory}
                </span>
              </div>

              <p className="text-xs text-slate-700 italic">« {t.comment} »</p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="font-bold text-slate-900">{t.clientName}</span>
                <span>{t.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <button
                onClick={() => toggleApproval(t)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                  t.approved
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-amber-200 text-amber-900 hover:bg-amber-300 animate-pulse'
                }`}
              >
                {t.approved ? '✓ Approuvé (En ligne)' : '⏳ En attente de validation'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(t)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
                >
                  Modifier
                </button>
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Éditer le témoignage</h3>
              <button onClick={() => setEditingTestimonial(null)} className="text-slate-400 hover:text-white p-1.5">✕</button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Nom du client :</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Prestation :</label>
                <input
                  type="text"
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Note (1 à 5) :</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                >
                  <option value={5}>5 étoiles (Excellent)</option>
                  <option value={4}>4 étoiles (Très bon)</option>
                  <option value={3}>3 étoiles (Moyen)</option>
                  <option value={2}>2 étoiles (Insuffisant)</option>
                  <option value={1}>1 étoile (Mauvais)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Commentaire :</label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={approved}
                    onChange={(e) => setApproved(e.target.checked)}
                  />
                  <span>Approuver et afficher sur le site</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Enregistrer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
