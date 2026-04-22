import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Car, Utensils, Calendar, Image as ImageIcon, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavbarProps {
  onOpenReservation?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Le Menu', href: '#menu', icon: Utensils },
    { name: 'Le Chef', href: '#chef', icon: Utensils },
    { name: 'Musée', href: '#museum', icon: Car },
    { name: 'Réservation', href: '#reservation', icon: Calendar },
    { name: 'Galerie', href: '#gallery', icon: ImageIcon },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[70px] md:h-[80px] border-b border-line",
        isScrolled ? "bg-black/95 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="h-full px-6 md:px-[60px] flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gold/50 group-hover:w-12 transition-all duration-500" />
            <span className="text-xl md:text-2xl font-serif tracking-[4px] text-gold uppercase drop-shadow-sm">
              Le Garage <span className="italic text-white opacity-90">Restaurant</span>
            </span>
          </div>
          <span className="text-[8px] uppercase tracking-[6px] text-silver/40 ml-11 -mt-1 font-bold">Casablanca • Anfa</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-[40px]">
          {navLinks.map((link, idx) => {
            if (link.name === 'Réservation') return null; // We'll render it as a button
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, color: '#C5A059' }}
                transition={{ delay: idx * 0.1 }}
                className="text-[11px] uppercase tracking-[2px] font-medium transition-colors text-silver hover:text-gold"
              >
                {link.name}
              </motion.a>
            );
          })}
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <motion.a
              href="mailto:privatisation@legrandprix.ma?subject=Demande de privatisation"
              whileHover={{ scale: 1.05, y: -1 }}
              className="text-silver/60 text-[9px] uppercase tracking-[2px] hover:text-gold transition-colors"
            >
              Privatiser
            </motion.a>
            
            <motion.button
              onClick={onOpenReservation}
              whileHover={{ scale: 1.05, boxShadow: '0 5px 20px rgba(197, 160, 89, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gold text-black text-[10px] font-black uppercase tracking-[3px] shadow-lg"
            >
              Réserver
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gold"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col space-y-6">
              {navLinks.map((link) => {
                const isReservation = link.name === 'Réservation';
                return (
                  <a
                    key={link.name}
                    href={isReservation && onOpenReservation ? undefined : link.href}
                    onClick={(e) => {
                      if (isReservation && onOpenReservation) {
                        e.preventDefault();
                        onOpenReservation();
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-4 text-sm uppercase tracking-widest font-medium text-silver hover:text-gold cursor-pointer"
                  >
                    <link.icon size={18} />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
