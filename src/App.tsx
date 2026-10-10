import React, { useState, useEffect } from 'react';

import confetti from 'canvas-confetti';
import { runQuantumAnalysis } from './api';
import { 
  PageId, 
  DatasetItem, 
  ModelOption, 
  AnalysisConfig, 
  EvaluationResults, 
  HistoryRecord, 
  AppSettings, 
  ToastNotification 
} from './types';
import { 
  INITIAL_DATASETS, 
  MODEL_OPTIONS, 
  INITIAL_EVALUATION_RESULTS, 
  INITIAL_HISTORY, 
  FAQ_ITEMS, 
  DEFAULT_SETTINGS 
} from './data/mockData';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ConfirmationModal } from './components/ConfirmationModal';
import { DatasetPreviewModal } from './components/DatasetPreviewModal';
import { UploadCSVModal } from './components/UploadCSVModal';
import { QuantumCircuitModal } from './components/QuantumCircuitModal';
import { RunDetailsModal } from './components/RunDetailsModal';

// Page Views
import { HomeView } from './views/HomeView';
import { DashboardView } from './views/DashboardView';
import { AnalysisView } from './views/AnalysisView';
import { DatasetManagerView } from './views/DatasetManagerView';
import { ModelEvaluationView } from './views/ModelEvaluationView';
import { ResultsView } from './views/ResultsView';
import { HistoryView } from './views/HistoryView';
import { SettingsView } from './views/SettingsView';
import { HelpSupportView } from './views/HelpSupportView';

