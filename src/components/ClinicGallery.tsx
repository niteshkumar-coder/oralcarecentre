import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function ClinicGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'exterior', label: 'Exterior Elevation' },
    { value: 'reception', label: 'Reception & Lobby' },
    { value: 'treatment', label: 'Treatment Suites' },
    { value: 'equipment', label: 'Medical Equipment' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-display tracking-wide transition-all cursor-pointer ${
              activeCategory === cat.value
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-white hover:bg-gray-100 border border-gray-100 text-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group aspect-4/3 relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer bg-clinic-bg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Overlay layout */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h5 className="text-sm font-semibold text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 size={12} />
                  </div>
                </h5>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full z-10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Left controller */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-10 transition-colors cursor-pointer hidden sm:block"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl w-full max-h-[80vh] flex flex-col items-center justify-center"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="text-center mt-4">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-1">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="text-lg font-semibold text-white font-display">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Image {lightboxIndex + 1} of {filteredItems.length}
                </p>
              </div>
            </motion.div>

            {/* Right controller */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-10 transition-colors cursor-pointer hidden sm:block"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
