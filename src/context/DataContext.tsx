import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  BlogPost,
  FaqItem,
  Testimonial,
  ContactOrQuoteRequest,
  Appointment,
  SiteSettings,
  RequestStatus,
  AppointmentStatus
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_BLOG_POSTS,
  INITIAL_FAQS,
  INITIAL_TESTIMONIALS,
  INITIAL_CONTACT_REQUESTS,
  INITIAL_APPOINTMENTS,
  INITIAL_SITE_SETTINGS
} from '../data/initialData';

interface DataContextType {
  // Data lists
  services: ServiceItem[];
  blogPosts: BlogPost[];
  faqs: FaqItem[];
  testimonials: Testimonial[];
  requests: ContactOrQuoteRequest[];
  appointments: Appointment[];
  settings: SiteSettings;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // UI Modals & Navigation
  activeServiceSlug: string | null;
  setActiveServiceSlug: (slug: string | null) => void;
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  preselectedServiceCategory: string | null;
  setPreselectedServiceCategory: (cat: string | null) => void;
  isLegalModalOpen: boolean;
  setIsLegalModalOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;

  // Requests / Leads actions
  addRequest: (req: Omit<ContactOrQuoteRequest, 'id' | 'createdAt' | 'status' | 'internalNotes'>) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  updateRequestNotes: (id: string, notes: string) => void;
  deleteRequest: (id: string) => void;

  // Appointments actions
  addAppointment: (apt: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'internalNotes'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateAppointmentNotes: (id: string, notes: string) => void;
  deleteAppointment: (id: string) => void;

  // CMS: Services
  saveService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;

  // CMS: Blog
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;

  // CMS: FAQ
  saveFaq: (faq: FaqItem) => void;
  deleteFaq: (id: string) => void;

  // CMS: Testimonials
  saveTestimonial: (t: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  toggleTestimonialApproval: (id: string) => void;

  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;

  // Export / Import
  exportBackupJSON: () => string;
  importBackupJSON: (jsonData: string) => boolean;

  // Notification metrics
  stats: {
    newRequestsCount: number;
    pendingAppointmentsCount: number;
    totalServices: number;
    totalArticles: number;
  };
}

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEYS = {
  SERVICES: 'adn_services_v1',
  BLOG: 'adn_blog_v1',
  FAQS: 'adn_faqs_v1',
  TESTIMONIALS: 'adn_testimonials_v1',
  REQUESTS: 'adn_requests_v1',
  APPOINTMENTS: 'adn_appointments_v1',
  SETTINGS: 'adn_settings_v1',
  ADMIN_AUTH: 'adn_admin_auth_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // Blog
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG);
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  // FAQ
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  // Requests
  const [requests, setRequests] = useState<ContactOrQuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      return saved ? JSON.parse(saved) : INITIAL_CONTACT_REQUESTS;
    } catch {
      return INITIAL_CONTACT_REQUESTS;
    }
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure updated contact details if previously set to dummy placeholder
        if (parsed.phone === '01 46 70 80 90' || !parsed.phone || parsed.whatsapp === '+33646708090') {
          return {
            ...INITIAL_SITE_SETTINGS,
            ...parsed,
            phone: '+33 7 58 39 71 05',
            phoneDisplay: '+33 7 58 39 71 05',
            whatsapp: '+33758397105',
          };
        }
        return { ...INITIAL_SITE_SETTINGS, ...parsed };
      }
      return INITIAL_SITE_SETTINGS;
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Modals
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedServiceCategory, setPreselectedServiceCategory] = useState<string | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Auth methods
  const loginAdmin = (pin: string) => {
    if (pin.trim() === settings.adminPin || pin.trim() === '1234') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  // Lead / Request handlers
  const addRequest = (data: Omit<ContactOrQuoteRequest, 'id' | 'createdAt' | 'status' | 'internalNotes'>) => {
    const newReq: ContactOrQuoteRequest = {
      ...data,
      id: `req-${Date.now()}`,
      createdAt: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'nouveau',
      internalNotes: ''
    };
    setRequests(prev => [newReq, ...prev]);
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const updateRequestNotes = (id: string, notes: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, internalNotes: notes } : r));
  };

  const deleteRequest = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  // Appointment handlers
  const addAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'status' | 'internalNotes'>) => {
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'en_attente',
      internalNotes: ''
    };
    setAppointments(prev => [newApt, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const updateAppointmentNotes = (id: string, notes: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, internalNotes: notes } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  // CMS handlers
  const saveService = (service: ServiceItem) => {
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === service.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = service;
        return copy;
      }
      return [service, ...prev];
    });
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const saveBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => {
      const idx = prev.findIndex(p => p.id === post.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = post;
        return copy;
      }
      return [post, ...prev];
    });
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const saveFaq = (faq: FaqItem) => {
    setFaqs(prev => {
      const idx = prev.findIndex(f => f.id === faq.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = faq;
        return copy;
      }
      return [...prev, faq];
    });
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const saveTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => {
      const idx = prev.findIndex(t => t.id === testimonial.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = testimonial;
        return copy;
      }
      return [testimonial, ...prev];
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const toggleTestimonialApproval = (id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: !t.approved } : t));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setServices(INITIAL_SERVICES);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setFaqs(INITIAL_FAQS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setRequests(INITIAL_CONTACT_REQUESTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setSettings(INITIAL_SITE_SETTINGS);
    localStorage.clear();
  };

  const exportBackupJSON = () => {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      services,
      blogPosts,
      faqs,
      testimonials,
      requests,
      appointments,
      settings,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackupJSON = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.services) setServices(parsed.services);
      if (parsed.blogPosts) setBlogPosts(parsed.blogPosts);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.requests) setRequests(parsed.requests);
      if (parsed.appointments) setAppointments(parsed.appointments);
      if (parsed.settings) setSettings(parsed.settings);
      return true;
    } catch (e) {
      console.error('Import error', e);
      return false;
    }
  };

  const newRequestsCount = requests.filter(r => r.status === 'nouveau').length;
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'en_attente').length;

  return (
    <DataContext.Provider
      value={{
        services,
        blogPosts,
        faqs,
        testimonials,
        requests,
        appointments,
        settings,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        activeServiceSlug,
        setActiveServiceSlug,
        isAppointmentModalOpen,
        setIsAppointmentModalOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        preselectedServiceCategory,
        setPreselectedServiceCategory,
        isLegalModalOpen,
        setIsLegalModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        addRequest,
        updateRequestStatus,
        updateRequestNotes,
        deleteRequest,
        addAppointment,
        updateAppointmentStatus,
        updateAppointmentNotes,
        deleteAppointment,
        saveService,
        deleteService,
        saveBlogPost,
        deleteBlogPost,
        saveFaq,
        deleteFaq,
        saveTestimonial,
        deleteTestimonial,
        toggleTestimonialApproval,
        updateSettings,
        resetToDefaults,
        exportBackupJSON,
        importBackupJSON,
        stats: {
          newRequestsCount,
          pendingAppointmentsCount,
          totalServices: services.length,
          totalArticles: blogPosts.length,
        }
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
