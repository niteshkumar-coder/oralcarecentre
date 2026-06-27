import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Activity,
  Heart,
  Sparkles,
  Award,
  PhoneCall,
  User,
  ShieldAlert,
  Cpu,
  Shield,
  MessageSquare,
  Bookmark,
  Menu,
  X,
  Calendar,
  Smartphone,
  Eye,
  Check,
  ArrowUpRight,
  ThumbsUp,
  Share2
} from 'lucide-react';

// Static Data and Types
import { SERVICES, DOCTORS, REVIEWS, CONTACT_DATA, CLINIC_IMAGES, TRUST_FACTS, WHY_CHOOSE_US } from './data';
import { Service, Doctor } from './types';

// Premium Components
import Navbar from './components/Navbar';
import ServiceCard from './components/ServiceCard';
import DoctorCard from './components/DoctorCard';
import ClinicGallery from './components/ClinicGallery';
import ServiceModal from './components/ServiceModal';
import AppointmentForm from './components/AppointmentForm';

// Premium Before & After Data
const BEFORE_AFTER_CASES = [
  {
    id: 'case-1',
    title: 'Invisalign Clear Aligners',
    desc: 'Completed in 11 months without metal wires.',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    stats: '100% Alignment Restored'
  },
  {
    id: 'case-2',
    title: 'Laser Teeth Whitening',
    desc: 'Deep ultrasonic whitening done in 45 minutes.',
    beforeImage: 'https://images.unsplash.com/photo-1513224506828-3fa2d4b729ea?auto=format&fit=crop&q=80&w=400',
    afterImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=400',
    stats: '8 Shades Lighter'
  },
  {
    id: 'case-3',
    title: 'Full Smile Veneers Makeover',
    desc: 'Custom porcelain veneers for chipped teeth.',
    beforeImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    stats: 'Bespoke Facial Harmony'
  }
];

// Clinic FAQs
const CLINIC_FAQS = [
  {
    question: 'What are the consultation timings of the clinic?',
    answer: 'The clinic is open from Monday to Saturday, 10:00 AM - 02:00 PM and 05:00 PM - 08:30 PM. Sundays are available from 10:00 AM - 01:30 PM by prior appointment only.'
  },
  {
    question: 'How do I book a priority slot to avoid waiting?',
    answer: 'Simply use our online Book Appointment form, call us directly, or WhatsApp us. Booking online secures your digital priority timing to ensure you are attended immediately upon arrival.'
  },
  {
    question: 'Are dental implant procedures painful?',
    answer: 'Not at all. We utilize computer-guided precision surgery and advanced local anesthetic techniques to make sure the implant placement is completely painless, rapid, and comfortable.'
  },
  {
    question: 'What measures are taken for dental sterilization?',
    answer: 'Patient safety is our highest priority. We follow strict international hygiene protocols using multi-stage medical Class-B autoclave vacuum sterilization for all clinical instruments.'
  },
  {
    question: 'Do you offer instant treatment for dental emergencies?',
    answer: 'Yes. We have a dedicated emergency panel of senior surgeons to handle acute dental pain, knocked-out teeth, jaw injuries, and dental trauma instantly without long waits.'
  }
];

