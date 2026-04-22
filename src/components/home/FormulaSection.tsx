import { motion } from 'motion/react';
import { Star, CheckCircle2 } from 'lucide-react';

interface FormulaSectionProps {
  onOpenReservation?: () => void;
}

export default function FormulaSection({ onOpenReservation }: FormulaSectionProps) {
  return (
    <section id="formula" className="py-24 bg-black border-y border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-brasserie-red/30 bg-brasserie-red/5">
              <Star size={12} className="text-brasserie-red" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brasserie-red">L'Héritage Maillot</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight">
              Le Menu <br />
              <span className="text-gold text-5xl md:text-7xl">Unique</span>
            </h2>

            <p className="text-silver/60 text-lg font-light leading-relaxed max-w-md">
              Inspiré par le savoir-faire de la Porte Maillot. Une expérience focalisée sur l'essentiel : la qualité exceptionnelle du produit et notre sauce mythique.
            </p>

            <div className="space-y-6">
              {[
                { title: 'L\'Entrée Signature', desc: 'Salade de saison aux noix et sa vinaigrette secrète aux aromates.' },
                { title: 'Le Choix du Maitre', desc: 'Filet de bœuf tendre ou Entrecôte persillée, frites maison à volonté.' },
                { title: 'La Sauce Secrète', desc: 'L\'âme de l\'Atelier, une recette légendaire servie à la nappe.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <CheckCircle2 className="text-brasserie-red mt-1 shrink-0" size={18} />
                  <div>
                     <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-1">{item.title}</h4>
                     <p className="text-silver/50 text-sm font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-8">
               <div>
                 <div className="text-3xl font-serif text-brasserie-red mb-2">320 MAD</div>
                 <p className="text-[10px] uppercase tracking-widest text-silver/40">Savoir-faire inclus • Par personne</p>
               </div>
               <motion.button
                 onClick={onOpenReservation}
                 whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px rgba(197, 160, 89, 0.15)' }}
                 whileTap={{ scale: 0.95 }}
                 className="px-8 py-3 bg-white/5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[2px] hover:border-gold hover:text-gold transition-all"
               >
                 Réserver cette formule
               </motion.button>
            </div>
          </motion.div>

          {/* Visual Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square lg:aspect-[4/5] overflow-hidden group"
          >
            <div className="absolute inset-0 border-[20px] border-black/20 z-10 pointer-events-none" />
            <img 
              src="https://picsum.photos/seed/steak-frites/800/1000" 
              alt="La Formule Signature"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-10 right-10 z-20 bg-gold text-black p-6 rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold rotate-12 group-hover:rotate-0 transition-transform">
               <span className="text-[10px] uppercase leading-none">Midi &</span>
               <span className="text-xl uppercase leading-none">Soir</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
