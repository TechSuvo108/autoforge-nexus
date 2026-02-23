import React from 'react';
import { Shield, FileText, Download, CheckCircle2, AlertCircle, Info } from 'lucide-react';

const Compliance = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
          Trust & Safety
        </div>
        <h1 className="text-4xl font-bold mb-6">Compliance & Traceability</h1>
        <p className="text-zinc-400 text-lg">
          Tata Elxsi Teliport DEMO is designed from the ground up to support safety-critical development standards like ISO 26262 and ASPICE.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-zinc-900 border border-white/10">
          <Shield className="w-10 h-10 text-emerald-500 mb-6" />
          <h2 className="text-2xl font-bold mb-4">MISRA Alignment</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Our GenAI Engine is grounded in MISRA C++:2023 and MISRA C:2012 guidelines. Every code generation cycle includes automated static analysis to ensure compliance before the code even reaches your CI/CD pipeline.
          </p>
          <ul className="space-y-3">
            {['Automated Rule Checking', 'Violation Auto-Fixing', 'Compliance Reporting'].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 border border-white/10">
          <FileText className="w-10 h-10 text-emerald-500 mb-6" />
          <h2 className="text-2xl font-bold mb-4">ASPICE Traceability</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Maintain a perfect 1:1 mapping between requirements, blueprints, source code, and test results. Tata Elxsi Teliport DEMO automatically generates the traceability matrix required for ASPICE Level 2/3 audits.
          </p>
          <ul className="space-y-3">
            {['Bidirectional Linking', 'Impact Analysis', 'Audit-Ready Exports'].map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Download className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Download Sample Artifacts</h3>
              <p className="text-sm text-zinc-400">Get a sample traceability mapping PDF and MISRA compliance report.</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all whitespace-nowrap">
            Download PDF Pack
          </button>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10">
        <div className="flex gap-4">
          <Info className="w-6 h-6 text-zinc-500 shrink-0" />
          <div>
            <h4 className="font-bold text-white mb-2">Certification Disclaimer</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              While Tata Elxsi Teliport DEMO provides tools to automate compliance tasks, final certification remains the responsibility of the vehicle manufacturer and authorized auditing bodies. Our platform serves as a productivity accelerator and documentation engine for your safety-critical workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
