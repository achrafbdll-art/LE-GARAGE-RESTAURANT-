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
import FAQSection from './components/home/FAQSection';
import Footer from './components/layout/Footer';
import ReservationModal from './components/modals/ReservationModal';
import AIChatBubble from './components/ui/AIChatBubble';
import InvitationPopup from './components/ui/InvitationPopup';

export default function App() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const openReservation = () => setIsReservationModalOpen(true);
  const closeReservation = () => setIsReservationModalOpen(false);

  return (
    <div className="min-h-screen bg-black flex flex-col pt-[70px] md:pt-[80px] relative">
      <Navbar onOpenReservation={openReservation} />
      
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 border-b border-line">
        {/* Left Content */}
        <Hero onOpenReservation={openReservation} />
        
        <aside className="grid grid-rows-2">
           {/* Top: Intro/Atmosphere */}
           <section className="p-10 sm:p-12 md:p-[80px] flex flex-col justify-end relative border-b border-line group overflow-hidden bg-black">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/70 z-10 transition-opacity group-hover:opacity-40" />
                <img 
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800" 
                  alt="Atmosphère Gastronomique" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-[1px] bg-gold" />
                  <span className="text-gold text-[11px] uppercase tracking-[4px] block font-bold">L'Atmosphère</span>
                </div>
                <h2 className="text-white font-serif text-[28px] md:text-[34px] font-bold leading-tight uppercase tracking-tight">
                  Un mariage entre <br /> 
                  <span className="text-gold italic">élégance mécanique</span> <br /> 
                  & art culinaire.
                </h2>
              </div>
           </section>

           {/* Bottom: Split Menu/Info */}
           <section className="grid grid-cols-1 sm:grid-cols-2">
              <div className="p-8 sm:p-[50px] border-b sm:border-b-0 sm:border-r border-line flex flex-col justify-center bg-brasserie-red/5 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brasserie-red">
                      <path d="M30 0l15 15-15 15-15-15L30 0zm0 60l15-15-15-15-15 15 15 15zM0 30l15 15 15-15-15-15L0 30zm60 0l-15 15-15-15 15-15 15 15z" fill="currentColor"/>
                   </svg>
                </div>
                <span className="text-brasserie-red text-[11px] uppercase tracking-[3px] mb-6 block font-black">Suggestion du Chef</span>
                <div className="space-y-6">
                   <div className="group cursor-pointer">
                      <h4 className="font-serif text-[18px] group-hover:text-brasserie-red transition-colors">Homard Bleu du Littoral</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="h-[1px] flex-1 bg-brasserie-red/20" />
                        <p className="text-gold text-[12px] font-bold">480 MAD</p>
                      </div>
                   </div>
                   <div className="group cursor-pointer">
                      <h4 className="font-serif text-[18px] group-hover:text-brasserie-red transition-colors">Filet de Bœuf Wagyu</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="h-[1px] flex-1 bg-brasserie-red/20" />
                        <p className="text-gold text-[12px] font-bold">620 MAD</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="p-8 sm:p-[50px] flex flex-col justify-center bg-white/[0.01] relative">
                <span className="text-gold text-[11px] uppercase tracking-[3px] mb-6 block font-black">L'Automobile Club</span>
                <div className="space-y-3 text-[11px] text-silver/70 tracking-[2px]">
                   <p className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span>Déjeuner</span>
                     <span className="text-white font-bold">12h - 15h</span>
                   </p>
                   <p className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span>Dîner</span>
                     <span className="text-white font-bold">19:30 - 23h</span>
                   </p>
                   <button 
                     onClick={openReservation}
                     className="mt-6 w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-gold transition-all shadow-xl"
                   >
                     Entrer au Cercle
                   </button>
                </div>
              </div>
           </section>
        </aside>
      </main>

      <FormulaSection onOpenReservation={openReservation} />
      <ExperienceSection onOpenReservation={openReservation} />
      <ChefSection onOpenReservation={openReservation} />
      <MenuSection />
      <GallerySection />
      <PrivatizationSection />
      <FAQSection />
      <ReservationSection />

      <Footer />

      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={closeReservation} 
      />

      <AIChatBubble />
      
      <InvitationPopup onOpenReservation={openReservation} />

      {/* Background grain/texture effect */}
      <div className="fixed inset-0 pointer-events-none z-[70] opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
    </div>
  );
}

