import { DatasetItem, ModelOption, EvaluationResults, HistoryRecord, FAQItem, AppSettings } from '../types';

export const INITIAL_DATASETS: DatasetItem[] = [
  {
    id: 'heart-health-demo',
    name: 'Heart-Health Demo Dataset',
    category: 'Cardiology',
    rows: 1024,
    features: 12,
    dataType: 'Continuous Biosignals & EHR',
    privacyLevel: 'Differential Privacy ε=0.5',
    status: 'Active',
    size: '184 KB',
    description: 'Curated cardiovascular biomarker records with resting ECG, cholesterol metrics, and exercise-induced ST response.',
    columns: [
      { name: 'age', type: 'int', mean: 54.3, std: 9.1, min: 29, max: 77 },
      { name: 'sex', type: 'binary', min: 0, max: 1 },
      { name: 'chest_pain_type', type: 'category', min: 0, max: 3 },
      { name: 'resting_bp', type: 'float', mean: 131.6, std: 17.5, min: 94, max: 200 },
      { name: 'serum_cholesterol', type: 'float', mean: 246.2, std: 51.8, min: 126, max: 564 },
      { name: 'fasting_blood_sugar', type: 'binary', min: 0, max: 1 },
      { name: 'resting_ecg', type: 'category', min: 0, max: 2 },
      { name: 'max_heart_rate', type: 'float', mean: 149.6, std: 22.9, min: 71, max: 202 },
      { name: 'exercise_angina', type: 'binary', min: 0, max: 1 },
      { name: 'st_depression', type: 'float', mean: 1.04, std: 1.16, min: 0.0, max: 6.2 },
      { name: 'st_slope', type: 'category', min: 0, max: 2 },
      { name: 'diagnosis_target', type: 'binary', min: 0, max: 1 }
    ],
    sampleRows: [
      { id: 'PAT-001', age: 63, sex: 1, chest_pain_type: 3, resting_bp: 145, serum_cholesterol: 233, fasting_blood_sugar: 1, resting_ecg: 0, max_heart_rate: 150, exercise_angina: 0, st_depression: 2.3, st_slope: 0, diagnosis_target: 1 },
      { id: 'PAT-002', age: 37, sex: 1, chest_pain_type: 2, resting_bp: 130, serum_cholesterol: 250, fasting_blood_sugar: 0, resting_ecg: 1, max_heart_rate: 187, exercise_angina: 0, st_depression: 3.5, st_slope: 0, diagnosis_target: 1 },
      { id: 'PAT-003', age: 41, sex: 0, chest_pain_type: 1, resting_bp: 130, serum_cholesterol: 204, fasting_blood_sugar: 0, resting_ecg: 0, max_heart_rate: 172, exercise_angina: 0, st_depression: 1.4, st_slope: 2, diagnosis_target: 1 },
      { id: 'PAT-004', age: 56, sex: 1, chest_pain_type: 1, resting_bp: 120, serum_cholesterol: 236, fasting_blood_sugar: 0, resting_ecg: 1, max_heart_rate: 178, exercise_angina: 0, st_depression: 0.8, st_slope: 2, diagnosis_target: 1 },
      { id: 'PAT-005', age: 57, sex: 0, chest_pain_type: 0, resting_bp: 120, serum_cholesterol: 354, fasting_blood_sugar: 0, resting_ecg: 1, max_heart_rate: 163, exercise_angina: 1, st_depression: 0.6, st_slope: 2, diagnosis_target: 1 },
      { id: 'PAT-006', age: 57, sex: 1, chest_pain_type: 0, resting_bp: 140, serum_cholesterol: 192, fasting_blood_sugar: 0, resting_ecg: 1, max_heart_rate: 148, exercise_angina: 0, st_depression: 0.4, st_slope: 1, diagnosis_target: 0 },
      { id: 'PAT-007', age: 56, sex: 0, chest_pain_type: 1, resting_bp: 140, serum_cholesterol: 294, fasting_blood_sugar: 0, resting_ecg: 0, max_heart_rate: 153, exercise_angina: 0, st_depression: 1.3, st_slope: 1, diagnosis_target: 0 },
      { id: 'PAT-008', age: 44, sex: 1, chest_pain_type: 1, resting_bp: 120, serum_cholesterol: 263, fasting_blood_sugar: 0, resting_ecg: 1, max_heart_rate: 173, exercise_angina: 0, st_depression: 0.0, st_slope: 2, diagnosis_target: 1 }
    ]
  },
  {
    id: 'synthetic-healthcare',
    name: 'Synthetic Healthcare Multi-Cohort',
    category: 'Synthetic',
    rows: 2450,
    features: 14,
    dataType: 'Synthetic Multi-Modal Cohort',
    privacyLevel: 'Synthetic Generative CTGAN',
    status: 'Available',
    size: '412 KB',
    description: 'Statistically faithful synthetic demographic and laboratory records generated via privacy-preserving generative tensors.',
    columns: [
      { name: 'patient_age', type: 'int', mean: 51.8, std: 12.4, min: 18, max: 88 },
      { name: 'gender', type: 'category', min: 0, max: 1 },
      { name: 'bmi_index', type: 'float', mean: 28.4, std: 5.3, min: 16.2, max: 48.9 },
      { name: 'systolic_bp', type: 'float', mean: 128.2, std: 16.8, min: 90, max: 195 },
      { name: 'diastolic_bp', type: 'float', mean: 82.4, std: 10.1, min: 55, max: 120 },
      { name: 'glucose_fasting', type: 'float', mean: 108.7, std: 32.1, min: 65, max: 280 },
      { name: 'hba1c_level', type: 'float', mean: 5.9, std: 1.2, min: 4.0, max: 13.5 },
      { name: 'ldl_cholesterol', type: 'float', mean: 124.5, std: 38.0, min: 45, max: 240 },
      { name: 'hdl_cholesterol', type: 'float', mean: 51.2, std: 14.3, min: 22, max: 95 },
      { name: 'creatinine_serum', type: 'float', mean: 1.02, std: 0.38, min: 0.4, max: 3.8 },
      { name: 'crp_inflammation', type: 'float', mean: 2.15, std: 2.8, min: 0.1, max: 22.0 },
      { name: 'smoking_history', type: 'category', min: 0, max: 2 },
      { name: 'physical_activity_score', type: 'float', mean: 4.8, std: 2.1, min: 0, max: 10 },
      { name: 'risk_stratification', type: 'category', min: 0, max: 3 }
    ],
    sampleRows: [
      { id: 'SYN-101', patient_age: 52, gender: 1, bmi_index: 29.4, systolic_bp: 132, diastolic_bp: 84, glucose_fasting: 112, hba1c_level: 6.1, ldl_cholesterol: 138, hdl_cholesterol: 46, creatinine_serum: 0.95, crp_inflammation: 1.8, smoking_history: 1, physical_activity_score: 4.5, risk_stratification: 2 },
      { id: 'SYN-102', patient_age: 44, gender: 0, bmi_index: 24.1, systolic_bp: 118, diastolic_bp: 76, glucose_fasting: 92, hba1c_level: 5.2, ldl_cholesterol: 102, hdl_cholesterol: 58, creatinine_serum: 0.81, crp_inflammation: 0.6, smoking_history: 0, physical_activity_score: 7.2, risk_stratification: 0 },
      { id: 'SYN-103', patient_age: 68, gender: 1, bmi_index: 33.2, systolic_bp: 154, diastolic_bp: 96, glucose_fasting: 168, hba1c_level: 8.4, ldl_cholesterol: 165, hdl_cholesterol: 38, creatinine_serum: 1.45, crp_inflammation: 4.9, smoking_history: 2, physical_activity_score: 2.0, risk_stratification: 3 },
      { id: 'SYN-104', patient_age: 38, gender: 0, bmi_index: 22.8, systolic_bp: 112, diastolic_bp: 72, glucose_fasting: 88, hba1c_level: 4.9, ldl_cholesterol: 94, hdl_cholesterol: 64, creatinine_serum: 0.74, crp_inflammation: 0.4, smoking_history: 0, physical_activity_score: 8.5, risk_stratification: 0 },
      { id: 'SYN-105', patient_age: 61, gender: 1, bmi_index: 30.5, systolic_bp: 142, diastolic_bp: 88, glucose_fasting: 135, hba1c_level: 7.0, ldl_cholesterol: 144, hdl_cholesterol: 42, creatinine_serum: 1.12, crp_inflammation: 2.7, smoking_history: 1, physical_activity_score: 3.5, risk_stratification: 2 }
    ]
  },
  {
    id: 'oncology-biomarkers',
    name: 'Oncology Gene Expression Panel',
    category: 'Oncology',
    rows: 840,
    features: 16,
    dataType: 'Genomic Multi-omics & Pathology',
    privacyLevel: 'Differential Privacy ε=0.8',
    status: 'Available',
    size: '260 KB',
    description: 'High-dimensional RNA sequencing expression levels and tumor cellular morphometric features for therapeutic response classification.',
    columns: [
      { name: 'radius_mean', type: 'float', mean: 14.1, std: 3.5, min: 6.9, max: 28.1 },
      { name: 'texture_mean', type: 'float', mean: 19.3, std: 4.3, min: 9.7, max: 39.2 },
      { name: 'perimeter_mean', type: 'float', mean: 91.9, std: 24.2, min: 43.7, max: 188.5 },
      { name: 'area_mean', type: 'float', mean: 654.8, std: 351.9, min: 143.5, max: 2501.0 },
      { name: 'smoothness_mean', type: 'float', mean: 0.096, std: 0.014, min: 0.052, max: 0.163 },
      { name: 'compactness_mean', type: 'float', mean: 0.104, std: 0.052, min: 0.019, max: 0.345 },
      { name: 'concavity_mean', type: 'float', mean: 0.088, std: 0.079, min: 0.0, max: 0.426 },
      { name: 'concave_points_mean', type: 'float', mean: 0.048, std: 0.038, min: 0.0, max: 0.201 },
      { name: 'brca1_expression', type: 'float', mean: 4.82, std: 1.34, min: 1.2, max: 9.8 },
      { name: 'tp53_variant_score', type: 'float', mean: 2.14, std: 0.95, min: 0.1, max: 5.4 },
      { name: 'her2_intensity', type: 'float', mean: 1.65, std: 0.82, min: 0.0, max: 3.9 },
      { name: 'ki67_proliferation', type: 'float', mean: 24.5, std: 14.8, min: 2.0, max: 78.0 },
      { name: 'malignancy_label', type: 'binary', min: 0, max: 1 }
    ],
    sampleRows: [
      { id: 'ONC-001', radius_mean: 17.99, texture_mean: 10.38, perimeter_mean: 122.8, area_mean: 1001.0, smoothness_mean: 0.118, compactness_mean: 0.277, concavity_mean: 0.300, brca1_expression: 6.4, tp53_variant_score: 3.8, her2_intensity: 2.9, ki67_proliferation: 45.0, malignancy_label: 1 },
      { id: 'ONC-002', radius_mean: 20.57, texture_mean: 17.77, perimeter_mean: 132.9, area_mean: 1326.0, smoothness_mean: 0.084, compactness_mean: 0.078, concavity_mean: 0.086, brca1_expression: 5.1, tp53_variant_score: 2.2, her2_intensity: 1.4, ki67_proliferation: 18.5, malignancy_label: 1 },
      { id: 'ONC-003', radius_mean: 13.54, texture_mean: 14.36, perimeter_mean: 87.46, area_mean: 566.3, smoothness_mean: 0.097, compactness_mean: 0.081, concavity_mean: 0.066, brca1_expression: 3.9, tp53_variant_score: 1.1, her2_intensity: 0.8, ki67_proliferation: 8.2, malignancy_label: 0 }
    ]
  },
  {
    id: 'metabolic-diabetes',
    name: 'Metabolic Diabetes Risk Index',
    category: 'Metabolic',
    rows: 1600,
    features: 10,
    dataType: 'Endocrine & Metabolic Phenotypes',
    privacyLevel: 'Anonymized k=5',
    status: 'Available',
    size: '220 KB',
    description: 'Longitudinal clinical profiles evaluating beta-cell resistance, glycemic excursions, and metabolic syndrome indicators.',
    columns: [
      { name: 'pregnancies', type: 'int', mean: 3.8, std: 3.3, min: 0, max: 17 },
      { name: 'glucose', type: 'float', mean: 120.8, std: 31.9, min: 44, max: 199 },
      { name: 'blood_pressure', type: 'float', mean: 69.1, std: 19.3, min: 24, max: 122 },
      { name: 'skin_thickness', type: 'float', mean: 20.5, std: 15.9, min: 7, max: 99 },
      { name: 'insulin', type: 'float', mean: 79.7, std: 115.2, min: 14, max: 846 },
      { name: 'bmi', type: 'float', mean: 31.9, std: 7.8, min: 18.2, max: 67.1 },
      { name: 'diabetes_pedigree', type: 'float', mean: 0.47, std: 0.33, min: 0.078, max: 2.42 },
      { name: 'age', type: 'int', mean: 33.2, std: 11.7, min: 21, max: 81 },
      { name: 'outcome', type: 'binary', min: 0, max: 1 }
    ],
    sampleRows: [
      { id: 'MET-001', pregnancies: 6, glucose: 148, blood_pressure: 72, skin_thickness: 35, insulin: 0, bmi: 33.6, diabetes_pedigree: 0.627, age: 50, outcome: 1 },
      { id: 'MET-002', pregnancies: 1, glucose: 85, blood_pressure: 66, skin_thickness: 29, insulin: 0, bmi: 26.6, diabetes_pedigree: 0.351, age: 31, outcome: 0 },
      { id: 'MET-003', pregnancies: 8, glucose: 183, blood_pressure: 64, skin_thickness: 0, insulin: 0, bmi: 23.3, diabetes_pedigree: 0.672, age: 32, outcome: 1 }
    ]
  },
  {
    id: 'neurology-eeg-coherence',
    name: 'Neurological EEG Signal Registry',
    category: 'Neurology',
    rows: 3200,
    features: 18,
    dataType: 'High-Density Electrophysiology',
    privacyLevel: 'Differential Privacy ε=0.3',
    status: 'Available',
    size: '560 KB',
    description: 'Multi-channel spectral density, phase synchrony, and wave power bands for neurodegenerative and seizure anomaly modeling.',
    columns: [
      { name: 'alpha_power_fp1', type: 'float', mean: 12.4, std: 4.8, min: 1.2, max: 34.0 },
      { name: 'beta_power_fp2', type: 'float', mean: 18.6, std: 6.2, min: 3.5, max: 48.0 },
      { name: 'theta_sync_cz', type: 'float', mean: 8.2, std: 3.1, min: 0.8, max: 22.4 },
      { name: 'gamma_burst_p3', type: 'float', mean: 4.1, std: 2.0, min: 0.2, max: 14.5 },
      { name: 'phase_coherence', type: 'float', mean: 0.72, std: 0.18, min: 0.12, max: 0.98 },
      { name: 'seizure_event', type: 'binary', min: 0, max: 1 }
    ],
    sampleRows: [
      { id: 'NEU-001', alpha_power_fp1: 14.2, beta_power_fp2: 19.8, theta_sync_cz: 7.9, gamma_burst_p3: 3.8, phase_coherence: 0.84, seizure_event: 0 },
      { id: 'NEU-002', alpha_power_fp1: 8.4, beta_power_fp2: 32.1, theta_sync_cz: 16.4, gamma_burst_p3: 11.2, phase_coherence: 0.41, seizure_event: 1 }
    ]
  }
];

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'qiskit-qsvc',
    name: 'Quantum Machine Learning (Qiskit QSVC)',
    shortName: 'QSVC (Quantum Kernel)',
    type: 'Quantum',
    framework: 'Qiskit Aer 1.2.0 (Simulated Statevector)',
    description: 'Maps classical biomedical biomarkers to Hilbert quantum state space via parameterized ZZFeatureMap to discover non-linear separating hyperplanes.',
    status: 'ready',
    badge: 'Recommended Quantum',
    kernelType: 'Quantum ZZFeatureMap (2-Qubit Entanglement)'
  },
  {
    id: 'classical-svm',
    name: 'Classical Support Vector Machine (RBF Kernel)',
    shortName: 'Classical SVM (RBF)',
    type: 'Classical',
    framework: 'Scikit-Learn 1.4.2 Benchmark',
    description: 'Standard classical baseline utilizing Radial Basis Function kernel for benchmark comparison against quantum state fidelity.',
    status: 'ready',
    badge: 'Baseline Benchmark',
    kernelType: 'Radial Basis Function (RBF)'
  },
  {
    id: 'hybrid-qnn',
    name: 'Hybrid Quantum Neural Network (QNN)',
    shortName: 'Hybrid QNN',
    type: 'Hybrid',
    framework: 'Qiskit ML / PyTorch Hybrid',
    description: 'Parameterized quantum variational circuits (VQC) coupled with classical dense layers for deep medical representations.',
    status: 'coming_soon',
    badge: 'Coming Soon',
    kernelType: 'Variational Quantum Classifier'
  },
  {
    id: 'quantum-rf',
    name: 'Quantum Random Forest Ensemble',
    shortName: 'Quantum Ensemble',
    type: 'Quantum',
    framework: 'PennyLane / Quantum Forests',
    description: 'Multi-qubit decision trees utilizing superposition-based parallel splits over multi-modal patient cohorts.',
    status: 'coming_soon',
    badge: 'Coming Soon',
    kernelType: 'Superposition Decision Ensembles'
  }
];

