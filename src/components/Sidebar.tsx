import React from 'react';
import { PageId } from '../types';
import {
  Sparkles,
  LayoutDashboard,
  Cpu,
  Database,
  Gauge,
  BarChart3,
  Clock,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Radio,
  Layers
} from 'lucide-react';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  historyCount?: number;
  datasetsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  historyCount = 6,
  datasetsCount = 5
}) => {
  const menuItems: {
    id: PageId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    color: string;
  }[] = [
    { id: 'home', label: 'Home', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-sky-400' },
    { id: 'analysis', label: 'AI Analysis', icon: Cpu, badge: 'QPU', color: 'text-purple-400' },
    { id: 'datasets', label: 'Dataset Manager', icon: Database, badge: datasetsCount, color: 'text-emerald-400' },
    { id: 'evaluation', label: 'Model Evaluation', icon: Gauge, color: 'text-amber-400' },
    { id: 'results', label: 'Results Dashboard', icon: BarChart3, badge: '94.8%', color: 'text-cyan-300' },
    { id: 'history', label: 'Analysis History', icon: Clock, badge: historyCount, color: 'text-indigo-400' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-slate-400' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'text-rose-400' }
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col justify-between bg-[#080d1c]/90 backdrop-blur-xl border-r border-cyan-500/15 transition-all duration-300 z-30 shrink-0 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      aria-label="Sidebar Navigation"
    >
      {/* Top Header / Collapse Bar */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
                RESEARCH WORKSPACE
              </span>
            </div>
          )}
          <button
            id="sidebar-collapse-toggle-btn"
            onClick={onToggleCollapse}
            className={`p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 border border-slate-700/50 transition-colors ${
              collapsed ? 'mx-auto' : ''
            }`}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1.5" aria-label="Sidebar Menu">
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-transparent text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-glow-cyan" />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? item.color : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!collapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Quantum Telemetry Widget */}
      <div className="p-3 border-t border-slate-800/80">
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-medium">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>QPU State</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                4 Qubits Sim
              </span>
            </div>

            <div className="space-y-1 text-[11px] font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Kernel Map:</span>
                <span className="text-slate-200">ZZFeatureMap</span>
              </div>
              <div className="flex justify-between">
                <span>DP Noise (ε):</span>
                <span className="text-purple-300">0.50</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" />
                Qiskit 1.2
              </span>
              <span className="text-emerald-400 font-medium">Fidelity: 99.4%</span>
            </div>
          </div>
        ) : (
          <div 
            onClick={onToggleCollapse}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-cyan-400 hover:text-white cursor-pointer"
            title="Quantum Telemetry Online (4 Qubits)"
          >
            <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
            <span className="text-[9px] font-mono mt-1 text-slate-400">QPU</span>
          </div>
        )}
      </div>
    </aside>
  );
};
