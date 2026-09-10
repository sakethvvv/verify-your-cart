import React from 'react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Disclaimer</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: April 2026</p>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              Verify Your Cart is an educational AI-assisted tool designed to help users identify potentially
              suspicious product listings and improve digital shopping awareness.
            </p>

            <h2 className="text-xl font-bold text-slate-900">No Legal or Financial Advice</h2>
            <p>
              The content and analysis provided on this website do not constitute legal advice, financial advice,
              consumer protection certification, or official authenticity verification.
            </p>

            <h2 className="text-xl font-bold text-slate-900">No Guarantee of Accuracy</h2>
            <p>
              AI-generated outputs can be incomplete, inaccurate, or uncertain. A listing marked as “Genuine” may
              still be risky, and a listing marked as “Fake” or “Suspicious” may require additional human review.
            </p>

            <h2 className="text-xl font-bold text-slate-900">Use Independent Verification</h2>
            <p>
              Always verify product authenticity through official brand channels, seller reputation, platform
              policies, return protections, and trusted payment methods before purchasing.
            </p>

            <h2 className="text-xl font-bold text-slate-900">Educational Purpose</h2>
            <p>
              This platform is intended to support consumer awareness and safer browsing practices only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
