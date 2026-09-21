import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AdminLogin } from './AdminLogin';
import { AdminOverview } from './AdminOverview';
import { AdminRequests } from './AdminRequests';
import { AdminAppointments } from './AdminAppointments';
import { AdminServices } from './AdminServices';
import { AdminBlog } from './AdminBlog';
import { AdminFaq } from './AdminFaq';
import { AdminTestimonials } from './AdminTestimonials';
import { AdminSettings } from './AdminSettings';
import { AdminBackup } from './AdminBackup';
import {
  Lock,
  LogOut,
  X,
  FileText,
  Calendar,
  Building2,
  BookOpen,
  HelpCircle,
  Users,
  Settings,
  Database,
  Sparkles,
  LayoutDashboard
} from '../IconHelper';

type AdminTab = 'overview' | 'requests' | 'appointments' | 'services' | 'blog' | 'faq' | 'testimonials' | 'settings' | 'backup';

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAdminLoggedIn,
    logoutAdmin,
    requests,
    appointments,
    testimonials
  } = useData();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  if (!isAdminModalOpen) return null;

  const newRequestsCount = requests.filter(r => r.status === 'nouveau').length;
  const pendingAptsCount = appointments.filter(a => a.status === 'pending').length;
  const pendingReviewsCount = testimonials.filter(t => !t.approved).length;

  const navItems = [
    { id: 'overview', label: 'Vue d’ensemble', icon: LayoutDashboard },
    { id: 'requests', label: 'Demandes (CRM)', icon: FileText, badge: newRequestsCount },
    { id: 'appointments', label: 'Rendez-vous', icon: Calendar, badge: pendingAptsCount },
    { id: 'services', label: 'Prestations', icon: Building2 },
    { id: 'blog', label: 'Articles & Guides', icon: BookOpen },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'testimonials', label: 'Avis Clients', icon: Users, badge: pendingReviewsCount },
    { id: 'settings', label: 'Paramètres Site', icon: Settings },
    { id: 'backup', label: 'Sauvegarde / Import', icon: Database },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div
        id="admin-dashboard-modal"
        className="bg-slate-100 w-full max-w-7xl h-[94vh] rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between gap-4 shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                <span>ADN Conseils</span>
                <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded border border-slate-700 uppercase font-mono">
                  Administration
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Déconnexion"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Fermer l'administration"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content View: If logged in, show Dashboard Layout; else show AdminLogin */}
        {!isAdminLoggedIn ? (
          <div className="flex-1 bg-white overflow-y-auto flex items-center justify-center p-6">
            <AdminLogin />
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white border-r border-slate-200 p-3 flex flex-row md:flex-col justify-between overflow-x-auto md:overflow-y-auto shrink-0 gap-1">
              <div className="flex flex-row md:flex-col gap-1 w-full">
                {navItems.map((item) => {
                  const IconCmp = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as AdminTab)}
                      className={`w-full px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconCmp className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge !== undefined && item.badge > 0 && (
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isActive ? 'bg-amber-400 text-slate-950' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sidebar bottom indicator */}
              <div className="hidden md:block p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Session active</span>
                </div>
                <p>Modifications synchronisées en temps réel.</p>
              </div>
            </div>

            {/* Tab Body Content Area */}
            <div className="flex-1 bg-slate-100/90 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {activeTab === 'overview' && <AdminOverview setActiveTab={setActiveTab} />}
              {activeTab === 'requests' && <AdminRequests />}
              {activeTab === 'appointments' && <AdminAppointments />}
              {activeTab === 'services' && <AdminServices />}
              {activeTab === 'blog' && <AdminBlog />}
              {activeTab === 'faq' && <AdminFaq />}
              {activeTab === 'testimonials' && <AdminTestimonials />}
              {activeTab === 'settings' && <AdminSettings />}
              {activeTab === 'backup' && <AdminBackup />}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
