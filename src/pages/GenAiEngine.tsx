import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Code2, 
  Link as LinkIcon, 
  Play, 
  RefreshCw, 
  FileCode,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { generateCode } from '@/src/services/geminiService';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/src/lib/utils';

const GenAiEngine = () => {
  const [activeTab, setActiveTab] = useState<'blueprints' | 'codegen' | 'traceability'>('codegen');
  const [language, setLanguage] = useState<'python' | 'cpp' | 'rust'>('python');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedRequirement, setSelectedRequirement] = useState('REQ-001: Adaptive Cruise Control');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateCode(selectedRequirement, language);
      setGeneratedContent(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-zinc-950">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-6 border-b border-white/10 bg-zinc-900/50">
        <div className="flex gap-8">
          {[
            { id: 'blueprints', label: 'Blueprints', icon: Cpu },
            { id: 'codegen', label: 'Code Generation', icon: Code2 },
            { id: 'traceability', label: 'Artifact Linkage', icon: LinkIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 py-4 text-sm font-medium transition-all relative",
                activeTab === tab.id ? "text-emerald-500" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="python">Python (Primary)</option>
            <option value="cpp">C++ (Embedded)</option>
            <option value="rust">Rust (Safety-Critical)</option>
          </select>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500 text-black rounded-lg text-xs font-bold hover:bg-emerald-400 transition-all disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            Generate Service
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Context */}
        <div className="w-72 border-r border-white/10 p-6 space-y-8 overflow-y-auto">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Target Requirement</h3>
            <div className="p-3 rounded-lg bg-zinc-900 border border-emerald-500/20">
              <p className="text-xs text-zinc-300 font-medium">{selectedRequirement}</p>
              <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
                The service must maintain a safe distance from the vehicle ahead based on velocity.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">RAG Knowledge Base</h3>
            <div className="space-y-2">
              {['MISRA C++:2023', 'ISO 26262-6', 'AUTOSAR AP 23-11'].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-2 rounded bg-zinc-900/50 border border-white/5 text-[10px] text-zinc-400">
                  <span>{doc}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Artifact Linkage</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                REQ-001 → ACC_Service
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ACC_Service → acc_logic.py
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                acc_logic.py → Unit_Test_01
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Editor/Viewer */}
        <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
          {activeTab === 'codegen' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 bg-zinc-900/30">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <FileCode className="w-4 h-4" />
                  <span>acc_service.{language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : 'rs'}</span>
                </div>
                <div className="flex gap-4">
                  <button className="text-[10px] text-zinc-500 hover:text-white flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> View Source
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 font-mono text-sm">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                    <p className="text-zinc-500 animate-pulse">Consulting RAG Knowledge Base & Generating Code...</p>
                  </div>
                ) : generatedContent ? (
                  <div className="prose prose-invert prose-emerald max-w-none">
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                    <Code2 className="w-12 h-12 mb-4 opacity-20" />
                    <p>Select a requirement and click "Generate Service" to begin.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'blueprints' && (
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-emerald-500/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white">Service Blueprint #{i}</h4>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">ACTIVE</span>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 rounded bg-black/30 border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase mb-1">Class Signature</p>
                      <code className="text-xs text-emerald-400">class VehicleHealthMonitor:</code>
                    </div>
                    <div className="p-3 rounded bg-black/30 border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase mb-1">Interfaces</p>
                      <div className="flex gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400">CAN_Bus</span>
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400">MQTT_Cloud</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'traceability' && (
            <div className="p-8 overflow-y-auto">
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    <tr>
                      <th className="px-6 py-4 border-b border-white/10">Requirement ID</th>
                      <th className="px-6 py-4 border-b border-white/10">Blueprint</th>
                      <th className="px-6 py-4 border-b border-white/10">Source Code</th>
                      <th className="px-6 py-4 border-b border-white/10">Validation</th>
                      <th className="px-6 py-4 border-b border-white/10">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs text-zinc-400">
                    {[
                      { id: 'REQ-001', bp: 'ACC_V1', src: 'acc_logic.py', val: 'Test_01', status: 'Linked' },
                      { id: 'REQ-002', bp: 'EBA_V2', src: 'eba_core.cpp', val: 'Test_02', status: 'Linked' },
                      { id: 'REQ-003', bp: 'VHM_V1', src: 'health.py', val: 'Pending', status: 'Partial' },
                    ].map((row) => (
                      <tr key={row.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 border-b border-white/5 font-mono text-emerald-500">{row.id}</td>
                        <td className="px-6 py-4 border-b border-white/5">{row.bp}</td>
                        <td className="px-6 py-4 border-b border-white/5 font-mono">{row.src}</td>
                        <td className="px-6 py-4 border-b border-white/5">{row.val}</td>
                        <td className="px-6 py-4 border-b border-white/5">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold",
                            row.status === 'Linked' ? "bg-emerald-500/10 text-emerald-500" : "bg-yellow-500/10 text-yellow-500"
                          )}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenAiEngine;
