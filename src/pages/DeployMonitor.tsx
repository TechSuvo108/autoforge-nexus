import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Activity, 
  Globe, 
  Zap, 
  Shield, 
  ChevronRight,
  ArrowUpRight,
  Settings,
  AlertTriangle,
  Gauge
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/src/lib/utils';

const mockTelemetry = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  speed: 40 + Math.random() * 20,
  battery: 80 - i * 0.5,
  temp: 22 + Math.random() * 2
}));

const DeployMonitor = () => {
  const [canaryValue, setCanaryValue] = useState(10);
  const [telemetry, setTelemetry] = useState(mockTelemetry);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const last = prev[prev.length - 1];
        const next = {
          time: last.time + 1,
          speed: 40 + Math.random() * 20,
          battery: Math.max(0, last.battery - 0.1),
          temp: 22 + Math.random() * 2
        };
        return [...prev.slice(1), next];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Deploy & Monitor</h1>
          <p className="text-zinc-400">Canary OTA rollouts and real-time vehicle telemetry.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all flex items-center gap-2">
            <Settings className="w-4 h-4" />
            OTA Config
          </button>
          <button className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-lg text-sm hover:bg-emerald-400 transition-all">
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Deployment Controls */}
        <div className="lg:col-span-1 space-y-8">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              Canary Rollout
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-zinc-400">Target Fleet %</span>
                  <span className="text-2xl font-bold text-emerald-500">{canaryValue}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={canaryValue}
                  onChange={(e) => setCanaryValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Active Vehicles</span>
                  <span className="text-xs font-bold text-white">1,240</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Success Rate</span>
                  <span className="text-xs font-bold text-emerald-500">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">Avg. Download</span>
                  <span className="text-xs font-bold text-white">42 MB</span>
                </div>
              </div>
              <button className="w-full py-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl text-sm font-bold hover:bg-emerald-500 hover:text-black transition-all">
                Update Rollout
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              Health Alerts
            </h3>
            <div className="space-y-4">
              {[
                { msg: 'Minor latency spike in VIN-429', type: 'warning' },
                { msg: 'OTA Update complete for 840 vehicles', type: 'info' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-black/30 border border-white/5">
                  <AlertTriangle className={cn("w-4 h-4 shrink-0 mt-0.5", alert.type === 'warning' ? "text-yellow-500" : "text-blue-500")} />
                  <p className="text-[10px] text-zinc-400">{alert.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Dashboard */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                Live Fleet Telemetry
              </h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-400">VIN: ALL_CANARY</span>
                <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-400">REFRESH: 2S</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px]">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Speed Distribution (km/h)</h4>
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={telemetry}>
                      <defs>
                        <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area type="monotone" dataKey="speed" stroke="#10b981" fillOpacity={1} fill="url(#colorSpeed)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Battery Health Avg (%)</h4>
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={telemetry}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                        itemStyle={{ color: '#3b82f6' }}
                      />
                      <Line type="monotone" dataKey="battery" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Avg Speed', value: '52 km/h', icon: Gauge },
                { label: 'Active OTA', value: '124', icon: Zap },
                { label: 'Fleet Health', value: '98%', icon: Shield },
                { label: 'Data Rate', value: '1.2 GB/s', icon: Activity },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-black/30 border border-white/5">
                  <stat.icon className="w-4 h-4 text-emerald-500 mb-2" />
                  <p className="text-[10px] text-zinc-500 uppercase">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployMonitor;
