import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import ReservationSection from '../home/ReservationSection';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-5xl bg-black border border-gold/20 shadow-2xl relative pointer-events-auto max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gold/20">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-silver/40 hover:text-gold transition-colors z-50"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>

              {/* We reuse the ReservationSection content but in a modal context */}
              <div className="py-12 md:py-20">
                <ReservationSection id="modal-reservation" isModal={true} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
