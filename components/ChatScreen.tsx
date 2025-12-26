import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, User, Bot } from 'lucide-react';
import { chatWithConcierge } from '../services/geminiService';

interface ChatScreenProps {
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{role: 'user' | 'model', text: string}[]>([
      { role: 'model', text: 'Olá! Sou seu Concierge Virtual. Posso ajudar com a senha do Wi-Fi, horários ou dicas locais. Como posso ajudar você hoje?' }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const contextHistory = history.map(h => `${h.role}: ${h.text}`);
    const response = await chatWithConcierge(userMsg, contextHistory);

    setHistory(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 sm:pt-14 pb-3 sm:pb-4 flex items-center justify-between bg-white/90 backdrop-blur-sm border-b border-sand-100 z-20 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 text-charcoal-900 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Voltar">
          <ArrowLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
        </button>
        <div className="flex flex-col items-center">
            <h2 className="font-serif text-base sm:text-lg font-bold text-charcoal-900">Concierge AI</h2>
            <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-sand-500 uppercase tracking-widest">Online</span>
            </div>
        </div>
        <div className="w-10 sm:w-11" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 sm:space-y-6 no-scrollbar bg-sand-50">
        <div className="text-center py-3 sm:py-4">
            <span className="text-[9px] sm:text-[10px] text-sand-400 uppercase tracking-widest bg-sand-100 px-2.5 sm:px-3 py-1 rounded-full">Hoje</span>
        </div>
        
        {history.map((msg, idx) => (
          <div key={idx} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-charcoal-900' : 'bg-white border border-sand-200'}`}>
                {msg.role === 'user' ? <User size={13} className="text-white sm:w-[14px] sm:h-[14px]"/> : <Bot size={15} className="text-sand-600 sm:w-4 sm:h-4"/>}
            </div>

            {/* Bubble */}
            <div 
              className={`max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-charcoal-900 text-sand-50 rounded-br-none' 
                  : 'bg-white text-charcoal-800 border border-sand-100 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
             <div className="flex items-end gap-2">
                 <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-sand-200 flex items-center justify-center shrink-0">
                    <Sparkles size={13} className="text-sand-600 animate-pulse sm:w-[14px] sm:h-[14px]"/>
                 </div>
                 <div className="bg-white text-sand-400 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 border border-sand-100">
                   <div className="flex gap-1">
                       <span className="w-1.5 h-1.5 bg-sand-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                       <span className="w-1.5 h-1.5 bg-sand-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                       <span className="w-1.5 h-1.5 bg-sand-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                   </div>
                 </div>
           </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-white border-t border-sand-100 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-8">
        <div className="flex items-center gap-2 bg-sand-50 p-2 pl-3 sm:pl-4 rounded-full border border-sand-200 focus-within:border-sand-400 focus-within:bg-white transition-all shadow-inner">
            <input 
                type="text" 
                className="flex-1 bg-transparent py-2 sm:py-2.5 outline-none text-sm text-charcoal-900 placeholder-sand-400"
                placeholder="Digite sua dúvida..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                aria-label="Digite sua mensagem"
            />
            <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-charcoal-900 text-white p-2.5 sm:p-3 rounded-full hover:bg-charcoal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Enviar mensagem"
            >
                <Send size={15} className="sm:w-4 sm:h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};