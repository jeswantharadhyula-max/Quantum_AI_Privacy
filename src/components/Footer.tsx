import React from 'react';
import { PageId } from '../types';
import { Atom, ShieldCheck, ExternalLink, Activity, Info } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#050811] border-t border-cyan-500/15 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-auto select-none">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Disclaimer Banner */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-purple-300">
            <Info className="w-4 h-4 shrink-0 text-purple-400" />
            <span>
              <strong className="font-semibold text-white">Research & Educational Demonstration Only:</strong> Simulated metrics, charts, and quantum statevectors are labeled demo data.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/40 text-[11px] font-mono text-purple-300">
              Version: Frontend Prototype 1.0
            </span>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-2">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40">
                <Atom className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-base font-bold text-white font-sans">
                Q-Health AI
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Quantum ML
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A futuristic privacy-preserving quantum healthcare AI research workspace. Designed to demonstrate quantum kernel classification (Qiskit QSVC) applied to high-dimensional biomedical biomarker discovery with differential privacy guarantees.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Differential Privacy (DP-ε)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                Qiskit Statevector QPU
              </span>
              <span>•</span>
              <span>IBM Quantum Ready</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-300 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-cyan-300 transition-colors">
                  Live Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analysis')} className="hover:text-cyan-300 transition-colors">
                  Interactive AI Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('datasets')} className="hover:text-cyan-300 transition-colors">
                  Dataset Manager
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('evaluation')} className="hover:text-cyan-300 transition-colors">
                  Model Evaluation Workbench
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-cyan-300 transition-colors">
                  Results Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Technology & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              Technology Stack
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>IBM Qiskit SDK</span>
                <span className="text-[10px] font-mono text-cyan-400">v1.2.0</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Quantum Kernel</span>
                <span className="text-[10px] font-mono text-purple-300">ZZFeatureMap</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Differential Privacy</span>
                <span className="text-[10px] font-mono text-emerald-400">ε = 0.5</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Framework</span>
                <span className="text-[10px] font-mono text-slate-300">React + TS + Tailwind</span>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => onNavigate('help')} 
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs font-medium"
                >
                  <span>Read Technology FAQ</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Q-Health AI Project. Built for healthcare quantum research simulation.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('settings')} className="hover:text-slate-200 transition-colors">
              Settings & Themes
            </button>
            <button onClick={() => onNavigate('help')} className="hover:text-slate-200 transition-colors">
              Help Documentation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
