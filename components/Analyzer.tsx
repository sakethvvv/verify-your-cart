import React, { useState, useRef, useEffect } from 'react';
import { AlertTriangle, CheckCircle, ShieldCheck, Shield, Zap, Lock, Globe, Database, Lightbulb, Sparkles, Star, BrainCircuit, DollarSign, Store, FileText, ExternalLink } from 'lucide-react';
import { AnalysisResult } from '../types';
import { analyzeProduct } from '../services/analysisService';
import { ScoreGauge } from './ScoreGauge';
import { BrandLogo } from './BrandLogo';

export const Analyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && !loading && resultRef.current) {
      // Small timeout to ensure the DOM element is rendered and animation has started
      setTimeout(() => {
        const yOffset = -100; // Offset for fixed navbar
        const element = resultRef.current;
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [result, loading]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    let processedUrl = url.trim();
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
        processedUrl = `https://${processedUrl}`;
    }

    if (!processedUrl.includes('.')) {
        setError('Please enter a valid URL (e.g., amazon.com/product...)');
        return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeProduct(processedUrl);
      setResult(data);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to map API verdict to User-Friendly Display Verdict
  const getDisplayVerdict = (verdict: string) => {
    switch (verdict) {
        case 'Genuine': return { text: 'Safe Product', icon: <CheckCircle className="w-5 h-5"/>, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' };
        case 'Fake': return { text: 'Likely Fake Product', icon: <AlertTriangle className="w-5 h-5"/>, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
        default: return { text: 'Risky Product', icon: <ShieldCheck className="w-5 h-5"/>, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' };
    }
  };

  return (
    <div className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden transition-all duration-700">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob transition-opacity duration-1000"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 transition-opacity duration-1000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 transition-opacity duration-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="flex flex-col items-center text-center space-y-6 lg:space-y-8 mb-12 lg:mb-16 transition-all duration-500">
          
          {/* Hero Icon */}
          <div className="animate-float mb-2">
            <div className="relative inline-flex items-center justify-center group cursor-default">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse-slow rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="bg-gradient-to-br from-white to-blue-50 p-4 md:p-5 rounded-[2rem] shadow-2xl border border-white/50 relative transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                    <ShieldCheck size={40} className="text-blue-600 md:w-12 md:h-12" />
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-1.5 rounded-full border-2 border-white shadow-lg">
                        <Sparkles size={10} className="text-white animate-spin-slow md:w-3 md:h-3" />
                    </div>
                </div>
            </div>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/80 border border-blue-100 text-blue-700 text-[10px] md:text-xs font-bold tracking-wide uppercase shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default">
              <Zap size={12} className="fill-blue-600 text-blue-600 md:w-3.5 md:h-3.5" />
              AI-Powered Security Engine
            </div>
          </div>
          
          {/* Updated Hero Title with BrandLogo */}
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl animate-fade-in-up flex flex-col items-center justify-center" style={{ animationDelay: '0.2s' }}>
            <span className="mb-1 md:mb-2">Verify Your</span>
            <div className="h-16 md:h-32 w-full flex justify-center">
                <BrandLogo className="h-full w-auto" variant="dark" />
            </div>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-slate-700 mt-2 animate-fade-in-up tracking-tight" style={{ animationDelay: '0.25s' }}>
            Check it right. Buy it bright.
          </p>
          
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium animate-fade-in-up mt-2 md:mt-4 px-4" style={{ animationDelay: '0.3s' }}>
            A student-built intelligent tool that analyzes review sentiment, seller history, and pricing data to detect potential e-commerce fraud.
          </p>

          <div className="w-full max-w-2xl mx-auto mt-6 md:mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleAnalyze} className="relative group z-20">
              {/* Decorative Glow - Added pointer-events-none to prevent blocking clicks */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-500 pointer-events-none"></div>
              
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2 md:p-2.5 transition-all duration-300 transform group-hover:scale-[1.01] focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:border-blue-500 focus-within:scale-[1.01]">
                <div className="pl-3 md:pl-4 text-slate-400">
                  <Globe size={20} className="group-focus-within:text-blue-600 group-focus-within:animate-pulse transition-colors duration-300 md:w-6 md:h-6" />
                </div>
                <input
                  type="text"
                  placeholder="Paste product URL..."
                  className="w-full px-3 py-3 md:px-4 md:py-4 text-base md:text-lg bg-transparent focus:outline-none placeholder:text-slate-400 text-slate-800 font-medium transition-colors duration-300"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading || !url}
                  className={`hidden md:flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform ${
                    loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none scale-95' : 'bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95'
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
                        <span className="text-slate-500">Scanning...</span>
                    </div>
                  ) : 'Scan Now'}
                </button>
              </div>
              
              {/* Mobile Button - Added relative z-10 to ensure it sits above the absolute glow */}
              <button
                  type="submit"
                  disabled={loading || !url}
                  className={`mt-4 w-full md:hidden flex justify-center items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 shadow-lg relative z-10 ${
                    loading ? 'bg-slate-100 text-slate-400 scale-95' : 'bg-gradient-to-r from-blue-600 to-indigo-600 active:scale-95 hover:shadow-xl'
                  }`}
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Scan Now'}
              </button>
            </form>
            
            <p className="mt-6 text-xs md:text-sm text-slate-500 font-medium flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300 px-4 text-center">
              <Shield size={12} className="text-emerald-500 fill-emerald-500 md:w-3.5 md:h-3.5" /> 
              Supported: Amazon, Flipkart, & Major Sites
            </p>
          </div>

          {error && (
              <div className="bg-red-50/80 backdrop-blur-sm text-red-600 px-6 py-4 rounded-2xl text-sm font-semibold flex items-center gap-3 animate-shake-strong border border-red-100 shadow-sm transition-all duration-300 mx-4">
                  <AlertTriangle size={18} /> {error}
              </div>
          )}
        </div>

        {/* AI Loading State */}
        <div className={`transition-all duration-700 ease-in-out ${loading ? 'opacity-100 translate-y-0 max-h-[300px]' : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden'}`}>
             <div className="flex flex-col items-center justify-center py-8 md:py-12">
                 <div className="relative mb-6">
                     <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-slate-100"></div>
                     <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                         <Globe size={20} className="text-blue-500 animate-pulse md:w-6 md:h-6" />
                     </div>
                 </div>
                 <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 animate-pulse">Analyzing Product Data...</h3>
                 <p className="text-slate-500 text-xs md:text-sm px-4 text-center">Checking seller history, reviews, and price anomalies.</p>
             </div>
        </div>

        {/* Result Section - Completely Redesigned for "AI Product Analysis Result" format */}
        {result && !loading && (
          <div ref={resultRef} className="animate-scale-in transform transition-all origin-top duration-700 ease-out">
            <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/50 hover:shadow-3xl transition-shadow duration-500 mx-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200/50">
                {/* Visual Score & Verdict */}
                <div className="md:col-span-5 p-6 md:p-12 flex flex-col items-center bg-gradient-to-b from-white/80 to-slate-50/80 backdrop-blur-md relative">
                    <ScoreGauge score={result.trust_score} />
                    
                    {/* Final AI Verdict Label */}
                    <div className="mt-8 text-center w-full">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Final AI Verdict</p>
                        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border ${getDisplayVerdict(result.verdict).bg} ${getDisplayVerdict(result.verdict).border} ${getDisplayVerdict(result.verdict).color} shadow-sm transition-all duration-300 hover:scale-105`}>
                           {getDisplayVerdict(result.verdict).icon}
                           <span className="text-lg font-bold">{getDisplayVerdict(result.verdict).text}</span>
                        </div>
                    </div>
                </div>

                {/* Analysis Breakdown */}
                <div className="md:col-span-7 p-6 md:p-12 bg-white/60">
                    <div className="flex items-center justify-between mb-8 animate-enter-smooth" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2.5 md:p-3 rounded-2xl text-blue-600 shadow-inner">
                                <BrainCircuit size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg md:text-xl">What the AI Checked</h3>
                                <p className="text-xs text-slate-500 font-medium">Detailed scanning report</p>
                            </div>
                        </div>
                        <div className="text-[10px] md:text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded border border-slate-200 hidden sm:block">
                            ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {/* Reviews */}
                        {result.breakdown?.reviews && result.breakdown.reviews.length > 0 && (
                            <BreakdownCard 
                                icon={<Star size={16} />} 
                                title="Reviews & Ratings" 
                                items={result.breakdown.reviews}
                                color="violet"
                                delay={0.2}
                            />
                        )}
                        
                        {/* Sentiment */}
                        {result.breakdown?.sentiment && result.breakdown.sentiment.length > 0 && (
                             <BreakdownCard 
                                icon={<BrainCircuit size={16} />} 
                                title="Review Sentiment" 
                                items={result.breakdown.sentiment}
                                color="pink"
                                delay={0.3}
                            />
                        )}

                        {/* Price */}
                        {result.breakdown?.price && result.breakdown.price.length > 0 && (
                             <BreakdownCard 
                                icon={<DollarSign size={16} />} 
                                title="Price Analysis" 
                                items={result.breakdown.price}
                                color="emerald"
                                delay={0.4}
                            />
                        )}

                        {/* Seller */}
                        {result.breakdown?.seller && result.breakdown.seller.length > 0 && (
                             <BreakdownCard 
                                icon={<Store size={16} />} 
                                title="Seller Trust" 
                                items={result.breakdown.seller}
                                color="orange"
                                delay={0.5}
                            />
                        )}

                        {/* Description */}
                        {result.breakdown?.description && result.breakdown.description.length > 0 && (
                             <BreakdownCard 
                                icon={<FileText size={16} />} 
                                title="Product Description" 
                                items={result.breakdown.description}
                                color="blue"
                                delay={0.6}
                            />
                        )}
                    </div>

                    {/* Final Advice */}
                    <div className="bg-slate-800 p-5 md:p-6 rounded-2xl border border-slate-700 animate-enter-smooth hover:shadow-lg transition-all duration-500 text-white relative overflow-hidden group" style={{ animationDelay: '0.7s' }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[50px] opacity-20 -mr-10 -mt-10 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="bg-white/10 p-2.5 rounded-full shadow-sm text-yellow-300 mt-0.5">
                                <Lightbulb size={18} className="md:w-5 md:h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200 text-sm mb-1 uppercase tracking-wider text-[10px]">Recommendation</h4>
                                <p className="text-slate-100 text-sm md:text-base leading-relaxed font-medium">
                                    {result.advice}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              
              {/* Footer with Sources if available - HIDDEN AS REQUESTED */}
              <div className="bg-slate-50/80 p-3 md:p-4 border-t border-slate-200/50 backdrop-blur-sm flex flex-col md:flex-row items-center justify-center gap-2 text-[10px] md:text-xs text-slate-400 font-semibold px-6 md:px-12">
                  <div className="flex items-center gap-2">
                      <Lock size={10} className="md:w-3 md:h-3" />
                      AI-generated estimation. Always verify independently.
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Component for Breakdown Cards
const BreakdownCard: React.FC<{ icon: React.ReactNode; title: string; items: string[]; color: string; delay: number }> = ({ icon, title, items, color, delay }) => {
    const colorClasses: any = {
        violet: 'text-violet-600 bg-violet-50 border-violet-100',
        pink: 'text-pink-600 bg-pink-50 border-pink-100',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        orange: 'text-orange-600 bg-orange-50 border-orange-100',
        blue: 'text-blue-600 bg-blue-50 border-blue-100',
    };
    
    return (
        <div 
            className="group rounded-xl border border-slate-100 bg-white p-4 hover:shadow-md hover:border-slate-200 transition-all duration-300 opacity-0 animate-enter-smooth"
            style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
        >
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
                    {icon}
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
            </div>
            <ul className="space-y-1.5 ml-1">
                {items.map((item, idx) => (
                    <li key={idx} className="text-xs md:text-sm text-slate-600 font-medium flex items-start gap-2">
                         <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 bg-slate-300`}></span>
                         {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}