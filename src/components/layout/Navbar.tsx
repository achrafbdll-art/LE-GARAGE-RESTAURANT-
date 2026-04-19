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
    { name: 'Contact', href: '#contact', icon: MapPin },
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
          className="flex flex-col"
        >
          <span className="text-xl font-serif tracking-[4px] text-gold uppercase">Automobile Club</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-[40px]">
          {navLinks.map((link, idx) => {
            const isReservation = link.name === 'Réservation';
            return (
              <motion.a
                key={link.name}
                href={isReservation && onOpenReservation ? undefined : link.href}
                onClick={isReservation && onOpenReservation ? (e) => { e.preventDefault(); onOpenReservation(); } : undefined}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "text-[11px] uppercase tracking-[2px] font-medium transition-colors cursor-pointer",
                  link.name === 'Accueil' ? "text-gold" : "text-silver hover:text-gold"
                )}
              >
                {link.name}
              </motion.a>
            );
          })}
          <motion.a
            href="mailto:privatisation@legrandprix.ma?subject=Demande de privatisation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 border border-gold text-gold text-[10px] font-bold uppercase tracking-[2px] hover:bg-gold hover:text-black transition-all"
          >
            Privatiser
          </motion.a>
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
