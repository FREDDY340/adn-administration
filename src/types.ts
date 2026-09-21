export type ServiceCategory = 
  | 'etrangers' 
  | 'nationalite' 
  | 'domiciliation' 
  | 'cartegrise' 
  | 'traduction' 
  | 'autre'
  | string;

export interface ServiceStep {
  step?: number;
  number?: number;
  title: string;
  description: string;
}

export type ProcedureStep = ServiceStep;

export interface RequiredDoc {
  id: string;
  name: string;
  category: string;
  mandatory: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ServiceCategory;
  priceEstimate: string;
  processingTime: string;
  badge?: string;
  icon: string;
  requiredDocuments?: string[];
  requiredDocs?: RequiredDoc[];
  steps: ServiceStep[];
  highlights: string[];
  active: boolean;
  featured?: boolean;
  legalBasis?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  tags: string[];
  published: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  featured?: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  serviceCategory: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  approved: boolean;
}

export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
}

export type RequestStatus = 'nouveau' | 'en_cours' | 'traite' | 'archive';

export interface ContactOrQuoteRequest {
  id: string;
  type: 'contact' | 'devis';
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  serviceCategory: string;
  serviceDetail?: string;
  message: string;
  status: RequestStatus;
  internalNotes?: string;
  urgency: 'normal' | 'urgent';
  attachments: FileAttachment[];
}

export type AppointmentStatus = 
  | 'en_attente' 
  | 'confirme' 
  | 'annule' 
  | 'termine' 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled';

export type AppointmentType = 'cabinet' | 'telephone' | 'visio';

export interface Appointment {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceTitle: string;
  appointmentType: AppointmentType;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 - 10:45"
  notes?: string;
  status: AppointmentStatus;
  internalNotes?: string;
}

export type AppointmentBooking = Appointment;

export interface OpeningHourItem {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  openingHours: OpeningHourItem[];
  alertBanner: {
    enabled: boolean;
    message?: string;
    text?: string;
    type: 'info' | 'warning' | 'success';
  };
  disclaimerText: string;
  adminPin: string;
  languagesSpoken: string[];
  socialLinks: {
    googleMaps?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface NationalityQuizState {
  residenceYears: number;
  currentStatus: string;
  frenchLevel: string;
  employmentStatus: string;
  taxesUpToDate: boolean;
  cleanRecord: boolean;
}

export interface CarteGriseCalculation {
  vehicleType: string;
  powerCV: number;
  region: string;
  isElectric: boolean;
  procedureType: string;
  estimatedTax: number;
  serviceFee: number;
  totalCost: number;
}
