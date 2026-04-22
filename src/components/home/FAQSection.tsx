import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "Quel est le code vestimentaire (Dress Code) ?",
    answer: "Nous prônons une tenue élégante et décontractée (Smart Casual). Les vêtements de sport et les shorts ne sont pas admis en soirée pour préserver l'atmosphère raffinée de l'Automobile Club."
  },
  {
    question: "Disposez-vous d'un parking ou service voiturier ?",
    answer: "Oui, un service voiturier sécurisé est à votre disposition gratuitement. L'accès se fait directement par l'entrée principale de l'Automobile Club de Casablanca."
  },
  {
    question: "Peut-on visiter le musée automobile sans consommer ?",
    answer: "L'accès au musée est réservé en priorité à nos clients. Cependant, des visites guidées peuvent être organisées sur demande pour les passionnés d'histoire automobile."
  },
  {
    question: "Proposez-vous des options végétariennes ou sans gluten ?",
    answer: "Absolument. Notre chef a élaboré plusieurs plats raffinés répondant à divers régimes alimentaires. N'hésitez pas à le signaler lors de votre réservation."
  },
  {
    question: "Est-il possible de privatiser pour un événement professionnel ?",
    answer: "Oui, nous disposons d'espaces modulables pouvant accueillir jusqu'à 150 personnes. Consultez notre section 'Privatisation' pour plus de détails."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-line">
      {/* Decorative ornaments */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/[0.02] -skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full border border-gold/20 bg-white/[0.03]">
              <HelpCircle className="text-gold" size={24} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold italic mb-4">Questions Fréquentes</h2>
          <p className="text-silver/40 text-[11px] uppercase tracking-[0.4em]">Tout ce que vous devez savoir avant votre visite</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-white/5 bg-white/[0.02] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-[14px] md:text-[16px] font-medium text-silver/80 group-hover:text-white transition-colors">
                   {faq.question}
                </span>
                <div className="ml-4 shrink-0">
                  {openIndex === idx ? (
                    <Minus size={18} className="text-gold" />
                  ) : (
                    <Plus size={18} className="text-silver/40" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-silver/50 text-[14px] font-light leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-gold/10 bg-gold/[0.02] text-center">
          <p className="text-silver/60 text-sm italic mb-4">Vous avez une autre question spécifique ?</p>
          <a 
            href="#contact" 
            className="text-gold text-xs font-bold uppercase tracking-widest hover:underline"
          >
            Contactez notre concierge
          </a>
        </div>
      </div>
    </section>
  );
}
