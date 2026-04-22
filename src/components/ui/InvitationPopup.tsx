import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Sparkles } from 'lucide-react';

interface InvitationPopupProps {
  onOpenReservation: () => void;
}

export default function InvitationPopup({ onOpenReservation }: InvitationPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Appear after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed bottom-6 right-6 z-[60] w-[300px] sm:w-[350px]"
        >
          <div className="bg-charcoal border border-gold/30 p-6 shadow-2xl relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Calendar size={120} className="text-gold" />
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 p-2 text-silver/30 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gold">
                <Sparkles size={14} className="animate-pulse" />
                <span className="text-[10px] uppercase tracking-[3px] font-bold">Invitation Privilège</span>
              </div>

              <h3 className="text-white font-serif text-xl font-bold leading-tight">
                Une table vous attend ce soir ?
              </h3>

              <p className="text-silver/60 text-sm font-light leading-relaxed">
                Vivez une expérience gastronomique hors du temps au milieu de nos pièces de collection rares.
              </p>

              <button
                onClick={() => {
                  onOpenReservation();
                  setIsVisible(false);
                }}
                className="w-full py-3 bg-gold text-black font-black uppercase tracking-[2px] text-[10px] hover:bg-white transition-colors mt-2"
              >
                Réserver mon expérience
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
