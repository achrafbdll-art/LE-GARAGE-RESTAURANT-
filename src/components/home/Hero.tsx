import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920",
    alt: "Ambiance élégante du restaurant Le Garage"
  },
  {
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&q=80&w=1920",
    alt: "Table de brasserie gastronomique"
  },
  {
    url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920",
    alt: "Détail d'une voiture de collection mythique"
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920",
    alt: "L'élégance du Musée Automobile"
  }
];

interface HeroProps {
  onOpenReservation?: () => void;
}

export default function Hero({ onOpenReservation }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center px-6 md:px-[60px] bg-black border-r border-line relative overflow-hidden group">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-black/40 z-10" />
         <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img 
                src={HERO_IMAGES[currentSlide].url} 
                alt={HERO_IMAGES[currentSlide].alt} 
                loading="lazy"
                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-[3000ms] group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 drop-shadow-2xl"
      >
        <div className="text-[12px] text-gold uppercase tracking-[3px] mb-[20px] font-bold drop-shadow-md">
          Casablanca • Maroc
        </div>
        
        <h1 className="text-white font-serif text-[42px] sm:text-[56px] md:text-[72px] leading-[1] md:leading-[0.9] font-normal mb-[30px] tracking-tight sm:tracking-[-2px] uppercase drop-shadow-2xl">
          Midi <span className="text-gold italic md:text-[80px]">&</span> <br />
          Minuit
        </h1>

        <p className="text-white text-[11px] sm:text-[14px] leading-[1.6] max-w-[400px] mb-[40px] font-medium uppercase tracking-[0.2em] sm:tracking-widest drop-shadow-lg">
          L'Escale Gastronomique Permanente au Cœur de l'Histoire Automobile de Casablanca.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-[20px]">
          <motion.button
            onClick={onOpenReservation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-brasserie-red text-white font-bold uppercase tracking-[2px] text-[11px] text-center hover:bg-gold hover:text-black transition-all"
          >
            Réserver une Table
          </motion.button>
          <motion.a
            href="#menu"
            whileHover={{ background: 'rgba(255,255,255,0.05)' }}
            className="px-8 py-4 border border-silver/30 text-white font-bold uppercase tracking-[2px] text-[11px] text-center"
          >
            Voir le Menu
          </motion.a>
        </div>
      </motion.div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-6 sm:left-[60px] z-30 flex items-center gap-6 sm:gap-8 bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 rounded-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 md:w-10 md:h-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-gold transition-all rounded-full md:rounded-none"
            aria-label="Diapositive précédente"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 md:w-10 md:h-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-gold transition-all rounded-full md:rounded-none"
            aria-label="Diapositive suivante"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex gap-2">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-[2px] transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-gold' : 'w-4 bg-white/20'}`}
              aria-label={`Aller à la diapositive ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
