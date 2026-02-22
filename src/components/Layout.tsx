import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  BookOpen, 
  Mail,
  ChevronRight,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Pipeline', path: '/pipeline', icon: Activity },
  { name: 'Requirements', path: '/pipeline/requirements', icon: FileText },
  { name: 'GenAI Engine', path: '/pipeline/genai', icon: Cpu },
  { name: 'Build & Validate', path: '/pipeline/build', icon: ShieldCheck },
  { name: 'Deploy & Monitor', path: '/pipeline/deploy', icon: LayoutDashboard },
  { name: 'Use Cases', path: '/use-cases/vehicle-health', icon: Zap },
  { name: 'Docs', path: '/docs', icon: BookOpen },
  { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-black font-bold">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-white">AutoForge <span className="text-emerald-500">Nexus</span></span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path 
                      ? "bg-emerald-500/10 text-emerald-500" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/pipeline/requirements"
                className="ml-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
              >
                Try Live Demo
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    location.pathname === item.path 
                      ? "bg-emerald-500/10 text-emerald-500" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => (
  <footer className="border-t border-white/10 bg-black py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-black font-bold text-sm">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AutoForge Nexus</span>
          </Link>
          <p className="mt-4 text-sm text-zinc-400 max-w-xs">
            The GenAI-powered pipeline for compliant, deployable SDV services. Turn requirements into road-ready code.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Platform</h3>
          <ul className="mt-4 space-y-2">
            {navItems.slice(0, 4).map(item => (
              <li key={item.name}>
                <Link to={item.path} className="text-sm text-zinc-400 hover:text-emerald-500">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
          <ul className="mt-4 space-y-2">
            <li><Link to="/about" className="text-sm text-zinc-400 hover:text-emerald-500">About</Link></li>
            <li><Link to="/contact" className="text-sm text-zinc-400 hover:text-emerald-500">Contact</Link></li>
            <li><Link to="/compliance" className="text-sm text-zinc-400 hover:text-emerald-500">Compliance</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs text-zinc-500">© 2026 AutoForge Nexus. All rights reserved.</p>
        <div className="mt-4 flex space-x-6 md:mt-0">
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">GitHub</a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
);
