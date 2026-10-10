import React, { useState } from 'react';
import { ModelOption, AnalysisConfig, PageId } from '../types';
import { 
  Gauge, 
  Cpu, 
  Save, 
  RotateCcw, 
  Play, 
  Check, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  Info,
  CheckCircle2,
  Atom
} from 'lucide-react';

interface ModelEvaluationViewProps {
  models: ModelOption[];
  config: AnalysisConfig;
  onChangeConfig: (newConfig: Partial<AnalysisConfig>) => void;
  onResetConfig: () => void;
  onSaveConfig: () => void;
  onStartEvaluation: () => void;
  onNavigate: (page: PageId) => void;
}

export const ModelEvaluationView: React.FC<ModelEvaluationViewProps> = ({
  models,
  config,
  onChangeConfig,
  onResetConfig,
  onSaveConfig,
  onStartEvaluation
}) => {
  const [activeMetricTab, setActiveMetricTab] = useState<'all' | 'quantum'>('all');

  const selectedModel = models.find(m => m.id === config.modelId) || models[0];

  const availableMetrics = [
    { id: 'acc', label: 'Classification Accuracy', checked: true, desc: 'Overall correct predictions ratio' },
    { id: 'f1', label: 'Harmonic F1-Score', checked: true, desc: 'Balance of precision and recall' },
    { id: 'roc', label: 'ROC-AUC Diagnostic Curve', checked: true, desc: 'True positive vs false positive discrimination' },
    { id: 'prec', label: 'Positive Predictive Precision', checked: true, desc: 'Pathology positive confidence' },
    { id: 'rec', label: 'Clinical Sensitivity / Recall', checked: true, desc: 'Pathology detection rate' },
    { id: 'fid', label: 'Quantum State Fidelity (⟨ψ|φ⟩)', checked: true, desc: 'Statevector inner-product accuracy' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0a1022]/90 border border-cyan-500/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Gauge className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Model Evaluation & Hyperparameter Workbench
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
              Qiskit Aer Sim
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Fine-tune quantum circuit ansatz, kernel feature maps, regularization terms, and cross-validation protocols.
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="evaluation-reset-btn"
            onClick={onResetConfig}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
            <span>Reset</span>
          </button>

          <button
            id="evaluation-save-btn"
            onClick={onSaveConfig}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save Configuration</span>
          </button>

          <button
            id="evaluation-start-btn"
            onClick={onStartEvaluation}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-glow-purple transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-white text-white" />
            <span>Start Evaluation</span>
          </button>
        </div>
      </div>

      {/* Main Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Model & Hyperparameter Parameters (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Model Selection Dropdown & Cards */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Target Model Architecture
              </h3>
              <span className="text-xs font-mono text-slate-400">Select Architecture</span>
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
                        ? 'bg-purple-500/15 border-purple-400 shadow-md shadow-purple-500/20 cursor-pointer'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">{m.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{m.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] font-mono">
                      <span className="text-slate-400">{m.framework}</span>
                      <span className={`px-2 py-0.5 rounded font-semibold ${
                        isComingSoon ? 'bg-slate-800 text-amber-400' : isSelected ? 'bg-purple-950 text-purple-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {m.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Quantum Hyperparameter Controls */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Atom className="w-4 h-4 text-purple-400" />
                Quantum Feature Map & Circuit Topology
              </h3>
              <span className="text-xs font-mono text-cyan-300">Qiskit Parameterization</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Qubits count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Quantum Register Size (Qubits)</label>
                  <span className="text-xs font-mono font-bold text-cyan-400">{config.qubits} Qubits</span>
                </div>
                <select
                  value={config.qubits}
                  onChange={(e) => onChangeConfig({ qubits: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="2">2 Qubits (Fast Demo State)</option>
                  <option value="4">4 Qubits (Recommended Balanced)</option>
                  <option value="8">8 Qubits (Deep Biomarker State)</option>
                  <option value="16">16 Qubits (High-Dimensional Multi-omics)</option>
                </select>
                <p className="text-[10px] text-slate-400">Hilbert space dimension = 2^{config.qubits} = {Math.pow(2, config.qubits)} states.</p>
              </div>

              {/* Quantum Feature Map */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Feature Map Architecture</label>
                  <span className="text-xs font-mono font-bold text-purple-400">{config.featureMap}</span>
                </div>
                <select
                  value={config.featureMap}
                  onChange={(e) => onChangeConfig({ featureMap: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="ZZFeatureMap">ZZFeatureMap (Second-Order Non-Linear Exp)</option>
                  <option value="PauliFeatureMap">PauliFeatureMap (Generalized Pauli Operators)</option>
                  <option value="ZFeatureMap">ZFeatureMap (First-Order Diagonal)</option>
                </select>
                <p className="text-[10px] text-slate-400">Parameterizes non-linear biomarker correlations.</p>
              </div>

              {/* Entanglement topology */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">Entanglement Topology</label>
                  <span className="text-xs font-mono font-bold text-emerald-400">{config.entanglement.toUpperCase()}</span>
                </div>
                <select
                  value={config.entanglement}
                  onChange={(e) => onChangeConfig({ entanglement: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="linear">Linear (Nearest Neighbor CNOTs)</option>
                  <option value="full">Full (All-to-All Entanglement)</option>
                  <option value="circular">Circular (Periodic Boundary Entanglement)</option>
                </select>
                <p className="text-[10px] text-slate-400">Controls inter-qubit correlation network.</p>
              </div>

              {/* Regularization C */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">SVM Regularization Parameter (C)</label>
                  <span className="text-xs font-mono font-bold text-sky-400">{config.cRegularization}</span>
                </div>
                <select
                  value={config.cRegularization}
                  onChange={(e) => onChangeConfig({ cRegularization: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="0.1">C = 0.1 (Soft Margin, High Tolerance)</option>
                  <option value="1.0">C = 1.0 (Standard Regularization)</option>
                  <option value="5.0">C = 5.0 (Strict Margin Penalty)</option>
                  <option value="10.0">C = 10.0 (Hard Margin Separation)</option>
                </select>
                <p className="text-[10px] text-slate-400">Penalty parameter for patient classification errors.</p>
              </div>

            </div>
          </div>

          {/* Section 3: Evaluation Protocol & Metrics */}
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Validation Protocol & Active Metrics
              </h3>
              <span className="text-xs font-mono text-emerald-400">5-Fold Stratified CV</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableMetrics.map((metric) => (
                <div key={metric.id} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{metric.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{metric.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Configuration Summary Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-purple-500/30 shadow-xl space-y-5 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Model Config Summary
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Preset Active
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Model Name</span>
                <p className="font-bold text-cyan-300">{selectedModel.shortName}</p>
                <p className="text-[11px] text-slate-400">{selectedModel.framework}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Quantum Circuit Specs</span>
                <div className="flex justify-between text-[11px]">
                  <span>Allocated Qubits:</span>
                  <span className="text-white font-bold">{config.qubits} Qubits</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Feature Map:</span>
                  <span className="text-purple-300">{config.featureMap}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Entanglement:</span>
                  <span className="text-emerald-300">{config.entanglement}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Regularization C:</span>
                  <span className="text-sky-300">{config.cRegularization}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase">Validation Parameters</span>
                <div className="flex justify-between text-[11px]">
                  <span>Cross-Validation:</span>
                  <span className="text-white">5 Folds (Stratified)</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Noise Model:</span>
                  <span className="text-slate-300">Thermal Relaxation</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onStartEvaluation}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-sky-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-purple transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.01]"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Start Model Evaluation</span>
              </button>

              <button
                onClick={onSaveConfig}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save to Local Profile</span>
              </button>
            </div>

            <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
              Demonstration state will synthesize evaluation metrics across all configured folds.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