export default function App() {
  // Page states
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingServiceId, setBookingServiceId] = useState<string>('');
  const [bookingDoctorId, setBookingDoctorId] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Refs for interactive components
  const beforeAfterContainerRef = useRef<HTMLDivElement>(null);
  const appointmentSectionRef = useRef<HTMLDivElement>(null);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Section smooth scrolling coordinator
  const scrollToSection = (id: string, serviceId = '', doctorId = '') => {
    if (serviceId) setBookingServiceId(serviceId);
    if (doctorId) setBookingDoctorId(doctorId);

    if (id === 'appointment' && appointmentSectionRef.current) {
      appointmentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Drag comparison slider handlers
  const handleBeforeAfterMove = (clientX: number) => {
    if (!beforeAfterContainerRef.current) return;
    const rect = beforeAfterContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleBeforeAfterMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left click held
      handleBeforeAfterMove(e.clientX);
    }
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % REVIEWS.length);
  };

  return (
    <div className="min-h-screen bg-clinic-bg text-gray-900 font-sans flex flex-col relative selection:bg-primary selection:text-white">
      
      {/* 1. Sticky Glassmorphism Navigation Bar */}
      <Navbar onBookClick={() => scrollToSection('appointment')} />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col pt-16">

        {/* 2. Hero Section */}
        <section id="home" className="relative h-[85vh] sm:h-[88vh] md:h-auto md:min-h-[85vh] flex items-end md:items-center justify-center pt-24 pb-8 md:py-20 bg-gray-900 overflow-hidden">
          {/* Full-bleed background image */}
          <div className="absolute inset-0">
            <img 
              src={CLINIC_IMAGES.exterior} 
              alt="Oral Care Centre Gorakhpur Hospital Front" 
              className="w-full h-full object-cover object-center filter brightness-95 contrast-100 saturate-105"
              referrerPolicy="no-referrer"
            />
            {/* Dark elegant contrast overlay for clean readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent md:from-gray-950/95 md:via-gray-900/60 md:to-gray-900/75" />
          </div>

          {/* Hero Content (Centered) */}
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 text-center space-y-5 md:space-y-7 flex flex-col items-center justify-end md:justify-center h-full">
            
            {/* Visual Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-white bg-blue-600/95 border border-blue-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                ★ Trusted by 10,000+ Patients
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="hidden md:block space-y-3 max-w-3xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[34px] sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white leading-[1.15] md:leading-tight flex flex-col gap-1 md:gap-1.5"
              >
                <span>Premium</span>
                <span>Multi-Speciality</span>
                <span className="text-[#007AFF] md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-blue-400 md:to-blue-300">
                  Dental Clinic
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm md:text-base text-white/85 md:text-gray-300 max-w-[290px] sm:max-w-xl mx-auto leading-relaxed"
              >
                Advanced dentistry with modern technology & experienced specialists providing painless, world-class dental care.
              </motion.p>
            </div>

            {/* Call-To-Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3 w-full md:w-auto pt-2 items-center px-5 sm:px-6 md:px-0"
            >
              <button 
                onClick={() => scrollToSection('appointment')}
                className="w-full md:w-[280px] h-12 md:h-auto md:py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-sans md:font-display font-bold md:font-black text-sm rounded-[18px] md:rounded-xl text-center shadow-md shadow-blue-900/10 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Book Appointment
              </button>
              
              <div className="grid grid-cols-2 gap-3 w-full md:w-[280px]">
                <a 
                  href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
                  className="h-12 md:h-auto md:py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-150 md:border-gray-100 font-sans md:font-display font-bold text-xs rounded-[18px] md:rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Phone size={14} className="text-[#007AFF]" />
                  Call Now
                </a>
                
                <a 
                  href="https://wa.me/919450456789"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="h-12 md:h-auto md:py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans md:font-display font-bold text-xs rounded-[18px] md:rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.03 14.113.999 11.989 1c-5.444 0-9.873 4.38-9.877 9.808-.002 1.761.477 3.481 1.392 5.016l-1.018 3.72 3.837-.992c1.512.831 3.167 1.272 4.724 1.272zm11.758-7.795c-.307-.154-1.815-.895-2.097-.996-.282-.102-.487-.154-.691.154-.204.307-.79.996-.968 1.201-.179.204-.359.227-.666.074-.307-.153-1.298-.478-2.472-1.524-.913-.812-1.53-1.817-1.71-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.359.461-.539.154-.179.204-.307.307-.513.102-.204.051-.384-.025-.539-.077-.154-.691-1.666-.947-2.28-.249-.611-.523-.529-.691-.529-.179-.001-.384-.001-.59-.001-.204 0-.539.077-.82.384-.282.307-1.077 1.051-1.077 2.561s1.102 2.971 1.255 3.176c.154.204 2.169 3.311 5.253 4.641.734.316 1.307.505 1.751.645.738.234 1.41.201 1.942.121.593-.089 1.815-.743 2.071-1.46.256-.717.256-1.332.179-1.46-.076-.128-.281-.205-.588-.359z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* High-fidelity Mock Stats Overlay in Hero */}
              <div className="hidden md:grid grid-cols-3 gap-3 w-full sm:w-[380px] p-4 bg-slate-950/75 backdrop-blur-md border border-white/10 rounded-2xl mt-4">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-0.5">
                    <span className="text-amber-400">★</span>
                    <span>4.9</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-300 font-bold block">Rating</span>
                </div>
                <div className="text-center border-l border-r border-white/10 px-1">
                  <div className="text-base sm:text-lg font-black text-white">ISO</div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-300 font-bold block">Certified</span>
                </div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-black text-white">25+</div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-300 font-bold block">Years Exp.</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 3. Quick Actions Row Grid */}
        <section id="quick-actions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full -mt-10 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Quick Action 1 */}
            <button 
              onClick={() => scrollToSection('appointment')}
              className="bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer border border-gray-100/80 hover:border-blue-600/25 hover:shadow-xl transition-all duration-300 shadow-sm group active:scale-[0.98]"
              id="action-book"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                <Calendar size={22} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-900 font-display">Book Appointment</span>
            </button>

            {/* Quick Action 2 */}
            <a 
              href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
              className="bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer border border-gray-100/80 hover:border-blue-600/25 hover:shadow-xl transition-all duration-300 shadow-sm group active:scale-[0.98]"
              id="action-call"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                <Phone size={22} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-900 font-display">Call Clinic</span>
            </a>

            {/* Quick Action 3 */}
            <a 
              href="https://wa.me/919450456789"
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer border border-gray-100/80 hover:border-green-600/25 hover:shadow-xl transition-all duration-300 shadow-sm group active:scale-[0.98]"
              id="action-whatsapp"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-inner">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.03 14.113.999 11.989 1c-5.444 0-9.873 4.38-9.877 9.808-.002 1.761.477 3.481 1.392 5.016l-1.018 3.72 3.837-.992c1.512.831 3.167 1.272 4.724 1.272zm11.758-7.795c-.307-.154-1.815-.895-2.097-.996-.282-.102-.487-.154-.691.154-.204.307-.79.996-.968 1.201-.179.204-.359.227-.666.074-.307-.153-1.298-.478-2.472-1.524-.913-.812-1.53-1.817-1.71-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.359.461-.539.154-.179.204-.307.307-.513.102-.204.051-.384-.025-.539-.077-.154-.691-1.666-.947-2.28-.249-.611-.523-.529-.691-.529-.179-.001-.384-.001-.59-.001-.204 0-.539.077-.82.384-.282.307-1.077 1.051-1.077 2.561s1.102 2.971 1.255 3.176c.154.204 2.169 3.311 5.253 4.641.734.316 1.307.505 1.751.645.738.234 1.41.201 1.942.121.593-.089 1.815-.743 2.071-1.46.256-.717.256-1.332.179-1.46-.076-.128-.281-.205-.588-.359z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-900 font-display">WhatsApp Chat</span>
            </a>

            {/* Quick Action 4 */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer border border-gray-100/80 hover:border-blue-600/25 hover:shadow-xl transition-all duration-300 shadow-sm group active:scale-[0.98]"
              id="action-location"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner">
                <MapPin size={22} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-900 font-display">Our Location</span>
            </button>

          </div>
        </section>

        {/* 4. Credentials & Statistics Banner (Desktop Only) */}
        <section id="about" className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-gradient-to-br from-primary via-primary/95 to-secondary text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Ambient decorative light circle */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full filter blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
              {TRUST_FACTS.map((fact, i) => (
                <div key={i} className="space-y-2 flex flex-col justify-center items-center">
                  <span className="text-3xl sm:text-5xl font-display font-black tracking-tight block">
                    {fact.value}
                  </span>
                  <div className="space-y-1 max-w-[200px]">
                    <span className="text-xs sm:text-sm font-bold text-blue-100 uppercase tracking-wider block">
                      {fact.label}
                    </span>
                    <span className="text-[10px] text-blue-200/90 leading-tight block">
                      {fact.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why Choose Us */}
        <section className="bg-white py-12 md:py-16 w-full" id="why-choose-us-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                Clinical Excellence
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                Why Patients Choose Us
              </h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium hidden md:block">
                We combine experienced surgical specialists, modern high-tech facilities, and absolute patient safety systems.
              </p>
            </div>

            {/* Desktop 4-column Grid */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
              {WHY_CHOOSE_US.map((item, i) => {
                const iconsMap: Record<string, React.ReactNode> = {
                  Cpu: <Cpu size={22} />,
                  Award: <Award size={22} />,
                  Heart: <Heart size={22} />,
                  Sparkles: <Sparkles size={22} />,
                  CheckCircle: <CheckCircle2 size={22} />,
                  Shield: <Shield size={22} />,
                  PhoneCall: <PhoneCall size={22} />,
                  User: <User size={22} />
                };

                return (
                  <div 
                    key={i} 
                    className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary flex items-center justify-center shadow-inner">
                        {iconsMap[item.icon] || <CheckCircle2 size={22} />}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 font-display">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile 3x2 Grid and Stats Banner matching the mockup exactly */}
            <div className="block md:hidden space-y-6">
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { title: "Advanced Technology", icon: <Cpu size={18} /> },
                  { title: "Pain-Free Treatment", icon: <Heart size={18} /> },
                  { title: "Experienced Specialists", icon: <Award size={18} /> },
                  { title: "Digital X-Ray", icon: <Shield size={18} /> },
                  { title: "Sterilization & Safety", icon: <Sparkles size={18} /> },
                  { title: "ISO Certified", icon: <CheckCircle2 size={18} /> }
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50/70 border border-slate-100/50 rounded-xl flex flex-col items-center justify-center text-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-primary flex items-center justify-center shadow-inner flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black text-gray-800 leading-tight">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Banner below the 3x2 grid on mobile */}
              <div className="bg-[#051C45] text-white rounded-2xl p-4 grid grid-cols-4 gap-1.5 text-center shadow-lg">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xs sm:text-sm font-black text-white block">10,000+</span>
                  <span className="text-[8px] uppercase tracking-wider text-blue-200 leading-none mt-1">Happy Patients</span>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-white/10">
                  <span className="text-xs sm:text-sm font-black text-white block">25+</span>
                  <span className="text-[8px] uppercase tracking-wider text-blue-200 leading-none mt-1">Years Exp.</span>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-white/10">
                  <span className="text-xs sm:text-sm font-black text-white block">15+</span>
                  <span className="text-[8px] uppercase tracking-wider text-blue-200 leading-none mt-1">Specialists</span>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-white/10">
                  <span className="text-xs sm:text-sm font-black text-white block">4.9★</span>
                  <span className="text-[8px] uppercase tracking-wider text-blue-200 leading-none mt-1">Google Rating</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Speciality Treatments & Services Grid */}
        <section id="services" className="py-12 md:py-16 w-full bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12">
            
            {/* Desktop-only Header */}
            <div className="hidden md:block text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                Full Spectrum Dentistry
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                Advanced Speciality Procedures
              </h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium">
                Undergo modern painless dental operations managed by senior MDS specialists matching international hospital standards.
              </p>
            </div>

            {/* Mobile-only compact Header with View All */}
            <div className="flex md:hidden items-center justify-between">
              <h3 className="text-xl font-display font-black text-gray-900">
                Our Services
              </h3>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 active:scale-95 transition-all"
              >
                View All
              </button>
            </div>

            {/* Beautiful responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, idx) => (
                <ServiceCard 
                  key={service.id}
                  service={service}
                  index={idx}
                  onSelect={setSelectedService}
                  onBook={(id) => scrollToSection('appointment', id)}
                />
              ))}
            </div>

          </div>
        </section>

        {/* 7. Clinical Doctors Panel */}
        <section id="doctors" className="py-16 w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                MDS Specialist Board
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                Meet Our Expert Dental Board
              </h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium">
                Bespoke, compassionate healing delivered by three generations of senior oral surgical and cosmetic design practitioners.
              </p>
            </div>

            {/* Doctors stack list - Desktop */}
            <div className="hidden md:block space-y-8 max-w-5xl mx-auto pt-4">
              {DOCTORS.map((doc) => (
                <DoctorCard 
                  key={doc.id}
                  doctor={doc}
                  onBook={(id) => scrollToSection('appointment', '', id)}
                />
              ))}
            </div>

            {/* Mobile horizontal scrolling panel matching mockup exactly */}
            <div className="flex md:hidden overflow-x-auto gap-4 px-4 pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4">
              {DOCTORS.map((doc) => (
                <div 
                  key={doc.id}
                  className="w-[280px] flex-shrink-0 snap-start bg-white border border-gray-100/90 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  {/* Image with Experience Badge */}
                  <div className="relative h-[220px] w-full bg-slate-100">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
                      {doc.experience.split(' ')[0]}+ Years Exp
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block">
                        {doc.title}
                      </span>
                      <h4 className="text-base font-display font-black text-gray-900 leading-tight">
                        {doc.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                        {doc.qualification}
                      </p>

                      {/* Micro rating / review count line */}
                      <div className="flex items-center gap-1 pt-1.5 pb-2">
                        <div className="flex text-amber-400">
                          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <span className="text-[10px] font-black text-gray-700 ml-1">4.9</span>
                        <span className="text-[9px] text-gray-400 font-medium">(250+ reviews)</span>
                      </div>
                    </div>

                    {/* Book button */}
                    <button 
                      onClick={() => scrollToSection('appointment', '', doc.id)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center shadow-md shadow-blue-900/10 active:scale-95 transition-all cursor-pointer mt-2"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 8. Clinic Digital Gallery (Interactive filter) */}
        <section id="gallery" className="py-16 w-full bg-slate-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                Sterile Environment
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                Explore Our Modern Clinic Tour
              </h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium">
                Witness our absolute clean, Class-B autoclave medical environments, and high-tech diagnostics operatory centers.
              </p>
            </div>

            {/* Core Gallery Component */}
            <div className="pt-4">
              <ClinicGallery />
            </div>

          </div>
        </section>

        {/* 9. Before & After Cases (Interactive Split Slider) */}
        <section id="before-after" className="py-16 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                Transformational Care
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                Smile Transformations Slider
              </h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium">
                Hold the white arrow button and drag to witness real surgical outcomes and alignment makeovers.
              </p>
            </div>

            <div className="lg:grid lg:grid-cols-12 gap-12 items-center bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl max-w-6xl mx-auto">
              {/* Left Column: Split Slider frame */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div 
                  ref={beforeAfterContainerRef}
                  className="relative w-full aspect-4/3 rounded-2xl overflow-hidden select-none cursor-ew-resize border border-gray-200/60 shadow-xl bg-slate-200"
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onMouseDown={(e) => handleBeforeAfterMove(e.clientX)}
                >
                  {/* After Image (Full block) */}
                  <img 
                    src={BEFORE_AFTER_CASES[activeCaseIdx].afterImage} 
                    alt="After Dental Restoration" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute right-4 bottom-4 bg-blue-600 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md z-10">
                    After
                  </div>

                  {/* Before Image Overlay (Clipped) */}
                  <div 
                    className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none z-10 border-r-2 border-white/60"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img 
                      src={BEFORE_AFTER_CASES[activeCaseIdx].beforeImage} 
                      alt="Before Care" 
                      className="absolute inset-y-0 left-0 object-cover max-w-none pointer-events-none"
                      style={{ 
                        width: beforeAfterContainerRef.current?.getBoundingClientRect().width || '100%',
                        height: '100%' 
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute left-4 bottom-4 bg-gray-950/80 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                      Before
                    </div>
                  </div>

                  {/* Drag Control Line Bar */}
                  <div 
                    className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none z-20"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-md border border-gray-150 pointer-events-none text-[10px] font-extrabold select-none">
                      ◀▶
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Case description & Selector buttons */}
              <div className="lg:col-span-5 space-y-6 mt-8 lg:mt-0">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Case Clinical Selection</span>
                  
                  {/* Tabs */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {BEFORE_AFTER_CASES.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveCaseIdx(idx);
                          setSliderPosition(50);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          activeCaseIdx === idx 
                            ? 'bg-primary text-white shadow-md shadow-primary/20' 
                            : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-100'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Case Caption box */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-50 pb-2.5">
                    <h4 className="text-lg font-bold font-display text-gray-900">
                      {BEFORE_AFTER_CASES[activeCaseIdx].title}
                    </h4>
                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {BEFORE_AFTER_CASES[activeCaseIdx].stats}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                    {BEFORE_AFTER_CASES[activeCaseIdx].desc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 10. Patient Testimonials Slider */}
        <section id="reviews" className="py-16 w-full bg-slate-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                Testimonials
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                What Our Patients Say
              </h2>
            </div>

            {/* Swipe container card (Desktop only) */}
            <div className="hidden md:flex bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl relative overflow-hidden max-w-3xl mx-auto min-h-[220px] flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(REVIEWS[activeReviewIdx].rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-bold font-mono">
                    {REVIEWS[activeReviewIdx].date}
                  </span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed font-sans">
                  "{REVIEWS[activeReviewIdx].text}"
                </p>
              </div>

              {/* Reviewer detail */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6">
                <div className="flex items-center gap-3">
                  <img 
                    src={REVIEWS[activeReviewIdx].avatar} 
                    alt={REVIEWS[activeReviewIdx].name} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-gray-900 font-display">
                      {REVIEWS[activeReviewIdx].name}
                    </h5>
                    <span className="text-[9px] sm:text-xs text-green-600 font-bold uppercase tracking-widest block">
                      Google Verified Patient
                    </span>
                  </div>
                </div>
                
                {/* Controllers */}
                <div className="flex gap-1.5">
                  <button 
                    onClick={handlePrevReview}
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-700 font-bold flex items-center justify-center transition-all cursor-pointer"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={handleNextReview}
                    className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-700 font-bold flex items-center justify-center transition-all cursor-pointer"
                  >
                    ›
                  </button>
                </div>
              </div>

            </div>

            {/* Mobile Horizontally Scrolling Testimonials (Mockup styled) */}
            <div className="flex md:hidden overflow-x-auto gap-4 px-4 pb-6 scrollbar-none snap-x snap-mandatory -mx-4">
              {REVIEWS.map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md snap-center flex-shrink-0 w-[295px] flex flex-col justify-between relative min-h-[210px]"
                >
                  <div className="space-y-2.5">
                    {/* Quotation mark & rating */}
                    <div className="flex justify-between items-start">
                      <span className="text-4xl text-blue-600 font-serif leading-none select-none">“</span>
                      <div className="flex items-center gap-0.5 text-yellow-400 pt-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={11} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-[12px] text-gray-700 italic leading-relaxed font-sans line-clamp-4">
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Reviewer and G logo */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3.5 mt-4">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={rev.avatar} 
                        alt={rev.name} 
                        className="w-8 h-8 rounded-full object-cover border border-gray-250 animate-fade-in"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="text-[11px] font-bold text-gray-900 font-display">
                          {rev.name}
                        </h5>
                        <span className="text-[9px] text-gray-400 font-bold block">
                          Verified Patient
                        </span>
                      </div>
                    </div>

                    {/* Google G Logo */}
                    <div className="flex-shrink-0 bg-gray-50 p-1.5 rounded-lg border border-gray-100 shadow-xs">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 11. FAQ Accordion Block */}
        <section className="py-16 w-full bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                Patient Info Portal
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {CLINIC_FAQS.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-gray-800 pr-2 font-display">
                      {faq.question}
                    </span>
                    {activeFaq === idx ? (
                      <span className="text-primary font-black text-lg select-none flex-shrink-0">−</span>
                    ) : (
                      <span className="text-gray-400 font-black text-lg select-none flex-shrink-0">+</span>
                    )}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-slate-100/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Immediate Dental Care Call Banner (Mockup Styled) */}
        <section className="px-4 max-w-4xl mx-auto w-full mb-16">
          <div className="bg-gradient-to-br from-[#051C45] to-[#0b2b63] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden">
            {/* Background decorative tooth icon outline */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.04] text-white pointer-events-none select-none">
              <svg className="w-48 h-48 fill-current" viewBox="0 0 512 512">
                <path d="M410.7 207.2c-5.8-21.6-13.6-43.2-22.3-63.5-9.1-21-19.4-40.8-31-59.4-11.8-19.1-25.2-36.5-40-52-15-15.7-32-28.5-50.6-38C248.1 4.7 227.1 0 206 0c-21.1 0-42.1 4.7-60.8 14.3-18.6 9.5-35.6 22.3-50.6 38-14.8 15.5-28.2 32.9-40 52-11.6 18.6-21.9 38.4-31 59.4-8.7 20.3-16.5 41.9-22.3 63.5C5.8 228.8 2.2 250.7.6 272.7c-2 27.2 4.1 54.4 17.5 78 13.5 23.7 33.4 43.1 57.1 55.4 20.1 10.4 42.1 15.9 64.8 15.9s44.7-5.5 64.8-15.9c23.7-12.3 43.6-31.7 57.1-55.4 13.4-23.6 19.5-50.8 17.5-78-1.6-22-5.2-43.9-10.7-65.5z" />
              </svg>
            </div>

            <div className="space-y-1.5 relative z-10 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-display font-black tracking-tight">
                Need Immediate Dental Care?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 font-sans font-medium max-w-md leading-relaxed">
                Call us or book an appointment for quick assistance with acute pain, fractures, or urgent dental support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10 flex-shrink-0">
              <a 
                href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
                className="px-5 py-3 bg-white hover:bg-gray-50 text-gray-900 font-display font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <Phone size={14} className="text-blue-600" />
                Call Now
              </a>
              
              <a 
                href="https://wa.me/919450456789"
                target="_blank"
                referrerPolicy="no-referrer"
                className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-display font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.03 14.113.999 11.989 1c-5.444 0-9.873 4.38-9.877 9.808-.002 1.761.477 3.481 1.392 5.016l-1.018 3.72 3.837-.992c1.512.831 3.167 1.272 4.724 1.272zm11.758-7.795c-.307-.154-1.815-.895-2.097-.996-.282-.102-.487-.154-.691.154-.204.307-.79.996-.968 1.201-.179.204-.359.227-.666.074-.307-.153-1.298-.478-2.472-1.524-.913-.812-1.53-1.817-1.71-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.359.461-.539.154-.179.204-.307.307-.513.102-.204.051-.384-.025-.539-.077-.154-.691-1.666-.947-2.28-.249-.611-.523-.529-.691-.529-.179-.001-.384-.001-.59-.001-.204 0-.539.077-.82.384-.282.307-1.077 1.051-1.077 2.561s1.102 2.971 1.255 3.176c.154.204 2.169 3.311 5.253 4.641.734.316 1.307.505 1.751.645.738.234 1.41.201 1.942.121.593-.089 1.815-.743 2.071-1.46.256-.717.256-1.332.179-1.46-.076-.128-.281-.205-.588-.359z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* 12. Direct Appointment Form Booking */}
        <section id="appointment" ref={appointmentSectionRef} className="py-16 bg-slate-50 border-t border-b border-gray-100 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AppointmentForm 
              initialServiceId={bookingServiceId}
              initialDoctorId={bookingDoctorId}
              onSuccess={() => {
                setTimeout(() => {
                  if (appointmentSectionRef.current) {
                    appointmentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            />
          </div>
        </section>

        {/* 13. Visit Coordinates & Live Google Map */}
        <section id="contact" className="py-16 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-full">
                Visit coordinates
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900">
                Directions & Timings
              </h2>
            </div>

            <div className="lg:grid lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
              {/* Left column: Information block cards */}
              <div className="space-y-4 flex flex-col justify-between">
                
                {/* Card 1: Timings */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 font-mono">
                    <Clock size={16} className="text-primary" />
                    Clinic Consultations Timings
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between border-b border-gray-100/60 pb-1.5">
                      <span className="text-gray-500 font-medium">Monday - Saturday</span>
                      <span className="font-bold text-gray-800">10:00 AM - 02:00 PM, 05:00 - 08:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">Sunday</span>
                      <span className="font-bold text-primary">10:00 AM - 01:30 PM (By Appointment Only)</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Location Address */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Hospital Address</h5>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed">
                      {CONTACT_DATA.address}
                    </p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1 mt-1"
                    >
                      Open in Google Maps <ExternalLink size={11} />
                    </a>
                  </div>
                </div>

                {/* Card 3: Trauma Support */}
                <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <ShieldAlert size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-red-500 uppercase tracking-widest font-mono">Emergency Desk</h5>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Licensed Dental Surgeons • State Registered Trauma Facility. Lic. GKP/MED/DEN-1092.
                    </p>
                    <p className="text-sm font-black text-red-600">
                      Call Trauma Desk: {CONTACT_DATA.emergencyContact}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right column: Embed Google Maps */}
              <div className="w-full min-h-[300px] lg:min-h-full rounded-2xl overflow-hidden border border-gray-200/60 shadow-lg relative mt-6 lg:mt-0">
                <iframe
                  title="Oral Care Centre Google Map Location"
                  src={CONTACT_DATA.mapEmbedUrl}
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                ></iframe>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 14. Professional Footer */}
      <footer className="bg-gray-950 text-white pt-12 pb-20 md:pb-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Column 1 */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-display font-extrabold text-base">
                  OC
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-display font-black tracking-tight">ORAL CARE CENTRE</span>
                  <span className="text-[10px] font-sans font-bold uppercase text-primary/80 -mt-1">Third Generation Practice</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Providing advanced multi-speciality oral solutions in Gorakhpur with high-tech diagnostic systems, sterilization and generation trust.
              </p>
            </div>

            {/* Column 2 */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Speciality Treatments</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-all text-left">Dental Implants & Prosthetics</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-all text-left">Rotary Micro-Endodontics</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-all text-left">Digital Clear Aligners</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary transition-all text-left">Bespoke Aesthetic Smile Makeovers</button></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Direct Contacts</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Maili Nawa, Jogia Road, Gorakhpur, UP - 273001
              </p>
              <p className="text-sm font-bold text-primary font-display">{CONTACT_DATA.phone}</p>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-500 gap-3">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} ORAL CARE CENTRE. All Rights Reserved.
            </p>
            <p className="text-center md:text-right font-bold tracking-wider uppercase font-mono">
              Licensed Dental Practitioners • Gorakhpur Clinical Project
            </p>
          </div>

        </div>
      </footer>

      {/* 15. Responsive Floating Mobile Action Bar (Non-overlapping 3-Column Solid Buttons) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-150 px-3 py-2.5 grid grid-cols-3 gap-2 md:hidden shadow-[0_-5px_25px_rgba(0,0,0,0.08)]">
        {/* WhatsApp */}
        <a 
          href="https://wa.me/919450456789"
          target="_blank"
          referrerPolicy="no-referrer"
          className="bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-extrabold text-[11px] py-2.5 px-1.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-green-950/15 active:scale-95 transition-all text-center"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.004 2.012c-5.508 0-9.988 4.479-9.988 9.988 0 1.761.46 3.41 1.261 4.856L2 22l5.312-1.391a9.92 9.92 0 004.692 1.18c5.508 0 9.988-4.479 9.988-9.988s-4.479-9.989-9.988-9.989zm6.262 14.15c-.256.717-1.478 1.371-2.071 1.46-.532.08-1.204.113-1.942-.121-3.084-1.33-5.099-4.437-5.253-4.641-.153-.205-1.255-1.666-1.255-3.176s.815-2.254 1.077-2.561c.281-.307.616-.384.82-.384.206 0 .411 0 .59.001.168 0 .442-.082.691.529.256.614.947 2.28.947 2.28.076.155.127.335.025.539-.103.206-.153.334-.307.513-.154.18-.323.401-.461.539-.153.153-.313.318-.134.625.18.307.797 1.312 1.71 2.124 1.174 1.046 2.165 1.371 2.472 1.524.307.154.487.13.666-.074.178-.205.764-.894.968-1.201.204-.308.409-.256.691-.154.282.101 1.79.842 2.097.996.307.154.512.231.588.359.077.128.077.743-.179 1.46z" />
          </svg>
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Call Now */}
        <a 
          href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
          className="bg-[#007AFF] hover:bg-[#0066D6] text-white font-sans font-extrabold text-[11px] py-2.5 px-1.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-950/15 active:scale-95 transition-all text-center"
        >
          <Phone size={13} />
          <span className="truncate">Call Now</span>
        </a>

        {/* Book Appointment */}
        <button 
          onClick={() => scrollToSection('appointment')}
          className="bg-[#051C45] hover:bg-[#03122E] text-white font-sans font-extrabold text-[11px] py-2.5 px-1.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-slate-950/15 active:scale-95 transition-all cursor-pointer text-center"
        >
          <Calendar size={13} />
          <span className="truncate">Book Now</span>
        </button>
      </div>

      {/* 16. Dynamic Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(id) => scrollToSection('appointment', id)}
      />

    </div>
  );
}
