import React, { useState } from 'react';
import { 
  DatasetItem, 
  ModelOption, 
  AnalysisConfig, 
  PageId 
} from '../types';
import { 
  Cpu, 
  Database, 
  Play, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Sliders, 
  Upload, 
  Info, 
  HelpCircle, 
  CheckCircle, 
  Sparkles, 
  Atom, 
  Layers, 
  Zap,
  Check
} from 'lucide-react';

interface AnalysisViewProps {
  datasets: DatasetItem[];
  models: ModelOption[];
  activeDatasetId: string;
  onSelectDataset: (id: string) => void;
  config: AnalysisConfig;
  onChangeConfig: (newConfig: Partial<AnalysisConfig>) => void;
  onResetConfig: () => void;
  onRunAnalysis: () => void;
  onOpenUploadModal: () => void;
  onPreviewDataset: (dataset: DatasetItem) => void;
  onNavigate: (page: PageId) => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  datasets,
  models,
  activeDatasetId,
  onSelectDataset,
  config,
  onChangeConfig,
  onResetConfig,
  onRunAnalysis,
  onOpenUploadModal,
  onPreviewDataset
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'circuit'>('config');

  const selectedDataset = datasets.find(d => d.id === activeDatasetId) || datasets[0];
  const selectedModel = models.find(m => m.id === config.modelId) || models[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0b1329] via-[#0e1736] to-[#141133] border border-cyan-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Interactive AI Analysis Workbench
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              Quantum Kernel
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Configure Hilbert-space quantum feature mapping, differential privacy noise, and training partitions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="analysis-preview-btn"
            onClick={() => onPreviewDataset(selectedDataset)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Preview Dataset</span>
          </button>

          <button
            id="analysis-reset-btn"
            onClick={onResetConfig}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
            <span>Reset Settings</span>
          </button>

          <button
            id="analysis-run-btn"
            onClick={onRunAnalysis}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-glow-cyan transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            <span>Run Analysis</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Settings & Right Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Dataset Selection Section */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold font-mono">1</span>
                <h3 className="text-base font-bold text-white font-sans">
                  Dataset Selection
                </h3>
              </div>
              <button
                onClick={onOpenUploadModal}
                className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom CSV</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {datasets.map((d) => {
                const isSelected = d.id === activeDatasetId;
                return (
                  <div
                    key={d.id}
                    onClick={() => onSelectDataset(d.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white font-sans">{d.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 mt-1 inline-block">
                          {d.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">{d.size}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>{d.rows.toLocaleString()} Patients</span>
                      <span>{d.features} Biomarkers</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Model Selection Section */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold font-mono">2</span>
                <h3 className="text-base font-bold text-white font-sans">
                  Model Selection & Kernel Architecture
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Qiskit & Classical</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {models.map((m) => {
                const isSelected = m.id === config.modelId;
                const isComingSoon = m.status === 'coming_soon';

                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      if (!isComingSoon) {
                        onChangeConfig({ modelId: m.id });
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                      isComingSoon
                        ? 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-purple-500/10 border-purple-400 shadow-md shadow-purple-500/20 cursor-pointer'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white font-sans">{m.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{m.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-400">{m.framework}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          isComingSoon
                            ? 'bg-slate-800 text-amber-400 border border-amber-800/40'
                            : isSelected
                            ? 'bg-purple-950 text-purple-300 border border-purple-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {m.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Preprocessing & Privacy Settings */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">3</span>
                <h3 className="text-base font-bold text-white font-sans">
                  Preprocessing & Privacy Controls
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Configurable Parameters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Feature Scaling */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <span>Feature Scaling Technique</span>
                  </label>
                  <span className="text-[11px] font-mono text-cyan-400">{config.scaling.toUpperCase()}</span>
                </div>
                <select
                  value={config.scaling}
                  onChange={(e) => onChangeConfig({ scaling: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="angle_embed">Quantum Angle Embedding (ArcCosine Projection)</option>
                  <option value="standard">StandardScaler (Zero-Mean, Unit Variance)</option>
                  <option value="minmax">MinMaxScaler [0, π] Range</option>
                  <option value="robust">RobustScaler (Median & IQR Resistant)</option>
                </select>
                <p className="text-[10px] text-slate-400">Normalizes biomedical features prior to qubit phase rotation.</p>
              </div>

              {/* Missing Values Handling */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Missing-Value Strategy</label>
                  <span className="text-[11px] font-mono text-purple-400">{config.missingHandling.toUpperCase()}</span>
                </div>
                <select
                  value={config.missingHandling}
                  onChange={(e) => onChangeConfig({ missingHandling: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="knn">KNN Imputation (k=5 Patient Neighbors)</option>
                  <option value="median">Median Imputation (Outlier Robust)</option>
                  <option value="mean">Mean Imputation</option>
                  <option value="drop">Drop Incomplete Patient Rows</option>
                </select>
                <p className="text-[10px] text-slate-400">Addresses unrecorded clinical lab values or sensors.</p>
              </div>

              {/* Train/Test Split Percentage */}
              <div className="space-y-2 sm:col-span-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Training / Testing Split Partition:</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    {config.trainSplit}% Train / {100 - config.trainSplit}% Test
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={config.trainSplit}
                  onChange={(e) => onChangeConfig({ trainSplit: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>50% (Balanced)</span>
                  <span>75% (Standard)</span>
                  <span>80% (Recommended)</span>
                  <span>90% (Max Data)</span>
                </div>
              </div>

              {/* Differential Privacy Epsilon Setting */}
              <div className="space-y-3 sm:col-span-2 p-4 rounded-2xl bg-[#0e162b] border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Differential Privacy (DP-ε) Masking</h4>
                      <p className="text-[10px] text-slate-400">Injects calibrated Laplacian noise to prevent patient identification</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onChangeConfig({ dpEnabled: !config.dpEnabled })}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all ${
                      config.dpEnabled
                        ? 'bg-purple-600 text-white shadow-glow-purple'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {config.dpEnabled ? 'ACTIVE (ε Guarded)' : 'DISABLED'}
                  </button>
                </div>

                {config.dpEnabled && (
                  <div className="space-y-2 pt-2 border-t border-purple-900/40">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Privacy Loss Budget Epsilon (ε):</span>
                      <span className="text-purple-300 font-bold">{config.epsilon.toFixed(2)} (High Privacy)</span>
                    </div>
                    <input
                      type="range"
                      min="0.10"
                      max="2.00"
                      step="0.05"
                      value={config.epsilon}
                      onChange={(e) => onChangeConfig({ epsilon: Number(e.target.value) })}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>ε=0.1 (Strict Privacy)</span>
                      <span>ε=0.5 (Balanced Health Standard)</span>
                      <span>ε=2.0 (High Utility)</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Live Configuration Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-cyan-500/30 shadow-xl space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-sans uppercase tracking-wider">
                  Analysis Pipeline Summary
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Ready
              </span>
            </div>

            {/* Summary Item List */}
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Selected Dataset</span>
                <p className="font-bold text-white truncate">{selectedDataset.name}</p>
                <p className="text-[11px] text-cyan-300">
                  {selectedDataset.rows.toLocaleString()} Rows • {selectedDataset.features} Biomarkers
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Model Algorithm</span>
                <p className="font-bold text-purple-300">{selectedModel.shortName}</p>
                <p className="text-[11px] text-slate-400">{selectedModel.framework}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Quantum Topology</span>
                <div className="flex justify-between text-[11px]">
                  <span>Qubits:</span>
                  <span className="text-white font-bold">{config.qubits} Qubits</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Feature Map:</span>
                  <span className="text-cyan-300">{config.featureMap}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Entanglement:</span>
                  <span className="text-purple-300">{config.entanglement}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Privacy & Splits</span>
                <div className="flex justify-between text-[11px]">
                  <span>Differential Privacy:</span>
                  <span className={config.dpEnabled ? 'text-emerald-400' : 'text-slate-400'}>
                    {config.dpEnabled ? `ε = ${config.epsilon.toFixed(2)}` : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Train Ratio:</span>
                  <span className="text-white">{config.trainSplit}%</span>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <button
              onClick={onRunAnalysis}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-glow-cyan hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01]"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Execute Quantum Pipeline</span>
            </button>

            <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
              Demonstration run simulates full quantum statevector transformation in browser memory.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
