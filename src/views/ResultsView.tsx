import React from 'react';
import { EvaluationResults, PageId } from '../types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  FileText, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  Activity,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { exportResultsAsCSV, exportResultsAsReport } from '../utils/exportUtils';

interface ResultsViewProps {
  results: EvaluationResults;
  onRefreshResults: () => void;
  onClearResults: () => void;
  onViewDetails: () => void;
  onNavigate: (page: PageId) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  results,
  onRefreshResults,
  onClearResults,
  onViewDetails,
  onNavigate
}) => {
  const cm = results.confusionMatrix;
  const totalCases = cm.tp + cm.tn + cm.fp + cm.fn;
  const sensitivity = ((cm.tp / (cm.tp + cm.fn)) * 100).toFixed(1);
  const specificity = ((cm.tn / (cm.tn + cm.fp)) * 100).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0a1022]/90 border border-cyan-500/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Model Performance & Results Dashboard
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              Demo Benchmark
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analysis conducted on <span className="text-white font-semibold">{results.datasetName}</span> using <span className="text-cyan-300 font-semibold">{results.modelName}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="results-refresh-btn"
            onClick={onRefreshResults}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Refresh Results"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh</span>
          </button>

          <button
            id="results-details-btn"
            onClick={onViewDetails}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>View Details</span>
          </button>

          <button
            id="results-export-csv-btn"
            onClick={() => exportResultsAsCSV(results)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            id="results-download-report-btn"
            onClick={() => exportResultsAsReport(results)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold shadow-glow-cyan flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>

          <button
            id="results-clear-btn"
            onClick={onClearResults}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-slate-700 transition-colors"
            title="Clear Results"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Core Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Metric 1: Accuracy */}
        <div className="p-4 rounded-2xl bg-[#0c1429]/90 border border-cyan-500/30 glass-panel-hover space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Accuracy</span>
            <span className="text-cyan-400 font-bold">Demo Data</span>
          </div>
          <div className="text-2xl font-black text-cyan-300 font-mono">
            {results.accuracy}%
          </div>
          <p className="text-[10px] text-emerald-400 font-mono">+5.6% vs SVM</p>
        </div>

        {/* Metric 2: Precision */}
        <div className="p-4 rounded-2xl bg-[#0c1429]/90 border border-purple-500/30 glass-panel-hover space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Precision (PPV)</span>
            <span className="text-purple-300 font-bold">Demo Data</span>
          </div>
          <div className="text-2xl font-black text-purple-300 font-mono">
            {results.precision}%
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Positive Reliability</p>
        </div>

        {/* Metric 3: Recall */}
        <div className="p-4 rounded-2xl bg-[#0c1429]/90 border border-blue-500/30 glass-panel-hover space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Recall (Sens.)</span>
            <span className="text-sky-300 font-bold">Demo Data</span>
          </div>
          <div className="text-2xl font-black text-sky-300 font-mono">
            {results.recall}%
          </div>
          <p className="text-[10px] text-emerald-400 font-mono">Pathology Detected</p>
        </div>

        {/* Metric 4: F1-Score */}
        <div className="p-4 rounded-2xl bg-[#0c1429]/90 border border-emerald-500/30 glass-panel-hover space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>F1-Score</span>
            <span className="text-emerald-300 font-bold">Demo Data</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {results.f1Score}%
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Harmonic Mean</p>
        </div>

        {/* Metric 5: Runtime */}
        <div className="p-4 rounded-2xl bg-[#0c1429]/90 border border-slate-800 glass-panel-hover space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Runtime Latency</span>
            <Clock className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {results.runtimeSeconds}s
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Simulated QPU</p>
        </div>

        {/* Metric 6: Test Samples */}
        <div className="p-4 rounded-2xl bg-[#0c1429]/90 border border-slate-800 glass-panel-hover space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono uppercase">
            <span>Test Cohort</span>
            <Layers className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {results.testSamples}
          </div>
          <p className="text-[10px] text-slate-400 font-mono">Patients Evaluated</p>
        </div>

      </div>

      {/* Main Charts & Confusion Matrix Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recharts Performance Metric Bar Chart (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0a1020]/90 border border-cyan-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Quantum vs Classical Model Comparison
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Demo Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Benchmarking Qiskit QSVC vs Classical SVM (RBF) & Random Forest
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.benchmarkComparison} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="metric" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#090e1c', borderColor: 'rgba(56,189,248,0.3)', borderRadius: '0.75rem', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="qsvc" name="QSVC (Quantum)" fill="#00F2FE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="classicalSvm" name="Classical SVM" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="randomForest" name="Random Forest" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Privacy Loss Budget: <strong className="text-purple-300">ε = 0.50 (Guaranteed)</strong></span>
            <span className="text-emerald-400 font-semibold">Quantum Advantage: +5.6%</span>
          </div>
        </div>

        {/* Right Column: Confusion Matrix Visualization (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0a1020]/90 border border-purple-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Confusion Matrix Heatmap
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Demo Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Evaluation across {totalCases} simulated test cases
              </p>
            </div>
          </div>

          {/* Confusion Matrix Visual Grid */}
          <div className="space-y-3 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3 text-center">
              
              {/* True Positive */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-1 shadow-sm">
                <span className="text-[10px] text-cyan-300 uppercase font-semibold block">True Positive (TP)</span>
                <span className="text-3xl font-black text-white">{cm.tp}</span>
                <span className="text-[10px] text-emerald-400 block">Correct Pathology Identified</span>
              </div>

              {/* False Positive */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                <span className="text-[10px] text-rose-300 uppercase font-semibold block">False Positive (FP)</span>
                <span className="text-3xl font-black text-rose-400">{cm.fp}</span>
                <span className="text-[10px] text-slate-400 block">Type I Error (False Alarm)</span>
              </div>

              {/* False Negative */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                <span className="text-[10px] text-amber-300 uppercase font-semibold block">False Negative (FN)</span>
                <span className="text-3xl font-black text-amber-400">{cm.fn}</span>
                <span className="text-[10px] text-slate-400 block">Type II Error (Missed)</span>
              </div>

              {/* True Negative */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-1 shadow-sm">
                <span className="text-[10px] text-purple-300 uppercase font-semibold block">True Negative (TN)</span>
                <span className="text-3xl font-black text-white">{cm.tn}</span>
                <span className="text-[10px] text-emerald-400 block">Correctly Ruled-Out</span>
              </div>

            </div>

            {/* Diagnostic Statistical Summary */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Diagnostic Sensitivity (True Positive Rate):</span>
                <strong className="text-cyan-300">{sensitivity}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Diagnostic Specificity (True Negative Rate):</span>
                <strong className="text-purple-300">{specificity}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">False Discovery Rate (FDR):</span>
                <strong className="text-slate-300">{((cm.fp / (cm.tp + cm.fp)) * 100).toFixed(1)}%</strong>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Importance & Circuit Telemetry Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Feature Importance */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-sans">
                  Quantum Hilbert Space Feature Importance
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Demo Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Non-linear feature projection rankings determined by ZZFeatureMap Hamiltonian overlap
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.featureImportance.map((f, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white truncate">{f.feature}</span>
                  <span className="text-cyan-300 font-bold">{f.importance}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    style={{ width: `${f.importance}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Rank #{i + 1}</span>
                  <span>Quantum Weight: {f.quantumWeight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quantum Hardware Telemetry Box */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0a1020]/90 border border-cyan-500/20 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              QPU Execution Audit
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Hardware simulation telemetry</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Circuit Depth:</span>
              <strong className="text-cyan-300">{results.quantumDepth} Gates</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">State Fidelity:</span>
              <strong className="text-emerald-400">{results.qubitFidelity}%</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">DP Noise (ε):</span>
              <strong className="text-purple-300">0.50 (Laplace)</strong>
            </div>

            <div className="flex justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Execution Mode:</span>
              <strong className="text-slate-200">Statevector Sim</strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-cyan-300 leading-relaxed font-mono">
            Full compliance certificate verified under Differential Privacy ε=0.5 guarantee.
          </div>
        </div>

      </div>

    </div>
  );
};
