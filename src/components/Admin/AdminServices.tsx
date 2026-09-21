import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceItem, RequiredDoc, ProcedureStep } from '../../types';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Building2,
  Award,
  Car,
  Languages,
  Clock
} from '../IconHelper';

export const AdminServices: React.FC = () => {
  const { services, saveService, deleteService } = useData();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form states for editing/creating
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [priceEst, setPriceEst] = useState('');
  const [processingTime, setProcessingTime] = useState('');
  const [badge, setBadge] = useState('');
  const [active, setActive] = useState(true);
  const [icon, setIcon] = useState('ShieldCheck');
  const [legalBasis, setLegalBasis] = useState('');

  // Required docs & steps lists
  const [docs, setDocs] = useState<RequiredDoc[]>([]);
  const [steps, setSteps] = useState<ProcedureStep[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);

  // New doc temporary inputs
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('');
  const [newDocMandatory, setNewDocMandatory] = useState(true);

  // New step temporary inputs
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDesc, setNewStepDesc] = useState('');

  // New highlight temporary input
  const [newHighlight, setNewHighlight] = useState('');

  const handleStartEdit = (s: ServiceItem) => {
    setEditingService(s);
    setTitle(s.title);
    setSlug(s.slug);
    setCategory(s.category);
    setShortDesc(s.shortDescription);
    setFullDesc(s.fullDescription);
    setPriceEst(s.priceEstimate);
    setProcessingTime(s.processingTime);
    setBadge(s.badge || '');
    setActive(s.active);
    setIcon(s.icon);
    setLegalBasis(s.legalBasis || '');
    setDocs(s.requiredDocs || []);
    setSteps(s.steps || []);
    setHighlights(s.highlights || []);
  };

  const handleStartCreate = () => {
    const newId = `service-${Date.now()}`;
    const newS: ServiceItem = {
      id: newId,
      slug: 'nouveau-service',
      title: 'Nouvelle Prestation',
      category: 'Droit des Étrangers',
      icon: 'FileText',
      badge: 'Nouveau',
      shortDescription: 'Description courte de la prestation...',
      fullDescription: 'Description détaillée de l’accompagnement...',
      priceEstimate: 'Sur devis personnalisé',
      processingTime: 'Selon calendrier',
      active: true,
      highlights: ['Accompagnement complet', 'Vérification anti-rejet'],
      requiredDocs: [],
      steps: []
    };
    handleStartEdit(newS);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !editingService) return;

    const updated: ServiceItem = {
      ...editingService,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: category.trim(),
      shortDescription: shortDesc.trim(),
      fullDescription: fullDesc.trim(),
      priceEstimate: priceEst.trim(),
      processingTime: processingTime.trim(),
      badge: badge.trim() || undefined,
      active,
      icon,
      legalBasis: legalBasis.trim() || undefined,
      requiredDocs: docs,
      steps,
      highlights
    };

    saveService(updated);
    setEditingService(null);
  };

  const handleAddDoc = () => {
    if (!newDocName.trim()) return;
    setDocs(prev => [
      ...prev,
      {
        id: `doc-${Date.now()}`,
        name: newDocName.trim(),
        category: newDocCategory.trim() || 'Justificatifs généraux',
        mandatory: newDocMandatory
      }
    ]);
    setNewDocName('');
    setNewDocCategory('');
    setNewDocMandatory(true);
  };

  const handleRemoveDoc = (id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  };

  const handleAddStep = () => {
    if (!newStepTitle.trim()) return;
    setSteps(prev => [
      ...prev,
      {
        number: prev.length + 1,
        title: newStepTitle.trim(),
        description: newStepDesc.trim()
      }
    ]);
    setNewStepTitle('');
    setNewStepDesc('');
  };

  const handleRemoveStep = (idx: number) => {
    const filtered = steps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, number: i + 1 }));
    setSteps(filtered);
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlights(prev => [...prev, newHighlight.trim()]);
    setNewHighlight('');
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Gestion des Prestations & Services</h3>
          <p className="text-xs text-slate-500">
            Modifiez les tarifs, descriptions, checklists documentaires et étapes pour chaque prestation.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Ajouter une prestation</span>
        </button>
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3.5">Prestation</th>
                <th className="p-3.5">Catégorie</th>
                <th className="p-3.5">Tarif affiché</th>
                <th className="p-3.5">Délai estimé</th>
                <th className="p-3.5">Pièces requises</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{s.title}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-xs">{s.shortDescription}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                      {s.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{s.priceEstimate}</td>
                  <td className="p-3.5 text-slate-600 whitespace-nowrap">{s.processingTime}</td>
                  <td className="p-3.5">
                    <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-[11px]">
                      {s.requiredDocs.length} pièces
                    </span>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    {s.active ? (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">Actif</span>
                    ) : (
                      <span className="bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded text-[11px]">Inactif</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleStartEdit(s)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1 mr-1"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={() => deleteService(s.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Editor Drawer / Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Édition : {editingService.title}</h3>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="text-slate-400 hover:text-white p-1.5"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              
              {/* Basic info */}
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-sm">Informations Générales</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Titre de la prestation * :</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Identifiant / Slug URL :</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Catégorie :</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Tarif indicatif :</label>
                    <input
                      type="text"
                      value={priceEst}
                      onChange={(e) => setPriceEst(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Délai estimé :</label>
                    <input
                      type="text"
                      value={processingTime}
                      onChange={(e) => setProcessingTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Badge promotionnel :</label>
                    <input
                      type="text"
                      placeholder="Ex: Populaire, Express, Nouveau"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Icône visuelle :</label>
                    <select
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                    >
                      <option value="ShieldCheck">Bouclier Sécurisé (ShieldCheck)</option>
                      <option value="Award">Médaille / Naturalisation (Award)</option>
                      <option value="Building2">Immeuble / Entreprise (Building2)</option>
                      <option value="Mail">Courrier / Domiciliation (Mail)</option>
                      <option value="Car">Véhicule / Carte Grise (Car)</option>
                      <option value="Languages">Langues / Traduction (Languages)</option>
                      <option value="FileText">Document Générique (FileText)</option>
                    </select>
                  </div>

                  <div className="space-y-1 flex flex-col justify-end">
                    <label className="flex items-center gap-2 font-bold text-slate-900 cursor-pointer p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      <span>Prestation active sur le site</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Description courte (Grille d'accueil) :</label>
                  <textarea
                    rows={2}
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Description détaillée (Modale complète) :</label>
                  <textarea
                    rows={3}
                    value={fullDesc}
                    onChange={(e) => setFullDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Référence légale (Code CESEDA / Décret) :</label>
                  <input
                    type="text"
                    value={legalBasis}
                    onChange={(e) => setLegalBasis(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                  />
                </div>
              </div>

              {/* Highlights tags */}
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-sm">Points Forts & Engagements</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {highlights.map((h, idx) => (
                    <span key={idx} className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      <span>✓ {h}</span>
                      <button type="button" onClick={() => handleRemoveHighlight(idx)} className="text-amber-700 hover:text-amber-950 font-bold">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ajouter un point fort (ex: Audit anti-rejet sous 24h)"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    className="flex-1 p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <h4 className="font-bold text-slate-900 text-sm">Checklist des Pièces Justificatives Recommandées ({docs.length})</h4>
                
                <div className="space-y-2 max-h-48 overflow-y-auto p-1">
                  {docs.map((d) => (
                    <div key={d.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-slate-900">{d.name}</strong>
                        <div className="text-[10px] text-slate-500">{d.category} • {d.mandatory ? 'Obligatoire' : 'Facultatif'}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc(d.id)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Nom du document (ex: Passeport en cours de validité)"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Catégorie (ex: État Civil, Domicile)"
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={newDocMandatory}
                      onChange={(e) => setNewDocMandatory(e.target.checked)}
                    />
                    <span>Pièce strictement obligatoire</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddDoc}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                  >
                    + Ajouter la pièce
                  </button>
                </div>
              </div>

              {/* Procedure steps */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">Étapes de la Démarche ({steps.length})</h4>
                
                <div className="space-y-2">
                  {steps.map((st, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between text-xs gap-3">
                      <div>
                        <strong className="text-slate-900">Étape {st.number} : {st.title}</strong>
                        <p className="text-slate-600 text-[11px] mt-0.5">{st.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(i)}
                        className="text-rose-600 hover:text-rose-800 p-1 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <input
                    type="text"
                    placeholder="Titre de l’étape (ex: Diagnostic & Audit des pièces)"
                    value={newStepTitle}
                    onChange={(e) => setNewStepTitle(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  />
                  <textarea
                    rows={2}
                    placeholder="Description de ce qui se passe à cette étape..."
                    value={newStepDesc}
                    onChange={(e) => setNewStepDesc(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
                    >
                      + Ajouter l’étape
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md"
                >
                  Enregistrer les modifications
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
