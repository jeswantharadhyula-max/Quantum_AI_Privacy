# Q-HealthGuard / Q-Health AI — Privacy-Preserving Quantum Healthcare AI

![Q-Health AI](https://img.shields.io/badge/Q--Health%20AI-v1.0-00F2FE?style=for-the-badge&logo=atom)
![Qiskit](https://img.shields.io/badge/IBM%20Qiskit-Aer%201.2-6929C4?style=for-the-badge&logo=ibm)
![Differential Privacy](https://img.shields.io/badge/Differential%20Privacy-DP--ε%200.5-10B981?style=for-the-badge)
![React](https://img.shields.io/badge/React%2019-TypeScript-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)

A next-generation frontend research platform for **Privacy-Preserving Quantum Healthcare AI**, demonstrating **Quantum Support Vector Classification (QSVC)** using Qiskit statevector kernels and **Differential Privacy (DP-ε)** noise calibration across multi-omics and biomedical patient cohorts.

---

## 🌟 Key Features

- **🎬 Ambient Quantum Video & Audio Showcase:** Immersive background video with real-time sound controls (unmute/mute, volume slider, playback scrubber).
- **⚛️ Quantum State Telemetry:** Live visualization of qubit statevector amplitudes ($|0000\rangle$, $|1111\rangle$) and continuous ECG biomarker waveforms.
- **⚡ Interactive AI Analysis Workbench:**
  - Select and compare quantum models (**Qiskit QSVC ZZFeatureMap**) against classical baselines (**SVM RBF**).
  - Configurable preprocessing (Quantum Angle Embedding, StandardScaler, MinMaxScaler, RobustScaler).
  - Differential Privacy budget slider ($\varepsilon = 0.10 - 2.00$) with Laplacian noise guarantees.
  - Interactive 5-step Quantum Pipeline simulation modal with qubit wire gates ($H, Rz, ZZ$).
- **🗃️ Biomedical Dataset Manager:**
  - Search and filter across Cardiology, Oncology, Neurology, Metabolic, and Synthetic cohorts.
  - Full statistical distribution inspection ($\mu, \sigma, \min, \max$) and searchable data grid previews.
  - Drag-and-drop clinical CSV uploader with client-side format validation.
  - Downloadable sample CSV datasets.
- **🎛️ Model Evaluation Workbench:** Fine-tune qubit register sizes ($2 - 16$ qubits), feature map repetitions, entanglement topologies (*Linear, Full, Circular*), and regularization terms ($C$).
- **📊 Results & Analytics Dashboard:**
  - 6 KPI performance cards (Accuracy, Precision, Recall, F1-Score, Latency, Test Cohort Size).
  - Recharts comparative benchmarks (QSVC vs Classical SVM vs Random Forest).
  - Interactive Confusion Matrix heatmap with sensitivity and specificity calculations.
  - One-click CSV and clinical markdown report export.
- **📜 Analysis History & Audit Log:** Searchable execution logs with local browser persistence (`localStorage`) and individual run audit reports.
- **⚙️ Customization & Settings:** Neon accent theme switchers (*Cyber Cyan, Neon Purple, Quantum Emerald, Solar Amber*), animation toggles, and startup presets.
- **❓ Comprehensive Documentation & FAQ:** Built-in guides for QSVC Hilbert mappings, Differential Privacy specifications, and dataset schemas.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/jeswantharadhyula-max/Quantum_AI_Privacy.git
cd Quantum_AI_Privacy
```

### 2. Frontend Setup (React + Vite)
```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Backend Setup (FastAPI + Qiskit)
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 💻 Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Glassmorphism, Custom Quantum Glow Palette
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (LineCharts, BarCharts, RadarCharts)
- **Effects:** Canvas Confetti, SVG ECG Pulse Animations, HTML5 Audio/Video API

---

## 🔒 Privacy & Research Notice

> **Educational & Research Prototype:** All metrics, quantum statevectors, and simulated results are demonstration data. Differential Privacy guarantees ($\varepsilon = 0.50, \delta = 10^{-5}$) protect local data models from inversion attacks.

---

## 📄 License

MIT License. Designed for privacy-preserving quantum healthcare AI research.
