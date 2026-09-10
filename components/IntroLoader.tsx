import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface IntroLoaderProps {
  onComplete?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [typedText, setTypedText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('INITIALIZING CYBERSECURITY DEFENSES');

  const fullText = 'VERIFY YOUR CART';

  // Play subtle futuristic cyber chime via Web Audio API on completion
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      // High-frequency subtle chime ping
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Audio is an optional delight, silently ignore if blocked by browser
    }
  };

  useEffect(() => {
    // 1. Typewriter effect: 16 characters spread over ~1.8 seconds (110ms per char)
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypedText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    // 2. Progress bar runs for at least 3.2 seconds total
    // 50ms ticks with average 1.5% increment per tick ≈ 65 ticks ≈ 3250ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          playChime();
          // Hold at 100% for 500ms so user can see "SYSTEM READY 100%"
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 500);
          return 100;
        }

        // Increment smoothly between 1% and 2.5% per 50ms tick
        const increment = Math.random() * 1.5 + 1.0;
        const next = Math.min(Math.round((prev + increment) * 10) / 10, 100);

        if (next < 25) {
          setStatusMessage('INITIALIZING CYBERSECURITY DEFENSES');
        } else if (next < 55) {
          setStatusMessage('LOADING HEURISTIC & REPUTATION MODELS');
        } else if (next < 85) {
          setStatusMessage('CALIBRATING FRAUD RADAR');
        } else if (next < 100) {
          setStatusMessage('SECURING SHOPPER GATEWAY');
        } else {
          setStatusMessage('SYSTEM READY • SECURE');
        }

        return next;
      });
    }, 50);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 200);
  };

  return (
    <div
      id="loader-root"
      className={`fixed inset-0 bg-[#07090e] z-[99999] flex flex-col items-center justify-center font-sans select-none transition-all duration-600 ease-[cubic-bezier(0.645,0.045,0.355,1)] ${
        isExiting ? 'opacity-0 -translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Radial background glow (exact match to portfolio) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.12),transparent_60%)] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Skip button in top right */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-[11px] font-mono tracking-widest text-slate-500 hover:text-slate-200 uppercase px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/25 transition-all cursor-pointer"
      >
        Skip [ESC]
      </button>

      {/* Main center container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* Glowing aura orb */}
        <div className="absolute -top-16 w-40 h-40 bg-blue-500/20 blur-[70px] rounded-full pointer-events-none" />

        {/* Brand Icon Shield */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-emerald-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-6 shadow-[0_0_35px_rgba(59,130,246,0.3)] animate-pulse-slow">
          <ShieldCheck size={32} className="text-blue-400" />
        </div>

        {/* Typewriter Title */}
        <h1 className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white mb-3 relative flex items-center justify-center min-h-[3.5rem] sm:min-h-[4.5rem]">
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            {typedText}
          </span>
          <span className="inline-block w-2.5 sm:w-3.5 h-8 sm:h-12 bg-blue-400 ml-2 animate-pulse" />
        </h1>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-slate-400 mb-8">
          Check it right. Buy it bright.
        </p>

        {/* Thin Neon Progress Bar */}
        <div className="w-64 sm:w-72 h-[3px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(59,130,246,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Status Text */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-mono text-slate-400 mb-6">
          <span>{statusMessage}</span>
          <span className="text-blue-400 font-bold">—</span>
          <span className="text-emerald-400 font-bold font-mono min-w-[2.5rem] text-right">
            {Math.floor(progress)}%
          </span>
        </div>

        {/* Creator Attribution */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          <span>Project Creator:</span>
          <span className="text-slate-300 font-bold">Saketh Vedullapalli</span>
        </div>
      </div>
    </div>
  );
};
