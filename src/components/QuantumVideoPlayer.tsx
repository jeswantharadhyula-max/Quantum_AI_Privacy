import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  Atom, 
  ShieldCheck, 
  Radio,
  Sliders,
  Film
} from 'lucide-react';

interface QuantumVideoPlayerProps {
  className?: string;
  autoPlay?: boolean;
}

export const QuantumVideoPlayer: React.FC<QuantumVideoPlayerProps> = ({
  className = '',
  autoPlay = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial volume & mute state
    video.volume = volume;
    video.muted = isMuted;

    if (autoPlay) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy might block unmuted playback until interaction
        setIsPlaying(false);
      });
    }
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);

    if (!newMuted && video.volume === 0) {
      video.volume = 0.8;
      setVolume(0.8);
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

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return;

    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    video.currentTime = clickPos * video.duration;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={`relative rounded-3xl overflow-hidden bg-[#070b18] border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 group ${className}`}
      onMouseEnter={() => setShowControls(true)}
    >
      
      {/* Top Header Pill Bar Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/30 pointer-events-auto">
          <Film className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono font-bold text-white tracking-wide">
            Quantum AI Simulation Video
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        {/* Audio Status Banner / Quick Sound Toggle */}
        <button
          onClick={toggleMute}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold font-mono transition-all duration-300 pointer-events-auto shadow-lg backdrop-blur-md ${
            !isMuted 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border border-emerald-400 shadow-glow-emerald scale-105' 
              : 'bg-black/70 hover:bg-black/90 text-slate-300 border border-slate-700 hover:border-cyan-400'
          }`}
          title={isMuted ? 'Click to Unmute Audio' : 'Click to Mute Audio'}
        >
          {!isMuted ? (
            <>
              <Volume2 className="w-4 h-4 text-white animate-bounce" />
              <span>SOUND ON</span>
              {/* Sound Wave Bars */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-white animate-pulse"></span>
                <span className="w-0.5 h-2/3 bg-white animate-pulse delay-75"></span>
                <span className="w-0.5 h-full bg-white animate-pulse delay-150"></span>
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-rose-400" />
              <span className="text-slate-300">SOUND MUTED (Click to Enable)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Video Element */}
      <video
        ref={videoRef}
        src="/quantum_healthcare_intro.mp4"
        loop={isLooping}
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer max-h-[420px] sm:max-h-[500px]"
      />

      {/* Center Play/Pause Overlay Icon on Hover/Pause */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 border border-cyan-300 text-white shadow-glow-cyan transform hover:scale-110 transition-transform">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Bottom Floating Control Bar */}
      <div className={`absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 ${
        showControls || !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        
        {/* Progress Bar / Scrubber */}
        <div 
          onClick={handleSeek}
          className="w-full h-1.5 bg-slate-700/60 hover:h-2.5 rounded-full cursor-pointer transition-all mb-3 relative overflow-hidden group/bar"
        >
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 rounded-full transition-all shadow-glow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-xs text-white">
          
          {/* Play, Sound & Time */}
          <div className="flex items-center gap-3">
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-cyan-500/20 text-white hover:text-cyan-300 border border-slate-700 hover:border-cyan-400/50 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border transition-colors ${
                !isMuted 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm' 
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-700'
              }`}
              title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>

            {/* Volume Slider */}
            <div className="hidden sm:flex items-center gap-1.5 w-20">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                title="Volume"
              />
            </div>

            {/* Time Stamp */}
            <div className="font-mono text-[11px] text-slate-300">
              <span>{formatTime(currentTime)}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span className="text-slate-400">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Extras */}
          <div className="flex items-center gap-2">
            
            {/* Loop Toggle */}
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-colors ${
                isLooping 
                  ? 'bg-purple-950/80 text-purple-300 border-purple-500/40' 
                  : 'bg-slate-900/80 text-slate-400 border-slate-700'
              }`}
              title="Toggle Auto Loop"
            >
              LOOP: {isLooping ? 'ON' : 'OFF'}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
