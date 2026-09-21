import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AppointmentBooking, AppointmentStatus } from '../../types';
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Phone,
  Video,
  User,
  Trash2,
  Search,
  Filter,
  Eye,
  AlertTriangle
} from '../IconHelper';

export const AdminAppointments: React.FC = () => {
  const { appointments, updateAppointmentStatus, updateAppointmentNotes, deleteAppointment } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApt, setSelectedApt] = useState<AppointmentBooking | null>(null);
  const [internalNotes, setInternalNotes] = useState('');

  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesSearch = a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.phone.includes(searchTerm) ||
                          a.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.date.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (apt: AppointmentBooking) => {
    setSelectedApt(apt);
    setInternalNotes(apt.notes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedApt) return;
    updateAppointmentNotes(selectedApt.id, internalNotes);
    setSelectedApt(prev => prev ? { ...prev, notes: internalNotes } : null);
  };

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    updateAppointmentStatus(id, newStatus);
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px]">En attente</span>;
      case 'confirmed':
        return <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[11px]">Confirmé</span>;
      case 'completed':
        return <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">Terminé</span>;
      case 'cancelled':
        return <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[11px]">Annulé</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cabinet':
        return <span className="flex items-center gap-1 text-slate-700 font-medium"><Building2 className="w-3.5 h-3.5 text-amber-500" /> Cabinet</span>;
      case 'telephone':
        return <span className="flex items-center gap-1 text-slate-700 font-medium"><Phone className="w-3.5 h-3.5 text-blue-500" /> Téléphone</span>;
      case 'visio':
        return <span className="flex items-center gap-1 text-slate-700 font-medium"><Video className="w-3.5 h-3.5 text-emerald-500" /> Visio</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Planning & Rendez-vous</h3>
          <p className="text-xs text-slate-500">
            Gestion du calendrier des rendez-vous au cabinet ou à distance.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par client, date (AAAA-MM-JJ), démarche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'pending', label: 'En attente' },
            { id: 'confirmed', label: 'Confirmés' },
            { id: 'completed', label: 'Terminés' },
            { id: 'cancelled', label: 'Annulés' },
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

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="p-3.5">Date & Heure</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Téléphone</th>
                <th className="p-3.5">Prestation</th>
                <th className="p-3.5">Lieu / Format</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{apt.date}</div>
                      <div className="text-[11px] text-slate-500">{apt.timeSlot}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{apt.fullName}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <a href={`tel:${apt.phone}`} className="hover:text-blue-600 font-mono text-xs">
                        {apt.phone}
                      </a>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">{apt.serviceTitle}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      {getTypeIcon(apt.appointmentType)}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {getStatusBadge(apt.status)}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDetail(apt)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer inline-flex items-center gap-1 mr-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>Détails</span>
                      </button>
                      <button
                        onClick={() => deleteAppointment(apt.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Aucun rendez-vous trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase">Fiche Rendez-vous</span>
                <h3 className="text-lg font-bold text-white">{selectedApt.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedApt(null)}
                className="text-slate-400 hover:text-white p-1.5"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">Statut du RDV :</span>
                <select
                  value={selectedApt.status}
                  onChange={(e) => handleStatusChange(selectedApt.id, e.target.value as AppointmentStatus)}
                  className="p-1.5 rounded-lg border border-slate-300 bg-white font-bold text-xs"
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmé</option>
                  <option value="completed">Terminé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>

              <div className="space-y-2 text-slate-700">
                <div><strong>Prestation :</strong> {selectedApt.serviceTitle}</div>
                <div><strong>Date & Heure :</strong> {selectedApt.date} à {selectedApt.timeSlot}</div>
                <div><strong>Téléphone :</strong> {selectedApt.phone}</div>
                <div><strong>Email :</strong> {selectedApt.email}</div>
                <div><strong>Modalité :</strong> {selectedApt.appointmentType.toUpperCase()}</div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="font-bold text-slate-900 text-xs block">Notes internes / Détails du dossier :</label>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:ring-2 focus:ring-amber-400"
                  placeholder="Pièces reçues, avancement du dossier..."
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

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedApt(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
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
