import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ContactOrQuoteRequest, RequestStatus } from '../../types';
import {
  FileText,
  Search,
  Filter,
  Trash2,
  Download,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  User,
  AlertTriangle,
  ChevronRight,
  X
} from '../IconHelper';

export const AdminRequests: React.FC = () => {
  const { requests, updateRequestStatus, updateRequestNotes, deleteRequest } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ContactOrQuoteRequest | null>(null);
  const [currentNotes, setCurrentNotes] = useState<string>('');

  const filteredRequests = requests.filter(r => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch = r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.phone.includes(searchTerm) ||
                          r.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (req: ContactOrQuoteRequest) => {
    setSelectedRequest(req);
    setCurrentNotes(req.internalNotes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedRequest) return;
    updateRequestNotes(selectedRequest.id, currentNotes);
    setSelectedRequest(prev => prev ? { ...prev, internalNotes: currentNotes } : null);
  };

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    updateRequestStatus(id, newStatus);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Nom', 'Téléphone', 'Email', 'Canal_Prefere', 'Service', 'Urgence', 'Statut', 'Message', 'Notes_Internes'];
    const rows = requests.map(r => [
      r.id,
      r.createdAt,
      r.type,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      r.preferredContact,
      `"${r.serviceCategory}"`,
      r.urgency,
      r.status,
      `"${r.message.replace(/"/g, '""')}"`,
      `"${(r.internalNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `adn_conseil_demandes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'nouveau':
        return <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[11px]">Nouveau</span>;
      case 'en_cours':
        return <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px]">En cours</span>;
      case 'traite':
        return <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">Traité</span>;
      case 'archive':
        return <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded text-[11px]">Archivé</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Gestion des Demandes & Devis (CRM)</h3>
          <p className="text-xs text-slate-500">
            Suivi centralisé des prospects, des demandes de devis et des pièces justificatives téléversées.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-300 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Exporter en CSV ({requests.length})</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom, téléphone, email, démarche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'nouveau', label: 'Nouveaux' },
            { id: 'en_cours', label: 'En cours' },
            { id: 'traite', label: 'Traités' },
            { id: 'archive', label: 'Archivés' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                statusFilter === s.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Prestation demandée</th>
                <th className="p-3.5">Pièces</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 text-slate-400 whitespace-nowrap">{req.createdAt}</td>
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{req.fullName}</span>
                        {req.urgency === 'urgent' && (
                          <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-1 rounded">Urgent</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div>{req.phone}</div>
                      <div className="text-[10px] text-slate-400">{req.preferredContact.toUpperCase()}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800">{req.serviceCategory}</span>
                      {req.serviceDetail && (
                        <span className="block text-[10px] text-slate-500 truncate max-w-xs">{req.serviceDetail}</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {req.attachments && req.attachments.length > 0 ? (
                        <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1 w-fit">
                          <FileText className="w-3 h-3" />
                          <span>{req.attachments.length}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">0</span>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDetail(req)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer inline-flex items-center gap-1 mr-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>Fiche</span>
                      </button>
                      <button
                        onClick={() => deleteRequest(req.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Supprimer la demande"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Aucune demande trouvée avec ces critères.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail & Notes Drawer Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30 uppercase">
                    {selectedRequest.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400">{selectedRequest.createdAt}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedRequest.fullName}
                </h3>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
              
              {/* Status Selector & Quick Contact Bar */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs">Statut de la demande :</span>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value as RequestStatus)}
                    className="p-1.5 rounded-lg border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="en_cours">En cours</option>
                    <option value="traite">Traité</option>
                    <option value="archive">Archivé</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${selectedRequest.phone.replace(/\s+/g, '')}`}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Appeler</span>
                  </a>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-white border border-slate-200 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Téléphone</span>
                  <strong className="text-slate-900 text-sm">{selectedRequest.phone}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                  <span className="text-slate-900">{selectedRequest.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Prestation</span>
                  <span className="text-slate-900 font-semibold">{selectedRequest.serviceCategory}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact privilégié</span>
                  <span className="text-slate-900 font-semibold">{selectedRequest.preferredContact.toUpperCase()}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-1">
                <label className="font-bold text-slate-900 text-xs">Message / Détail du client :</label>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedRequest.message}
                </div>
              </div>

              {/* Attached files */}
              {selectedRequest.attachments && selectedRequest.attachments.length > 0 && (
                <div className="space-y-2">
                  <label className="font-bold text-slate-900 text-xs">Pièces justificatives téléversées ({selectedRequest.attachments.length}) :</label>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((att) => (
                      <div key={att.id} className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                          <span className="font-bold text-blue-950 truncate text-xs">{att.name}</span>
                          <span className="text-[10px] text-blue-700">({Math.round(att.size / 1024)} Ko)</span>
                        </div>
                        {att.dataUrl && (
                          <a
                            href={att.dataUrl}
                            download={att.name}
                            className="px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shrink-0 ml-2"
                          >
                            <Download className="w-3 h-3" />
                            <span>Télécharger</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Team Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-900 text-xs flex items-center justify-between">
                  <span>Notes internes d’équipe (Confidentiel) :</span>
                  <span className="text-[10px] text-slate-400">Visible uniquement par les conseillers</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Notez ici les échanges téléphoniques, documents manquants, devis envoyé..."
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-amber-400 text-xs text-slate-900"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  Enregistrer les notes
                </button>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center shrink-0">
              <button
                onClick={() => {
                  deleteRequest(selectedRequest.id);
                  setSelectedRequest(null);
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Supprimer cette demande</span>
              </button>

              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
