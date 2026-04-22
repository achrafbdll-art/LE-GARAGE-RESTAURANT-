import { motion } from 'motion/react';

interface ExperienceSectionProps {
  onOpenReservation?: () => void;
}

export default function ExperienceSection({ onOpenReservation }: ExperienceSectionProps) {
  const experiences = [
    {
      title: "L'Ambiance Maillot",
      subtitle: "Brasserie Prestige",
      description: "Une atmosphère vibrante où l'élégance de l'Automobile Club rencontre le dynamisme des grandes brasseries. Un décor chargé d'histoire pour un moment hors du temps.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', title: 'L\'Atmosphère', category: 'Lieu",
      accent: "bg-brasserie-red"
    },
    {
      title: "La Recette Secrète",
      subtitle: "Héritage Culinaire",
      description: "Notre sauce 'Grand Prix', une composition mystérieuse jalousement gardée, qui sublime chaque pièce de bœuf pour une expérience gustative inimitable.",
      image: "https://picsum.photos/seed/sauce-gastronomy/800/1000",
      accent: "bg-gold"
    }
  ];

  return (
    <section className="bg-black border-b border-line overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {experiences.map((exp, idx) => (
          <div key={idx} className={`relative flex flex-col ${idx === 0 ? 'border-b lg:border-b-0 lg:border-r border-line' : ''}`}>
             <div className="aspect-[4/3] relative overflow-hidden group">
                <img 
                  src={exp.image} 
                  alt={exp.title}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-0 right-0 w-16 h-16 ${exp.accent} flex items-center justify-center text-white font-bold text-xl`}>
                   0{idx + 1}
                </div>
             </div>
             
             <div className="p-8 sm:p-12 md:p-20 space-y-6">
                <div>
                   <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                      {exp.subtitle}
                   </span>
                   <h2 className="text-3xl md:text-5xl font-serif font-bold italic">
                      {exp.title}
                   </h2>
                </div>
                
                <p className="text-silver/60 text-lg font-light leading-relaxed max-w-md">
                   {exp.description}
                </p>

                <div className="flex items-center gap-6 pt-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '60px' }}
                    viewport={{ once: true }}
                    className={`h-px ${exp.accent}`}
                  />
                  <button 
                    onClick={onOpenReservation}
                    className="text-[10px] uppercase font-bold tracking-[0.2em] text-white hover:text-gold transition-colors"
                  >
                    Vivre l'expérience
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
