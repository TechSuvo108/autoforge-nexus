import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Cpu, 
  ShieldCheck, 
  LayoutDashboard, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const steps = [
  {
    id: 'requirements',
    title: 'Requirements Studio',
    description: 'Conversational requirements gathering with automated conflict detection and ISO/MISRA alignment.',
    icon: FileText,
    path: '/pipeline/requirements',
    color: 'emerald'
  },
  {
    id: 'genai',
    title: 'GenAI Engine',
    description: 'Automated generation of MISRA-compliant microservices and blueprints with RAG-grounded citations.',
    icon: Cpu,
    path: '/pipeline/genai',
    color: 'blue'
  },
  {
    id: 'build',
    title: 'Build & Validate',
    description: 'CI/CD quality gates, static analysis, and property-based testing with automated fix suggestions.',
    icon: ShieldCheck,
    path: '/pipeline/build',
    color: 'purple'
  },
  {
    id: 'deploy',
    title: 'Deploy & Monitor',
    description: 'Canary OTA deployment to virtual fleets with real-time telemetry and ML-driven diagnostics.',
    icon: LayoutDashboard,
    path: '/pipeline/deploy',
    color: 'orange'
  }
];

const PipelineOverview = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">The SDV Development Pipeline</h1>
          <p className="text-zinc-400 text-lg">
            A seamless 4-phase journey from abstract requirements to deployable, compliant vehicle services.
          </p>
        </div>

        {/* Interactive Pipeline SVG (Simplified with CSS/React) */}
        <div className="relative max-w-5xl mx-auto mb-24">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={step.path} className="block">
                  <div className="relative flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center mb-6 group-hover:border-emerald-500 transition-all duration-300 shadow-xl`}>
                      <step.icon className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed px-4">{step.description}</p>
                    
                    <div className="mt-6 flex items-center text-emerald-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Demo <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Explainer Sections */}
        <div className="space-y-32">
          {steps.map((step, i) => (
            <div key={step.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
                  Phase 0{i + 1}
                </div>
                <h2 className="text-3xl font-bold mb-6">{step.title}</h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  {step.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Feature A', 'Feature B', 'Feature C'].map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {f} - Detailed capability description goes here.
                    </li>
                  ))}
                </ul>
                <Link
                  to={step.path}
                  className="inline-flex items-center gap-2 text-emerald-500 font-bold hover:underline"
                >
                  Explore {step.title} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex-1 w-full aspect-video bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/${step.id}/800/450`} 
                  alt={step.title} 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-sm font-mono text-emerald-500">
                    // Interactive Preview Module
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PipelineOverview;