export function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<PageId>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Core Data States
  const [datasets, setDatasets] = useState<DatasetItem[]>(() => {
    const saved = localStorage.getItem('qhealth_datasets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DATASETS;
      }
    }
    return INITIAL_DATASETS;
  });

  const [activeDatasetId, setActiveDatasetId] = useState<string>('heart-health-demo');

  const [config, setConfig] = useState<AnalysisConfig>({
    datasetId: 'heart-health-demo',
    modelId: 'qiskit-qsvc',
    scaling: 'angle_embed',
    missingHandling: 'knn',
    trainSplit: 80,
    dpEnabled: true,
    epsilon: 0.5,
    qubits: 4,
    featureMap: 'ZZFeatureMap',
    entanglement: 'linear',
    reps: 2,
    cRegularization: 1.0,
    crossValidationFolds: 5,
    targetMetric: 'Accuracy'
  });

  const [results, setResults] = useState<EvaluationResults>(INITIAL_EVALUATION_RESULTS);

  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    const saved = localStorage.getItem('qhealth_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_HISTORY;
      }
    }
    return INITIAL_HISTORY;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('qhealth_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Modals
  const [isQuantumModalOpen, setIsQuantumModalOpen] = useState(false);
  const [previewDataset, setPreviewDataset] = useState<DatasetItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedRunRecord, setSelectedRunRecord] = useState<HistoryRecord | null>(null);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('qhealth_datasets', JSON.stringify(datasets));
  }, [datasets]);

  useEffect(() => {
    localStorage.setItem('qhealth_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('qhealth_settings', JSON.stringify(settings));
  }, [settings]);

  // Toast Helper
  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastNotification = { id, type, title, message, duration: settings.toastDuration };
    setToasts(prev => [newToast, ...prev]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, settings.toastDuration || 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Active items lookup
  const activeDataset = datasets.find(d => d.id === activeDatasetId) || datasets[0];
  const activeModel = MODEL_OPTIONS.find(m => m.id === config.modelId) || MODEL_OPTIONS[0];

  // Navigation handler with smooth scroll
  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch Analysis handler
  const handleLaunchAnalysis = () => {
    setIsQuantumModalOpen(true);
  };

  // Completed quantum analysis simulation
  const handleCompleteAnalysis = () => {
    setIsQuantumModalOpen(false);

    // Trigger visual confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F2FE', '#38bdf8', '#a855f7', '#10b981']
      });
    } catch {
      // ignore
    }

    // Generate simulated dynamic results based on configuration
    const isQSVC = config.modelId === 'qiskit-qsvc';
    const dynamicAcc = isQSVC 
      ? Number((93.5 + Math.random() * 2.5).toFixed(1))
      : Number((87.5 + Math.random() * 2.5).toFixed(1));
    const dynamicF1 = Number((dynamicAcc - 0.2 - Math.random() * 0.4).toFixed(1));
    const dynamicPrec = Number((dynamicAcc - 0.8 + Math.random() * 0.5).toFixed(1));
    const dynamicRec = Number((dynamicAcc + 0.6 + Math.random() * 0.5).toFixed(1));
    const runtime = Number((1.1 + Math.random() * 0.6).toFixed(2));

    const newResults: EvaluationResults = {
      ...INITIAL_EVALUATION_RESULTS,
      accuracy: dynamicAcc,
      precision: dynamicPrec,
      recall: dynamicRec,
      f1Score: dynamicF1,
      runtimeSeconds: runtime,
      datasetName: activeDataset.name,
      modelName: activeModel.name,
      executedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      benchmarkComparison: [
        { metric: 'Accuracy (%)', qsvc: dynamicAcc, classicalSvm: 89.2, randomForest: 91.0 },
        { metric: 'Precision (%)', qsvc: dynamicPrec, classicalSvm: 87.5, randomForest: 89.8 },
        { metric: 'Recall (%)', qsvc: dynamicRec, classicalSvm: 90.1, randomForest: 92.4 },
        { metric: 'F1-Score (%)', qsvc: dynamicF1, classicalSvm: 88.7, randomForest: 91.1 },
        { metric: 'Privacy Loss (ε)', qsvc: config.epsilon, classicalSvm: 2.8, randomForest: 3.5 }
      ]
    };

    setResults(newResults);

    // Append to history
    const newRecord: HistoryRecord = {
      id: `QHL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      datasetName: activeDataset.name,
      modelName: activeModel.shortName,
      timestamp: new Date().toLocaleString(),
      status: 'Completed',
      duration: `${runtime}s`,
      accuracy: dynamicAcc,
      f1Score: dynamicF1,
      privacyEpsilon: config.epsilon,
      config: { ...config },
      notes: `Quantum kernel execution with ${config.qubits} qubits on ${activeDataset.name}.`
    };

    setHistory(prev => [newRecord, ...prev]);

    addToast(
      'success',
      'Quantum Analysis Completed!',
      `Achieved ${dynamicAcc}% accuracy on ${activeDataset.name} (ε=${config.epsilon.toFixed(2)} protected).`
    );

    // Redirect to Results
    handleNavigate('results');
  };

  // Config handlers
  const handleChangeConfig = (newCfg: Partial<AnalysisConfig>) => {
    setConfig(prev => ({ ...prev, ...newCfg }));
  };

  const handleResetConfig = () => {
    setConfig({
      datasetId: activeDatasetId,
      modelId: 'qiskit-qsvc',
      scaling: 'angle_embed',
      missingHandling: 'knn',
      trainSplit: 80,
      dpEnabled: true,
      epsilon: 0.5,
      qubits: 4,
      featureMap: 'ZZFeatureMap',
      entanglement: 'linear',
      reps: 2,
      cRegularization: 1.0,
      crossValidationFolds: 5,
      targetMetric: 'Accuracy'
    });
    addToast('info', 'Settings Reset', 'Configuration restored to default quantum parameters.');
  };

  const handleSaveConfig = () => {
    addToast('success', 'Configuration Saved', 'Quantum hyperparameter presets saved to your local browser profile.');
  };

  // Dataset actions
  const handleSelectDataset = (id: string) => {
    setActiveDatasetId(id);
    setConfig(prev => ({ ...prev, datasetId: id }));
    const dataset = datasets.find(d => d.id === id);
    if (dataset) {
      addToast('success', 'Dataset Selected', `${dataset.name} loaded into QPU simulation workspace.`);
    }
  };

  const handleUploadSuccess = (newDataset: DatasetItem) => {
    setDatasets(prev => [newDataset, ...prev]);
    setActiveDatasetId(newDataset.id);
    setConfig(prev => ({ ...prev, datasetId: newDataset.id }));
    addToast('success', 'CSV Imported Successfully', `${newDataset.name} is now available in your workspace.`);
  };

  const handleRequestRemoveDataset = (dataset: DatasetItem) => {
    setConfirmModal({
      isOpen: true,
      title: `Remove ${dataset.name}?`,
      message: `Are you sure you want to remove this custom dataset from your browser session? This action cannot be undone.`,
      confirmText: 'Remove Dataset',
      variant: 'danger',
      onConfirm: () => {
        setDatasets(prev => prev.filter(d => d.id !== dataset.id));
        if (activeDatasetId === dataset.id) {
          setActiveDatasetId('heart-health-demo');
        }
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        addToast('info', 'Dataset Removed', `${dataset.name} was removed from the list.`);
      }
    });
  };

  const handleRefreshDatasets = () => {
    addToast('info', 'Dataset Catalogue Refreshed', 'Refreshed active dataset list.');
  };

  // History Actions
  const handleRequestDeleteHistoryRecord = (record: HistoryRecord) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete Run Record ${record.id}?`,
      message: `Are you sure you want to permanently delete this research run record from your local history?`,
      confirmText: 'Delete Record',
      variant: 'danger',
      onConfirm: () => {
        setHistory(prev => prev.filter(h => h.id !== record.id));
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        addToast('info', 'Record Deleted', `Run ${record.id} removed from local history.`);
      }
    });
  };

  const handleRequestClearHistory = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Clear Entire Run History?',
      message: 'This will erase all recorded analysis runs from your local browser memory. Are you sure?',
      confirmText: 'Clear All History',
      variant: 'danger',
      onConfirm: () => {
        setHistory([]);
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        addToast('warning', 'History Cleared', 'All previous analysis logs have been erased.');
      }
    });
  };

  // Settings Actions
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleSaveSettings = () => {
    addToast('success', 'Settings Saved', 'Visual appearance, animation parameters, and presets saved to local storage.');
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    addToast('info', 'Settings Reset', 'Visual configuration reset to default dark navy & cyber cyan theme.');
  };

  // Help Actions
  const handleCopyProjectInfo = () => {
    const citation = `Q-Health AI — Privacy-Preserving Quantum Healthcare AI\nFramework: IBM Qiskit Aer 1.2.0 Statevector\nAlgorithms: QSVC (ZZFeatureMap) & Differential Privacy (DP-ε)\nFrontend Prototype Version 1.0 (Research & Educational Demonstration)\nURL: https://qhealth-ai.research.local`;
    navigator.clipboard.writeText(citation);
    addToast('success', 'Citation Copied to Clipboard', 'Project metadata and framework specifications copied.');
  };

  const handleSupportMessage = (name: string) => {
    addToast('success', 'Inquiry Received', `Thank you, ${name}. Your research message has been recorded.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onLaunchAnalysis={handleLaunchAnalysis}
      />

      {/* Main Body Layout with Sidebar */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        
        {/* Collapsible Sidebar Navigation */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          historyCount={history.length}
          datasetsCount={datasets.length}
        />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
          
          {activePage === 'home' && (
            <HomeView
              onNavigate={handleNavigate}
              onLaunchAnalysis={handleLaunchAnalysis}
              activeDataset={activeDataset}
              activeModel={activeModel}
              recentHistory={history}
              onOpenDatasetModal={() => setPreviewDataset(activeDataset)}
            />
          )}

          {activePage === 'dashboard' && (
            <DashboardView
              onNavigate={handleNavigate}
              onLaunchAnalysis={handleLaunchAnalysis}
              results={results}
              activeDataset={activeDataset}
              activeModel={activeModel}
              onRefreshTelemetry={() => addToast('info', 'Telemetry Synced', 'Live statevector probabilities refreshed.')}
            />
          )}

          {activePage === 'analysis' && (
            <AnalysisView
              datasets={datasets}
              models={MODEL_OPTIONS}
              activeDatasetId={activeDatasetId}
              onSelectDataset={handleSelectDataset}
              config={config}
              onChangeConfig={handleChangeConfig}
              onResetConfig={handleResetConfig}
              onRunAnalysis={handleLaunchAnalysis}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
              onPreviewDataset={(d) => setPreviewDataset(d)}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'datasets' && (
            <DatasetManagerView
              datasets={datasets}
              activeDatasetId={activeDatasetId}
              onSelectDataset={handleSelectDataset}
              onPreviewDataset={(d) => setPreviewDataset(d)}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
              onRequestRemoveDataset={handleRequestRemoveDataset}
              onRefreshDatasets={handleRefreshDatasets}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'evaluation' && (
            <ModelEvaluationView
              models={MODEL_OPTIONS}
              config={config}
              onChangeConfig={handleChangeConfig}
              onResetConfig={handleResetConfig}
              onSaveConfig={handleSaveConfig}
              onStartEvaluation={handleLaunchAnalysis}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'results' && (
            <ResultsView
              results={results}
              onRefreshResults={() => addToast('info', 'Results Refreshed', 'Loaded latest quantum evaluation metrics.')}
              onClearResults={() => {
                setResults({ ...INITIAL_EVALUATION_RESULTS, accuracy: 0, f1Score: 0, precision: 0, recall: 0 });
                addToast('warning', 'Results Cleared', 'Active dashboard metrics reset.');
              }}
              onViewDetails={() => {
                if (history[0]) {
                  setSelectedRunRecord(history[0]);
                } else {
                  addToast('info', 'No Run Logs', 'Run a simulation to generate technical audit logs.');
                }
              }}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'history' && (
            <HistoryView
              history={history}
              onViewRecordDetails={(rec) => setSelectedRunRecord(rec)}
              onRequestDeleteRecord={handleRequestDeleteHistoryRecord}
              onRequestClearHistory={handleRequestClearHistory}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'settings' && (
            <SettingsView
              settings={settings}
              datasets={datasets}
              models={MODEL_OPTIONS}
              onUpdateSettings={handleUpdateSettings}
              onSaveSettings={handleSaveSettings}
              onResetSettings={handleResetSettings}
              onRestoreDefaults={handleResetSettings}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'help' && (
            <HelpSupportView
              faqItems={FAQ_ITEMS}
              onCopyProjectInfo={handleCopyProjectInfo}
              onNavigate={handleNavigate}
              onSubmitSupportMessage={handleSupportMessage}
            />
          )}

        </main>
      </div>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Dialogs */}
      <QuantumCircuitModal
        isOpen={isQuantumModalOpen}
        onClose={() => setIsQuantumModalOpen(false)}
        onComplete={handleCompleteAnalysis}
        config={config}
        dataset={activeDataset}
        model={activeModel}
      />

      <DatasetPreviewModal
        dataset={previewDataset}
        isOpen={Boolean(previewDataset)}
        onClose={() => setPreviewDataset(null)}
        onSelectDataset={handleSelectDataset}
        isActive={previewDataset?.id === activeDatasetId}
      />

      <UploadCSVModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <RunDetailsModal
        record={selectedRunRecord}
        isOpen={Boolean(selectedRunRecord)}
        onClose={() => setSelectedRunRecord(null)}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        variant={confirmModal.variant}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Toast Stack */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />

    </div>
  );
}
export default App;
