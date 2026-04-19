/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import MenuSection from './components/home/MenuSection';
import ReservationSection from './components/home/ReservationSection';
import GallerySection from './components/home/GallerySection';
import FormulaSection from './components/home/FormulaSection';
import ExperienceSection from './components/home/ExperienceSection';
import ChefSection from './components/home/ChefSection';
import PrivatizationSection from './components/home/PrivatizationSection';
import Footer from './components/layout/Footer';
import ReservationModal from './components/modals/ReservationModal';

export default function App() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const openReservation = () => setIsReservationModalOpen(true);
  const closeReservation = () => setIsReservationModalOpen(false);

  return (
    <div className="min-h-screen bg-black flex flex-col pt-[70px] md:pt-[80px]">
      <Navbar onOpenReservation={openReservation} />
      
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 border-b border-line">
        {/* Left: Hero */}
        <Hero onOpenReservation={openReservation} />
        
        {/* Right: Geometric Panels */}
        <aside className="grid grid-rows-2">
           {/* Top: Intro/Atmosphere */}
           <section className="p-10 sm:p-12 md:p-[60px] flex flex-col justify-end relative border-b border-line group overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10 transition-opacity group-hover:opacity-40" />
                <img 
                  src="https://picsum.photos/seed/atmosphere/800/600" 
                  alt="Atmosphère" 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-20">
                <span className="text-gold text-[12px] uppercase tracking-[3px] mb-4 block">L'Atmosphère</span>
                <h2 className="text-white font-serif text-[24px] font-normal leading-tight">
                  Un mariage entre élégance <br /> mécanique et art culinaire.
                </h2>
              </div>
           </section>

           {/* Bottom: Split Menu/Info */}
           <section className="grid grid-cols-1 sm:grid-cols-2">
              <div className="p-8 sm:p-[40px] border-b sm:border-b-0 sm:border-r border-line flex flex-col justify-center bg-brasserie-red/5">
                <span className="text-brasserie-red text-[11px] uppercase tracking-[2px] mb-5 block font-bold">Suggestion du Chef</span>
                <div className="space-y-5">
                   <div>
                      <h4 className="font-serif text-[16px]">Homard Bleu du Littoral</h4>
                      <p className="text-gold text-[12px]">480 MAD</p>
                   </div>
                   <div>
                      <h4 className="font-serif text-[16px]">Filet de Bœuf Wagyu</h4>
                      <p className="text-gold text-[12px]">620 MAD</p>
                   </div>
                </div>
              </div>
              <div className="p-8 sm:p-[40px] flex flex-col justify-center bg-white/[0.01]">
                <span className="text-gold text-[11px] uppercase tracking-[2px] mb-5 block">L'Automobile Club</span>
                <div className="space-y-2 text-[11px] text-silver/60 uppercase tracking-[1px]">
                   <p className="flex justify-between">
                     <span>Déjeuner</span>
                     <span className="text-gold">12h - 15h</span>
                   </p>
                   <p className="flex justify-between">
                     <span>Dîner</span>
                     <span className="text-gold">19h30 - 23h</span>
                   </p>
                   <button 
                     onClick={openReservation}
                     className="mt-4 w-full block text-center border border-line py-2 hover:bg-gold hover:text-black transition-colors"
                   >
                     Réservation IA
                   </button>
                </div>
              </div>
           </section>
        </aside>
      </main>

      <FormulaSection onOpenReservation={openReservation} />
      <ExperienceSection />
      <ChefSection />
      <MenuSection />
      <GallerySection />
      <PrivatizationSection />
      <ReservationSection />

      <Footer />

      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={closeReservation} 
      />

      {/* Background grain/texture effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
    </div>
  );
}