export const INITIAL_EVALUATION_RESULTS: EvaluationResults = {
  accuracy: 94.8,
  precision: 93.2,
  recall: 96.1,
  f1Score: 94.6,
  runtimeSeconds: 1.42,
  testSamples: 256,
  quantumDepth: 18,
  qubitFidelity: 99.4,
  datasetName: 'Heart-Health Demo Dataset',
  modelName: 'Quantum Machine Learning (Qiskit QSVC)',
  executedAt: '2026-10-10 09:15:22 UTC',
  isDemoData: true,
  confusionMatrix: {
    tp: 122,
    fp: 7,
    fn: 5,
    tn: 122
  },
  benchmarkComparison: [
    { metric: 'Accuracy (%)', qsvc: 94.8, classicalSvm: 89.2, randomForest: 91.0 },
    { metric: 'Precision (%)', qsvc: 93.2, classicalSvm: 87.5, randomForest: 89.8 },
    { metric: 'Recall (%)', qsvc: 96.1, classicalSvm: 90.1, randomForest: 92.4 },
    { metric: 'F1-Score (%)', qsvc: 94.6, classicalSvm: 88.7, randomForest: 91.1 },
    { metric: 'Privacy Loss (ε)', qsvc: 0.5, classicalSvm: 2.8, randomForest: 3.5 }
  ],
  convergenceData: [
    { iteration: 1, qsvcLoss: 0.82, svmLoss: 0.79, fidelity: 96.2 },
    { iteration: 2, qsvcLoss: 0.64, svmLoss: 0.68, fidelity: 97.4 },
    { iteration: 3, qsvcLoss: 0.48, svmLoss: 0.56, fidelity: 98.1 },
    { iteration: 4, qsvcLoss: 0.35, svmLoss: 0.47, fidelity: 98.8 },
    { iteration: 5, qsvcLoss: 0.24, svmLoss: 0.39, fidelity: 99.1 },
    { iteration: 6, qsvcLoss: 0.17, svmLoss: 0.34, fidelity: 99.3 },
    { iteration: 7, qsvcLoss: 0.11, svmLoss: 0.31, fidelity: 99.4 }
  ],
  featureImportance: [
    { feature: 'ST Depression (Slope)', importance: 92, quantumWeight: 0.88 },
    { feature: 'Serum Cholesterol', importance: 84, quantumWeight: 0.79 },
    { feature: 'Max Heart Rate', importance: 78, quantumWeight: 0.74 },
    { feature: 'Chest Pain Modality', importance: 71, quantumWeight: 0.68 },
    { feature: 'Resting Blood Pressure', importance: 62, quantumWeight: 0.59 },
    { feature: 'Patient Age', importance: 49, quantumWeight: 0.44 }
  ]
};

