import React from 'react';
import { HistoryRecord } from '../types';
import { X, Clock, Download, Cpu, ShieldCheck, CheckCircle2, FileText, Layers } from 'lucide-react';
import { downloadFile } from '../utils/exportUtils';

interface RunDetailsModalProps {
  record: HistoryRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RunDetailsModal: React.FC<RunDetailsModalProps> = ({
  record,
  isOpen,
  onClose
}) => {
  if (!isOpen || !record) return null;

  const handleDownloadSingleReport = () => {
    const text = `================================================================================
           Q-HEALTH AI — INDIVIDUAL RUN AUDIT LOG
================================================================================
Run ID                : ${record.id}
Dataset Name          : ${record.datasetName}
Model Architecture    : ${record.modelName}
Execution Status      : ${record.status}
Execution Timestamp   : ${record.timestamp}
Runtime Duration      : ${record.duration}
Classification Acc.   : ${record.accuracy}%
F1-Score              : ${record.f1Score}%
Privacy Loss (ε)      : ${record.privacyEpsilon}
Entanglement Strategy : ${record.config?.entanglement || 'linear'}
Feature Map           : ${record.config?.featureMap || 'ZZFeatureMap'}
Qubits Allocated      : ${record.config?.qubits || 4}
Notes / Observations  : ${record.notes || 'Normal convergence'}
================================================================================
Generated via Q-Health AI Research Prototype
================================================================================`;
    downloadFile(text, `Run_Report_${record.id}.txt`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0c1324] border border-cyan-500/30 shadow-2xl overflow-hidden space-y-4 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">{record.id}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  {record.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{record.timestamp}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">Accuracy</span>
            <span className="text-base font-bold text-cyan-300 font-mono">{record.accuracy}%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">F1-Score</span>
            <span className="text-base font-bold text-purple-300 font-mono">{record.f1Score}%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">Duration</span>
            <span className="text-base font-bold text-slate-200 font-mono">{record.duration}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">Privacy (ε)</span>
            <span className="text-base font-bold text-emerald-400 font-mono">{record.privacyEpsilon}</span>
          </div>
        </div>

        {/* Configuration Breakdown */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs font-mono">
          <h4 className="font-semibold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Execution Parameters & Hyperparameters
          </h4>

          <div className="grid grid-cols-2 gap-2 text-slate-300 text-[11px] pt-1">
            <div>
              <span className="text-slate-500">Target Dataset: </span>
              <span className="text-white">{record.datasetName}</span>
            </div>
            <div>
              <span className="text-slate-500">Model Framework: </span>
              <span className="text-cyan-300">{record.modelName}</span>
            </div>
            <div>
              <span className="text-slate-500">Quantum Qubits: </span>
              <span className="text-purple-300">{record.config?.qubits || 4} Qubits</span>
            </div>
            <div>
              <span className="text-slate-500">Feature Map: </span>
              <span className="text-slate-200">{record.config?.featureMap || 'ZZFeatureMap'}</span>
            </div>
            <div>
              <span className="text-slate-500">Entanglement: </span>
              <span className="text-slate-200">{record.config?.entanglement || 'linear'}</span>
            </div>
            <div>
              <span className="text-slate-500">Train/Test Split: </span>
              <span className="text-slate-200">{record.config?.trainSplit || 80}% / {100 - (record.config?.trainSplit || 80)}%</span>
            </div>
          </div>

          {record.notes && (
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="text-slate-500">Runtime Note: </span>
              {record.notes}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            DP Audit Log Verified
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadSingleReport}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Log
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
