import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield, Cpu } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0,transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                The Future of SDV Development
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                Build SDV features <span className="text-emerald-500">10× faster.</span><br />
                Ship with traceability.
              </h1>
              <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Generative AI + Requirements traceability + CI/CD quality gates — from plain-English idea to OTA-ready container and dashboard.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/pipeline/requirements"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group"
                >
                  Try Live Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/pipeline"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                >
                  Explore Pipeline
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="border-y border-white/10 bg-zinc-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">40–70%</div>
              <div className="text-sm text-zinc-400 uppercase tracking-widest">Dev Effort Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4-Phase</div>
              <div className="text-sm text-zinc-400 uppercase tracking-widest">End-to-End Pipeline</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-zinc-400 uppercase tracking-widest">Traceable & Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefit Cards */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Rapid Development",
                description: "Automated requirement → blueprint → code pipeline reduces boilerplate and iteration cycles significantly.",
                icon: Zap
              },
              {
                title: "Built-in Compliance",
                description: "MISRA/ASPICE-aware prompts, static analysis, and artifact traceability baked directly into the workflow.",
                icon: Shield
              },
              {
                title: "Safe Rollouts",
                description: "Containerized microservices + canary OTA ensure controlled fleet upgrades with real-time health monitoring.",
                icon: Cpu
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-emerald-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/5">
            <div className="bg-zinc-800 p-4 border-b border-white/10 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="ml-4 px-3 py-1 rounded bg-black/30 text-xs text-zinc-500 font-mono">
                autoforge-nexus.io/live-demo
              </div>
            </div>
            <div className="aspect-video bg-black relative flex items-center justify-center">
              <img 
                src="https://picsum.photos/seed/sdv/1280/720" 
                alt="SDV Dashboard Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform">
                  <Zap className="w-10 h-10 text-black fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-white">Interactive Sandbox</h3>
                <p className="text-zinc-400 mt-2">Experience the CARLA-fed live telemetry stream</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
