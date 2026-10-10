import React, { useState } from 'react';
import { FAQItem, PageId } from '../types';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ExternalLink, 
  BookOpen, 
  FileCode, 
  Send, 
  Sparkles, 
  Atom, 
  ShieldCheck, 
  Layers,
  Activity,
  CheckCircle2
} from 'lucide-react';

interface HelpSupportViewProps {
  faqItems: FAQItem[];
  onCopyProjectInfo: () => void;
  onNavigate: (page: PageId) => void;
  onSubmitSupportMessage: (name: string, email: string, message: string) => void;
}

export const HelpSupportView: React.FC<HelpSupportViewProps> = ({
  faqItems,
  onCopyProjectInfo,
  onNavigate,
  onSubmitSupportMessage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const filteredFaqs = faqItems.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyClick = () => {
    onCopyProjectInfo();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName.trim() || !supportEmail.trim() || !supportMessage.trim()) return;

    onSubmitSupportMessage(supportName, supportEmail, supportMessage);
    setSupportName('');
    setSupportEmail('');
    setSupportMessage('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-[#0a1022]/90 border border-cyan-500/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-white font-sans">
              Help, Documentation & Quantum Guide
            </h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
              Research Docs
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Reference guides on QSVC Hilbert mappings, Differential Privacy specifications, dataset formats, and Qiskit workflows.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyClick}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{isCopied ? 'Information Copied!' : 'Copy Project Citation'}</span>
          </button>
        </div>
      </div>

      {/* Quick Interactive UI Navigation Guide Cards */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Platform Navigation Guide
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div 
            onClick={() => onNavigate('analysis')}
            className="p-4 rounded-2xl bg-[#0a1020]/90 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold font-mono">
              <Atom className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>1. AI Analysis Workbench</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select datasets, choose QSVC or Classical SVM kernels, adjust Differential Privacy noise, and launch simulation.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('datasets')}
            className="p-4 rounded-2xl bg-[#0a1020]/90 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
              <Layers className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>2. Dataset Manager</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload custom CSV files, view statistical distributions, preview patient rows, and download demo datasets.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('evaluation')}
            className="p-4 rounded-2xl bg-[#0a1020]/90 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-mono">
              <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>3. Model Evaluation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Configure qubit registers (2 to 16 qubits), ZZFeatureMap repetitions, entanglement topology, and regularization.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('results')}
            className="p-4 rounded-2xl bg-[#0a1020]/90 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all space-y-2 group"
          >
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold font-mono">
              <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>4. Results & Reports</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect confusion matrix heatmaps, comparative ROC curves, download CSV data, and export clinical text reports.
            </p>
          </div>

        </div>
      </div>

      {/* Dataset Schema Specification & Qiskit Tech Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dataset Format Spec */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              Supported CSV Dataset Format Specification
            </h3>
            <span className="text-xs font-mono text-slate-400">Schema Guidelines</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Q-Health AI accepts standard comma-separated value (<span className="text-cyan-300 font-mono">.csv</span>) files formatted with patient biomarkers in columns and individual clinical encounters in rows:
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <span className="text-slate-500"># Required Header & Continuous/Categorical Biomarker Sample</span>
            <div className="text-cyan-300 pt-1">patient_id,age,resting_bp,cholesterol,max_hr,st_depression,diagnosis_target</div>
            <div className="text-slate-400">PAT-001,63,145,233,150,2.3,1</div>
            <div className="text-slate-400">PAT-002,37,130,250,187,3.5,1</div>
            <div className="text-slate-400">PAT-003,41,130,204,172,1.4,0</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Target Column</span>
              <strong className="text-white">Binary (0 or 1)</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Continuous Inputs</span>
              <strong className="text-cyan-300">Float / Integer</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Differential Privacy</span>
              <strong className="text-purple-300">Auto-Noise Injection</strong>
            </div>
          </div>
        </div>

        {/* Qiskit & IBM Quantum Links */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0a1020]/90 border border-cyan-500/20 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Atom className="w-4 h-4 text-cyan-400" />
              Quantum Frameworks
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Technology & SDK References</p>
          </div>

          <div className="space-y-2.5 text-xs">
            <a
              href="https://qiskit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-slate-200 transition-all group"
            >
              <div>
                <strong className="font-semibold text-white group-hover:text-cyan-300">IBM Qiskit SDK</strong>
                <p className="text-[10px] text-slate-400">Quantum circuits & statevector simulation</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
            </a>

            <a
              href="https://qiskit-community.github.io/qiskit-machine-learning/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/40 flex items-center justify-between text-slate-200 transition-all group"
            >
              <div>
                <strong className="font-semibold text-white group-hover:text-purple-300">Qiskit Machine Learning</strong>
                <p className="text-[10px] text-slate-400">QSVC & QuantumKernel algorithms</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
            </a>

            <a
              href="https://quantum.ibm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 flex items-center justify-between text-slate-200 transition-all group"
            >
              <div>
                <strong className="font-semibold text-white group-hover:text-sky-300">IBM Quantum Platform</strong>
                <p className="text-[10px] text-slate-400">Cloud QPU processing & transpilations</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-400" />
            </a>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-sans">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Everything you need to know about quantum healthcare algorithms and privacy preservation.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 shrink-0">
                      {faq.category}
                    </span>
                    <span className="text-sm font-semibold text-white font-sans">
                      {faq.question}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Message Form */}
      <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-purple-500/25 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <Send className="w-4 h-4 text-purple-400" />
            Send Feedback or Inquiries
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Connect with the Q-Health AI research development team.
          </p>
        </div>

        <form onSubmit={handleSupportSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Full Name</label>
            <input
              type="text"
              required
              value={supportName}
              onChange={(e) => setSupportName(e.target.value)}
              placeholder="Dr. Alex Rivera"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <input
              type="email"
              required
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              placeholder="alex.rivera@research.org"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">Message / Research Inquiry</label>
            <textarea
              required
              rows={3}
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Describe your research question or feedback on quantum kernel algorithms..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-slate-400">
              Demo Form: Validates inputs and provides instant confirmation.
            </span>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-purple flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
