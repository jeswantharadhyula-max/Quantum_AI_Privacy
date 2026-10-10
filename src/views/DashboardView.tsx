import React, { useState } from 'react';
import { PageId, EvaluationResults, DatasetItem, ModelOption } from '../types';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  LayoutDashboard, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Radio, 
  Zap, 
  TrendingUp, 
  Sliders, 
  RefreshCw,
  Play,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (page: PageId) => void;
  onLaunchAnalysis: () => void;
  results: EvaluationResults;
  activeDataset: DatasetItem;
  activeModel: ModelOption;
  onRefreshTelemetry: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onLaunchAnalysis,
  results,
  activeDataset,
  activeModel,
  onRefreshTelemetry
}) => {
  const [phaseTheta, setPhaseTheta] = useState(45);
  const [phasePhi, setPhasePhi] = useState(90);

  // Derived quantum state representation
  const prob0 = Math.cos((phaseTheta * Math.PI) / 360) ** 2;
  const prob1 = Math.sin((phaseTheta * Math.PI) / 360) ** 2;

  const radarData = [
    { category: 'Sensitivity', qsvc: 96, classical: 88, fullMark: 100 },
    { category: 'Specificity', qsvc: 94, classical: 90, fullMark: 100 },
    { category: 'Privacy Preservation', qsvc: 98, classical: 65, fullMark: 100 },
    { category: 'Multi-omics Scale', qsvc: 92, classical: 78, fullMark: 100 },
    { category: 'Non-linear Bound', qsvc: 95, classical: 82, fullMark: 100 },
    { category: 'Noise Tolerance', qsvc: 89, classical: 85, fullMark: 100 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0a1022]/90 border border-cyan-500/25 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Quantum Healthcare Telemetry Dashboard
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              Live Demo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time monitoring of quantum kernel statevectors, noise bounds, and biomarker classification metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshTelemetry}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-2 transition-colors"
            title="Refresh Telemetry Metrics"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh State</span>
          </button>

          <button
            onClick={onLaunchAnalysis}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-xs shadow-glow-cyan flex items-center gap-2 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>Run New Model</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#0c1429]/90 border border-cyan-500/25 glass-panel-hover space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Kernel Accuracy</span>
            <span className="text-[10px] text-emerald-400 font-semibold">+5.6% vs SVM</span>
          </div>
          <div className="text-3xl font-black text-cyan-300 font-mono tracking-tight">
            {results.accuracy}%
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Model:</span>
            <span className="text-slate-200">Qiskit QSVC</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1429]/90 border border-purple-500/25 glass-panel-hover space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Privacy Loss (ε)</span>
            <span className="text-[10px] text-purple-300 font-semibold">Strict Privacy</span>
          </div>
          <div className="text-3xl font-black text-purple-300 font-mono tracking-tight">
            0.50
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Mechanism:</span>
            <span className="text-emerald-400">Laplace Noise</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1429]/90 border border-blue-500/25 glass-panel-hover space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Quantum Depth</span>
            <span className="text-[10px] text-blue-300 font-semibold">4 Qubits</span>
          </div>
          <div className="text-3xl font-black text-sky-300 font-mono tracking-tight">
            18 <span className="text-sm font-normal text-slate-400">Gates</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Entanglement:</span>
            <span className="text-slate-200">Linear CNOT</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1429]/90 border border-emerald-500/25 glass-panel-hover space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>State Fidelity</span>
            <span className="text-[10px] text-emerald-300 font-semibold">Simulated QPU</span>
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
            99.4%
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Thermal Noise:</span>
            <span className="text-slate-200">0.06%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1429]/90 border border-slate-800 glass-panel-hover space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
            <span>Analyzed Cohort</span>
            <span className="text-[10px] text-slate-300 font-semibold">Active Dataset</span>
          </div>
          <div className="text-3xl font-black text-white font-mono tracking-tight">
            {activeDataset.rows.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span>Features:</span>
            <span className="text-cyan-300">{activeDataset.features} Dim</span>
          </div>
        </div>

      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Loss & Convergence Curve */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0a1020]/90 border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Quantum Kernel vs Classical SVM Convergence
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Demo Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Optimization loss trajectory across training iterations on {activeDataset.name}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> QSVC Loss
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> SVM (RBF)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.convergenceData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="iteration" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} label={{ value: 'Epoch / Iteration', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 1]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(56,189,248,0.3)', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="qsvcLoss" name="QSVC Quantum Loss" stroke="#00F2FE" strokeWidth={3} dot={{ fill: '#00F2FE', r: 4 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="svmLoss" name="Classical SVM Loss" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#a855f7', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Final QSVC Quantum Loss: <strong className="text-cyan-300">0.110</strong></span>
            <span>Final Classical SVM Loss: <strong className="text-purple-300">0.310</strong></span>
            <span className="text-emerald-400 font-semibold">Quantum Advantage Margin: +18.2%</span>
          </div>
        </div>

        {/* Chart 2: Radar Metric Breakdown */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0a1020]/90 border border-purple-500/20 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-sans">
                Diagnostic Capability Radar
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Demo Data
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Multi-dimensional fidelity comparison</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={false} />
                <Radar name="QSVC Quantum" dataKey="qsvc" stroke="#00F2FE" fill="#00F2FE" fillOpacity={0.4} />
                <Radar name="Classical SVM" dataKey="classical" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(168,85,247,0.4)', borderRadius: '0.75rem', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] font-mono text-slate-400 text-center">
            Higher area indicates superior non-linear biomarker separation.
          </div>
        </div>

      </div>

      {/* Interactive Bloch Sphere & Quantum State Angle Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive State Control */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0a1020]/90 border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white font-sans">
                Interactive Quantum State Phase Simulator
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-300">Single Qubit |ψ⟩</span>
          </div>

          <p className="text-xs text-slate-400">
            Adjust the polar angle (θ) and azimuthal angle (φ) to simulate qubit superposition state vector mapping for patient biomarker encoding:
          </p>

          <div className="space-y-4 font-mono text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">Polar Angle θ (Superposition):</span>
                <span className="text-cyan-300 font-bold">{phaseTheta}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={phaseTheta}
                onChange={(e) => setPhaseTheta(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-300">Azimuthal Angle φ (Quantum Phase):</span>
                <span className="text-purple-300 font-bold">{phasePhi}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={phasePhi}
                onChange={(e) => setPhasePhi(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>
          </div>

          {/* Computed State Matrix */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-slate-400">
              State Vector Formula: <span className="text-cyan-300 font-semibold">|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">P(State |0⟩)</span>
                <span className="text-sm font-bold text-cyan-300">{(prob0 * 100).toFixed(1)}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">P(State |1⟩)</span>
                <span className="text-sm font-bold text-purple-300">{(prob1 * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Importance Distribution */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Quantum Hilbert Feature Importance
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Demo Data
                </span>
              </div>
              <p className="text-xs text-slate-400">Relative biomarker weights in ZZFeatureMap</p>
            </div>
            <button 
              onClick={() => onNavigate('results')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Full Results →
            </button>
          </div>

          <div className="space-y-3">
            {results.featureImportance.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">{item.feature}</span>
                  <span className="text-cyan-300 font-bold">{item.importance}/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                    style={{ width: `${item.importance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/30 flex items-center gap-2 text-[11px] text-purple-300">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Biomarker entanglement reveals non-linear risk factors concealed in classical SVM space.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
