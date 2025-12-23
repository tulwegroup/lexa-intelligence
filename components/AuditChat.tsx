
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ShieldCheck, Info, RefreshCw } from 'lucide-react';
import { getComplianceAdvice } from '../services/geminiService';
import { MOCK_WORKERS, AGENTS } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const AuditChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello, I am Lexa's Conversational Intelligence. I have analyzed your current sponsor licence data. How can I assist you with your UKVI audit readiness today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setIsLoading(true);
    
    // Prepare context for Gemini
    const context = {
      workers: MOCK_WORKERS,
      agents: AGENTS,
      overallStatus: '94% Compliant',
      licenceNumber: 'L-88912-X'
    };

    const aiResponse = await getComplianceAdvice(userMessage, context);

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Lexa Intelligence Agent</h3>
            <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Online • Regulatory Reasoning</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <Info size={18} />
          </button>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="space-y-1">
                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}>
                  {msg.content.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                  ))}
                </div>
                <p className={`text-[10px] text-slate-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-pulse">
                <Bot size={16} />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex gap-2 items-center">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-6 py-4 flex flex-wrap gap-2 bg-slate-50/30">
          {[
            "Which workers have the highest risk scores?",
            "Run a mock audit summary",
            "Are our salaries above the new 2024 thresholds?",
            "What documents are missing for Marcus Thorne?"
          ].map((q, i) => (
            <button 
              key={i} 
              onClick={() => {
                setInput(q);
              }}
              className="text-xs font-medium bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-xl focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Lexa a compliance question..."
            className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-1"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-lg transition-all ${
              !input.trim() || isLoading 
                ? 'bg-slate-300 text-white cursor-not-allowed' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck size={12} />
            <span>AI responses are grounded in current UKVI Guidance.</span>
          </div>
          <p className="text-[10px] text-slate-400 italic">Lexa Intelligence v2.4.1</p>
        </div>
      </div>
    </div>
  );
};

export default AuditChat;
