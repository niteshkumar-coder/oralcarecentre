import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Check } from 'lucide-react';
import Icon from './Icon';
import { Service } from '../types';

interface ServiceCardProps {
  key?: string;
  service: Service;
  index: number;
  onSelect: (service: Service) => void;
  onBook: (serviceId: string) => void;
}

export default function ServiceCard({ service, index, onSelect, onBook }: ServiceCardProps) {
  return (
    <>
      {/* Mobile Row Layout matching the mockup list */}
      <div 
        onClick={() => onSelect(service)}
        className="flex md:hidden items-center justify-between p-4 bg-white border border-gray-100/90 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-[0.99] gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0 shadow-inner">
            <Icon name={service.icon} size={20} />
          </div>
          <div>
            <h4 className="text-sm font-display font-black text-gray-900">
              {service.name}
            </h4>
            <p className="text-[11px] text-gray-500 leading-tight mt-0.5 line-clamp-1">
              {service.description}
            </p>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-primary border border-slate-100">
          <ChevronRight size={14} />
        </div>
      </div>

      {/* Desktop Card Layout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
        className="hidden md:flex group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 flex-col justify-between"
      >
        <div className="space-y-4">
          {/* Icon Header */}
          <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-inner">
            <Icon name={service.icon} size={24} />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <h4 className="text-lg font-display font-bold text-gray-900 group-hover:text-primary transition-colors">
              {service.name}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Dynamic Benefits Bullet */}
          <ul className="space-y-1.5 pt-1">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <li key={i} className="text-[11px] font-medium text-gray-600 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-[8px] font-bold">
                  ✓
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-gray-50">
          <button
            onClick={() => onSelect(service)}
            className="text-xs font-bold text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all cursor-pointer bg-transparent border-0"
          >
            <span>Treatment Details</span>
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => onBook(service.id)}
            className="text-[11px] font-bold text-gray-700 hover:text-white px-3 py-1.5 bg-gray-50 hover:bg-primary rounded-lg transition-all cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </motion.div>
    </>
  );
}
