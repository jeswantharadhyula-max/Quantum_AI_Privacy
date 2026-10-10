import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md p-6 rounded-2xl bg-[#0d1424] border border-cyan-500/25 shadow-2xl shadow-black/80 space-y-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-xl shrink-0 ${
            variant === 'danger' ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400' :
            variant === 'warning' ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400' :
            'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-white font-sans">
              {title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="text-cyan-400">UI Demo Action:</span> Modifies local demonstration state in this browser session only.
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:bg-slate-800/80 border border-slate-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all shadow-md ${
              variant === 'danger'
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                : variant === 'warning'
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
