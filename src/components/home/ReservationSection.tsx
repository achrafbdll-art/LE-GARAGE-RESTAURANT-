import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Send, Bot, User, Loader2, Check, RefreshCcw } from 'lucide-react';
import { askAssistant } from '../../services/gemini';
import { services } from '../../services/firebase';
import { cn } from '../../lib/utils';

interface ReservationSectionProps {
  id?: string;
  isModal?: boolean;
}

export default function ReservationSection({ id = "reservation", isModal = false }: ReservationSectionProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'ai'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 2,
    date: '',
    time: '20:00'
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [lastReservation, setLastReservation] = useState<any>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setChatHistory(prev => [...prev, { role: 'user', parts: [{ text: userMsg }] }]);
    setIsLoading(true);

    const response = await askAssistant(userMsg, chatHistory);
    
    setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const reservationData = {
        customerName: formData.name,
        email: formData.email,
        date: `${formData.date}T${formData.time}`,
        guests: formData.guests
      };
      await services.createReservation(reservationData);
      setLastReservation({
        ...formData,
        displayDate: new Date(formData.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', guests: 2, date: '', time: '20:00' });
    } catch (e) {
      console.error(e);
      alert("Une erreur est survenue lors de la réservation.");
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className={cn(
      "max-w-7xl mx-auto px-6 grid grid-cols-1 gap-16 items-center",
      !isModal && "lg:grid-cols-2"
    )}>
       {!isModal && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">Réserver votre <span className="text-gradient-gold">Expérience</span></h2>
            <p className="text-silver/60 text-lg mb-12 font-light leading-relaxed">
              Que ce soit pour un dîner romantique au milieu des Ferrari classiques ou un déjeuner d'affaires décontracté, nous veillons à chaque détail.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                 <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-gold/10 border border-gold/30 shrink-0">
                    <Calendar className="text-gold" />
                 </div>
                 <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Disponibilité</h4>
                    <p className="text-silver/50 text-sm">Déjeuner: 12h00 - 15h00 | Dîner: 19h30 - 23h00 (Mar-Dim)</p>
                 </div>
              </div>
              <div className="flex items-start space-x-6">
                 <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-gold/10 border border-gold/30 shrink-0">
                    <Users className="text-gold" />
                 </div>
                 <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Groupes & Événements</h4>
                    <p className="text-silver/50 text-sm">Privatisation disponible pour vos événements exceptionnels jusqu'à 150 personnes.</p>
                 </div>
              </div>
            </div>
          </motion.div>
       )}

       <motion.div
         initial={isModal ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
         whileInView={{ opacity: 1, x: 0, y: 0 }}
         viewport={{ once: true }}
         className={cn(
           "glass rounded-sm p-8 md:p-12 relative",
           isModal && "max-w-xl mx-auto w-full"
         )}
       >
            {/* Tabs */}
            <div className="flex space-x-8 mb-10 border-b border-white/10">
               <button 
                onClick={() => setActiveTab('form')}
                className={cn(
                  "pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative",
                  activeTab === 'form' ? "text-gold" : "text-silver/40 hover:text-white"
                )}
               >
                 Formulaire Classique
                 {activeTab === 'form' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-px bg-gold" />}
               </button>
               <button 
                onClick={() => setActiveTab('ai')}
                className={cn(
                  "pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative flex items-center space-x-2",
                  activeTab === 'ai' ? "text-gold" : "text-silver/40 hover:text-white"
                )}
               >
                 <Bot size={14} />
                 <span>Concierge IA</span>
                 {activeTab === 'ai' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-px bg-gold" />}
               </button>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 0.2 
                    }}
                    className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_30px_rgba(197,160,89,0.3)]"
                  >
                    <Check className="text-black" size={40} strokeWidth={3} />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold italic text-white mb-4">
                    Réservation Confirmée !
                  </h3>
                  
                  <p className="text-silver/60 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                    Merci <span className="text-white font-medium">{lastReservation?.name}</span>. Votre table a été préservée. Un email de confirmation a été envoyé à {lastReservation?.email}.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-sm p-6 mb-10 text-left max-w-sm mx-auto">
                    <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4 border-b border-white/10 pb-2">Détails de la table</h4>
                    <div className="space-y-3 font-light text-[13px]">
                      <div className="flex justify-between items-center text-white">
                        <span className="text-silver/40">Date</span>
                        <span className="capitalize">{lastReservation?.displayDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-white">
                        <span className="text-silver/40">Heure</span>
                        <span>{lastReservation?.time}</span>
                      </div>
                      <div className="flex justify-between items-center text-white">
                        <span className="text-silver/40">Convives</span>
                        <span>{lastReservation?.guests} Personnes</span>
                      </div>
                    </div>
                  </div>

                  <motion.button 
                    onClick={() => setIsSuccess(false)}
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center space-x-3 px-8 py-3 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[2px] hover:border-gold hover:text-gold transition-colors"
                  >
                    <RefreshCcw size={14} />
                    <span>Nouvelle Réservation</span>
                  </motion.button>
                </motion.div>
              ) : activeTab === 'form' ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmitForm}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-silver/60">Nom Complet</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/[0.05] border border-white/10 px-4 py-3 text-[13px] text-white focus:border-gold outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-silver/60">Email</label>
                       <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/[0.05] border border-white/10 px-4 py-3 text-[13px] text-white focus:border-gold outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-silver/60">Convives</label>
                       <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/40" size={16} />
                          <select 
                            value={formData.guests}
                            onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                            className="w-full bg-white/[0.05] border border-white/10 pl-10 pr-4 py-3 text-[13px] text-white focus:border-gold outline-none appearance-none transition-colors"
                          >
                             {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-charcoal">{n} Personnes</option>)}
                          </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-silver/60">Date</label>
                       <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/40" size={16} />
                          <input 
                            required
                            type="date" 
                            value={formData.date}
                            onChange={e => setFormData({...formData, date: e.target.value})}
                            className="w-full bg-white/[0.05] border border-white/10 pl-10 pr-4 py-3 text-[13px] text-white focus:border-gold outline-none transition-colors"
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest text-silver/60">Heure</label>
                       <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/40" size={16} />
                          <select 
                            value={formData.time}
                            onChange={e => setFormData({...formData, time: e.target.value})}
                            className="w-full bg-white/[0.05] border border-white/10 pl-10 pr-4 py-3 text-[13px] text-white focus:border-gold outline-none appearance-none transition-colors"
                          >
                             {['12:00', '12:30', '13:00', '19:30', '20:00', '20:30', '21:00'].map(t => <option key={t} value={t} className="bg-charcoal">{t}</option>)}
                          </select>
                       </div>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ opacity: 0.8 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full py-4 bg-gold text-black text-[12px] font-bold uppercase tracking-[2px] flex items-center justify-center space-x-3 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <span>Confirmer la Réservation</span>}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col h-[400px]"
                >
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gold/20">
                    {chatHistory.length === 0 && (
                      <div className="text-center py-10 space-y-4">
                        <div className="inline-flex p-3 rounded-full bg-gold/10 border border-gold/20">
                          <Bot className="text-gold" size={24} />
                        </div>
                        <p className="text-sm text-silver/50 max-w-xs mx-auto">
                          Bonjour ! Je suis votre concierge virtuel. Comment puis-je vous aider aujourd'hui ?
                        </p>
                      </div>
                    )}
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={cn(
                        "flex w-full mb-4",
                        msg.role === 'user' ? "justify-end" : "justify-start"
                      )}>
                        <div className={cn(
                          "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed",
                          msg.role === 'user' ? "bg-gold text-charcoal font-medium" : "bg-white/10 text-white"
                        )}>
                          {msg.parts[0].text}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 rounded-lg px-4 py-3">
                          <Loader2 className="animate-spin text-gold" size={18} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Posez votre question..."
                      value={input}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 pr-12 text-sm focus:border-gold outline-none transition-colors rounded-sm"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gold hover:text-white transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
       </div>
    );

    return isModal ? content : (
      <section id={id} className="py-24 bg-black relative">
        {content}
      </section>
    );
}
