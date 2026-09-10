import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Terms & Conditions</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: April 2026</p>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              By accessing and using Verify Your Cart, you agree to these Terms & Conditions.
            </p>

            <h2 className="text-xl font-bold text-slate-900">1. Informational Use Only</h2>
            <p>
              Verify Your Cart provides educational and informational content only. Analysis results are generated
              using automated systems and public signals, and should not be considered definitive proof of product
              authenticity or fraud.
            </p>

            <h2 className="text-xl font-bold text-slate-900">2. No Guarantee</h2>
            <p>
              We do not guarantee the accuracy, completeness, or reliability of any result, recommendation, or
              score displayed on this platform.
            </p>

            <h2 className="text-xl font-bold text-slate-900">3. User Responsibility</h2>
            <p>
              Users are responsible for independently verifying sellers, platforms, product details, return policies,
              and official brand sources before making purchasing decisions.
            </p>

            <h2 className="text-xl font-bold text-slate-900">4. Intellectual Property</h2>
            <p>
              Site content, branding, and original materials are the property of Verify Your Cart unless otherwise
              stated.
            </p>

            <h2 className="text-xl font-bold text-slate-900">5. Contact</h2>
            <p>
              Questions about these terms can be sent to:{' '}
              <a href="mailto:sakethvedullapalli@gmail.com" className="text-blue-600 underline font-semibold">
                sakethvedullapalli@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
