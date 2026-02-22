import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  BarChart3,
  Search,
  Wrench
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const BuildValidate = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startBuild = () => {
    setIsBuilding(true);
    setLogs([]);
    setProgress(0);
    
    const buildSteps = [
      "Initializing build environment...",
      "Fetching dependencies...",
      "Compiling ACC_Service (Python)...",
      "Running MISRA static analysis...",
      "Checking ISO 26262-6 compliance...",
      "Executing property-based tests...",
      "Generating ASPICE traceability report...",
      "Build successful. Artifact ready for deployment."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < buildSteps.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${buildSteps[currentStep]}`]);
        setProgress((currentStep + 1) * (100 / buildSteps.length));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsBuilding(false);
      }
    }, 1000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Build & Validate</h1>
          <p className="text-zinc-400">CI/CD quality gates and automated compliance verification.</p>
        </div>
        <button
          onClick={startBuild}
          disabled={isBuilding}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-all disabled:opacity-50"
        >
          {isBuilding ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Terminal className="w-5 h-5" />}
          Start Build Pipeline
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Build Console */}
        <div className="lg:col-span-2 flex flex-col h-[500px] rounded-2xl bg-black border border-white/10 overflow-hidden">
          <div className="px-4 py-2 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-mono text-zinc-400">Build Console</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 text-emerald-500/80">
            {logs.length === 0 && !isBuilding && (
              <div className="h-full flex items-center justify-center text-zinc-700">
                Waiting for build trigger...
              </div>
            )}
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {log}
              </motion.div>
            ))}
            {isBuilding && (
              <div className="mt-4">
                <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quality Gates */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Quality Gates
              </h3>
              <BarChart3 className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="space-y-6">
              {[
                { label: 'MISRA Compliance', value: 98, status: 'pass' },
                { label: 'Test Coverage', value: 92, status: 'pass' },
                { label: 'Vulnerabilities', value: 0, status: 'pass' },
                { label: 'Traceability', value: 100, status: 'pass' },
              ].map((gate) => (
                <div key={gate.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-400">{gate.label}</span>
                    <span className="text-xs font-bold text-emerald-500">{gate.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${gate.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <h3 className="font-bold">Auto-Fix Suggestions</h3>
            </div>
            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
              <p className="text-xs text-zinc-300 mb-3">
                Static analysis found a potential buffer overflow in <code className="text-yellow-500">acc_logic.py:42</code>.
              </p>
              <button className="w-full py-2 bg-yellow-500 text-black text-xs font-bold rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2">
                <Wrench className="w-3.5 h-3.5" />
                Apply Auto-Fix
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Unit Tests', count: 142, passed: 142, icon: CheckCircle2 },
          { title: 'Property Tests', count: 24, passed: 24, icon: CheckCircle2 },
          { title: 'Security Scans', count: 12, passed: 12, icon: CheckCircle2 },
        ].map((test) => (
          <div key={test.title} className="p-6 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <test.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-bold text-white">{test.title}</h4>
                <p className="text-xs text-zinc-500">{test.passed}/{test.count} Passed</p>
              </div>
            </div>
            <div className="text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildValidate;
