export type PageId = 
  | 'home'
  | 'dashboard'
  | 'analysis'
  | 'datasets'
  | 'evaluation'
  | 'results'
  | 'history'
  | 'settings'
  | 'help';

export interface DatasetColumn {
  name: string;
  type: 'float' | 'int' | 'category' | 'binary';
  mean?: number;
  std?: number;
  min?: number;
  max?: number;
}

export interface DatasetItem {
  id: string;
  name: string;
  category: 'Cardiology' | 'Oncology' | 'Neurology' | 'Metabolic' | 'Synthetic';
  rows: number;
  features: number;
  dataType: string;
  privacyLevel: string;
  status: 'Available' | 'Active' | 'Demo Only';
  description: string;
  size: string;
  isCustom?: boolean;
  columns: DatasetColumn[];
  sampleRows: Record<string, string | number>[];
}

export interface ModelOption {
  id: string;
  name: string;
  shortName: string;
  type: 'Quantum' | 'Classical' | 'Hybrid';
  description: string;
  status: 'ready' | 'coming_soon';
  badge: string;
  kernelType?: string;
  framework: string;
}

export interface AnalysisConfig {
  datasetId: string;
  modelId: string;
  scaling: 'standard' | 'minmax' | 'robust' | 'angle_embed';
  missingHandling: 'median' | 'mean' | 'knn' | 'drop';
  trainSplit: number; // e.g. 80 for 80/20
  dpEnabled: boolean;
  epsilon: number; // e.g. 0.5
  qubits: number; // e.g. 4
  featureMap: 'ZZFeatureMap' | 'PauliFeatureMap' | 'ZFeatureMap';
  entanglement: 'linear' | 'full' | 'circular';
  reps: number;
  cRegularization: number;
  crossValidationFolds: number;
  targetMetric: 'Accuracy' | 'F1-Score' | 'ROC-AUC' | 'Precision';
}

export interface ConfusionMatrixData {
  tp: number;
  fp: number;
  fn: number;
  tn: number;
}

export interface BenchmarkComparisonItem {
  metric: string;
  qsvc: number;
  classicalSvm: number;
  randomForest: number;
}

export interface ConvergencePoint {
  iteration: number;
  qsvcLoss: number;
  svmLoss: number;
  fidelity: number;
}

export interface EvaluationResults {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  runtimeSeconds: number;
  testSamples: number;
  quantumDepth: number;
  qubitFidelity: number;
  datasetName: string;
  modelName: string;
  executedAt: string;
  confusionMatrix: ConfusionMatrixData;
  benchmarkComparison: BenchmarkComparisonItem[];
  convergenceData: ConvergencePoint[];
  featureImportance: { feature: string; importance: number; quantumWeight: number }[];
  isDemoData: boolean;
}

export interface HistoryRecord {
  id: string;
  datasetName: string;
  modelName: string;
  timestamp: string;
  status: 'Completed' | 'Simulated' | 'Terminated' | 'Queued';
  duration: string;
  accuracy: number;
  f1Score: number;
  privacyEpsilon: number;
  config: Partial<AnalysisConfig>;
  notes?: string;
}

export interface AppSettings {
  themeAccent: 'cyan' | 'purple' | 'emerald' | 'amber';
  particleEffects: boolean;
  smoothAnimations: boolean;
  telemetrySpeed: 'fast' | 'normal' | 'slow';
  defaultDataset: string;
  defaultModel: string;
  soundEnabled: boolean;
  toastDuration: number;
  showDemoBanner: boolean;
  differentialPrivacyBudget: number;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
}

export interface FAQItem {
  id: string;
  category: 'Quantum AI' | 'Privacy & Security' | 'Datasets' | 'Models';
  question: string;
  answer: string;
}
