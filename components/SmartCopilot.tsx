import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { generateOutreachMessage } from '../services/geminiService';
import { Lead } from '../types';
import { Button } from './ui/Button';

interface SmartCopilotProps {
  contextData?: Lead; // Optional context if we are looking at a specific lead
}

export const SmartCopilot: React.FC<SmartCopilotProps> = ({ contextData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: contextData 
      ? `Hi! I can help you draft a message for ${contextData.name} or analyze their potential.` 
      : "Hello! I'm your WeBroker AI Copilot. Ask me about your pipeline or for help drafting emails." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Simulate generic chat or specific context handling
    // In a real app, this would route to a more complex conversation handler in geminiService
    try {
        // Simple logic for the demo to demonstrate the service integration
        if (contextData && (userMsg.toLowerCase().includes('draft') || userMsg.toLowerCase().includes('message'))) {
             const response = await generateOutreachMessage(contextData, 'professional');
             setMessages(prev => [...prev, { role: 'ai', text: response }]);
        } else {
             // Fallback for generic queries (simulated for now to keep it scoped)
             setTimeout(() => {
                 setMessages(prev => [...prev, { role: 'ai', text: "I'm tuned to help with specific lead outreach right now. Try opening a lead and asking me to 'draft a message'." }]);
             }, 800);
        }
    } catch (e) {
        setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I had trouble connecting to the brain." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: 'draft_friendly' | 'draft_professional') => {
    if (!contextData) return;
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: action === 'draft_friendly' ? 'Draft a friendly message' : 'Draft a professional message' }]);
    
    const response = await generateOutreachMessage(contextData, action === 'draft_friendly' ? 'friendly' : 'professional');
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-50 animate-bounce-subtle"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-brand-600 p-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">AI Copilot</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-brand-700 p-1 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
              m.role === 'user' 
                ? 'bg-brand-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-tl-none shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
      </div>

      {/* Contextual Actions (Chips) */}
      {contextData && !isLoading && (
        <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto">
          <button 
            onClick={() => handleQuickAction('draft_friendly')}
            className="whitespace-nowrap px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors"
          >
            ✨ Draft Friendly
          </button>
           <button 
            onClick={() => handleQuickAction('draft_professional')}
            className="whitespace-nowrap px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors"
          >
            👔 Draft Professional
          </button>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 border-none focus:ring-0 text-sm bg-transparent"
        />
        <Button size="sm" onClick={handleSend} disabled={!input.trim() || isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};