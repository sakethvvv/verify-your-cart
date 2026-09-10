import React from 'react';
import { ShieldCheck, UserCheck, Sparkles, Mail, Award, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 md:p-14 mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-4 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider">
              About The Project
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
              Verify Your Cart
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Check it right. Buy it bright.
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-8">
            Verify Your Cart is an educational AI cybersecurity and e-commerce consumer safety platform engineered to help digital shoppers spot counterfeit listings, suspicious sellers, fake reviews, and predatory price anomalies before making a payment.
          </p>

          {/* Mission & Purpose */}
          <div className="border-t border-slate-100 pt-8 space-y-6 text-slate-700 leading-relaxed text-base">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={22} />
              The Problem We Address
            </h3>
            <p>
              Online shopping fraud has reached unprecedented scale. Modern scammers no longer build easily recognizable spam websites—they launch sophisticated clone storefronts, purchase bulk reviews from bot networks, inflate original reference prices to simulate fictitious 90% flash discounts, and misuse untraceable peer-to-peer payment protocols.
            </p>
            <p>
              Verify Your Cart provides a multi-layer inspection architecture analyzing:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Review Authenticity</h4>
                <p className="text-xs text-slate-600">
                  Detects linguistic repetition, bot sentiment clustering, and unnatural 5-star concentration curves.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Seller Trust & Tenure</h4>
                <p className="text-xs text-slate-600">
                  Evaluates merchant registration longevity, domain history, corporate transparency, and dispute resolution channels.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Price Realism</h4>
                <p className="text-xs text-slate-600">
                  Flags "Too Good to Be True" pricing anomalies, deceptive MSRP markups, and clickbait bait-and-switch tactics.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm mb-1">4. Image Authenticity</h4>
                <p className="text-xs text-slate-600">
                  Cross-references stock photo re-use, digital watermark modifications, and unlicensed marketing collateral.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed font-medium">
              <strong>Educational Disclaimer:</strong> Verify Your Cart analyzes public web listing heuristics and machine learning indicators. The platform is designed as an educational decision-support layer and does not replace official trademark authorities, police cyber bureaus, or individual consumer diligence.
            </div>
          </div>
        </div>

        {/* Exclusive Creator Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 md:p-12 mb-10 text-center">
          <div className="max-w-xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-6">
              Creator & Lead Engineer
            </span>

            <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white font-black text-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/25">
              SV
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-1">
              Saketh Vedullapalli
            </h2>
            <p className="text-base font-bold text-blue-600 uppercase tracking-wider mb-4">
              Project Creator / Developer
            </p>

            <div className="inline-block px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold mb-6">
              Electronics & Communication Engineering • Cybersecurity Focus
            </div>

            <p className="text-slate-600 leading-relaxed text-sm mb-8 font-medium">
              Saketh Vedullapalli is the sole creator and developer behind Verify Your Cart. Inspired by the rising wave of digital marketplace fraud and deceptive seller patterns affecting everyday online shoppers, he architected this end-to-end full-stack platform to democratize consumer security intelligence and help shoppers make safer, better-informed buying decisions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:sakethvedullapalli@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-md active:scale-95"
              >
                <Mail size={15} /> sakethvedullapalli@gmail.com
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
          >
            ← Return to Product Analyzer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
