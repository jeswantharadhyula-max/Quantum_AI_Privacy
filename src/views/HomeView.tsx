import React, { useState, useRef, useEffect } from 'react';
import { PageId, DatasetItem, ModelOption, HistoryRecord } from '../types';
import { 
  Sparkles, 
  Play, 
  Pause,
  LayoutDashboard, 
  Database, 
  BarChart3, 
  Clock, 
  Settings, 
  Atom, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Server,
  Radio,
  FileSpreadsheet,
  Volume2,
  VolumeX,
  Sliders,
  Maximize2
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onLaunchAnalysis: () => void;
  activeDataset: DatasetItem;
  activeModel: ModelOption;
  recentHistory: HistoryRecord[];
  onOpenDatasetModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onLaunchAnalysis,
  activeDataset,
  activeModel,
  recentHistory,
  onOpenDatasetModal
}) => {
  // Background Video State & Sound Controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.85);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;
    video.muted = isMuted;

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser autoplay policy might pause until user interaction
      setIsPlaying(false);
    });
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);

    if (!newMuted) {
      if (video.volume === 0) {
        video.volume = 0.85;
        setVolume(0.85);
      }
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVol = parseFloat(e.target.value);
    video.volume = newVol;
    setVolume(newVol);

    if (newVol > 0 && isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else if (newVol === 0 && !isMuted) {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Section with Cinematic Background Video */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 p-6 sm:p-10 shadow-2xl shadow-cyan-950/50 min-h-[500px] flex flex-col justify-between">
        
        {/* Background Video Layer */}
        <video
          ref={videoRef}
          src="/quantum_healthcare_intro.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-40 mix-blend-screen scale-105"
        />

        {/* Gradient overlays for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/95 via-[#080d22]/85 to-[#0e1430]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-[#060913]/60 pointer-events-none" />
        
        {/* Quantum Grid Overlay */}
        <div className="absolute inset-0 quantum-grid opacity-25 pointer-events-none" />

        {/* Floating Background Audio & Video Control Bar */}
        <div className="relative z-20 flex items-center justify-between pb-6 flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-glow-cyan">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next-Gen Privacy-Preserving Quantum Healthcare AI</span>
          </div>

          {/* Interactive Sound & Video Controller */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-cyan-500/40 shadow-2xl">
            
            {/* Play/Pause Video */}
            <button
              onClick={toggleVideoPlayback}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700/80 transition-colors"
              title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Sound On/Off Button */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all duration-300 shadow-md ${
                !isMuted 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border border-emerald-400 shadow-glow-emerald scale-105' 
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-400'
              }`}
              title={isMuted ? 'Click to Turn Sound ON' : 'Click to Turn Sound OFF'}
            >
              {!isMuted ? (
                <>
                  <Volume2 className="w-4 h-4 text-white animate-bounce" />
                  <span>SOUND ON</span>
                  {/* Equalizer Wave */}
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-white animate-pulse"></span>
                    <span className="w-0.5 h-2/3 bg-white animate-pulse delay-75"></span>
                    <span className="w-0.5 h-full bg-white animate-pulse delay-150"></span>
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>SOUND OFF (Click to Unmute)</span>
                </>
              )}
            </button>

            {/* Volume Slider (When sound is active) */}
            <div className="hidden sm:flex items-center gap-1.5 px-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>

          </div>
        </div>

        {/* Hero Main Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Heading & Subtitle */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Welcome to <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">Q-Health AI</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 font-medium">
                Your Quantum-Powered Healthcare Research Workspace
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Explore quantum machine learning classifiers (<span className="text-cyan-300 font-mono font-bold">Qiskit QSVC</span>) and Hilbert-space kernel transformations on cardiovascular, oncological, and multi-omics biomedical datasets—backed by formal <span className="text-purple-300 font-semibold">Differential Privacy (DP-ε)</span> protocols.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="home-launch-analysis-btn"
                onClick={onLaunchAnalysis}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-glow-cyan hover:shadow-glow-purple transition-all duration-300 flex items-center gap-2.5 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Launch New Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="home-explore-dashboard-btn"
                onClick={() => onNavigate('dashboard')}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-200 flex items-center gap-2 backdrop-blur-md"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Explore Dashboard</span>
              </button>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1">
                <Atom className="w-4 h-4 text-cyan-400 animate-spin-slow" /> Qiskit Aer 1.2
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> DP-ε = 0.50
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Cpu className="w-4 h-4 text-purple-400" /> 4-Qubit Statevector
              </span>
            </div>
          </div>

          {/* Hero Right Graphic: Quantum Healthcare Telemetry Visualizer Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 rounded-3xl bg-[#080e21]/80 border border-cyan-500/30 shadow-2xl backdrop-blur-2xl space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                    Quantum State Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/90 text-purple-300 border border-purple-800">
                  Hilbert Space Dim: 2⁴ = 16
                </span>
              </div>

              {/* Animated Heartbeat ECG & Waveform */}
              <div className="p-3 rounded-2xl bg-slate-950/85 border border-slate-800/90 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Activity className="w-3.5 h-3.5 animate-heartbeat text-rose-400" />
                    Biomarker State Waveform
                  </span>
                  <span className="text-emerald-400">Phase: 0.785 rad</span>
                </div>

                {/* SVG Pulse Graphic */}
                <div className="h-16 w-full flex items-center overflow-hidden">
                  <svg className="w-full h-14" viewBox="0 0 400 60" fill="none">
                    <path
                      d="M0 30 L60 30 L80 30 L95 10 L110 50 L125 15 L140 45 L155 30 L220 30 L235 5 L250 55 L265 20 L280 40 L295 30 L400 30"
                      stroke="#00F2FE"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-ecg"
                    />
                  </svg>
                </div>
              </div>

              {/* Quantum Amplitudes Progress Bars */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>State |0000⟩ Amplitude</span>
                  <span className="text-cyan-300 font-bold">0.684</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 shadow-glow-cyan w-[68%]" />
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>State |1111⟩ Entangled Overlap</span>
                  <span className="text-purple-300 font-bold">0.892</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-500 shadow-glow-purple w-[89%]" />
                </div>
              </div>

              {/* Quick status pill */}
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80">
                <span>Kernel: ZZFeatureMap</span>
                <span className="text-emerald-400">Quantum Fidelity: 99.4%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Core Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Status Card 1: Research Demo */}
        <div className="p-5 rounded-2xl bg-[#0a1020]/90 border border-cyan-500/20 glass-panel-hover space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Environment
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">Research Demo</h3>
            <p className="text-xs text-slate-400 mt-1">Simulated QPU Execution Engine</p>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Backend:</span>
            <span className="text-cyan-300">Qiskit Aer Sim</span>
          </div>
        </div>

        {/* Status Card 2: Dataset Status */}
        <div 
          onClick={onOpenDatasetModal}
          className="p-5 rounded-2xl bg-[#0a1020]/90 border border-cyan-500/20 glass-panel-hover space-y-3 cursor-pointer group"
          title="Click to inspect active dataset"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Dataset Status
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white truncate font-sans">{activeDataset.name}</h3>
            <p className="text-xs text-emerald-400 mt-1 font-mono">{activeDataset.rows.toLocaleString()} Samples • {activeDataset.features} Features</p>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Privacy:</span>
            <span className="text-emerald-300">{activeDataset.privacyLevel.split(' ')[0]}</span>
          </div>
        </div>

        {/* Status Card 3: Selected Model */}
        <div 
          onClick={() => onNavigate('evaluation')}
          className="p-5 rounded-2xl bg-[#0a1020]/90 border border-cyan-500/20 glass-panel-hover space-y-3 cursor-pointer group"
          title="Click to configure model"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Selected Model
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white truncate font-sans">{activeModel.shortName}</h3>
            <p className="text-xs text-purple-300 mt-1 font-mono">{activeModel.type} Kernel Architecture</p>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Status:</span>
            <span className="text-cyan-300 font-semibold">Ready for Run</span>
          </div>
        </div>

        {/* Status Card 4: Analysis Status */}
        <div 
          onClick={() => onNavigate('results')}
          className="p-5 rounded-2xl bg-[#0a1020]/90 border border-cyan-500/20 glass-panel-hover space-y-3 cursor-pointer group"
          title="Click to view latest results"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Analysis Benchmark
            </span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-cyan-300 font-mono">94.8%</h3>
            <p className="text-xs text-slate-400 mt-1">Classification Accuracy (Demo)</p>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">F1-Score:</span>
            <span className="text-purple-300">94.6%</span>
          </div>
        </div>

      </div>

      {/* 6 Quick Action Buttons Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Quick Workspace Actions
          </h2>
          <span className="text-xs text-slate-400 font-mono">Instant Frontend Navigation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <button
            id="action-btn-launch"
            onClick={onLaunchAnalysis}
            className="p-4 rounded-2xl bg-[#0c1429] hover:bg-[#121c38] border border-cyan-500/30 hover:border-cyan-400 text-left transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-md hover:shadow-glow-cyan"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 w-fit group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-cyan-400 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                Launch New Analysis
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Run QSVC pipeline</p>
            </div>
          </button>

          <button
            id="action-btn-dashboard"
            onClick={() => onNavigate('dashboard')}
            className="p-4 rounded-2xl bg-[#0c1429] hover:bg-[#121c38] border border-slate-800 hover:border-sky-500/40 text-left transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400 w-fit group-hover:scale-110 transition-transform">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                Explore Dashboard
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Live KPI telemetry</p>
            </div>
          </button>

          <button
            id="action-btn-dataset"
            onClick={() => onNavigate('datasets')}
            className="p-4 rounded-2xl bg-[#0c1429] hover:bg-[#121c38] border border-slate-800 hover:border-emerald-500/40 text-left transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 w-fit group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Select Dataset
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Manager & CSV</p>
            </div>
          </button>

          <button
            id="action-btn-results"
            onClick={() => onNavigate('results')}
            className="p-4 rounded-2xl bg-[#0c1429] hover:bg-[#121c38] border border-slate-800 hover:border-cyan-500/40 text-left transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-300 w-fit group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                View Results
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Charts & reports</p>
            </div>
          </button>

          <button
            id="action-btn-history"
            onClick={() => onNavigate('history')}
            className="p-4 rounded-2xl bg-[#0c1429] hover:bg-[#121c38] border border-slate-800 hover:border-purple-500/40 text-left transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 w-fit group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                View History
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Run logs & audit</p>
            </div>
          </button>

          <button
            id="action-btn-settings"
            onClick={() => onNavigate('settings')}
            className="p-4 rounded-2xl bg-[#0c1429] hover:bg-[#121c38] border border-slate-800 hover:border-amber-500/40 text-left transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-md"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 w-fit group-hover:scale-110 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                Configure Settings
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Themes & defaults</p>
            </div>
          </button>

        </div>
      </div>

      {/* Recent Activity Panel */}
      <div className="p-6 rounded-3xl bg-[#0a1020]/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h3 className="text-base font-bold text-white font-sans">Recent Research Activity</h3>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            <span>View All History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-800/80">
          {recentHistory.slice(0, 3).map((item) => (
            <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono">{item.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {item.modelName} on <span className="text-slate-200">{item.datasetName}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
                <span>Acc: <strong className="text-cyan-300">{item.accuracy}%</strong></span>
                <span>DP: <strong className="text-purple-300">ε={item.privacyEpsilon}</strong></span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
