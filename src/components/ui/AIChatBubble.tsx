import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Standard prompt for the concierge
const SYSTEM_PROMPT = `Tu es le Concierge IA de Midi & Minuit, une brasserie de luxe à l'Automobile Club de Casablanca.
Ton ton est extrêmement poli, professionnel et raffiné (style majordome de luxe).
Tu réponds aux questions sur :
- Le Menu : Brasserie de luxe, spécialité Entrecôte et sauce Grand Prix.
- L'Atmosphère : Historique, club privé, voitures de collection.
- Localisation : Casablanca, Anfa/Oasis. Parking et voiturier gratuit.
- Réservations : Suggère de cliquer sur les boutons de réservation du site.
- Tenue : Smart Casual exigé.
Réponds de manière concise et élégante en français.`;

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: "Bienvenue chez Midi & Minuit. Je suis votre concierge personnel. Comment puis-je vous assister aujourd'hui ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    const newMessages: { role: 'user' | 'bot', content: string }[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          ...newMessages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        ]
      });

      const text = response.text || "Je n'ai pas pu générer de réponse.";
      setMessages(prev => [...prev, { role: 'bot', content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: "Je rencontre une difficulté pour vous répondre. Veuillez nous excuser." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] bg-charcoal border border-gold/20 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-4 flex items-center justify-between border-b border-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <Bot size={16} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest">Concierge IA</h4>
                  <span className="text-[9px] text-green-500 uppercase tracking-widest font-bold">En ligne</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-silver/40 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-black/40">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 text-[13px] leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-gold text-black rounded-l-lg rounded-tr-lg' 
                      : 'bg-white/5 text-silver/80 rounded-r-lg rounded-tl-lg'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <Loader2 size={16} className="text-gold animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-black border-t border-gold/10 flex gap-2">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-gold transition-colors"
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading}
                className="p-2 bg-gold text-black hover:bg-white transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gold text-black rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
