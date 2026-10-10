import React, { useState } from 'react';
import { DatasetItem } from '../types';
import { X, Database, Download, Search, CheckCircle, ShieldCheck, Layers, FileText } from 'lucide-react';
import { exportSampleDatasetCSV } from '../utils/exportUtils';

interface DatasetPreviewModalProps {
  dataset: DatasetItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectDataset?: (datasetId: string) => void;
  isActive?: boolean;
}

export const DatasetPreviewModal: React.FC<DatasetPreviewModalProps> = ({
  dataset,
  isOpen,
  onClose,
  onSelectDataset,
  isActive = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'sample' | 'schema'>('sample');

  if (!isOpen || !dataset) return null;

  const filteredRows = dataset.sampleRows.filter(row => {
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0c1324] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/90 bg-[#090e1c]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-sans">{dataset.name}</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {dataset.category}
                </span>
                {isActive && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Active Dataset
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{dataset.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#080d1a] border-b border-slate-800/80 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Total Cohort Size</span>
            <span className="text-sm font-bold text-cyan-300 font-mono">{dataset.rows.toLocaleString()} Patients</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Biomarker Features</span>
            <span className="text-sm font-bold text-purple-300 font-mono">{dataset.features} Columns</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Privacy Protection</span>
            <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              {dataset.privacyLevel}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimated Disk Size</span>
            <span className="text-sm font-bold text-slate-200 font-mono">{dataset.size}</span>
          </div>
        </div>

        {/* Toolbar & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('sample')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'sample'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Sample Data Grid ({filteredRows.length} shown)
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'schema'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Feature Schema & Statistics
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search row values..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              onClick={() => exportSampleDatasetCSV(dataset)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors shrink-0"
              title="Download Sample CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[460px]">
          {activeTab === 'sample' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0e1629] text-slate-300 border-b border-slate-800 sticky top-0">
                  <tr>
                    {dataset.columns.map((col) => (
                      <th key={col.name} className="px-3 py-2.5 font-semibold text-cyan-300">
                        {col.name}
                        <span className="block text-[9px] font-normal text-slate-400">{col.type}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        {dataset.columns.map((col) => (
                          <td key={col.name} className="px-3 py-2 text-slate-300">
                            {row[col.name] !== undefined ? String(row[col.name]) : '—'}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={dataset.columns.length} className="px-4 py-8 text-center text-slate-400">
                        No sample records matched "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dataset.columns.map((col) => (
                <div key={col.name} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-cyan-300">{col.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {col.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/50 p-2 rounded-lg">
                    {col.mean !== undefined && (
                      <div>
                        <span>Mean: </span>
                        <strong className="text-white">{col.mean}</strong>
                      </div>
                    )}
                    {col.std !== undefined && (
                      <div>
                        <span>Std Dev: </span>
                        <strong className="text-white">±{col.std}</strong>
                      </div>
                    )}
                    {col.min !== undefined && (
                      <div>
                        <span>Min: </span>
                        <strong className="text-emerald-400">{col.min}</strong>
                      </div>
                    )}
                    {col.max !== undefined && (
                      <div>
                        <span>Max: </span>
                        <strong className="text-purple-400">{col.max}</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/90 bg-[#090e1c] flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400">
            <span className="text-cyan-400">Demo Preview:</span> Curated local biomedical cohort
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              Close
            </button>
            {onSelectDataset && !isActive && (
              <button
                onClick={() => {
                  onSelectDataset(dataset.id);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all"
              >
                Select as Active Dataset
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
