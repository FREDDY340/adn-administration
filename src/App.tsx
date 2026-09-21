import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { AlertBanner } from './components/AlertBanner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesGrid } from './components/ServicesGrid';
import { MethodSection } from './components/MethodSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DualCtaBanner } from './components/DualCtaBanner';
import { ContactSection } from './components/ContactSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { SimulatorsSection } from './components/Simulators/SimulatorsSection';
import { Footer } from './components/Footer';

// Modals
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { QuoteModal } from './components/QuoteModal';
import { LegalModal } from './components/LegalModal';
import { AdminModal } from './components/Admin/AdminModal';

// Floating Quick Actions & Icons
import {
  MessageSquare,
  Lock,
  ArrowUp
} from './components/IconHelper';

const MainLayout: React.FC = () => {
  const { settings, setIsAdminModalOpen, isAdminLoggedIn } = useData();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-red-100 selection:text-[#0c2340]">
      
      {/* Top Notification / Alert Banner */}
      <AlertBanner />

      {/* Main Responsive Sticky Header */}
      <Header />

      {/* Main Content Sections strictly structured according to graphic mockup */}
      <main className="flex-1">
        {/* 1. Hero Banner with 2x2 buttons and Floating Badges */}
        <HeroSection />

        {/* 2. Nos domaines d'expertise (6 cards) + 4-item Trust Bar */}
        <ServicesGrid />

        {/* 3. Comment ça fonctionne ? (3 connected steps with red numbers) */}
        <MethodSection />

        {/* 4. Ils nous font confiance (3 quote cards with red quotes & gold stars) */}
        <TestimonialsSection />

        {/* 5. Dual CTA / FAQ Banner ("Une question ?" & "Besoin d'un accompagnement ?") */}
        <DualCtaBanner />

        {/* 6. Nous contacter (Map + Direct Contact info + Office photo with 3D logo) */}
        <ContactSection />

        {/* 7. Comprehensive Interactive Modules */}
        <AboutSection />
        <SimulatorsSection />
        <FaqSection />
        <BlogSection />
      </main>

      {/* Full Footer with 5-column layout */}
      <Footer />

      {/* Interactive Global Modals */}
      <ServiceDetailModal />
      <AppointmentModal />
      <QuoteModal />
      <LegalModal />
      <AdminModal />

      {/* Floating Action Buttons */}
      <aside aria-label="Boutons d'action rapide" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            id="floating-scroll-top-btn"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#0c2340] hover:bg-slate-900 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer border border-slate-700"
            title="Remonter en haut de page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Quick Admin Access Bubble (when logged in) */}
        {isAdminLoggedIn && (
          <button
            id="floating-admin-badge-btn"
            onClick={() => setIsAdminModalOpen(true)}
            className="px-3 py-1.5 rounded-full bg-[#0c2340] text-amber-400 font-bold text-xs shadow-lg border border-amber-400/40 flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin connecté</span>
          </button>
        )}

        {/* Floating WhatsApp Bubble */}
        <a
          id="floating-whatsapp-btn"
          href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Bonjour%20ADN%20Conseils,%20je%20souhaite%20un%20renseignement%20sur%20mes%20démarches.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 border-2 border-white/20"
          title="Échanger sur WhatsApp"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="text-xs font-black pr-1 hidden sm:inline">WhatsApp Express</span>
        </a>

      </aside>

    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainLayout />
    </DataProvider>
  );
}
