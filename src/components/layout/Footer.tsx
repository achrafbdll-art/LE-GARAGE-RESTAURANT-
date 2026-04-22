import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-line overflow-hidden">
       {/* Map View */}
       <div className="w-full h-[350px] border-b border-line transition-all duration-700 relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.846440263691!2d-7.6322976!3d33.5833074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2925b0f5555%3A0x6b8b0e5e0e0e0e0e!2sAutomobile%20Club%20du%20Maroc!5e0!3m2!1sfr!2sma!4v1713530000000!5m2!1sfr!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Automobile Club du Maroc"
          ></iframe>
          <div className="absolute bottom-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <motion.a 
              href="https://www.google.com/maps/dir/?api=1&destination=Automobile+Club+du+Maroc+Casablanca" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gold text-black text-[11px] font-bold uppercase tracking-[2px] shadow-2xl flex items-center gap-2"
             >
               <MapPin size={14} />
               <span>Obtenir l'itinéraire</span>
             </motion.a>
          </div>
       </div>

       {/* Info Bar */}
       <div className="min-h-[120px] py-10 lg:py-0 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1.5fr] items-center px-6 md:px-[60px] text-[11px] uppercase tracking-[1px] text-silver/60 gap-8 lg:gap-0">
          <div className="hidden lg:block leading-relaxed">
             Musée de l'Automobile Club du Maroc<br />
             Oasis, Casablanca, Maroc <br />
             <span className="text-gold">+212 5 22 XX XX XX</span>
          </div>
          <div className="text-center lg:border-x border-line h-full flex items-center justify-center py-4 lg:py-0">
             <span className="text-gold font-bold">OUVERT TOUS LES JOURS</span> &nbsp; | &nbsp; 12H - 15H • 19H - 23H
          </div>
          <div className="text-center lg:text-right leading-relaxed flex flex-col items-center lg:items-end">
             <div className="flex justify-end gap-5 mb-2">
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Instagram size={14} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Facebook size={14} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Twitter size={14} /></a>
             </div>
             © 2026 L'AUTOMOBILE CLUB DU MAROC<br />
             <span className="text-gold font-bold tracking-widest">DESIGNED FOR EXCELLENCE</span>
          </div>
       </div>
    </footer>
  );
}
