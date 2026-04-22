import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['Tous', 'Lieu', 'Musée', 'Voitures', 'Cuisine'];

const IMAGES = [
  { 
    url: 'https://cdn.pixabay.com/video/2018/11/04/19227-300431057_tiny.mp4', 
    title: 'L\'Atmosphère', 
    category: 'Lieu',
    type: 'video'
  },
  { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800' },
  { url: 'https://picsum.photos/seed/vintage-car-1/800/600', title: 'Collection Classique', category: 'Musée' },
  { url: 'https://picsum.photos/seed/gastronomy-plate/800/600', title: 'Art Culinaire', category: 'Cuisine' },
  { url: 'https://picsum.photos/seed/luxury-table/800/600', title: 'Exclusivité', category: 'Lieu' },
  { url: 'https://picsum.photos/seed/porsche-911/800/600', title: 'Porsche 911 Carrera', category: 'Voitures' },
  { url: 'https://picsum.photos/seed/classic-dashboard/800/600', title: 'Détails Historiques', category: 'Musée' },
  { url: 'https://picsum.photos/seed/chef-work/800/600', title: 'Savoir-Faire', category: 'Cuisine' },
  { url: 'https://picsum.photos/seed/mustang-vintage/800/600', title: 'Mustang Shelby GT500', category: 'Voitures' },
  { url: 'https://picsum.photos/seed/museum-hall/800/600', title: 'Hall des Légendes', category: 'Musée' },
  { url: 'https://picsum.photos/seed/jaguar-e-type/800/600', title: 'Jaguar E-Type', category: 'Voitures' },
  { url: 'https://picsum.photos/seed/private-lounge/800/600', title: 'Salon Privé', category: 'Lieu' },
  { url: 'https://picsum.photos/seed/dessert-art/800/600', title: 'Douceur Vive', category: 'Cuisine' },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filteredImages = activeFilter === 'Tous' 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeFilter);

  return (
    <section id="gallery" className="py-32 bg-charcoal border-b border-line">
       <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
             <div className="space-y-4">
                <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] block">Immersion</span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight">
                  Galerie <br />
                  <span className="text-white">Visuelle</span>
                </h2>
             </div>

             <div className="flex flex-col items-end gap-6 w-full md:w-auto">
                <p className="text-silver/50 max-w-sm text-sm font-light text-right hidden md:block">
                   Un voyage entre l'élégance du passé automobile et la modernité de la gastronomie contemporaine.
                </p>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2 md:gap-4 p-1 bg-black/40 border border-white/5 backdrop-blur-sm">
                   {CATEGORIES.map(category => (
                     <button
                       key={category}
                       onClick={() => setActiveFilter(category)}
                       className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                         activeFilter === category 
                           ? 'bg-gold text-black' 
                           : 'text-silver/40 hover:text-white'
                       }`}
                     >
                       {category}
                     </button>
                   ))}
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             <AnimatePresence mode="popLayout">
                {filteredImages.map((img, idx) => (
                   <motion.div
                     key={img.url}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.4 }}
                     whileHover={{ y: -5 }}
                     className="group relative aspect-[4/3] overflow-hidden bg-black/20 border border-white/5 cursor-pointer"
                   >
                      {img.type === 'video' ? (
                        <video 
                          src={img.url} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <img 
                         src={img.url} 
                         alt={img.title}
                         loading="lazy"
                         className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                         referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                         <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           {img.category}
                         </span>
                         <h4 className="text-white text-xl font-serif font-bold italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                           {img.title}
                         </h4>
                      </div>
                   </motion.div>
                ))}
             </AnimatePresence>
          </div>
       </div>
    </section>
  );
}
