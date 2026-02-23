import React from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Activity,
  Battery,
  Thermometer,
  Wind,
  ChevronRight,
  ArrowRight,
  Info
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const VehicleHealthUseCase = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
          Use Case Demo
        </div>
        <h1 className="text-4xl font-bold mb-6">Vehicle Health & Diagnostics</h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          See how Tata Elxsi Teliport DEMO enables rapid development of complex diagnostic services. This demo showcases a real-time health monitoring microservice generated from a single requirement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* HMI Mockup */}
        <div className="relative aspect-[4/3] bg-zinc-900 rounded-[40px] border-[12px] border-zinc-800 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black p-8 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Teliport OS</h3>
                  <p className="text-[10px] text-zinc-500">v2.4.0-stable</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-white">84%</span>
                </div>
                <div className="text-sm text-white">10:13 AM</div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between">
                <Thermometer className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Motor Temp</p>
                  <p className="text-3xl font-bold text-white">42°C</p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between">
                <Wind className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Tire Pressure</p>
                  <p className="text-3xl font-bold text-white">32 PSI</p>
                </div>
              </div>
              <div className="col-span-2 p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Activity className="w-8 h-8 text-emerald-500" />
                  <div>
                    <h4 className="text-white font-bold">System Health</h4>
                    <p className="text-xs text-emerald-500/80">All systems nominal</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm Summaries */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-500" />
            Algorithm Summaries
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Tire Wear Prediction', desc: 'ML-driven analysis of vibration patterns and pressure history to predict maintenance windows.', color: 'blue' },
              { title: 'Battery Thermal Management', desc: 'Predictive cooling logic based on driving style and ambient temperature to extend cell life.', color: 'orange' },
              { title: 'Motor Efficiency Optimizer', desc: 'Real-time torque vectoring adjustments to maximize range based on current load.', color: 'emerald' },
              { title: 'Driving Efficiency Coach', desc: 'HMI feedback loop providing real-time suggestions for energy-optimal acceleration.', color: 'purple' },
            ].map((algo, i) => (
              <div key={i} className="p-4 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${algo.color}-500`} />
                  {algo.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{algo.desc}</p>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <button className="flex items-center gap-2 text-emerald-500 font-bold hover:underline">
              View Implementation Details <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleHealthUseCase;
