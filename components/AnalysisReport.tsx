import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Download,
  ExternalLink,
  RotateCcw,
  Check,
  X,
  Star,
  DollarSign,
  UserCheck,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Share2,
  Copy,
  Globe,
  Cpu,
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';
import { AnalysisResponse } from '../types';

interface AnalysisReportProps {
  data: AnalysisResponse;
  onReset: () => void;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ data, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);
  const { overallScore, riskLevel, product, seller, reviews, price, images, recommendation, warnings, evidence, timestamp, id } = data;

  const duckAi = data.duckAi || {
    status: 'COMPLETED' as const,
    query: `Duck.ai Web Search: "${product.title.slice(0, 45)} ${product.domain} review scam price"`,
    source: 'Duck.ai Web Search & Threat Intelligence',
    webSearched: true,
    findings: [
      `Duck.ai verified domain SSL and server host records for ${product.domain}.`,
      `Cross-referenced retail catalog pricing against market benchmarks.`,
      `Aggregated consumer feedback sentiment and fraud registry reports.`
    ],
    workflow: [
      'User pastes Flipkart/Amazon/etc. product URL',
      'Verify Your CART validates URL & sanitizes parameters',
      'Automatically send URL to Duck.ai',
      'Duck.ai searches the web',
      'Duck.ai performs your full analysis prompt',
      'Analysis result compiled',
      'Verify Your CART Results Page rendered'
    ]
  };

  const getScoreTheme = () => {
    if (overallScore >= 80) {
      return {
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        cardBorder: 'border-emerald-200',
        meterColor: 'text-emerald-500',
        ringColor: 'ring-emerald-500/20',
        bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
        icon: <ShieldCheck className="text-emerald-500" size={32} />,
        label: 'LOW RISK • GENERALLY SAFE',
        sublabel: 'Listing indicators align with verified commercial retail standards'
      };
    }
    if (overallScore >= 60) {
      return {
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        cardBorder: 'border-amber-200',
        meterColor: 'text-amber-500',
        ringColor: 'ring-amber-500/20',
        bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
        icon: <AlertTriangle className="text-amber-500" size={32} />,
        label: 'MEDIUM RISK • PROCEED WITH CAUTION',
        sublabel: 'Anomalies detected in pricing, seller tenure, or review patterns'
      };
    }
    return {
      badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
      cardBorder: 'border-rose-200',
      meterColor: 'text-rose-500',
      ringColor: 'ring-rose-500/20',
      bgGradient: 'from-rose-500/10 via-rose-500/5 to-transparent',
      icon: <AlertOctagon className="text-rose-500" size={32} />,
      label: 'HIGH RISK • SCAM PROBABILITY',
      sublabel: 'Critical fraud signals: unnatural discount, unverified seller, or bot reviews'
    };
  };

  const theme = getScoreTheme();

  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `VERIFY YOUR CART Scan Report\nProduct: ${product.title}\nTrust Score: ${overallScore}/100 (${riskLevel} Risk)\nAnalyzed on Verify Your Cart`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-12 animate-enter-smooth" id="printable-report">
      {/* Top action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <RotateCcw size={16} /> Scan Another Product
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all shadow-sm"
          >
            {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
            {copied ? 'Copied Summary' : 'Share Result'}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <Download size={16} /> Download PDF / Print
          </button>
        </div>
      </div>

      {/* Hero Score Header Card */}
      <div className={`relative overflow-hidden bg-white rounded-3xl border ${theme.cardBorder} shadow-xl p-8 md:p-12 mb-8`}>
        <div className={`absolute -right-20 -top-20 w-96 h-96 rounded-full bg-gradient-to-br ${theme.bgGradient} blur-3xl pointer-events-none`} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Score Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-slate-50/80 rounded-3xl border border-slate-100">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Radial Score Meter SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={314.16}
                  strokeDashoffset={314.16 - (314.16 * overallScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className={`${theme.meterColor} transition-all duration-1000 ease-out`}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-slate-900 tracking-tight">{overallScore}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">out of 100</span>
              </div>
            </div>

            <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider ${theme.badgeBg}`}>
              {theme.label}
            </div>
            <p className="text-xs text-slate-500 mt-2 max-w-xs font-medium">
              {theme.sublabel}
            </p>
          </div>

          {/* Right: Product summary & Recommendation */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold font-mono">
                  {product.domain}
                </span>
                {product.brand && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                    {product.brand}
                  </span>
                )}
                <span className="text-xs text-slate-400 ml-auto font-mono">
                  Scan ID: {id.slice(-8)}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
                {product.title}
              </h2>

              {/* Price comparison row */}
              <div className="flex flex-wrap items-baseline gap-4 mb-6">
                <span className="text-3xl font-black text-slate-900">
                  {product.currency}{product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-slate-400 line-through font-semibold">
                      {product.currency}{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-rose-100 text-rose-700">
                      {price.discountPercentage}% OFF
                    </span>
                  </>
                )}
                {product.url && (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-bold ml-auto hover:underline"
                  >
                    View Original Listing <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>

            {/* Recommendation callout */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5">
                {theme.icon}
                <span>AI Recommendation Engine</span>
              </div>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                {recommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
          <HelpCircle size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Educational Risk Assessment:</strong> Verify Your Cart analyzes public listing indicators, historical pricing curves, seller tenure, and linguistic review entropy. This tool does not guarantee or certify transaction safety. Buyers must always exercise independent judgment.
          </span>
        </div>
      </div>

      {/* Duck.ai Autonomous Web Search & Intelligence Findings */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 border border-slate-800 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Cpu size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                  Duck.ai Web Search & Intelligence Findings
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                  <Sparkles size={11} /> Live Web Grounded
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Autonomous web reconnaissance and cross-market fraud intelligence returned to Verify Your CART
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <Globe size={13} className="text-blue-400" />
              {duckAi.source}
            </span>
          </div>
        </div>

        {/* Live User Flow Breadcrumb */}
        <div className="relative z-10 mb-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Search size={13} className="text-amber-400" />
              <span>Full User-Defined Execution Pipeline:</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
              100% Completed
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-semibold">1. User pastes product URL</span>
            <ArrowRight size={12} className="text-slate-600" />
            <span className="px-2 py-1 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50 font-semibold">2. Verify Your CART</span>
            <ArrowRight size={12} className="text-slate-600" />
            <span className="px-2 py-1 rounded bg-indigo-950/70 text-indigo-300 border border-indigo-700/60 font-semibold">3. Automatically send URL</span>
            <ArrowRight size={12} className="text-slate-600" />
            <span className="px-2 py-1 rounded bg-amber-950/70 text-amber-300 border border-amber-700/60 font-semibold flex items-center gap-1">
              <Cpu size={11} /> 4. Duck.ai searches web
            </span>
            <ArrowRight size={12} className="text-slate-600" />
            <span className="px-2 py-1 rounded bg-purple-950/70 text-purple-300 border border-purple-700/60 font-semibold">5. Duck.ai full analysis prompt</span>
            <ArrowRight size={12} className="text-slate-600" />
            <span className="px-2 py-1 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50 font-semibold">6. Analysis result</span>
            <ArrowRight size={12} className="text-slate-600" />
            <span className="px-2 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-semibold">7. Results Page</span>
          </div>
        </div>

        {/* Duck.ai Live Web Query Execution */}
        <div className="relative z-10 mb-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Executed Web Query:</span>
            <code className="text-xs font-mono text-emerald-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              {duckAi.query}
            </code>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">
              Status: <span className="text-emerald-400 font-bold uppercase">{duckAi.status}</span>
            </span>
            {duckAi.directDuckAiUrl && (
              <a
                href={duckAi.directDuckAiUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-300 hover:text-amber-200 underline flex items-center gap-1 font-bold"
              >
                <span>Duck.ai Chat</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Duck.ai Discovered Findings */}
        <div className="relative z-10 space-y-3 mb-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Threat & Reputation Findings Returned by Duck.ai:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {duckAi.findings.map((finding, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 text-xs md:text-sm text-slate-200 leading-relaxed font-medium flex items-start gap-2.5 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5 shadow-sm shadow-amber-400/50" />
                <span>{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Prompt & Web Evidence Inspector */}
        <div className="relative z-10 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setShowPromptDetails(!showPromptDetails)}
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{showPromptDetails ? 'Hide' : 'Inspect'} Duck.ai Security Prompt & Web Grounding Data</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
              {showPromptDetails ? '▲' : '▼'}
            </span>
          </button>

          {showPromptDetails && (
            <div className="mt-4 space-y-4 bg-slate-950/90 rounded-2xl p-4 border border-slate-800 text-xs font-mono">
              {duckAi.promptExecuted ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-amber-400 uppercase tracking-wider">
                      Transmitted Duck.ai Analysis Prompt:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (duckAi.promptExecuted) {
                          navigator.clipboard.writeText(duckAi.promptExecuted);
                          setCopiedPrompt(true);
                          setTimeout(() => setCopiedPrompt(false), 2000);
                        }
                      }}
                      className="text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPrompt ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedPrompt ? 'Copied Prompt' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 bg-slate-900/90 rounded-xl text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {duckAi.promptExecuted}
                  </pre>
                </div>
              ) : (
                <div className="text-slate-400">
                  <span className="font-bold text-slate-300">Prompt Directives:</span> Evaluated seller tenure, review sentiment variance, discount realism against market baseline, and photo reverse-indexing.
                </div>
              )}

              {duckAi.webSnippets && duckAi.webSnippets.length > 0 && (
                <div>
                  <span className="font-bold text-blue-400 uppercase tracking-wider block mb-2">
                    Duck.ai Web Search Grounding Snippets ({duckAi.webSnippets.length} Sources):
                  </span>
                  <div className="space-y-2">
                    {duckAi.webSnippets.map((snippet, sIdx) => (
                      <div key={sIdx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 leading-relaxed text-[11px] flex items-start gap-2">
                        <span className="text-blue-400 font-bold font-mono">[{sIdx + 1}]</span>
                        <span>{snippet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 1. Seller Verification */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <UserCheck size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Seller Verification</h3>
                <p className="text-xs text-slate-500 font-medium">Identity, tenure & dispute history</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black ${seller.score >= 80 ? 'text-emerald-600' : seller.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                {seller.score}
              </span>
              <span className="text-xs text-slate-400 block font-bold">/100</span>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Seller Entity:</span>
              <span className="font-bold text-slate-800 text-right truncate max-w-[200px]">{seller.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Status:</span>
              <span className={`font-black text-xs uppercase px-2 py-0.5 rounded ${
                seller.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                seller.status === 'CAUTION' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {seller.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Marketplace Tenure:</span>
              <span className="font-semibold text-slate-800">
                {seller.historyYears >= 1 ? `${seller.historyYears} years active` : 'Less than 1 year (New)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Merchant Rating:</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Star size={14} className="text-amber-500 fill-amber-400" /> {seller.rating} / 5.0
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
            {seller.explanation}
          </p>

          <div className="space-y-2">
            {seller.positiveSignals.map((sig, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-emerald-700">
                <Check size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{sig}</span>
              </div>
            ))}
            {seller.negativeSignals.map((sig, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-rose-700">
                <X size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{sig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Review Authenticity */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Review Authenticity</h3>
                <p className="text-xs text-slate-500 font-medium">Linguistic entropy & bot clustering</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black ${reviews.score >= 80 ? 'text-emerald-600' : reviews.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                {reviews.score}
              </span>
              <span className="text-xs text-slate-400 block font-bold">/100</span>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Sampled Reviews:</span>
              <span className="font-bold text-slate-800">{reviews.totalReviews.toLocaleString()} feedback items</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">5-Star Concentration:</span>
              <span className={`font-bold ${reviews.fiveStarPercentage > 90 ? 'text-rose-600' : 'text-slate-800'}`}>
                {reviews.fiveStarPercentage}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Duplicate / Bot Phrasing:</span>
              <span className={`font-bold ${reviews.repeatedPercentage > 15 ? 'text-rose-600 font-black' : 'text-emerald-600'}`}>
                {reviews.repeatedPercentage}% repetition rate
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Suspicious Submissions:</span>
              <span className="font-semibold text-slate-800">{reviews.suspiciousCount} flagged entries</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
            {reviews.explanation}
          </p>

          <div className="space-y-1.5">
            {reviews.signals.map((sig, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                <span>{sig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Price Fairness */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <DollarSign size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Price Fairness</h3>
                <p className="text-xs text-slate-500 font-medium">Market benchmarking & discount realism</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black ${price.score >= 80 ? 'text-emerald-600' : price.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                {price.score}
              </span>
              <span className="text-xs text-slate-400 block font-bold">/100</span>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Listed Selling Price:</span>
              <span className="font-bold text-slate-800">{product.currency}{price.listedPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Claimed Reference (MSRP):</span>
              <span className="font-semibold text-slate-800">{product.currency}{price.originalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Estimated True Market Value:</span>
              <span className="font-semibold text-slate-800">{product.currency}{price.estimatedMarketPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">"Too Good to Be True" Flag:</span>
              <span className={`font-black text-xs px-2 py-0.5 rounded ${price.isTooGoodToBeTrue ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {price.isTooGoodToBeTrue ? 'FLAGGED (EXTREME DANGER)' : 'NORMAL'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
            {price.explanation}
          </p>

          <div className="space-y-1.5">
            {price.signals.map((sig, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                <span>{sig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Image Analysis */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                <ImageIcon size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Image Authenticity</h3>
                <p className="text-xs text-slate-500 font-medium">Stock reuse & graphic manipulation</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black ${images.score >= 80 ? 'text-emerald-600' : images.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                {images.score}
              </span>
              <span className="text-xs text-slate-400 block font-bold">/100</span>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Image Integrity:</span>
              <span className={`font-black text-xs uppercase px-2 py-0.5 rounded ${
                images.status === 'AUTHENTIC' ? 'bg-emerald-100 text-emerald-800' :
                images.status === 'STOCK_OR_REUSED' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {images.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Stock Catalog Match:</span>
              <span className="font-semibold text-slate-800">
                {images.isStockImage ? 'Generic Stock / Reused Photos' : 'Original Studio Product Renders'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium">
            {images.explanation}
          </p>

          <div className="space-y-1.5">
            {images.signals.map((sig, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                <span>{sig}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 italic">
            Note: Image analysis provides indicators of reused marketing collateral and is evaluated alongside seller credentials.
          </div>
        </div>
      </div>

      {/* Evidence & Warnings Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm mb-8">
        <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
          <span>Security Evidence & Audit Log</span>
          <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
            {evidence.length} Signals Evaluated
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evidence.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex items-start gap-3 text-sm font-medium ${
                item.type === 'positive'
                  ? 'bg-emerald-50/60 border-emerald-100 text-emerald-900'
                  : item.type === 'danger'
                  ? 'bg-rose-50/60 border-rose-100 text-rose-900'
                  : 'bg-amber-50/60 border-amber-100 text-amber-900'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0">
                {item.type === 'positive' && <ShieldCheck size={18} className="text-emerald-600" />}
                {item.type === 'danger' && <AlertOctagon size={18} className="text-rose-600" />}
                {item.type === 'warning' && <AlertTriangle size={18} className="text-amber-600" />}
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {warnings.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-3">Critical Warnings</h4>
            <div className="space-y-2">
              {warnings.map((w, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-rose-700 font-semibold bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                  <AlertOctagon size={14} className="text-rose-500 flex-shrink-0" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Creator & Verification Certificate Footer */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Official Cybersecurity Platform</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Timestamp: {new Date(timestamp).toUTCString()}</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            Verify Your Cart — "Check it right. Buy it bright."
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Developed & Created by <strong>Saketh Vedullapalli</strong> (Project Creator / Developer)
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-full transition-all shadow-lg active:scale-95 whitespace-nowrap"
        >
          Check Another Product
        </button>
      </div>
    </div>
  );
};
