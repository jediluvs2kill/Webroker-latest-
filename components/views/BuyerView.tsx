
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, CheckCircle2, ShieldCheck, Award, Ticket, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_BROKERS } from '../../constants';
import { createBuyerChat } from '../../services/geminiService';
import { Chat } from "@google/genai";

export const BuyerView: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Welcome to WeBroker. I'm Astra. I can't show you listings directly, but I can match you with the top-performing broker for your specific needs. What is your preferred location and budget?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMatched, setIsMatched] = useState(false); // Visual state to show "Matching..."
  const [ticketState, setTicketState] = useState<{[key: string]: 'idle' | 'loading' | 'sent'}>({});
  
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
      
      // Simulate "Matching" effect after a few interactions
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

    // Inject system message into chat
    setMessages(prev => [...prev, { 
      role: 'ai', 
      text: `✅ Priority Ticket #${ticketId} raised for ${brokerName}. I have sent them your requirements summary. They are reviewing it now and will accept your request shortly.` 
    }]);
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
                className={`bg-white rounded-xl border transition-all duration-500 ${
                    isMatched && idx === 0 
                    ? 'border-brand-500 shadow-lg ring-1 ring-brand-500 transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
            >
                <div className="p-4">
                    <div className="flex items-start justify-between">
                         <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                {broker.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{broker.name}</h4>
                                <div className="flex items-center space-x-1">
                                     <Award className={`w-3 h-3 ${broker.tier === 'Platinum' ? 'text-indigo-500' : 'text-amber-500'}`} />
                                     <span className="text-xs text-gray-500 font-medium">{broker.tier} Tier</span>
                                </div>
                            </div>
                         </div>
                         <div className="text-right">
                             <div className="text-lg font-bold text-gray-900">{broker.bii}</div>
                             <div className="text-[10px] text-gray-400 uppercase tracking-wider">BII Score</div>
                         </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium uppercase tracking-wide">
                            {broker.specialization}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-md font-medium uppercase tracking-wide">
                            {broker.dealsClosed} Closures
                        </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                        {isMatched && idx === 0 ? (
                            <Button 
                                fullWidth 
                                size="sm" 
                                onClick={() => handleRaiseTicket(broker.id, broker.name)}
                                disabled={ticketState[broker.id] === 'sent'}
                                variant={ticketState[broker.id] === 'sent' ? 'secondary' : 'primary'}
                                className={ticketState[broker.id] !== 'sent' ? 'animate-bounce-subtle' : ''}
                            >
                                {ticketState[broker.id] === 'loading' ? (
                                    <span className="flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Generating Ticket...</span>
                                ) : ticketState[broker.id] === 'sent' ? (
                                    <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2"/> Priority Ticket Sent</span>
                                ) : (
                                    <span className="flex items-center"><Ticket className="w-4 h-4 mr-2"/> Raise Priority Ticket</span>
                                )}
                            </Button>
                        ) : (
                             <Button 
                                fullWidth 
                                size="sm" 
                                variant="outline"
                            >
                                View Profile
                            </Button>
                        )}
                    </div>
                </div>
                {/* Best Match Label */}
                {isMatched && idx === 0 && (
                    <div className="bg-brand-600 text-white text-center text-xs font-bold py-1">
                        AI RECOMMENDED MATCH
                    </div>
                )}
            </div>
        ))}

        <div className="p-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center">
            <p className="text-xs text-gray-500 mb-2">Want to see more options?</p>
            <p className="text-xs font-medium text-gray-900">Tell Astra what you need.</p>
        </div>
      </div>
    </div>
  );
};
