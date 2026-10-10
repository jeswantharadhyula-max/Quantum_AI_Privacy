import React from 'react';
import { AppSettings, DatasetItem, ModelOption, PageId } from '../types';
import { 
  Settings, 
  Palette, 
  Sliders, 
  Bell, 
  ShieldCheck, 
  RotateCcw, 
  Save, 
  Check, 
  Info,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';

interface SettingsViewProps {
  settings: AppSettings;
  datasets: DatasetItem[];
  models: ModelOption[];
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onSaveSettings: () => void;
  onResetSettings: () => void;
  onRestoreDefaults: () => void;
  onNavigate: (page: PageId) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  datasets,
  models,
  onUpdateSettings,
  onSaveSettings,
  onResetSettings,
  onRestoreDefaults
}) => {
  const themeAccents = [
    { id: 'cyan', label: 'Cyber Cyan (Default)', color: 'from-cyan-500 to-sky-400', border: 'border-cyan-400' },
    { id: 'purple', label: 'Neon Purple (Quantum)', color: 'from-purple-500 to-violet-400', border: 'border-purple-400' },
    { id: 'emerald', label: 'Quantum Emerald (Biotech)', color: 'from-emerald-500 to-teal-400', border: 'border-emerald-400' },
    { id: 'amber', label: 'Solar Amber (Experimental)', color: 'from-amber-500 to-orange-400', border: 'border-amber-400' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0a1022]/90 border border-cyan-500/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
              <Settings className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Workspace & UI Configuration Settings
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
              Local Browser Storage
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Customize visual themes, animation speed, default quantum circuits, and privacy simulation defaults.
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onRestoreDefaults}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Restore Defaults</span>
          </button>

          <button
            onClick={onSaveSettings}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Theme & Animation Settings (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Section 1: Appearance & Theme Accents */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Palette className="w-4 h-4 text-cyan-400" />
                Theme & Neon Accent Color
              </h3>
              <span className="text-xs font-mono text-cyan-400">Glow Palette</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {themeAccents.map((t) => {
                const isSelected = settings.themeAccent === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => onUpdateSettings({ themeAccent: t.id as any })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? `bg-slate-900/90 ${t.border} shadow-sm shadow-cyan-500/20`
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-tr ${t.color}`} />
                      <span className="text-xs font-semibold text-white">{t.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Animation & Performance Preferences */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Animation & Visual Effects
              </h3>
              <span className="text-xs font-mono text-slate-400">GPU Accelerated</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <h4 className="font-semibold text-white">Quantum Grid & Particle Backgrounds</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Render futuristic ambient glowing grid meshes</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.particleEffects}
                  onChange={(e) => onUpdateSettings({ particleEffects: e.target.checked })}
                  className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <h4 className="font-semibold text-white">Smooth Transitions & Micro-Interactions</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Enable smooth modal animations and card hover physics</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smoothAnimations}
                  onChange={(e) => onUpdateSettings({ smoothAnimations: e.target.checked })}
                  className="w-4 h-4 rounded accent-purple-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <h4 className="font-semibold text-white">Display Research Prototype Notice Banner</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Show persistent demo watermark in footer and top bar</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showDemoBanner}
                  onChange={(e) => onUpdateSettings({ showDemoBanner: e.target.checked })}
                  className="w-4 h-4 rounded accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Dashboard & Defaults (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Section 3: Default Analysis Presets */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Default Workflow Presets
              </h3>
              <span className="text-xs font-mono text-emerald-400">Startup Defaults</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Default Startup Dataset</label>
                <select
                  value={settings.defaultDataset}
                  onChange={(e) => onUpdateSettings({ defaultDataset: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {datasets.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Default Quantum Algorithm</label>
                <select
                  value={settings.defaultModel}
                  onChange={(e) => onUpdateSettings({ defaultModel: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Telemetry Refresh Rate</label>
                <select
                  value={settings.telemetrySpeed}
                  onChange={(e) => onUpdateSettings({ telemetrySpeed: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="fast">Fast (Every 1.5 seconds)</option>
                  <option value="normal">Normal (Every 3.0 seconds)</option>
                  <option value="slow">Eco / Battery Saver (Every 8.0 seconds)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Notifications & Privacy */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Bell className="w-4 h-4 text-sky-400" />
                Notification & Sound Alerts
              </h3>
              <span className="text-xs font-mono text-slate-400">Toasts</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <h4 className="font-semibold text-white">Audio Chime on Simulation Complete</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Play subtle audio notification upon finishing quantum kernel evaluation</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
                  className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between font-mono">
                  <span className="text-slate-300">Toast Alert Auto-Dismiss:</span>
                  <span className="text-cyan-300 font-bold">{settings.toastDuration / 1000}s</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="1000"
                  value={settings.toastDuration}
                  onChange={(e) => onUpdateSettings({ toastDuration: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Persistence Notice */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-mono text-[11px]">
          <strong>Client-Side Preferences:</strong> Settings are saved to your browser's local storage sandbox. No personal data, cookies, or remote server synchronization is utilized.
        </p>
      </div>

    </div>
  );
};
