import { motion } from 'motion/react';
import { UtensilsCrossed } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

const SAMPLE_MENU = [
  {
    id: '1',
    name: 'Carpaccio de Saint-Jacques',
    description: 'Fines tranches de noix de Saint-Jacques, citron vert, huile de truffe blanche et perles de caviar.',
    price: 240,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800', title: 'Collection Classique', category: 'Musée'
  },
  {
    id: '2',
    name: 'Filet de Bœuf Rossini',
    description: 'Filet de bœuf de l\'Atlas, foie gras poêlé, sauce Madère et écrasé de pommes de terre à la truffe.',
    price: 450,
    category: 'Plats',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', title: 'L\'Atmosphère', category: 'Lieu' 
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
  }
];

export default function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-charcoal relative overflow-hidden">
      {/* Enhanced Zellij Motif Background */}
      <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none transition-opacity duration-1000" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15-15-15L30 0zm0 60l15-15-15-15-15 15 15 15zM0 30l15 15 15-15-15-15L0 30zm60 0l-15 15-15-15 15-15 15 15z' fill='%23C5A059' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }} />

      {/* Zellij side borders */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10 hidden lg:block" />
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent z-10 hidden lg:block" />

      {/* Decorative text */}
      <div className="absolute top-20 -left-10 text-[10rem] font-serif font-black text-white/[0.04] select-none pointer-events-none uppercase">
        Gastronomy
      </div>

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
              {/* Small Zellij corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-gold/50" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-gold/50" />
            </div>
          </motion.div>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="h-px bg-gold/20 flex-1 hidden md:block"></div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
              Carte <span className="text-gold italic">&</span> Dégustation
            </h2>
            <div className="h-px bg-gold/20 flex-1 hidden md:block"></div>
          </div>
          
          <p className="text-silver/60 max-w-xl mx-auto text-[11px] uppercase tracking-[0.4em] font-medium">
            Une symphonie de saveurs orchestrée par notre chef
          </p>

          {/* Prominent Zellij Ornament */}
          <div className="mt-10 flex justify-center">
             <motion.div
               animate={{ rotate: [0, 90, 180, 270, 360] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="relative"
             >
                <svg width="80" height="80" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold/30">
                   <path d="M30 0l15 15-15 15-15-15L30 0zm0 60l15-15-15-15-15 15 15 15zM0 30l15 15 15-15-15-15L0 30zm60 0l-15 15-15-15 15-15 15 15z" fill="currentColor"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-8 h-8 border border-gold/40 rotate-45" />
                </div>
             </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SAMPLE_MENU.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group border border-line p-6 hover:bg-white/[0.02] transition-colors"
            >
              <div className="relative aspect-[3/4] mb-6 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-[16px] font-serif group-hover:text-gold transition-colors">{item.name}</h3>
                  <span className="text-gold text-[12px] font-medium whitespace-nowrap">{formatPrice(item.price)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <a 
            href="/menu-complet.pdf" 
            className="inline-block px-12 py-4 border border-gold text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all"
          >
            Télécharger le Menu Complet
          </a>
        </motion.div>
      </div>
    </section>
  );
}
