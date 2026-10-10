import React, { useState } from 'react';
import { PageId } from '../types';
import { 
  Activity, 
  Atom, 
  Play, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  LayoutDashboard,
  Cpu,
  Database,
  Gauge,
  BarChart3,
  Clock,
  Settings,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onLaunchAnalysis: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onLaunchAnalysis
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analysis', label: 'AI Analysis', icon: <Cpu className="w-4 h-4" /> },
    { id: 'datasets', label: 'Dataset', icon: <Database className="w-4 h-4" /> },
    { id: 'evaluation', label: 'Model Evaluation', icon: <Gauge className="w-4 h-4" /> },
    { id: 'results', label: 'Results', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <Clock className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060913]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-button"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/30 border border-cyan-400/40 group-hover:border-cyan-400 transition-all duration-300 shadow-glow-cyan">
              <Atom className="w-6 h-6 text-cyan-400 animate-spin-slow" />
              <Activity className="w-3.5 h-3.5 text-purple-400 absolute animate-heartbeat" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent font-sans">
                  Q-HEALTH
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 font-mono">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">
                Quantum Healthcare
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{link.icon}</span>
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Status Pill */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-medium text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 text-[11px] font-mono">Simulated QPU</span>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1 text-cyan-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DP-ε Active</span>
              </div>
            </div>

            {/* Launch Analysis Button */}
            <button
              id="navbar-launch-analysis-btn"
              onClick={onLaunchAnalysis}
              className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-glow-cyan hover:shadow-glow-purple transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Play className="w-4 h-4 fill-white text-white" />
              <span className="relative font-bold">Launch Analysis</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-700/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0f1d]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Navigation Menu</span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
              Demo Version 1.0
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>{link.icon}</span>
                  {link.label}
                </button>
              );
            })}
            
            <button
              onClick={() => handleLinkClick('help')}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activePage === 'help'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              Help & Support
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Security: Differential Privacy</span>
            <span className="text-emerald-400">ε = 0.5 (Protected)</span>
          </div>
        </div>
      )}
    </header>
  );
};
