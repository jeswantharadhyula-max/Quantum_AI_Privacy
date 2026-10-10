import React, { useState } from 'react';
import { HistoryRecord, PageId } from '../types';
import { 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  FileSpreadsheet, 
  CheckCircle2, 
  ShieldCheck, 
  Info,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { exportHistoryCSV, downloadFile } from '../utils/exportUtils';

interface HistoryViewProps {
  history: HistoryRecord[];
  onViewRecordDetails: (record: HistoryRecord) => void;
  onRequestDeleteRecord: (record: HistoryRecord) => void;
  onRequestClearHistory: () => void;
  onNavigate: (page: PageId) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onViewRecordDetails,
  onRequestDeleteRecord,
  onRequestClearHistory,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.datasetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.modelName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDownloadSingleReport = (record: HistoryRecord) => {
    const reportText = `================================================================================
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
    downloadFile(reportText, `QHealth_Run_${record.id}.txt`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0a1022]/90 border border-cyan-500/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Analysis Run History & Audit Log
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
              {history.length} Runs Logged
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse local execution records, performance benchmarks, and differential privacy compliance audits.
          </p>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportHistoryCSV(history)}
            disabled={history.length === 0}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export History CSV</span>
          </button>

          <button
            onClick={onRequestClearHistory}
            disabled={history.length === 0}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 text-xs font-semibold border border-slate-700 hover:border-rose-700/50 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a1020]/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search run ID, dataset, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {['All', 'Completed', 'Simulated'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-3">
          <Clock className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No history records found</h3>
          <p className="text-xs text-slate-400">Run a new analysis from the AI Analysis workbench to populate the audit log.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#0a1020]/90 shadow-xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0e162b] text-slate-300 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5 font-semibold text-cyan-300">Analysis ID</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Dataset</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Model Framework</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Timestamp</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Status</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Accuracy</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Privacy (ε)</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Duration</th>
                <th className="px-5 py-3.5 text-right font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-cyan-300 font-mono">{item.id}</span>
                  </td>
                  <td className="px-4 py-3.5 font-sans font-semibold text-white">
                    {item.datasetName}
                  </td>
                  <td className="px-4 py-3.5 text-purple-300">
                    {item.modelName}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px]">
                    {item.timestamp}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-semibold text-[10px]">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-white">
                    {item.accuracy}%
                  </td>
                  <td className="px-4 py-3.5 text-emerald-400">
                    ε={item.privacyEpsilon}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono">
                    {item.duration}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewRecordDetails(item)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                        title="View Full Run Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadSingleReport(item)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-purple-300 hover:bg-slate-800 transition-colors"
                        title="Download Run Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRequestDeleteRecord(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Delete Run Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Local Storage Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-mono text-[11px]">
          <strong>Demonstration Audit Notice:</strong> History records are stored securely in your browser's local sandbox memory. This is a frontend research prototype, not a production medical database.
        </p>
      </div>

    </div>
  );
};
