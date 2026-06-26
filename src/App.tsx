import React, { useState, useRef } from 'react';
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
  Bookmark
} from 'lucide-react';

// Static Data and Types
import { SERVICES, DOCTORS, TRUST_FACTS, WHY_CHOOSE_US, REVIEWS, CONTACT_DATA, CLINIC_IMAGES } from './data';
import { Service, Doctor } from './types';

// Premium Components
import Navbar from './components/Navbar';
import Icon from './components/Icon';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import DoctorCard from './components/DoctorCard';
import ClinicGallery from './components/ClinicGallery';
import AppointmentForm from './components/AppointmentForm';

export default function App() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingServiceId, setBookingServiceId] = useState<string>('');
  const [bookingDoctorId, setBookingDoctorId] = useState<string>('');
  
  // Ref for scrolling to appointment form
  const appointmentSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAppointment = (serviceId: string = '', doctorId: string = '') => {
    if (serviceId) setBookingServiceId(serviceId);
    if (doctorId) setBookingDoctorId(doctorId);
    
    appointmentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Structured Dental Service Categories to keep 15 services highly structured and elegant
  const serviceCategories = [
    { id: 'all', name: 'All Specialties' },
    { id: 'preventative', name: 'Preventative & General', list: ['general-dentistry', 'scaling-polishing', 'dental-filling', 'pediatric-dentistry'] },
    { id: 'restorative', name: 'Restorative Care', list: ['root-canal', 'dental-implants', 'dentures', 'crowns-bridges'] },
    { id: 'cosmetic', name: 'Cosmetic & Aesthetic', list: ['teeth-whitening', 'smile-makeover', 'cosmetic-dentistry', 'aligners', 'braces'] },
    { id: 'surgical', name: 'Surgical & Advanced', list: ['tooth-extraction', 'oral-surgery'] }
  ];

  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const getFilteredServices = () => {
    if (activeCategoryFilter === 'all') return SERVICES;
    const currentCategory = serviceCategories.find(cat => cat.id === activeCategoryFilter);
    if (!currentCategory || !currentCategory.list) return SERVICES;
    return SERVICES.filter(service => currentCategory.list.includes(service.id));
  };

  return (
    <div className="min-h-screen bg-clinic-bg text-text-dark font-sans selection:bg-primary selection:text-white relative">
      
      {/* 1. Navbar */}
      <Navbar onBookClick={() => scrollToAppointment()} />

      {/* Floating Action Buttons for quick conversions */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Call Floating button */}
        <motion.a
          href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 cursor-pointer border border-white/20 hover:bg-primary/95 transition-all"
          title="Call Clinic"
        >
          <Phone size={18} className="animate-pulse" />
        </motion.a>

        {/* WhatsApp Floating button */}
        <motion.a
          href="https://wa.me/919450456789"
          target="_blank"
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 cursor-pointer border border-white/20 hover:bg-green-600 transition-all"
          title="WhatsApp Us"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.03 14.113.999 11.989 1c-5.444 0-9.873 4.38-9.877 9.808-.002 1.761.477 3.481 1.392 5.016l-1.018 3.72 3.837-.992c1.512.831 3.167 1.272 4.724 1.272zm11.758-7.795c-.307-.154-1.815-.895-2.097-.996-.282-.102-.487-.154-.691.154-.204.307-.79.996-.968 1.201-.179.204-.359.227-.666.074-.307-.153-1.298-.478-2.472-1.524-.913-.812-1.53-1.817-1.71-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.359.461-.539.154-.179.204-.307.307-.513.102-.204.051-.384-.025-.539-.077-.154-.691-1.666-.947-2.28-.249-.611-.523-.529-.691-.529-.179-.001-.384-.001-.59-.001-.204 0-.539.077-.82.384-.282.307-1.077 1.051-1.077 2.561s1.102 2.971 1.255 3.176c.154.204 2.169 3.311 5.253 4.641.734.316 1.307.505 1.751.645.738.234 1.41.201 1.942.121.593-.089 1.815-.743 2.071-1.46.256-.717.256-1.332.179-1.46-.076-.128-.281-.205-.588-.359z" />
          </svg>
        </motion.a>
      </div>

      {/* 2. Stunning Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Full-Clarity Clinic Exterior Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={CLINIC_IMAGES.exterior}
            alt="Oral Care Centre Premium Hospital Front Elevation"
            className="w-full h-full object-cover filter brightness-100 contrast-105 saturate-110"
            referrerPolicy="no-referrer"
          />
          {/* Subtle ambient overlay to keep the buttons highly readable */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Transparent elegant text container without the white card background */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative"
            >
              
              {/* Centered Hero Headlines */}
              <div className="space-y-6">
                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3"
                >
                  <button
                    onClick={() => scrollToAppointment()}
                    className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/95 text-white font-display font-semibold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-98 cursor-pointer text-sm"
                  >
                    Book Appointment
                  </button>
                  <a
                    href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
                    className="w-full sm:w-auto px-7 py-4 bg-white/90 hover:bg-white text-gray-900 font-display font-semibold rounded-2xl shadow-md border border-gray-100 hover:border-gray-200 text-center transition-all flex items-center justify-center gap-2 text-sm backdrop-blur-xs"
                  >
                    <Phone size={14} className="text-primary" />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/919450456789"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-auto px-7 py-4 bg-green-50/90 hover:bg-green-100/90 text-green-700 font-display font-semibold rounded-2xl text-center transition-all flex items-center justify-center gap-2 text-sm backdrop-blur-xs"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.03 14.113.999 11.989 1c-5.444 0-9.873 4.38-9.877 9.808-.002 1.761.477 3.481 1.392 5.016l-1.018 3.72 3.837-.992c1.512.831 3.167 1.272 4.724 1.272zm11.758-7.795c-.307-.154-1.815-.895-2.097-.996-.282-.102-.487-.154-.691.154-.204.307-.79.996-.968 1.201-.179.204-.359.227-.666.074-.307-.153-1.298-.478-2.472-1.524-.913-.812-1.53-1.817-1.71-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.359.461-.539.154-.179.204-.307.307-.513.102-.204.051-.384-.025-.539-.077-.154-.691-1.666-.947-2.28-.249-.611-.523-.529-.691-.529-.179-.001-.384-.001-.59-.001-.204 0-.539.077-.82.384-.282.307-1.077 1.051-1.077 2.561s1.102 2.971 1.255 3.176c.154.204 2.169 3.311 5.253 4.641.734.316 1.307.505 1.751.645.738.234 1.41.201 1.942.121.593-.089 1.815-.743 2.071-1.46.256-.717.256-1.332.179-1.46-.076-.128-.281-.205-.588-.359z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </motion.div>

                {/* Sub-Taglines */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center justify-center gap-4 pt-4 text-xs font-semibold text-gray-700"
                >
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={14} />
                    <span className="text-gray-900 font-bold">4.9 Star</span> Clinic
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <div>ISO 9001 Certified</div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. TRUST STATISTICS RIBBON */}
      <section className="relative z-20 py-10 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {TRUST_FACTS.map((fact, index) => (
              <div key={index} className="pt-6 first:pt-0 lg:pt-0 lg:px-6 first:px-0 text-center lg:text-left space-y-1">
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-primary block">
                  {fact.value}
                </span>
                <span className="text-sm font-bold text-gray-900 block font-poppins">
                  {fact.label}
                </span>
                <span className="text-xs text-gray-400 block font-sans">
                  {fact.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Left Side Images Collage */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl overflow-hidden aspect-3/4 shadow-md bg-clinic-bg"
                >
                  <img
                    src={CLINIC_IMAGES.treatment}
                    alt="Pristine Dental Treatment Room"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="space-y-4 pt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl overflow-hidden aspect-1 shadow-md bg-clinic-bg"
                  >
                    <img
                      src={CLINIC_IMAGES.reception}
                      alt="Luxury Lobby waiting lounge"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20 flex flex-col justify-between"
                  >
                    <span className="text-xl sm:text-2xl font-display font-extrabold block">
                      Est. 1990
                    </span>
                    <span className="text-[11px] font-semibold text-white/80 uppercase tracking-widest mt-2 block">
                      3+ Decades of Clinical Expertise
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Side Legacy Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
                  Elite Medical Legacy
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 leading-tight">
                  Third Generation Dental Practice <br />
                  <span className="text-primary font-medium">In Gorakhpur.</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-sans">
                <p>
                  Established with a noble vision of elite patient health, <strong>Oral Care Centre</strong> represents over thirty years of outstanding dental care. Our practice spans across three generations of dental specialists, ensuring a beautiful synthesis of unmatched vintage wisdom and ultra-modern digital dentistry techniques.
                </p>
                <p>
                  We are deeply committed to a <strong>patient-first approach</strong>, providing specialized clinical care within a sterile, relaxing, and transparent hospital setting. By combining international standards, advanced diagnostics, and compassionate family-style empathy, we have restored over 10,000 smiles across Gorakhpur and surrounding cities.
                </p>
              </div>

              {/* Core Pillars Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                {[
                  'Advanced Low-Radiation Digital X-Rays',
                  'World-Class Class-B Autoclave Sterilization',
                  'Affordable & Completely Transparent Costs',
                  'Friendly, Anxiety-Free Environment',
                  'Specialized Senior Consultant Panel',
                  'Instant Priorities for Dental Trauma'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-gray-800">
                    <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToAppointment()}
                  className="px-6 py-3.5 bg-primary hover:bg-primary/95 text-white font-display font-semibold rounded-xl text-xs transition-all shadow-md shadow-primary/15 hover:shadow-primary/25 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Book Instant Timing <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="services" className="py-20 sm:py-28 bg-clinic-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-100/60 px-3 py-1 rounded-full">
              Full Spectrum Dentistry
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              Multi-Speciality Oral Care Services
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              From advanced cosmetic veneers to pain-free digital implant surgeries, find premium clinical solutions designed specifically for your aesthetic and health goals.
            </p>
          </div>

          {/* Categorized Filter Tabs to make 15 services highly scannable */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                  activeCategoryFilter === cat.id
                    ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                    : 'bg-white hover:bg-gray-50 border-gray-100 text-gray-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid of services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            <AnimatePresence mode="popLayout">
              {getFilteredServices().map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  onSelect={setSelectedService}
                  onBook={(id) => scrollToAppointment(id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Bottom Trust Badge */}
          <div className="text-center bg-white border border-gray-100 rounded-2xl p-4 max-w-md mx-auto shadow-sm">
            <p className="text-xs text-gray-500 font-medium">
              Need assistance selecting a treatment?{' '}
              <button onClick={() => scrollToAppointment()} className="text-primary font-bold underline cursor-pointer">
                Consult with our doctors directly
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Soft decorative visual background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
              Why Choose Oral Care Centre
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              International Standard Dental Care
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              We stand out through absolute precision, top-tier clinical hygiene, clear transparent communication, and three decades of clinical legacy.
            </p>
          </div>

          {/* Grid list of reasons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {WHY_CHOOSE_US.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-clinic-bg rounded-2xl p-6 border border-gray-50 hover:border-primary/10 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <h4 className="text-base font-display font-bold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency Callout Card */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-primary/10 shadow-lg max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-bold text-red-500 tracking-wide uppercase flex items-center justify-center sm:justify-start gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> Urgent Dental Emergency?
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-gray-900">
                Facing severe pain or fractured tooth?
              </h3>
              <p className="text-xs text-gray-500 max-w-lg">
                We prioritize urgent treatments immediately. Our specialized emergency surgical panel is available to handle extreme pain instantly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={`tel:${CONTACT_DATA.emergencyContact.replace(/\s+/g, '')}`}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl text-xs text-center transition-all shadow-md shadow-red-100 flex items-center justify-center gap-1.5"
              >
                <Phone size={14} /> Call Emergency: {CONTACT_DATA.emergencyContact.split(' ').slice(2).join(' ')}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 7. DOCTORS SECTION */}
      <section id="doctors" className="py-20 sm:py-28 bg-clinic-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
              Our Expert Panel
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              Meet our Certified Dental Specialists
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Rest assured in the hands of three generations of elite dental specialists holding certified master degrees (MDS) in Prosthodontics, Endodontics, and Orthodontics.
            </p>
          </div>

          {/* Doctors profiles cards */}
          <div className="space-y-8 max-w-5xl mx-auto">
            {DOCTORS.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={(id) => scrollToAppointment('', id)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 8. GALLERY SECTION */}
      <section id="gallery" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
              Visual Tour
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              Oral Care Centre Premium Clinic Gallery
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Browse our state-of-the-art clinic premises, from luxury waiting lounges and sterile surgical suites to high-end dental chairs and equipment.
            </p>
          </div>

          {/* Interactive filterable gallery */}
          <ClinicGallery />

        </div>
      </section>

      {/* 9. PATIENT REVIEWS SECTION */}
      <section id="reviews" className="py-20 sm:py-28 bg-clinic-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
              Patient Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              What Our Happy Patients Say
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Read authentic feedback from local families and young professionals about their comfortable experiences at our multi-speciality hospital.
            </p>
          </div>

          {/* Rating Summary badge */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm max-w-md mx-auto flex items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-3xl font-display font-black text-gray-900 block">4.9 / 5.0</span>
              <div className="flex items-center gap-0.5 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400" />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-semibold block uppercase tracking-wide">
                Average Google Business Rating
              </span>
            </div>
            <div className="h-12 w-px bg-gray-100" />
            <div className="text-right space-y-0.5">
              <span className="text-xs font-bold text-gray-800 block">100% Patient Trust</span>
              <span className="text-[11px] text-gray-500 block leading-relaxed">
                Based on 1,500+ patient surveys and feedback forms in Gorakhpur.
              </span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-4">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  {/* Rating Stars and Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} size={14} className="fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase font-mono">
                      {review.date}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic font-sans">
                    "{review.text}"
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-50">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover shadow-inner"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">{review.name}</h5>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Verified Patient</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. BOOK APPOINTMENT INTERACTIVE SECTION */}
      <section id="appointment-booking-section" ref={appointmentSectionRef} className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Left Column copywriting */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full inline-block">
                  Priority Timings
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 leading-tight">
                  Restore Your Smile <br />
                  <span className="text-primary font-medium">Without Long Waiting.</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-sans">
                <p>
                  At Oral Care Centre, we value your tight schedule. We offer specialized priority appointments to completely eliminate tiresome wait-room intervals.
                </p>
                <p>
                  Simply complete our secure form to choose your preferred date, select your treatment category, and optionally pick your target doctor. Once done, our coordinator will reach out directly to confirm your exact timing.
                </p>
              </div>

              {/* Trust parameters */}
              <div className="space-y-3.5 border-t border-gray-100 pt-6">
                {[
                  'Instant digital confirmation via SMS & WhatsApp.',
                  'No hidden charges. Clear diagnostics and quotes.',
                  'Flexible booking adjustments or cancellations.',
                  'Spacious waiting area with luxury amenities.'
                ].map((txt, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{txt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column appointment booking form */}
            <div className="lg:col-span-7">
              <AppointmentForm 
                initialServiceId={bookingServiceId} 
                initialDoctorId={bookingDoctorId}
                onSuccess={() => {
                  // Trigger scroll slightly to see receipt
                  setTimeout(() => {
                    appointmentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 11. CONTACT AND DIRECTIONS SECTION */}
      <section id="contact" className="py-20 sm:py-28 bg-clinic-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
              Location & Details
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900">
              Get in Touch or Visit Our Clinic
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Easily accessible in the heart of Gorakhpur on Jogia Road. Reach out via call, email, or WhatsApp instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left side details blocks */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-gray-900 border-b border-gray-200 pb-3">
                  Clinic Credentials
                </h3>

                {/* Opening Hours list */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 font-sans">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={12} className="text-primary" />
                    Opening Hours & Timings
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-500 font-medium">Monday - Friday</span>
                      <span className="font-bold text-gray-800">{CONTACT_DATA.openingHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-1.5">
                      <span className="text-gray-500 font-medium">Saturday</span>
                      <span className="font-bold text-gray-800">{CONTACT_DATA.openingHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">Sunday</span>
                      <span className="font-bold text-primary">{CONTACT_DATA.openingHours.sunday}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Points list */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Address */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Clinic Address</h5>
                      <p className="text-xs font-semibold text-gray-800 mt-1 leading-relaxed">
                        {CONTACT_DATA.address}
                      </p>
                      <a 
                        href="https://maps.google.com" 
                        target="_blank" 
                        className="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5 mt-1"
                      >
                        Open in Google Maps <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-lg bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone & WhatsApp</h5>
                      <p className="text-xs font-bold text-gray-800 mt-1">
                        Clinic Number: <a href={`tel:${CONTACT_DATA.phone}`} className="text-primary hover:underline">{CONTACT_DATA.phone}</a>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        WhatsApp Live Chat available during opening hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional medical certificate line */}
              <div className="text-xs text-gray-500 bg-white/50 border border-gray-100 p-4 rounded-xl flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                <p>Registered Healthcare Facility. License No. GKP/MED/DEN-1092. Gorakhpur Medical Council.</p>
              </div>
            </div>

            {/* Right side Google Maps iframe */}
            <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[350px] rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-white relative">
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

      {/* 12. DENTAL FOOTER */}
      <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-display font-extrabold shadow-md">
                  OC
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-display font-black tracking-tight">
                    ORAL CARE CENTRE
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-primary/80 -mt-1">
                    Third Generation Practice
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Providing advanced multi-speciality oral solutions in Gorakhpur. Over thirty years of dental healing excellence and family trust since 1990.
              </p>
              <div className="flex gap-2">
                <a 
                  href="https://wa.me/919450456789" 
                  target="_blank" 
                  className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-green-600 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.004 2.012c-5.508 0-9.988 4.479-9.988 9.988 0 1.761.46 3.41 1.261 4.856L2 22l5.312-1.391a9.92 9.92 0 004.692 1.18c5.508 0 9.988-4.479 9.988-9.988s-4.479-9.989-9.988-9.989zm6.262 14.15c-.256.717-1.478 1.371-2.071 1.46-.532.08-1.204.113-1.942-.121-3.084-1.33-5.099-4.437-5.253-4.641-.153-.205-1.255-1.666-1.255-3.176s.815-2.254 1.077-2.561c.281-.307.616-.384.82-.384.206 0 .411 0 .59.001.168 0 .442-.082.691.529.256.614.947 2.28.947 2.28.076.155.127.335.025.539-.103.206-.153.334-.307.513-.154.18-.323.401-.461.539-.153.153-.313.318-.134.625.18.307.797 1.312 1.71 2.124 1.174 1.046 2.165 1.371 2.472 1.524.307.154.487.13.666-.074.178-.205.764-.894.968-1.201.204-.308.409-.256.691-.154.282.101 1.79.842 2.097.996.307.154.512.231.588.359.077.128.077.743-.179 1.46z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#home" className="hover:text-primary transition-colors">Home Dashboard</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About Legacy</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Treatments & Services</a></li>
                <li><a href="#doctors" className="hover:text-primary transition-colors">Specialist Team</a></li>
                <li><a href="#gallery" className="hover:text-primary transition-colors">Clinic Gallery</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Patient Reviews</a></li>
              </ul>
            </div>

            {/* Specialities Quick links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">Top Specialties</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li><a href="#services" className="hover:text-primary transition-colors">Digital Dental Implants</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Painless Root Canals</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Clear Dental Aligners</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Aesthetic Smile Makeover</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Pediatric Cavity Sealants</a></li>
              </ul>
            </div>

            {/* Contact Location info Column */}
            <div className="lg:col-span-3 space-y-4 font-sans text-xs text-gray-400 leading-relaxed">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest">Contact Office</h4>
              <p>Maili Nawa, Jogia Road, Gorakhpur, Uttar Pradesh - 273001</p>
              <div className="space-y-1 pt-1 text-white">
                <p className="font-semibold">Call Support:</p>
                <p className="text-primary font-bold">{CONTACT_DATA.phone}</p>
              </div>
              <div className="space-y-1 text-white">
                <p className="font-semibold">Emergency Trauma:</p>
                <p className="text-red-400 font-bold">{CONTACT_DATA.emergencyContact}</p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} ORAL CARE CENTRE. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <span>Third Generation into Dentistry</span>
              <span>&bull;</span>
              <span>Licensed Medical Practitioner GKP</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Dynamic Detail Modal for Selected Services */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(id) => scrollToAppointment(id)}
      />

    </div>
  );
}
