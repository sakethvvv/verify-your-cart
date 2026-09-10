import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Shield, Search, Sparkles, Globe, Cpu, ArrowRight } from 'lucide-react';

interface ScanningStep {
  label: string;
  detail: string;
  source: 'Verify Your CART' | 'Duck.ai' | 'User';
}

const STEPS: ScanningStep[] = [
  {
    label: 'User pastes Flipkart/Amazon/etc. product URL',
    detail: 'Target e-commerce product link ingested into security buffer...',
    source: 'User'
  },
  {
    label: 'Verify Your CART: URL Validation',
    detail: 'Sanitizing input parameters, verifying SSL certificate, host reputation & catalog path...',
    source: 'Verify Your CART'
  },
  {
    label: 'Automatically send URL to Duck.ai',
    detail: 'Dispatching product metadata and cybersecurity directives to Duck.ai...',
    source: 'Verify Your CART'
  },
  {
    label: 'Duck.ai searches the web',
    detail: 'Duck.ai querying live web indices, authorized retail catalogs & consumer fraud registries...',
    source: 'Duck.ai'
  },
  {
    label: 'Duck.ai performs your full analysis prompt',
    detail: 'Executing multi-vector prompt: seller credibility, review bot detection, price realism & image integrity...',
    source: 'Duck.ai'
  },
  {
    label: 'Analysis result compiled',
    detail: 'Duck.ai returning structured threat findings, trust score calculation & warning signals...',
    source: 'Duck.ai'
  },
  {
    label: 'Verify Your CART Results Page rendered',
    detail: 'Formatting interactive scorecard, multi-pillar audit and buyer advice...',
    source: 'Verify Your CART'
  }
];

export const ScanningAnimation: React.FC<{
  targetUrl: string;
  onComplete?: () => void;
}> = ({ targetUrl }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
      setProgress((prev) => Math.min(prev + 16, 95));
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-6 md:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 animate-pulse">
            <Shield size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base md:text-lg tracking-tight text-white">
                Verify Your CART × Duck.ai
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                <Sparkles size={11} /> Live Pipeline
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono truncate max-w-sm md:max-w-md mt-0.5">
              {targetUrl}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black font-mono text-emerald-400">{progress}%</div>
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Processed</div>
        </div>
      </div>

      {/* Pipeline Visual Flow */}
      <div className="relative z-10 mb-6 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Globe size={13} className="text-blue-400" />
          <span>Active Data Workflow:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">USER (Paste URL)</span>
          <ArrowRight size={12} className="text-slate-600" />
          <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50 font-semibold">Verify Your CART</span>
          <ArrowRight size={12} className="text-slate-600" />
          <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-700/50 font-semibold flex items-center gap-1">
            <Cpu size={10} /> Duck.ai (Web Search & Risk Audit)
          </span>
          <ArrowRight size={12} className="text-slate-600" />
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 font-semibold">Display Findings</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-amber-500 to-emerald-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step by step checklist */}
      <div className="relative z-10 space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3.5 p-3 rounded-2xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-slate-800/90 border border-blue-500/40 shadow-lg'
                  : isDone
                  ? 'bg-slate-900/50 opacity-90'
                  : 'opacity-40'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {isDone && (
                  <CheckCircle2 size={18} className="text-emerald-400 fill-emerald-950" />
                )}
                {isCurrent && (
                  <Loader2 size={18} className="text-amber-400 animate-spin" />
                )}
                {isPending && (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[9px] text-slate-500 font-mono">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs md:text-sm font-bold ${isCurrent ? 'text-white' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                    {step.label}
                  </span>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                      step.source === 'Duck.ai' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/40' : 'bg-blue-950/80 text-blue-300 border border-blue-800/40'
                    }`}>
                      {step.source}
                    </span>
                    {isDone && (
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Done</span>
                    )}
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold animate-pulse">Running...</span>
                    )}
                  </div>
                </div>
                {isCurrent && (
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Search size={14} className="text-amber-400" />
          Duck.ai Live Web Crawler & Threat Intelligence Active
        </span>
        <span className="text-slate-500 font-mono text-[11px]">ISO-Cybersec Standard</span>
      </div>
    </div>
  );
};
