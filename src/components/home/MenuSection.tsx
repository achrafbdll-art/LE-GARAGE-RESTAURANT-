import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, Filter } from 'lucide-react';
import { formatPrice, cn } from '../../lib/utils';

const CATEGORIES = ['Tous', 'Entrées', 'Plats', 'Desserts'];

const SAMPLE_MENU = [
  {
    id: '1',
    name: 'Carpaccio de Saint-Jacques',
    description: 'Fines tranches de noix de Saint-Jacques, citron vert, huile de truffe blanche et perles de caviar.',
    price: 240,
    category: 'Entrées',
    image: 'https://picsum.photos/seed/scallops/400/500',
  },
  {
    id: '2',
    name: 'Filet de Bœuf Rossini',
    description: 'Filet de bœuf de l\'Atlas, foie gras poêlé, sauce Madère et écrasé de pommes de terre à la truffe.',
    price: 450,
    category: 'Plats',
    image: 'https://picsum.photos/seed/beef/400/500',
  },
  {
    id: '3',
    name: 'Daurade en Croûte de Sel',
    description: 'Daurade royale entière, aromates du jardin, jus de coquillages et légumes de saison glacés.',
    price: 380,
    category: 'Plats',
    image: 'https://picsum.photos/seed/fish/400/500',
  },
  {
    id: '4',
    name: 'Sphère au Chocolat Signature',
    description: 'Chocolat grand cru, cœur coulant caramel beurre salé, noisettes caramélisées.',
    price: 160,
    category: 'Desserts',
    image: 'https://picsum.photos/seed/dessert/400/500',
  },
  {
    id: '5',
    name: 'Risotto aux Asperges Sauvages',
    description: 'Riz Carnaroli, asperges vertes croquantes, tuile de parmesan 24 mois.',
    price: 210,
    category: 'Entrées',
    image: 'https://picsum.photos/seed/risotto/400/500',
  },
  {
    id: '6',
    name: 'Tarte Tatine Revisitée',
    description: 'Pommes caramélisées, pâte feuilletée inversée, crème fraîche d\'Isigny.',
    price: 130,
    category: 'Desserts',
    image: 'https://picsum.photos/seed/tatine/400/500',
  }
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredMenu = activeCategory === 'Tous' 
    ? SAMPLE_MENU 
    : SAMPLE_MENU.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-charcoal relative overflow-hidden">
      {/* ... existing ornaments ... */}
      <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none transition-opacity duration-1000" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15-15-15L30 0zm0 60l15-15-15-15-15 15 15 15zM0 30l15 15 15-15-15-15L0 30zm60 0l-15 15-15-15 15-15 15 15z' fill='%23C5A059' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 rounded-full border border-gold/30 bg-black/40 backdrop-blur-sm relative">
              <UtensilsCrossed className="text-gold" size={32} />
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-gold/50" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-gold/50" />
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-8">
            Carte <span className="text-gold italic">&</span> Dégustation
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-2 text-[10px] uppercase tracking-[0.3em] font-bold transition-all border",
                  activeCategory === cat 
                    ? "bg-gold text-black border-gold" 
                    : "text-silver/60 border-white/10 hover:border-gold/40 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredMenu.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-black/20 border border-white/5 p-4 hover:border-gold/20 transition-all cursor-pointer"
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-gold/20">
                    <span className="text-gold text-[10px] font-bold">{formatPrice(item.price)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-gold text-[9px] uppercase tracking-widest font-black opacity-60">{item.category}</span>
                  <h3 className="text-xl font-serif group-hover:text-gold transition-colors">{item.name}</h3>
                  <p className="text-silver/40 text-[12px] font-light italic leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.a 
            href="/menu-complet.pdf" 
            whileHover={{ scale: 1.05, y: -2, background: '#C5A059', color: '#0D0D0D' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-4 border border-gold text-gold text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Télécharger le Menu Complet
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
