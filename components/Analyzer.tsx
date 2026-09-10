import React, { useState } from 'react';
import { Search, ShieldAlert, Sparkles, AlertCircle, ArrowRight, CheckCircle2, Flame, ShieldCheck, Globe, Cpu } from 'lucide-react';
import { AnalysisResponse, DemoProductPreview } from '../types';
import { DEMO_PREVIEWS } from '../services/demoProducts';
import { ScanningAnimation } from './ScanningAnimation';
import { AnalysisReport } from './AnalysisReport';
import { runFullAnalysis } from '../services/analysisEngine';

export const Analyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [analyzingUrl, setAnalyzingUrl] = useState('');

  const handleAnalyze = async (targetUrl?: string, demoId?: string) => {
    const inputUrl = (targetUrl || url).trim();
    if (!inputUrl && !demoId) {
      setError('Please paste an e-commerce product URL or pick one of the demo products below.');
      return;
    }

    setError(null);
    setLoading(true);
    setAnalyzingUrl(inputUrl || (demoId ? `Demo: ${demoId}` : 'Target product'));

    try {
      const startTime = Date.now();
      let data: AnalysisResponse;

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: inputUrl, demoId })
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          // Fallback to client heuristic if API returned non-JSON/HTML error page (e.g. static hosting)
          console.warn(`[Vercel/Static fallback] API returned status ${response.status}. Executing client security engine.`);
          data = await runFullAnalysis(inputUrl, demoId);
        }
      } catch (fetchErr) {
        // Fallback to client heuristic if network request failed completely
        console.warn('[Vercel/Static fallback] API fetch unavailable. Executing client security engine:', fetchErr);
        data = await runFullAnalysis(inputUrl, demoId);
      }

      // Ensure scanning animation has at least 2.2 seconds to display its steps gracefully
      const elapsed = Date.now() - startTime;
      const minDisplayTime = 2200;
      if (elapsed < minDisplayTime) {
        await new Promise((resolve) => setTimeout(resolve, minDisplayTime - elapsed));
      }

      setResult(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Unable to complete security scan. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemo = (demo: DemoProductPreview) => {
    setUrl(demo.url);
    handleAnalyze(demo.url, demo.id);
  };

  const handleReset = () => {
    setResult(null);
    setUrl('');
    setError(null);
  };

  if (loading) {
    return <ScanningAnimation targetUrl={analyzingUrl} />;
  }

  if (result) {
    return <AnalysisReport data={result} onReset={handleReset} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-6" id="product-analyzer">
      {/* Primary Input Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl shadow-blue-900/5 p-6 md:p-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles size={13} /> AI E-Commerce Safety Radar
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Check Any Product Before You Pay
          </h2>
          <p className="text-slate-600 mt-2 text-base font-medium">
            Paste an Amazon, Flipkart, Walmart, or any online store URL to inspect reviews, seller credibility, and price anomalies.
          </p>

          {/* Workflow Pipeline */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 text-[11px] font-mono text-slate-500 bg-slate-50 border border-slate-200/90 px-3.5 py-2 rounded-2xl max-w-4xl mx-auto shadow-inner">
            <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded shadow-xs">1. User pastes URL</span>
            <ArrowRight size={11} className="text-slate-400" />
            <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded shadow-xs">2. Verify Your CART</span>
            <ArrowRight size={11} className="text-slate-400" />
            <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shadow-xs">3. Automatically send URL</span>
            <ArrowRight size={11} className="text-slate-400" />
            <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Cpu size={10} /> 4. Duck.ai web search
            </span>
            <ArrowRight size={11} className="text-slate-400" />
            <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded shadow-xs">5. Duck.ai full analysis prompt</span>
            <ArrowRight size={11} className="text-slate-400" />
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shadow-xs">6. Results Page</span>
          </div>
        </div>

        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="relative flex flex-col md:flex-row items-center gap-3"
        >
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste product link here (e.g. amazon.com/dp/..., flipkart.com/..., or any store)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium text-sm md:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base whitespace-nowrap shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Analyze Product</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-sm">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Products Section (Instant 1-click test) */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Or Try One-Click Demo Scans:
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Instant Safe / Suspicious / Scam Cases
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {DEMO_PREVIEWS.map((demo) => {
              const isSafe = demo.riskType === 'safe';
              const isSuspicious = demo.riskType === 'suspicious';

              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleSelectDemo(demo)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 hover:shadow-md active:scale-95 group ${
                    isSafe
                      ? 'bg-emerald-50/40 border-emerald-200 hover:bg-emerald-50'
                      : isSuspicious
                      ? 'bg-amber-50/40 border-amber-200 hover:bg-amber-50'
                      : 'bg-rose-50/40 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        isSafe
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSuspicious
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isSafe && <ShieldCheck size={11} />}
                      {isSuspicious && <AlertCircle size={11} />}
                      {!isSafe && !isSuspicious && <Flame size={11} />}
                      {demo.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold group-hover:text-blue-600">
                      Test →
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                    {demo.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-2 font-medium">
                    {demo.platform} • <span className="font-bold text-slate-700">{demo.price}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {demo.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Supported Marketplaces badge row */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span className="font-medium">Supported platforms & custom web storefronts:</span>
          <div className="flex flex-wrap items-center gap-4 font-bold text-slate-600">
            <span>Amazon</span>
            <span>•</span>
            <span>Flipkart</span>
            <span>•</span>
            <span>Walmart</span>
            <span>•</span>
            <span>Best Buy</span>
            <span>•</span>
            <span>Shopify</span>
            <span>•</span>
            <span>Independent Stores</span>
          </div>
        </div>
      </div>
    </div>
  );
};