export const INITIAL_HISTORY: HistoryRecord[] = [
  {
    id: 'QHL-2026-8941',
    datasetName: 'Heart-Health Demo Dataset',
    modelName: 'Quantum ML (Qiskit QSVC)',
    timestamp: '2026-10-10 09:15:22',
    status: 'Completed',
    duration: '1.42s',
    accuracy: 94.8,
    f1Score: 94.6,
    privacyEpsilon: 0.5,
    config: {
      qubits: 4,
      featureMap: 'ZZFeatureMap',
      entanglement: 'linear',
      reps: 2,
      trainSplit: 80,
      dpEnabled: true,
      epsilon: 0.5
    },
    notes: 'Optimal quantum kernel separation achieved with 18-gate circuit depth.'
  },
  {
    id: 'QHL-2026-8930',
    datasetName: 'Synthetic Healthcare Multi-Cohort',
    modelName: 'Classical SVM (RBF)',
    timestamp: '2026-10-10 08:42:10',
    status: 'Completed',
    duration: '0.88s',
    accuracy: 89.2,
    f1Score: 88.7,
    privacyEpsilon: 1.0,
    config: {
      cRegularization: 1.0,
      trainSplit: 75,
      dpEnabled: true,
      epsilon: 1.0
    },
    notes: 'Classical baseline benchmark run for multi-cohort demographic cross-check.'
  },
  {
    id: 'QHL-2026-8919',
    datasetName: 'Oncology Gene Expression Panel',
    modelName: 'Quantum ML (Qiskit QSVC)',
    timestamp: '2026-10-09 18:30:45',
    status: 'Completed',
    duration: '2.14s',
    accuracy: 96.2,
    f1Score: 95.8,
    privacyEpsilon: 0.8,
    config: {
      qubits: 8,
      featureMap: 'PauliFeatureMap',
      entanglement: 'full',
      reps: 3,
      trainSplit: 80,
      dpEnabled: true,
      epsilon: 0.8
    },
    notes: 'High-dimensional genomic kernel mapping over 16 biomarker channels.'
  },
  {
    id: 'QHL-2026-8894',
    datasetName: 'Metabolic Diabetes Risk Index',
    modelName: 'Quantum ML (Qiskit QSVC)',
    timestamp: '2026-10-09 14:12:00',
    status: 'Completed',
    duration: '1.25s',
    accuracy: 92.4,
    f1Score: 91.9,
    privacyEpsilon: 0.5,
    config: {
      qubits: 4,
      featureMap: 'ZZFeatureMap',
      entanglement: 'linear',
      reps: 2,
      trainSplit: 80,
      dpEnabled: true,
      epsilon: 0.5
    },
    notes: 'Beta-cell resistance classification with Differential Privacy noise.'
  },
  {
    id: 'QHL-2026-8850',
    datasetName: 'Neurological EEG Signal Registry',
    modelName: 'Classical SVM (RBF)',
    timestamp: '2026-10-08 21:05:19',
    status: 'Completed',
    duration: '1.95s',
    accuracy: 88.6,
    f1Score: 87.9,
    privacyEpsilon: 0.3,
    config: {
      cRegularization: 0.5,
      trainSplit: 70,
      dpEnabled: true,
      epsilon: 0.3
    },
    notes: 'Spectral EEG seizure anomaly detection run.'
  },
  {
    id: 'QHL-2026-8802',
    datasetName: 'Heart-Health Demo Dataset',
    modelName: 'Quantum ML (Qiskit QSVC)',
    timestamp: '2026-10-08 11:24:33',
    status: 'Simulated',
    duration: '1.38s',
    accuracy: 93.9,
    f1Score: 93.4,
    privacyEpsilon: 0.5,
    config: {
      qubits: 4,
      featureMap: 'ZZFeatureMap',
      entanglement: 'circular',
      reps: 2,
      trainSplit: 75,
      dpEnabled: true,
      epsilon: 0.5
    },
    notes: 'Exploratory circular entanglement topology run on 4 qubits.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Quantum AI',
    question: 'How does Quantum Support Vector Classification (QSVC) work in healthcare?',
    answer: 'QSVC leverages quantum Hilbert space to project high-dimensional non-linear patient biomarkers (such as multi-gene interactions and biosignals) into a quantum feature space using quantum circuits (e.g. ZZFeatureMap). In this expanded state space, complex patient risk profiles can be cleanly separated with higher linear fidelity than classical kernels.'
  },
  {
    id: 'faq-2',
    category: 'Privacy & Security',
    question: 'How is patient privacy protected in this architecture?',
    answer: 'Q-Health AI employs Differential Privacy (DP-ε) guarantees alongside quantum state encoding. Before quantum kernel computation, demographic and diagnostic values are bounded and calibrated with Laplacian or Gaussian noise mechanisms, preventing model inversion and patient re-identification while preserving diagnostic accuracy.'
  },
  {
    id: 'faq-3',
    category: 'Quantum AI',
    question: 'What is the role of Qiskit in this platform?',
    answer: 'Qiskit (by IBM Quantum) provides the quantum computing software development framework used to define quantum circuits, parameterize quantum feature maps (ZZFeatureMap, PauliFeatureMap), construct quantum statevector kernels, and optimize measurement observables.'
  },
  {
    id: 'faq-4',
    category: 'Datasets',
    question: 'What dataset formats are supported for upload?',
    answer: 'The system accepts standard comma-separated value (.csv) files. Patient biomarker records should contain numerical features (vital signs, lab metrics) and a binary or categorical target column for classification. Sample schemas are provided in the Dataset Manager.'
  },
  {
    id: 'faq-5',
    category: 'Models',
    question: 'Are results in this frontend prototype generated by a live quantum processor?',
    answer: 'No. This frontend prototype executes simulated UI workflows and visualizes curated research demonstration data to showcase the end-to-end user experience, dashboard metrics, and interactive controls. A full backend QPU connection (such as IBM Quantum Cloud API) is required for physical quantum execution.'
  },
  {
    id: 'faq-6',
    category: 'Privacy & Security',
    question: 'What does the Privacy Epsilon (ε) parameter mean?',
    answer: 'In Differential Privacy, Epsilon (ε) is the privacy loss budget. Smaller values (e.g. ε = 0.1 – 0.5) provide stronger mathematical privacy protection by adding calibrated noise, whereas larger values allow higher statistical utility at the expense of privacy guarantees.'
  }
];

export const DEFAULT_SETTINGS: AppSettings = {
  themeAccent: 'cyan',
  particleEffects: true,
  smoothAnimations: true,
  telemetrySpeed: 'normal',
  defaultDataset: 'heart-health-demo',
  defaultModel: 'qiskit-qsvc',
  soundEnabled: false,
  toastDuration: 4000,
  showDemoBanner: true,
  differentialPrivacyBudget: 0.5
};
