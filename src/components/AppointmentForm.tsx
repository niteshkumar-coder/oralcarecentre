import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Phone, MessageSquare, Check, Sparkles, AlertCircle } from 'lucide-react';
import { SERVICES, DOCTORS } from '../data';
import { Appointment } from '../types';

interface AppointmentFormProps {
  initialServiceId?: string;
  initialDoctorId?: string;
  onSuccess?: () => void;
}

export default function AppointmentForm({ 
  initialServiceId = '', 
  initialDoctorId = '',
  onSuccess 
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: initialServiceId,
    doctor: initialDoctorId,
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);
  const [allBookings, setAllBookings] = useState<Appointment[]>([]);

  // Load existing bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('oral_care_bookings');
    if (saved) {
      try {
        setAllBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync initial values if they change
  useEffect(() => {
    if (initialServiceId) {
      setFormData(prev => ({ ...prev, treatment: initialServiceId }));
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialDoctorId) {
      setFormData(prev => ({ ...prev, doctor: initialDoctorId }));
    }
  }, [initialDoctorId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    if (!formData.treatment) newErrors.treatment = 'Please select a treatment';
    if (!formData.doctor) newErrors.doctor = 'Please select a preferred specialist';
    if (!formData.date) {
      newErrors.date = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Appointment date cannot be in the past';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate luxury API response delay
    setTimeout(() => {
      const newBooking: Appointment = {
        id: `OCC-${Math.floor(100000 + Math.random() * 900000)}`,
        name: formData.name,
        phone: formData.phone,
        treatment: SERVICES.find(s => s.id === formData.treatment)?.name || formData.treatment,
        date: formData.date,
        message: formData.message,
        status: 'confirmed'
      };

      const updatedBookings = [newBooking, ...allBookings];
      setAllBookings(updatedBookings);
      localStorage.setItem('oral_care_bookings', JSON.stringify(updatedBookings));
      setBookedAppointment(newBooking);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        treatment: '',
        doctor: '',
        date: '',
        message: ''
      });

      if (onSuccess) onSuccess();
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!bookedAppointment ? (
          <motion.form 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="glass-panel p-6 sm:p-10 rounded-3xl shadow-xl space-y-6"
            id="appointment-booking-form"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 px-3 py-1 rounded-full">
                Interactive Schedule
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
                Book Your Priority Appointment
              </h3>
              <p className="text-sm text-gray-500">
                Receive instant confirmation, dedicated timings, and direct WhatsApp reminders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase flex items-center gap-1.5">
                  <User size={13} className="text-primary" />
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 bg-white/80 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase flex items-center gap-1.5">
                  <Phone size={13} className="text-primary" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full px-4 py-3 bg-white/80 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Treatment Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase flex items-center gap-1.5">
                  <Sparkles size={13} className="text-primary" />
                  Select Treatment <span className="text-red-500">*</span>
                </label>
                <select
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/80 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all appearance-none ${
                    errors.treatment ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                  }`}
                >
                  <option value="">-- Choose a Dental Service --</option>
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                {errors.treatment && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.treatment}
                  </p>
                )}
              </div>

              {/* Doctor Specialist Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase flex items-center gap-1.5">
                  <User size={13} className="text-primary" />
                  Preferred Specialist <span className="text-red-500">*</span>
                </label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/80 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all appearance-none ${
                    errors.doctor ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                  }`}
                >
                  <option value="">-- Choose a Doctor --</option>
                  {DOCTORS.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.qualification.split(' ')[0]})</option>
                  ))}
                </select>
                {errors.doctor && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.doctor}
                  </p>
                )}
              </div>

              {/* Preferred Date */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase flex items-center gap-1.5">
                  <Calendar size={13} className="text-primary" />
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/80 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.date ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                  }`}
                />
                {errors.date && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.date}
                  </p>
                )}
              </div>

              {/* Additional Message */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 tracking-wide uppercase flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-primary" />
                  Describe Your Concern (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Tell us about your dental pain, history or specific requests..."
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white font-display font-semibold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 cursor-pointer text-base"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Booking...
                </>
              ) : (
                'Secure Appointment Slot'
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-primary/20 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden"
          >
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
            
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check size={40} className="stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Successfully Confirmed
              </span>
              <h3 className="text-3xl font-display font-bold text-gray-900">
                Your Smile is Scheduled!
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Thank you for choosing Oral Care Centre. We have saved your slot. Our coordinator will call you in 15 minutes.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-clinic-bg border border-gray-100 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto shadow-sm font-sans">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-xs text-gray-400 font-mono">APPOINTMENT ID</span>
                <span className="text-sm font-bold text-primary font-mono">{bookedAppointment.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">PATIENT NAME</span>
                  <span className="font-semibold text-gray-800">{bookedAppointment.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">CONTACT PHONE</span>
                  <span className="font-semibold text-gray-800">{bookedAppointment.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">TREATMENT</span>
                  <span className="font-semibold text-gray-800">{bookedAppointment.treatment}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">SCHEDULED DATE</span>
                  <span className="font-semibold text-primary flex items-center gap-1">
                    <Calendar size={12} /> {new Date(bookedAppointment.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={() => {
                  const messageText = `Hello Oral Care Centre, I have booked a priority appointment for ${bookedAppointment.treatment} on ${bookedAppointment.date} under ID ${bookedAppointment.id}. Please confirm my timing.`;
                  window.open(`https://wa.me/919450456789?text=${encodeURIComponent(messageText)}`, '_blank');
                }}
                className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-green-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                Send via WhatsApp
              </button>
              <button
                onClick={() => setBookedAppointment(null)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Another Slot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Active Bookings list so users can track what they have booked! */}
      {allBookings.length > 0 && (
        <div className="mt-10 bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-gray-100 shadow-sm max-w-md mx-auto">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Clock size={12} className="text-primary" />
            Your Scheduled Slots ({allBookings.length})
          </h4>
          <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
            {allBookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center text-xs bg-white p-3 rounded-xl border border-gray-100 shadow-2xs">
                <div>
                  <p className="font-semibold text-gray-800">{booking.treatment}</p>
                  <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-0.5">
                    <Calendar size={10} /> {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-green-50 text-green-600 font-semibold rounded-full text-[9px] uppercase tracking-wide">
                    Confirmed
                  </span>
                  <p className="text-[9px] text-gray-400 font-mono mt-0.5">{booking.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
