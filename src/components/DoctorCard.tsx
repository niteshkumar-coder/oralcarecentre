import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldAlert, Calendar } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  key?: string;
  doctor: Doctor;
  onBook: (doctorId: string) => void;
}

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row shadow-lg"
    >
      {/* Doctor Image Block */}
      <div className="md:w-1/3 relative group bg-clinic-bg min-h-[300px] md:min-h-full">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-center absolute inset-0 filter saturate-95 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Doctor Content details */}
      <div className="p-6 sm:p-8 md:w-2/3 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {doctor.experience}
              </span>
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase">
                {doctor.qualification}
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-display font-black text-gray-900">
              {doctor.name}
            </h4>
            <p className="text-sm font-semibold text-primary">
              {doctor.title}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Core Specialization & Expert Focus
            </h5>
            <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5 bg-clinic-bg p-2.5 rounded-xl border border-gray-50">
              <Award size={14} className="text-secondary" />
              {doctor.specialization}
            </p>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            {doctor.bio}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onBook(doctor.id)}
          className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/95 text-white font-display font-semibold rounded-xl text-xs shadow-md shadow-primary/10 hover:shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Calendar size={14} />
          Book Consultation with {doctor.name.split(' ').slice(1).join(' ')}
        </button>
      </div>
    </motion.div>
  );
}
