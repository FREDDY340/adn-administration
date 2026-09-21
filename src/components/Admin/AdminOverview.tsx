import React from 'react';
import { useData } from '../../context/DataContext';
import {
  FileText,
  Calendar,
  Building2,
  BookOpen,
  Star,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Phone,
  MessageSquare
} from '../IconHelper';

interface AdminOverviewProps {
  setActiveTab: (tab: any) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ setActiveTab }) => {
  const { requests, appointments, services, blogPosts, testimonials, settings } = useData();

  const newRequests = requests.filter(r => r.status === 'nouveau');
  const upcomingApts = appointments.filter(a => a.status === 'pending' || a.status === 'confirmed');
  const activeServices = services.filter(s => s.active);
  const publishedPosts = blogPosts.filter(p => p.published);
  const approvedReviews = testimonials.filter(t => t.approved);
  const pendingReviews = testimonials.filter(t => !t.approved);

  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tableau de bord de gestion ADN Conseils</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Bienvenue dans votre espace d’administration
          </h3>
          <p className="text-xs text-slate-400">
            Cabinet situé au {settings.address}, {settings.postalCode} {settings.city}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('requests')}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer shadow-xs"
          >
            Voir les demandes ({newRequests.length} nouvelles)
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer border border-slate-700"
          >
            Planning RDV ({upcomingApts.length})
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Metric 1 */}
        <div
          onClick={() => setActiveTab('requests')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Demandes</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{requests.length}</div>
          <div className="text-[11px] text-rose-600 font-bold">
            {newRequests.length} à traiter
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => setActiveTab('appointments')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Rendez-vous</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{appointments.length}</div>
          <div className="text-[11px] text-amber-600 font-bold">
            {upcomingApts.length} à venir
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => setActiveTab('services')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Prestations</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{services.length}</div>
          <div className="text-[11px] text-emerald-700 font-bold">
            {activeServices.length} en ligne
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => setActiveTab('blog')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Guides Blog</span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{blogPosts.length}</div>
          <div className="text-[11px] text-purple-700 font-bold">
            {publishedPosts.length} publiés
          </div>
        </div>

        {/* Metric 5 */}
        <div
          onClick={() => setActiveTab('testimonials')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Avis Clients</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">{avgRating} / 5</div>
          <div className="text-[11px] text-slate-500">
            {approvedReviews.length} avis vérifiés {pendingReviews.length > 0 ? `(${pendingReviews.length} en attente)` : ''}
          </div>
        </div>

      </div>

      {/* Two Column Section: Latest Requests & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Latest Incoming Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Dernières demandes reçues</span>
            </h4>
            <button
              onClick={() => setActiveTab('requests')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Tout voir</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {requests.slice(0, 4).map((r) => (
              <div
                key={r.id}
                onClick={() => setActiveTab('requests')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 flex items-center justify-between gap-3 text-xs cursor-pointer"
              >
                <div className="space-y-0.5 truncate">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{r.fullName}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({r.phone})</span>
                  </div>
                  <div className="text-slate-600 text-[11px] truncate">
                    {r.serviceCategory} • {r.message}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.status === 'nouveau' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {r.status.toUpperCase()}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{r.createdAt.split(' ')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Next Upcoming Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Prochains Rendez-vous</span>
            </h4>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Voir le planning</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {appointments.slice(0, 4).map((a) => (
              <div
                key={a.id}
                onClick={() => setActiveTab('appointments')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 flex items-center justify-between gap-3 text-xs cursor-pointer"
              >
                <div className="space-y-0.5 truncate">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{a.fullName}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({a.phone})</span>
                  </div>
                  <div className="text-slate-600 text-[11px] truncate">
                    {a.serviceTitle}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="font-bold text-slate-900 text-xs">{a.date}</div>
                  <div className="text-[10px] text-slate-500">{a.timeSlot}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
