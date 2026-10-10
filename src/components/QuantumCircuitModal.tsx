import React, { useEffect, useState } from 'react';
import { AnalysisConfig, DatasetItem, ModelOption } from '../types';
import { Atom, ShieldCheck, CheckCircle2, X, Cpu, Activity, Zap } from 'lucide-react';

interface QuantumCircuitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  config: AnalysisConfig;
  dataset: DatasetItem;
  model: ModelOption;
}

interface StepInfo {
  title: string;
  detail: string;
  duration: number; // ms
}

export const QuantumCircuitModal: React.FC<QuantumCircuitModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  config,
  dataset,
  model
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [qubitPhases, setQubitPhases] = useState([0.2, 0.45, 0.78, 0.92]);

  const steps: StepInfo[] = [
    {
      title: 'Classical Preprocessing & Differential Privacy Injection',
      detail: `Applying ${config.scaling} normalization and DP Laplace noise calibration (ε = ${config.epsilon.toFixed(2)}).`,
      duration: 1000
    },
    {
      title: `Quantum Statevector Encoding (${config.featureMap})`,
      detail: `Mapping ${dataset.features} biomarker parameters into ${config.qubits}-Qubit Hilbert space via ${config.entanglement} entanglement gates.`,
      duration: 1200
    },
    {
      title: 'Quantum Kernel Matrix Inner-Product Evaluation',
      detail: 'Simulating unitary evolution and computing quantum overlap metric ⟨ψ(x)|ψ(x\')⟩ across patient cohort.',
      duration: 1400
    },
    {
      title: 'Dual Quadratic Program Convex Optimization (QSVC)',
      detail: `Optimizing hyperplanes with regularization C = ${config.cRegularization}. Support vectors identified.`,
      duration: 1100
    },
    {
      title: 'Validating Quantum Fidelity & Metric Synthesis',
      detail: 'Synthesizing confusion matrix, precision/recall curves, and privacy audit certificates.',
      duration: 800
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setProgressPercent(0);
      return;
    }

    let isCancelled = false;
    let currentStep = 0;

    // Phase animation interval
    const phaseInterval = setInterval(() => {
      setQubitPhases(prev => prev.map(p => (p + 0.15) % 3.14));
    }, 150);

    const runSimulationSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        if (isCancelled) break;
        setCurrentStepIndex(i);
        
        const stepDuration = steps[i].duration;
        const subSteps = 20;
        const subDuration = stepDuration / subSteps;
        const baseProgress = (i / steps.length) * 100;
        const stepProgressFraction = 100 / steps.length;

        for (let j = 0; j < subSteps; j++) {
          if (isCancelled) break;
          await new Promise(r => setTimeout(r, subDuration));
          setProgressPercent(baseProgress + (j / subSteps) * stepProgressFraction);
        }
      }

      if (!isCancelled) {
        setProgressPercent(100);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    runSimulationSteps();

    return () => {
      isCancelled = true;
      clearInterval(phaseInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090e1c] border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden space-y-5 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/30 border border-cyan-400/40">
              <Atom className="w-6 h-6 text-cyan-400 animate-spin-slow" />
              <Activity className="w-3.5 h-3.5 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-sans">
                  Quantum Analysis Execution Pipeline
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse">
                  UI Simulation
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {model.shortName} • {dataset.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Cancel Analysis"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Quantum Circuit Visualizer */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-900 pb-2">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Cpu className="w-4 h-4" />
              Simulated Statevector ({config.qubits} Qubits)
            </span>
            <span className="text-purple-300">Feature Map: {config.featureMap}</span>
          </div>

          {/* Qubit Wires */}
          <div className="space-y-2 py-1">
            {Array.from({ length: config.qubits }).map((_, qubitIdx) => (
              <div key={qubitIdx} className="flex items-center gap-2 text-xs">
                <span className="w-7 text-cyan-400 font-bold shrink-0">q[{qubitIdx}]</span>
                <div className="relative flex-1 h-5 flex items-center">
                  <div className="w-full h-0.5 bg-slate-700"></div>
                  
                  {/* Gates on Wire */}
                  <div className="absolute left-4 px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-400/50 text-[10px] text-cyan-300 font-bold shadow-sm">
                    H
                  </div>

                  <div className="absolute left-16 px-2 py-0.5 rounded bg-purple-950/90 border border-purple-400/50 text-[10px] text-purple-300 font-bold shadow-sm">
                    Rz(θ_{qubitIdx})
                  </div>

                  <div className="absolute left-32 px-1.5 py-0.5 rounded bg-blue-950/90 border border-blue-400/50 text-[10px] text-blue-300 font-bold">
                    ZZ({qubitPhases[qubitIdx % qubitPhases.length].toFixed(2)})
                  </div>

                  <div className="absolute right-8 flex items-center gap-1 text-[10px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>|ψ_{qubitIdx}⟩</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Zap className="w-3.5 h-3.5" /> Entanglement: {config.entanglement.toUpperCase()}
            </span>
            <span className="text-cyan-400">Circuit Depth: 18 Gates</span>
            <span className="text-purple-400">DP Noise: ε = {config.epsilon.toFixed(2)}</span>
          </div>
        </div>

        {/* Pipeline Steps List */}
        <div className="space-y-2.5">
          {steps.map((step, idx) => {
            const isFinished = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : isFinished
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-80'
                    : 'bg-slate-950/40 border-slate-900 opacity-40'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-800" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-semibold ${isCurrent ? 'text-cyan-300' : 'text-slate-200'}`}>
                    Step {idx + 1}: {step.title}
                  </h4>
                  {isCurrent && (
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono animate-in fade-in">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar & Footer Controls */}
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Execution Progress</span>
              <span className="text-cyan-300 font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500 transition-all duration-150 shadow-glow-cyan"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Differential Privacy Budget Secured</span>
            </div>

            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 border border-slate-800 transition-colors"
            >
              Cancel Execution
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
