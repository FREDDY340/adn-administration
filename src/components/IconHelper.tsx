import React from 'react';
import {
  FileText,
  Award,
  Building2,
  Mail,
  Car,
  Languages,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  HelpCircle,
  BookOpen,
  Users,
  User,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Download,
  Upload,
  AlertTriangle,
  Lock,
  Search,
  Filter,
  Trash2,
  Edit,
  Edit as Edit2,
  Plus,
  Eye,
  Check,
  X,
  XCircle,
  Sparkles,
  Info,
  DollarSign,
  Briefcase,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Menu,
  Send,
  Video,
  Tag,
  Key,
  LogOut,
  Settings,
  Database,
  LayoutDashboard,
  Star,
  RefreshCw,
  ClipboardList
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', size }) => {
  switch (name) {
    case 'FileText': return <FileText className={className} size={size} />;
    case 'Award': return <Award className={className} size={size} />;
    case 'Building2': return <Building2 className={className} size={size} />;
    case 'Mail': return <Mail className={className} size={size} />;
    case 'Car': return <Car className={className} size={size} />;
    case 'Languages': return <Languages className={className} size={size} />;
    case 'ShieldCheck': return <ShieldCheck className={className} size={size} />;
    case 'Clock': return <Clock className={className} size={size} />;
    case 'Users': return <Users className={className} size={size} />;
    case 'BookOpen': return <BookOpen className={className} size={size} />;
    case 'DollarSign': return <DollarSign className={className} size={size} />;
    case 'Briefcase': return <Briefcase className={className} size={size} />;
    default: return <FileText className={className} size={size} />;
  }
};

export {
  FileText,
  Award,
  Building2,
  Mail,
  Car,
  Languages,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  HelpCircle,
  BookOpen,
  Users,
  User,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Download,
  Upload,
  AlertTriangle,
  Lock,
  Search,
  Filter,
  Trash2,
  Edit,
  Edit2,
  Plus,
  Eye,
  Check,
  X,
  XCircle,
  Sparkles,
  Info,
  DollarSign,
  Briefcase,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Menu,
  Send,
  Video,
  Tag,
  Key,
  LogOut,
  Settings,
  Database,
  LayoutDashboard,
  Star,
  RefreshCw,
  ClipboardList
};
