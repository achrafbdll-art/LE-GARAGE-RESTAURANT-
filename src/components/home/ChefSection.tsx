import { motion } from 'motion/react';
import { Award, Quote, Utensils } from 'lucide-react';

interface ChefSectionProps {
  onOpenReservation?: () => void;
}

export default function ChefSection({ onOpenReservation }: ChefSectionProps) {
  const distinctions = [
    { title: "Bib Gourmand", year: "2023", organization: "Guide Michelin" },
    { title: "Prix de l'Excellence", year: "2024", organization: "Maroc Gastronomie" },
    { title: "Chef de l'Année", year: "2025", organization: "L'Épicurien" }
  ];

  return (
    <section id="chef" className="py-20 md:py-32 bg-charcoal relative overflow-hidden border-b border-line">
       {/* Background decorative text */}
       <div className="absolute -top-10 -right-20 text-[15rem] font-serif font-black text-white/[0.02] select-none pointer-events-none uppercase leading-none">
         Artiste
       </div>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
             
             {/* Left: Chef Image with Frame */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="lg:col-span-5 relative group"
             >
                <div className="relative aspect-[3/4] overflow-hidden border border-gold/20 p-4 bg-black">
                   <div className="absolute inset-0 bg-gold/5 -z-10 translate-x-4 translate-y-4 border border-gold/10" />
                   <img 
                     src="https://www.istockphoto.com/fr/photos/portrait-chef-cuisine" 
                     alt="Chef Yassine Belkhayat"
                     className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-1000"
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute bottom-10 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-serif text-3xl font-bold italic tracking-tight">Yassine Belkhayat</h3>
                      <p className="text-gold text-xs uppercase tracking-[0.3em] font-medium mt-2">Chef Exécutif</p>
                   </div>
                </div>
             </motion.div>

             {/* Right: Biography & Philosophy */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="lg:col-span-7 space-y-12"
             >
                <div className="space-y-6">
                   <div className="flex items-center space-x-4">
                      <div className="h-px w-12 bg-gold/40" />
                      <span className="text-gold text-xs font-bold uppercase tracking-[0.4em]">Le Maître à Bord</span>
                   </div>
                   <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight text-white">
                      Une Vision <br />
                      <span className="text-gold">Sans Concession</span>
                   </h2>
                </div>

                <div className="space-y-8">
                   <div className="relative pl-12">
                      <Quote className="absolute left-0 top-0 text-gold/30" size={32} />
                      <p className="text-silver/70 text-xl font-light leading-relaxed italic">
                        "La gastronomie est une mécanique de precision. Chaque ingrédient est une pièce maîtresse d'un moteur complexe qui, une fois assemblé, doit délivrer une émotion pure, instantanée."
                      </p>
                   </div>

                   <p className="text-silver/50 text-base leading-relaxed max-w-2xl font-light">
                      Formé dans les brasseries les plus prestigieuses de Paris, le Chef Belkhayat a rapporté à Casablanca un savoir-faire inégalé. Sa cuisine est un hommage à la rigueur française, sublimée par les épices secrètes de l'Atlas et la fraîcheur du littoral atlantique.
                   </p>
                </div>

                {/* Distinctions Grid */}
                <div className="pt-8 border-t border-line">
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                      {distinctions.map((award, idx) => (
                        <div key={idx} className="space-y-2">
                           <div className="flex items-center space-x-2 text-gold">
                              <Award size={16} />
                              <span className="text-[10px] uppercase tracking-widest font-bold">{award.year}</span>
                           </div>
                           <h4 className="text-white text-sm font-serif">{award.title}</h4>
                           <p className="text-silver/40 text-[9px] uppercase tracking-widest">{award.organization}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="pt-4 flex items-center gap-8">
                   <motion.button 
                     whileHover={{ x: 10 }}
                     className="group flex items-center space-x-6 text-gold"
                   >
                     <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Son parcours</span>
                     <div className="h-[2px] w-8 bg-gold group-hover:w-12 transition-all duration-300" />
                   </motion.button>

                   <button 
                     onClick={onOpenReservation}
                     className="px-6 py-3 border border-white/10 text-white font-bold uppercase tracking-[2px] text-[10px] hover:border-gold hover:text-gold transition-all"
                   >
                      Réserver sa table
                   </button>
                </div>
             </motion.div>

          </div>
       </div>
    </section>
  );
}
