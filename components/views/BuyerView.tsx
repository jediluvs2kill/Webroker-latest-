
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, CheckCircle2, ShieldCheck, Award, Ticket, Loader2, X, MapPin, Briefcase, Star, TrendingUp, Clock, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_BROKERS } from '../../constants';
import { createBuyerChat } from '../../services/geminiService';
import { Chat } from "@google/genai";
import { BrokerProfile } from '../../types';

// --- Broker Detail Modal Component ---
const BrokerDetailModal: React.FC<{
  broker: BrokerProfile;
  onClose: () => void;
  onRaiseTicket: () => void;
  ticketStatus: 'idle' | 'loading' | 'sent';
}> = ({ broker, onClose, onRaiseTicket, ticketStatus }) => {
  
  // Theme based on Tier
  const getTheme = (tier: string) => {
    switch (tier) {
      case 'Platinum': return { bg: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900', accent: 'text-indigo-400', border: 'border-indigo-500/30' };
      case 'Gold': return { bg: 'bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900', accent: 'text-amber-400', border: 'border-amber-500/30' };
      default: return { bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900', accent: 'text-slate-300', border: 'border-slate-600/30' };
    }
  };

  const theme = getTheme(broker.tier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]`}>
        
        {/* Header Section */}
        <div className={`${theme.bg} p-8 text-white relative overflow-hidden`}>
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center space-x-6 relative z-10">
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ${theme.accent}`}>
              {broker.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                 <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 border border-white/20 ${theme.accent}`}>
                    {broker.tier} Partner
                 </span>
                 <span className="flex items-center text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                 </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">{broker.name}</h2>
              <div className="flex items-center space-x-4 mt-2 text-slate-300 text-sm">
                 <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 opacity-70" />
                    {['Mumbai', 'Bangalore', 'Delhi'][Math.floor(Math.random() * 3)]}
                 </div>
                 <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                    {broker.rating} Rating
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-8 overflow-y-auto bg-slate-50 flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
               <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
               <div className="text-3xl font-extrabold text-slate-900 mb-1">{broker.bii}</div>
               <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Impact Index</div>
               <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-8 h-8 text-brand-600" />
               </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
               <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
               <div className="text-3xl font-extrabold text-slate-900 mb-1">{broker.dealsClosed}</div>
               <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Verified Closures</div>
               <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Briefcase className="w-8 h-8 text-emerald-600" />
               </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
               <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
               <div className="text-3xl font-extrabold text-slate-900 mb-1">100%</div>
               <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Audit Score</div>
               <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck className="w-8 h-8 text-purple-600" />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center">
                   <User className="w-4 h-4 mr-2 text-gray-400" /> About {broker.name.split(' ')[0]}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                   A specialized partner focusing on <strong>{broker.specialization}</strong>. 
                   With over {Math.floor(broker.dealsClosed / 12) + 2} years of experience in the high-value segment, 
                   {broker.name.split(' ')[0]} consistently ranks in the top {broker.tier === 'Platinum' ? '1%' : '5%'} of our network 
                   for deal velocity and client satisfaction.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                   {['Luxury', 'High ROI', 'NRI Specialist', 'Commercial'].slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-200/50 text-gray-600 text-xs rounded-full font-medium">
                         {tag}
                      </span>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center">
                   <Clock className="w-4 h-4 mr-2 text-gray-400" /> Performance Metrics
                </h3>
                <div className="space-y-3">
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-gray-500">Response Time</span>
                         <span className="font-medium text-gray-900">12 Mins (Avg)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                         <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-gray-500">NPS Score</span>
                         <span className="font-medium text-gray-900">9.2 / 10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                         <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-xs mb-1">
                         <span className="text-gray-500">Deal Conversion</span>
                         <span className="font-medium text-gray-900">Top Tier</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                         <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between">
            <div className="text-xs text-gray-500 hidden md:block">
               <p>Broker ID: {broker.id.toUpperCase()}</p>
               <p>RERA: A5190000{Math.floor(Math.random()*1000)}</p>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
               <Button variant="ghost" onClick={onClose} className="flex-1 md:flex-none">Close</Button>
               <Button 
                  onClick={onRaiseTicket}
                  disabled={ticketStatus === 'sent'}
                  variant={ticketStatus === 'sent' ? 'secondary' : 'primary'}
                  className={`flex-1 md:flex-none min-w-[200px] ${ticketStatus !== 'sent' ? 'shadow-lg shadow-brand-500/20' : ''}`}
               >
                  {ticketStatus === 'loading' ? (
                      <span className="flex items-center justify-center"><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Generating...</span>
                  ) : ticketStatus === 'sent' ? (
                      <span className="flex items-center justify-center"><CheckCircle2 className="w-4 h-4 mr-2"/> Ticket Raised</span>
                  ) : (
                      <span className="flex items-center justify-center"><Ticket className="w-4 h-4 mr-2"/> Raise Priority Ticket</span>
                  )}
               </Button>
            </div>
        </div>

      </div>
    </div>
  );
};


// --- Main BuyerView Component ---

export const BuyerView: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Welcome to WeBroker. I'm Astra. I can't show you listings directly, but I can match you with the top-performing broker for your specific needs. What is your preferred location and budget?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMatched, setIsMatched] = useState(false); 
  const [ticketState, setTicketState] = useState<{[key: string]: 'idle' | 'loading' | 'sent'}>({});
  const [selectedBroker, setSelectedBroker] = useState<BrokerProfile | null>(null);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    chatSessionRef.current = createBuyerChat();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      let responseText = "";
      
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: userMsg });
        responseText = result.text || "I'm having trouble processing that right now.";
      } else {
        // Fallback simulation
        await new Promise(resolve => setTimeout(resolve, 1000));
        responseText = "(Simulated AI) I understand your requirements. I'm scanning our broker network to find the best match for Downtown luxury properties...";
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      
      if (messages.length > 2 && !isMatched) {
        setIsMatched(true);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Connection issue. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRaiseTicket = async (brokerId: string, brokerName: string) => {
    setTicketState(prev => ({...prev, [brokerId]: 'loading'}));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setTicketState(prev => ({...prev, [brokerId]: 'sent'}));

    const ticketId = `TKT-${Math.floor(Math.random() * 10000) + 1000}`;

    setMessages(prev => [...prev, { 
      role: 'ai', 
      text: `✅ Priority Ticket #${ticketId} raised for ${brokerName}. I have sent them your requirements summary. They are reviewing it now and will accept your request shortly.` 
    }]);

    // Close modal if open
    if (selectedBroker) {
       setTimeout(() => setSelectedBroker(null), 1500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Left Column: AI Chat Interface */}
      <div className="lg:col-span-2 flex flex-col h-full">
        <Card className="flex-1 flex flex-col h-full shadow-lg border-brand-100 overflow-hidden" noPadding>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-brand-700 to-indigo-800 p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Astra Concierge</h2>
                <p className="text-brand-200 text-xs">Matching you with Verified Partners</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    m.role === 'user' ? 'bg-white border-gray-200 text-gray-600' : 'bg-brand-600 border-brand-600 text-white'
                  }`}>
                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-white text-gray-800 border border-gray-200 rounded-br-none' 
                      : 'bg-brand-600 text-white rounded-bl-none shadow-md'
                  }`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="flex flex-row items-end gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
                       <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                        </div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your budget and preferences..."
                className="flex-1 bg-gray-50 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-3"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="h-11 w-11 p-0 rounded-lg">
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2 uppercase tracking-wide">
              WeBroker AI Routing • 100% Verified Interactions
            </p>
          </div>
        </Card>
      </div>

      {/* Right Column: Matched Brokers */}
      <div className="space-y-4 overflow-y-auto pr-1">
        <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Your Matches</h3>
              <p className="text-xs text-gray-500">Based on your conversation</p>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
        </div>
        
        {/* Helper visual if no chat yet */}
        {messages.length < 3 && !isMatched && (
             <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-800 text-sm mb-4 animate-pulse">
                Start chatting with Astra to unlock the best brokers for you.
             </div>
        )}

        {/* Broker List */}
        {MOCK_BROKERS.map((broker, idx) => (
            <div 
                key={broker.id} 
                onClick={() => setSelectedBroker(broker)}
                className={`bg-white rounded-xl border transition-all duration-300 cursor-pointer ${
                    isMatched && idx === 0 
                    ? 'border-brand-500 shadow-lg ring-1 ring-brand-500 transform hover:scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
            >
                <div className="p-4">
                    <div className="flex items-start justify-between">
                         <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 ${
                              broker.tier === 'Platinum' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 
                              'bg-gray-100 border-gray-200 text-gray-600'
                            }`}>
                                {broker.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{broker.name}</h4>
                                <div className="flex items-center space-x-1">
                                     <Award className={`w-3 h-3 ${broker.tier === 'Platinum' ? 'text-indigo-500' : 'text-amber-500'}`} />
                                     <span className="text-xs text-gray-500 font-medium">{broker.tier} Tier</span>
                                </div>
                            </div>
                         </div>
                         <div className="text-right">
                             <div className="text-lg font-bold text-gray-900 flex items-center justify-end">
                                {broker.bii} <span className="text-[10px] text-gray-400 ml-1 font-normal">BII</span>
                             </div>
                             <div className="flex items-center text-amber-400 text-xs justify-end">
                                <Star className="w-3 h-3 fill-current mr-0.5" /> {broker.rating}
                             </div>
                         </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium uppercase tracking-wide">
                            {broker.specialization}
                        </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                        {isMatched && idx === 0 ? (
                            <Button 
                                fullWidth 
                                size="sm" 
                                onClick={(e) => { e.stopPropagation(); handleRaiseTicket(broker.id, broker.name); }}
                                disabled={ticketState[broker.id] === 'sent'}
                                variant={ticketState[broker.id] === 'sent' ? 'secondary' : 'primary'}
                                className={ticketState[broker.id] !== 'sent' ? 'animate-bounce-subtle' : ''}
                            >
                                {ticketState[broker.id] === 'loading' ? (
                                    <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Generating Ticket...</span>
                                ) : ticketState[broker.id] === 'sent' ? (
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2"/> Ticket Sent</span>
                                ) : (
                                    <span className="flex items-center"><Ticket className="w-4 h-4 mr-2"/> Raise Priority Ticket</span>
                                )}
                            </Button>
                        ) : (
                             <Button 
                                fullWidth 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => { e.stopPropagation(); setSelectedBroker(broker); }}
                            >
                                View Profile
                            </Button>
                        )}
                    </div>
                </div>
                {/* Best Match Label */}
                {isMatched && idx === 0 && (
                    <div className="bg-brand-600 text-white text-center text-[10px] font-bold py-1 uppercase tracking-wider">
                        AI Recommended Match
                    </div>
                )}
            </div>
        ))}

        <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
            <p className="text-xs text-gray-500 mb-2">Want to see more options?</p>
            <p className="text-xs font-medium text-gray-900">Tell Astra what you need.</p>
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedBroker && (
        <BrokerDetailModal 
           broker={selectedBroker} 
           onClose={() => setSelectedBroker(null)}
           onRaiseTicket={() => handleRaiseTicket(selectedBroker.id, selectedBroker.name)}
           ticketStatus={ticketState[selectedBroker.id] || 'idle'}
        />
      )}
    </div>
  );
};
