import React, { useState, useRef } from 'react';
import { DatasetItem } from '../types';
import { Upload, X, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Database } from 'lucide-react';

interface UploadCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDataset: DatasetItem) => void;
}

export const UploadCSVModal: React.FC<UploadCSVModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedPreview, setParsedPreview] = useState<{ headers: string[]; rowCount: number; sample: Record<string, string>[] } | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [category, setCategory] = useState<'Cardiology' | 'Oncology' | 'Neurology' | 'Metabolic' | 'Synthetic'>('Cardiology');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate extension
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setErrorMessage('Invalid file format: Please select a valid Comma-Separated Values (.csv) file.');
      setSelectedFile(null);
      setParsedPreview(null);
      return;
    }

    // Validate size (e.g. max 15MB for frontend)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 15 MB frontend memory buffer limit.');
      return;
    }

    setSelectedFile(file);
    if (!datasetName) {
      setDatasetName(file.name.replace(/\.csv$/i, '').replace(/[-_]/g, ' '));
    }

    // Read and parse first few lines for UI preview
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        
        if (lines.length < 2) {
          setErrorMessage('CSV file must contain at least a header line and one patient record.');
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
        const sampleRows: Record<string, string>[] = [];
        
        const previewLines = lines.slice(1, 6);
        previewLines.forEach((line, idx) => {
          const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
          const rowObj: Record<string, string> = { id: `ROW-${idx + 1}` };
          headers.forEach((h, i) => {
            rowObj[h] = values[i] !== undefined ? values[i] : '';
          });
          sampleRows.push(rowObj);
        });

        setParsedPreview({
          headers,
          rowCount: lines.length - 1,
          sample: sampleRows
        });
      } catch {
        setErrorMessage('Failed to parse CSV structure. Ensure fields are standard comma-separated.');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !parsedPreview) {
      setErrorMessage('Please select and validate a CSV file first.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const sizeKB = (selectedFile.size / 1024).toFixed(1) + ' KB';
      const newDataset: DatasetItem = {
        id: `custom-${Date.now()}`,
        name: datasetName.trim() || selectedFile.name,
        category: category,
        rows: parsedPreview.rowCount,
        features: parsedPreview.headers.length,
        dataType: 'Custom Clinical CSV',
        privacyLevel: 'Local Browser Buffer (Client-Side)',
        status: 'Available',
        size: sizeKB,
        description: `Imported clinical CSV containing ${parsedPreview.rowCount} records and ${parsedPreview.headers.length} attributes.`,
        isCustom: true,
        columns: parsedPreview.headers.map(h => ({
          name: h,
          type: 'float'
        })),
        sampleRows: parsedPreview.sample
      };

      onUploadSuccess(newDataset);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0c1324] border border-cyan-500/30 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#090e1c]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">Upload Clinical CSV Dataset</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Load local CSV metadata into browser demonstration state.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Drag & Drop Box */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
              dragActive
                ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
                : selectedFile
                ? 'border-emerald-500/40 bg-emerald-950/15'
                : 'border-slate-700 bg-slate-900/50 hover:border-cyan-500/40 hover:bg-slate-900/80'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-semibold text-white font-mono">{selectedFile.name}</h4>
                <p className="text-xs text-slate-400 font-mono">
                  {(selectedFile.size / 1024).toFixed(1)} KB • Valid CSV File
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="text-xs text-cyan-400 hover:underline font-medium pt-1"
                >
                  Choose a different file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                  <FileText className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Drag and drop your clinical CSV file here
                </h4>
                <p className="text-xs text-slate-400">
                  or click to browse from your device
                </p>
                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>Format: .CSV</span>
                  <span>•</span>
                  <span>Max size: 15MB</span>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Parsed Inspection Preview */}
          {parsedPreview && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-300 uppercase font-mono flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" /> Detected Structure
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  {parsedPreview.rowCount} rows × {parsedPreview.headers.length} features
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-950/60 rounded-lg border border-slate-800">
                {parsedPreview.headers.map((h, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Dataset Display Name</label>
              <input
                type="text"
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                placeholder="e.g. My Cardiovascular Cohort"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Medical Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Oncology">Oncology</option>
                <option value="Neurology">Neurology</option>
                <option value="Metabolic">Metabolic</option>
                <option value="Synthetic">Synthetic</option>
              </select>
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-2 text-[11px] text-purple-300">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Frontend-Only Mode:</strong> File parsing occurs entirely within your browser's local sandbox memory. No file data is sent to external servers or AI backends.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile || isProcessing}
              className={`px-5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-md ${
                !selectedFile || isProcessing
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-glow-cyan'
              }`}
            >
              {isProcessing ? 'Processing File...' : 'Import Dataset to Workspace'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
