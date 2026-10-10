import React, { useState } from 'react';
import { DatasetItem, PageId } from '../types';
import { 
  Database, 
  Search, 
  Filter, 
  Upload, 
  Eye, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Grid, 
  List, 
  ShieldCheck, 
  Download,
  Info,
  Sparkles
} from 'lucide-react';
import { exportSampleDatasetCSV } from '../utils/exportUtils';

interface DatasetManagerViewProps {
  datasets: DatasetItem[];
  activeDatasetId: string;
  onSelectDataset: (id: string) => void;
  onPreviewDataset: (dataset: DatasetItem) => void;
  onOpenUploadModal: () => void;
  onRequestRemoveDataset: (dataset: DatasetItem) => void;
  onRefreshDatasets: () => void;
  onNavigate: (page: PageId) => void;
}

export const DatasetManagerView: React.FC<DatasetManagerViewProps> = ({
  datasets,
  activeDatasetId,
  onSelectDataset,
  onPreviewDataset,
  onOpenUploadModal,
  onRequestRemoveDataset,
  onRefreshDatasets
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories = ['All', 'Cardiology', 'Oncology', 'Neurology', 'Metabolic', 'Synthetic'];

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = 
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || dataset.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0a1022]/90 border border-cyan-500/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Biomedical Dataset Manager
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              {datasets.length} Cohorts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse, inspect, validate, and upload patient biomarker datasets for quantum kernel analysis.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefreshDatasets}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Refresh dataset catalogue"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh List</span>
          </button>

          <button
            onClick={onOpenUploadModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-xs shadow-glow-cyan flex items-center gap-2 transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Clinical CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a1020]/80 border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search datasets by name or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category Badges & View Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid/Table Toggle */}
          <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-slate-800 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Dataset List Display */}
      {filteredDatasets.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-3">
          <Database className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No datasets matched your search</h3>
          <p className="text-xs text-slate-400">Try adjusting your keyword or category filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* Grid Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset) => {
            const isActive = dataset.id === activeDatasetId;

            return (
              <div
                key={dataset.id}
                className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#0e1730] to-[#0c1326] border-cyan-400/80 shadow-glow-cyan'
                    : 'bg-[#0a1020]/90 border-slate-800 hover:border-slate-700 hover:bg-[#0d1429]'
                }`}
              >
                {/* Card Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {dataset.category}
                      </span>
                      {dataset.isCustom && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                          Custom Upload
                        </span>
                      )}
                    </div>
                    {isActive ? (
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-400">
                        {dataset.size}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-sans">{dataset.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {dataset.description}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Cohort Size</span>
                    <strong className="text-white">{dataset.rows.toLocaleString()} Patients</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Biomarkers</span>
                    <strong className="text-cyan-300">{dataset.features} Columns</strong>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-900 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {dataset.privacyLevel}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onPreviewDataset(dataset)}
                      className="p-2 rounded-xl text-slate-300 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                      title="Preview Dataset"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => exportSampleDatasetCSV(dataset)}
                      className="p-2 rounded-xl text-slate-300 hover:text-purple-300 hover:bg-slate-800 transition-colors"
                      title="Download Demo CSV"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    {dataset.isCustom && (
                      <button
                        onClick={() => onRequestRemoveDataset(dataset)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Remove Custom Dataset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {!isActive ? (
                    <button
                      onClick={() => onSelectDataset(dataset.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 hover:border-cyan-500 transition-all"
                    >
                      Select Dataset
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-mono font-medium">
                      Loaded in QPU
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        /* Table View */
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#0a1020]/90 shadow-xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0e162b] text-slate-300 border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5 font-semibold text-cyan-300">Dataset Name</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Category</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Cohort Rows</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Biomarkers</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Privacy Standard</th>
                <th className="px-4 py-3.5 font-semibold text-slate-300">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDatasets.map((dataset) => {
                const isActive = dataset.id === activeDatasetId;

                return (
                  <tr key={dataset.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3 font-sans">
                      <div className="font-bold text-white">{dataset.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{dataset.dataType}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {dataset.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-bold">{dataset.rows.toLocaleString()}</td>
                    <td className="px-4 py-3 text-cyan-300">{dataset.features} Features</td>
                    <td className="px-4 py-3">
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {dataset.privacyLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {isActive ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-slate-400">Available</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onPreviewDataset(dataset)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                        >
                          Preview
                        </button>
                        {!isActive && (
                          <button
                            onClick={() => onSelectDataset(dataset.id)}
                            className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
                          >
                            Select
                          </button>
                        )}
                        {dataset.isCustom && (
                          <button
                            onClick={() => onRequestRemoveDataset(dataset)}
                            className="p-1 rounded-lg text-rose-400 hover:bg-slate-800 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Disclaimer Card */}
      <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/30 flex items-start gap-3 text-xs text-purple-300">
        <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Demonstration Cohort Notice:</strong> All preloaded clinical datasets are synthetic or anonymized open-access research benchmark records for demonstrating quantum kernel algorithms.
        </p>
      </div>

    </div>
  );
};
