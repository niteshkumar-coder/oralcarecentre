import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldAlert, Sparkles, ShieldCheck } from 'lucide-react';
import Icon from './Icon';
import { Service } from '../types';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export default function ServiceModal({ service, onClose, onBook }: ServiceModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Glass backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl z-50 border border-gray-100 relative max-h-[90vh] flex flex-col"
        >
          {/* Decorative bar */}
          <div className="h-2 bg-gradient-to-r from-primary to-secondary w-full" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors z-10 cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Modal scroll area */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                <Icon name={service.icon} size={30} />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-blue-50/70 px-2.5 py-0.5 rounded-md">
                  SPECIALITY PROCEDURE
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-black text-gray-900 mt-1">
                  {service.name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                About the Treatment
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                {service.longDescription}
              </p>
            </div>

            {/* Benefits list */}
            <div className="space-y-3 bg-clinic-bg rounded-2xl p-5 border border-gray-50">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} className="text-secondary" />
                Key Patient Outcomes & Benefits
              </h4>
              <ul className="grid grid-cols-1 gap-2.5">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quality Standard Info */}
            <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-100 pt-5">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <p>
                Performed using <strong>class-B sterilized equipment</strong> and certified bio-compatible materials matching international dental standards.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-xs transition-all cursor-pointer"
            >
              Back to Services
            </button>
            <button
              onClick={() => {
                onBook(service.id);
                onClose();
              }}
              className="flex-1 py-3 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl text-xs shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
