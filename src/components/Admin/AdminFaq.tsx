import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FaqItem } from '../../types';
import { HelpCircle, Plus, Trash2, Edit2, Check, X } from '../IconHelper';

export const AdminFaq: React.FC = () => {
  const { faqs, saveFaq, deleteFaq } = useData();
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  const handleStartEdit = (f: FaqItem) => {
    setEditingFaq(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category);
  };

  const handleStartCreate = () => {
    const newF: FaqItem = {
      id: `faq-${Date.now()}`,
      question: 'Nouvelle question fréquente ?',
      answer: 'Réponse claire et détaillée apportée par le cabinet...',
      category: 'Général',
      order: faqs.length + 1
    };
    handleStartEdit(newF);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || !editingFaq) return;

    saveFaq({
      ...editingFaq,
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim() || 'Général'
    });

    setEditingFaq(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Gestion de la FAQ</h3>
          <p className="text-xs text-slate-500">
            Ajoutez ou mettez à jour les réponses aux questions les plus courantes.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Ajouter une question</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-start justify-between gap-4 hover:border-slate-300 transition-all"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[10px]">
                  {faq.category}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleStartEdit(faq)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Modifier
              </button>
              <button
                onClick={() => deleteFaq(faq.id)}
                className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Éditer la question / réponse</h3>
              <button
                onClick={() => setEditingFaq(null)}
                className="text-slate-400 hover:text-white p-1.5"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs sm:text-sm">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Catégorie :</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  placeholder="Général, Droit des Étrangers, Traduction..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Question * :</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Réponse détaillée * :</label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
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
