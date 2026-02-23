import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Bot,
  User,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { generateRequirements } from '@/src/services/geminiService';
import { cn } from '@/src/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Requirement {
  id: string;
  title: string;
  status: 'draft' | 'reviewed' | 'conflict';
  asil: 'QM' | 'A' | 'B' | 'C' | 'D';
}

const RequirementsStudio = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Welcome to the Requirements Studio. What vehicle feature would you like to define today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: 'REQ-001', title: 'Adaptive Cruise Control - Target Speed', status: 'reviewed', asil: 'B' },
    { id: 'REQ-002', title: 'Emergency Brake Assist - Threshold', status: 'conflict', asil: 'D' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateRequirements(input);
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMsg]);

      // Mock adding a requirement if the response seems to define one
      if (input.toLowerCase().includes('requirement') || input.length > 20) {
        const newReq: Requirement = {
          id: `REQ-00${requirements.length + 1}`,
          title: input.slice(0, 40) + '...',
          status: 'draft',
          asil: 'QM'
        };
        setRequirements(prev => [...prev, newReq]);
      }
    } catch (error: any) {
      console.error(error);
      let content = `Error: ${error.message}. Please check your API key and server connection.`;

      if (error.message.includes('429') || error.message.includes('Quota exceeded') || error.message.includes('RESOURCE_EXHAUSTED')) {
        content = "Google Gemini API rate limit exceeded. Please wait a moment and try again, or check your API quota in Google AI Studio.";
      } else if (error.message.includes('400') || error.message.includes('API key not valid')) {
        content = "Your API key is invalid. Please verify the key in your .env file.";
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Left: Chat Panel */}
      <div className="flex-1 flex flex-col border-r border-white/10 bg-zinc-950">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold">AI Requirements Assistant</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Online
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  msg.role === 'user' ? "bg-emerald-500 text-black" : "bg-zinc-800 text-emerald-500"
                )}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user' ? "bg-emerald-500 text-black font-medium" : "bg-zinc-900 text-zinc-300 border border-white/5"
                )}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="p-4 bg-zinc-900 rounded-2xl flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-zinc-900/50">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Describe a vehicle feature or requirement..."
              className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none h-24"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute bottom-3 right-3 p-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-2 text-[10px] text-zinc-500 text-center uppercase tracking-widest">
            Powered by Gemini 3.1 Pro • ASPICE/MISRA Guardrails Active
          </p>
        </div>
      </div>

      {/* Right: Spec Panel */}
      <div className="w-96 flex flex-col bg-zinc-900">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-500" />
            Structured Spec
          </h2>
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {requirements.map((req) => (
            <div key={req.id} className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500">{req.id}</span>
                <div className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  req.status === 'reviewed' ? "bg-emerald-500/10 text-emerald-500" :
                    req.status === 'conflict' ? "bg-red-500/10 text-red-500" : "bg-zinc-800 text-zinc-400"
                )}>
                  {req.status}
                </div>
              </div>
              <h3 className="text-sm font-medium text-zinc-200 mb-3">{req.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500">ASIL</span>
                  <span className={cn(
                    "w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold",
                    req.asil === 'D' ? "bg-red-500 text-white" : "bg-zinc-800 text-zinc-300"
                  )}>
                    {req.asil}
                  </span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 text-zinc-500 hover:text-white"><Settings className="w-3.5 h-3.5" /></button>
                  <button className="p-1 text-zinc-500 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: Conflict Detector */}
        <div className="p-4 border-t border-white/10 bg-zinc-950">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Conflict Detector</h3>
          </div>
          <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="flex gap-3">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-500 mb-1">Safety Conflict Detected</p>
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  REQ-002 (ASIL D) conflicts with REQ-001 (ASIL B) regarding brake force priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsStudio;
