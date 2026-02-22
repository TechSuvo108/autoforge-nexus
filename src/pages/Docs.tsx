import React from 'react';
import { Search, Book, Code, Terminal, Zap, ChevronRight } from 'lucide-react';

const Docs = () => {
  return (
    <div className="max-w-7xl mx-auto flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 h-[calc(100vh-64px)] sticky top-16 p-6 overflow-y-auto hidden md:block">
        <div className="space-y-8">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Getting Started</h3>
            <ul className="space-y-2">
              {['Introduction', '15-Minute Tutorial', 'Architecture Overview'].map(item => (
                <li key={item} className="text-sm text-zinc-400 hover:text-emerald-500 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Pipeline Guides</h3>
            <ul className="space-y-2">
              {['Requirements Studio', 'GenAI Engine', 'Build & Validate', 'Deploy & Monitor'].map(item => (
                <li key={item} className="text-sm text-zinc-400 hover:text-emerald-500 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">API Reference</h3>
            <ul className="space-y-2">
              {['Nexus CLI', 'REST API', 'SDKs'].map(item => (
                <li key={item} className="text-sm text-zinc-400 hover:text-emerald-500 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 max-w-4xl">
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search documentation..." 
            className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="prose prose-invert prose-emerald max-w-none">
          <h1>Documentation</h1>
          <p className="text-xl text-zinc-400">
            Learn how to build, test, and deploy SDV services with AutoForge Nexus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-12">
            {[
              { title: 'Quick Start', desc: 'Get up and running in 15 minutes.', icon: Zap },
              { title: 'API Reference', desc: 'Detailed API and SDK documentation.', icon: Code },
              { title: 'CLI Tools', desc: 'Master the Nexus command line.', icon: Terminal },
              { title: 'Best Practices', desc: 'Guidelines for MISRA/ASPICE.', icon: Book },
            ].map((card) => (
              <div key={card.title} className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-emerald-500/50 transition-all group cursor-pointer">
                <card.icon className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">{card.desc}</p>
                <div className="flex items-center text-xs text-emerald-500 font-bold group-hover:translate-x-1 transition-transform">
                  Read More <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <h2>15-Minute Tutorial</h2>
          <p>
            In this tutorial, we'll walk through the entire AutoForge Nexus pipeline—from a plain-English requirement to a live CARLA-deployed container.
          </p>
          <ol>
            <li><strong>Define:</strong> Start in the Requirements Studio and ask the AI to "Create an Adaptive Cruise Control service".</li>
            <li><strong>Generate:</strong> Use the GenAI Engine to produce MISRA-compliant Python code.</li>
            <li><strong>Validate:</strong> Run the build pipeline and verify quality gates.</li>
            <li><strong>Deploy:</strong> Perform a canary rollout to the virtual fleet.</li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default Docs;
