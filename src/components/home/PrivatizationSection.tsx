import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Clock, ShieldCheck, Loader2, CheckCircle, Send } from 'lucide-react';
import { services } from '../../services/firebase';

export default function PrivatizationSection() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    date: '',
    guests: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await services.createEventInquiry(formData);
      setIsSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        date: '',
        guests: '',
        description: ''
      });
      setTimeout(() => {
        setIsSuccess(false);
        setIsFormVisible(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="privatisation" className="py-16 md:py-24 bg-charcoal relative border-b border-line overflow-hidden">
       {/* Enhanced Zellij Motif Background */}
       <div className="absolute inset-0 z-0 opacity-[0.10] pointer-events-none" style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l15 15-15 15-15-15L30 0zm0 60l15-15-15-15-15 15 15 15zM0 30l15 15 15-15-15-15L0 30zm60 0l-15 15-15-15 15-15 15 15z' fill='%23C5A059' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
         backgroundSize: '120px 120px'
       }} />

       {/* Zellij side borders decorative sync with other sections */}
       <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10 hidden lg:block" />
       <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent z-10 hidden lg:block" />

       {/* Decorative text */}
       <div className="absolute top-40 -right-20 text-[8rem] font-serif font-black text-white/[0.03] select-none pointer-events-none uppercase rotate-90 origin-bottom-right">
          Exclusivité
       </div>

       {/* Background accent */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-black/40 skew-x-12 translate-x-1/2" />
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="order-2 lg:order-1 relative"
             >
                <AnimatePresence mode="wait">
                  {!isFormVisible ? (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="aspect-video bg-black overflow-hidden border border-line relative p-1">
                         {/* Corner accents within the frame */}
                         <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/40 z-20" />
                         <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/40 z-20" />
                         
                         <img 
                          src="https://picsum.photos/seed/event-hall/800/600" 
                          alt="Espaces de Privatisation"
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                          referrerPolicy="no-referrer"
                         />
                      </div>
                      <div className="absolute -bottom-8 -left-8 bg-gold p-8 text-black hidden md:block shadow-xl z-20">
                         <p className="text-2xl font-serif font-bold italic mb-1">Jusqu'à 150</p>
                         <p className="text-[10px] uppercase tracking-widest font-bold">Convives en réception</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-black/80 backdrop-blur-md p-8 border border-gold/20"
                    >
                      <h3 className="text-white font-serif text-2xl mb-6">Demande d'Informations</h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Responsable de l'événement</label>
                            <input 
                              required
                              placeholder="Prénom & Nom"
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-gold outline-none transition-colors"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Entreprise</label>
                            <input 
                              placeholder="Nom de la société (Optionnel)"
                              value={formData.company}
                              onChange={e => setFormData({...formData, company: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-gold outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Adresse Email</label>
                          <input 
                            required
                            type="email"
                            placeholder="email@professionnel.ma"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-gold outline-none transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Date Souhaitée</label>
                            <input 
                              required
                              type="date"
                              value={formData.date}
                              onChange={e => setFormData({...formData, date: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-gold outline-none transition-colors"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Nombre de Convives</label>
                            <input 
                              required
                              type="number"
                              min="1"
                              placeholder="Ex: 50"
                              value={formData.guests}
                              onChange={e => setFormData({...formData, guests: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-gold outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Détails du projet</label>
                          <textarea 
                            required
                            placeholder="Décrivez vos besoins (traiteur, technique, horaires...)"
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-xs text-white focus:border-gold outline-none transition-colors resize-none"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isLoading || isSuccess}
                          className="w-full py-4 bg-gold text-black font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          {isLoading ? <Loader2 className="animate-spin" size={16} /> : 
                           isSuccess ? <CheckCircle size={16} /> : 
                           <><Send size={14} /> <span>Envoyer la demande</span></>}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setIsFormVisible(false)}
                          className="w-full text-center text-silver/40 text-[9px] uppercase tracking-widest mt-2 hover:text-white"
                        >
                          Annuler
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="order-1 lg:order-2 space-y-8"
             >
                <div className="relative">
                   <div className="absolute -left-12 top-0 h-full w-px bg-gold/20 hidden lg:block" />
                   <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Événementiel</span>
                   <h2 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold italic leading-tight uppercase tracking-tight">
                     Privatisez <br />
                     <span className="text-white">L'Exclusivité</span>
                   </h2>
                   {/* Animated Zellij Ornament */}
                   <div className="mt-6 flex opacity-60">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      >
                         <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold/40">
                            <path d="M30 0l15 15-15 15-15-15L30 0zm0 60l15-15-15-15-15 15 15 15zM0 30l15 15 15-15-15-15L0 30zm60 0l-15 15-15-15 15-15 15 15z" fill="currentColor"/>
                         </svg>
                      </motion.div>
                   </div>
                </div>

                <p className="text-silver/60 text-lg font-light leading-relaxed">
                  Qu'il s'agisse d'un lancement de produit, d'un dîner de gala ou d'un moment privé, nos espaces s'adaptent à vos ambitions les plus prestigieuses à Casablanca.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                   <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gold">
                         <Clock size={18} />
                         <span className="text-[10px] uppercase tracking-widest font-bold">Sur Mesure</span>
                      </div>
                      <p className="text-silver/50 text-sm font-light">Horaires et services adaptés à vos besoins spécifiques.</p>
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gold">
                         <ShieldCheck size={18} />
                         <span className="text-[10px] uppercase tracking-widest font-bold">Prestige Garanti</span>
                      </div>
                      <p className="text-silver/50 text-sm font-light">Service haut de gamme et cadre sécurisé historique.</p>
                   </div>
                </div>

                {!isFormVisible && (
                  <motion.button
                    onClick={() => setIsFormVisible(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-4 px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-gold transition-colors"
                  >
                    <Mail size={16} />
                    <span>Demander un Devis</span>
                  </motion.button>
                )}
             </motion.div>

          </div>
       </div>
    </section>
  );
}
