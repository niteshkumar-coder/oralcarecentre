import React from 'react';
import {
  Stethoscope,
  Activity,
  Hammer,
  Grid,
  Layers,
  Sparkles,
  Heart,
  Smile,
  Baby,
  Scissors,
  Award,
  ShieldAlert,
  Paintbrush,
  Waves,
  Gem,
  Cpu,
  CheckCircle,
  Shield,
  PhoneCall,
  User,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Send,
  ExternalLink,
  Check,
  Star,
  Plus
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Stethoscope,
  Activity,
  Hammer,
  Grid,
  Layers,
  Sparkles,
  Heart,
  Smile,
  Baby,
  Scissors,
  Award,
  ShieldAlert,
  Paintbrush,
  Waves,
  Gem,
  Cpu,
  CheckCircle,
  Shield,
  PhoneCall,
  User,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Send,
  ExternalLink,
  Check,
  Star,
  Plus
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = '', size }: IconProps) {
  const IconComponent = iconMap[name] || Stethoscope;
  return <IconComponent className={className} size={size} />;
}
