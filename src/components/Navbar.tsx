import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { CONTACT_DATA } from '../data';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Doctors', href: '#doctors' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-white overflow-hidden flex items-center justify-center shadow-md border border-gray-100 group-hover:scale-105 transition-all">
              <img 
                src="https://i.ibb.co/ksDDF9HJ/image.png" 
                alt="Oral Care Centre Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-display font-black tracking-tight text-gray-900 group-hover:text-primary transition-colors">
                ORAL CARE CENTRE
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-primary/80 -mt-1">
                Third Generation Practice
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Call-to-Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
              className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-primary/5 transition-all"
            >
              <Phone size={14} className="animate-pulse" />
              <span>{CONTACT_DATA.phone}</span>
            </a>
            <button
              onClick={onBookClick}
              className="bg-primary hover:bg-primary/95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:shadow-primary/35 transition-all active:scale-95 cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center lg:hidden gap-3">
            <button
              onClick={onBookClick}
              className="bg-primary text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Slide-Over Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
            />

            {/* Menu Body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-lg bg-white overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm">
                      <img 
                        src="https://i.ibb.co/ksDDF9HJ/image.png" 
                        alt="Oral Care Centre Logo" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-sm font-display font-black text-gray-900">
                      ORAL CARE CENTRE
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="text-base font-semibold text-gray-700 hover:text-primary transition-all py-1.5 px-3 hover:bg-primary/5 rounded-lg flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Drawer Footer Contacts */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                  Direct Clinic Contacts
                </div>
                <div className="space-y-2.5">
                  <a
                    href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2.5 text-sm font-bold text-gray-800 hover:text-primary"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                      <Phone size={14} />
                    </div>
                    <span>{CONTACT_DATA.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/919450456789`}
                    target="_blank"
                    className="flex items-center gap-2.5 text-sm font-bold text-gray-800 hover:text-green-500"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.03 14.113.999 11.989 1c-5.444 0-9.873 4.38-9.877 9.808-.002 1.761.477 3.481 1.392 5.016l-1.018 3.72 3.837-.992c1.512.831 3.167 1.272 4.724 1.272zm11.758-7.795c-.307-.154-1.815-.895-2.097-.996-.282-.102-.487-.154-.691.154-.204.307-.79.996-.968 1.201-.179.204-.359.227-.666.074-.307-.153-1.298-.478-2.472-1.524-.913-.812-1.53-1.817-1.71-2.124-.179-.307-.019-.472.134-.625.138-.138.307-.359.461-.539.154-.179.204-.307.307-.513.102-.204.051-.384-.025-.539-.077-.154-.691-1.666-.947-2.28-.249-.611-.523-.529-.691-.529-.179-.001-.384-.001-.59-.001-.204 0-.539.077-.82.384-.282.307-1.077 1.051-1.077 2.561s1.102 2.971 1.255 3.176c.154.204 2.169 3.311 5.253 4.641.734.316 1.307.505 1.751.645.738.234 1.41.201 1.942.121.593-.089 1.815-.743 2.071-1.46.256-.717.256-1.332.179-1.46-.076-.128-.281-.205-.588-.359z" />
                      </svg>
                    </div>
                    <span>WhatsApp Live Chat</span>
                  </a>
                </div>
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    onBookClick();
                  }}
                  className="w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck size={16} />
                  Book Instant Timing
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
