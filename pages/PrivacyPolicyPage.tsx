import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: April 2026</p>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              Verify Your Cart respects user privacy and is committed to handling information responsibly.
            </p>

            <h2 className="text-xl font-bold text-slate-900">1. Information We Process</h2>
            <p>
              When you use the product analysis feature, the URL or listing information you submit may be processed
              temporarily to generate an AI-assisted risk assessment. We do not require user account creation for
              basic usage.
            </p>

            <h2 className="text-xl font-bold text-slate-900">2. Cookies and Advertising</h2>
            <p>
              We may use cookies and similar technologies for site functionality, analytics, and advertising.
              Google AdSense may use cookies to serve ads based on user interests and browsing behavior, subject to
              Google’s policies and applicable laws.
            </p>

            <h2 className="text-xl font-bold text-slate-900">3. Third-Party Services</h2>
            <p>
              Our platform may use third-party AI and web services, including Google technologies, to assist with
              product risk evaluation and site functionality. These services may process submitted content according
              to their own privacy practices.
            </p>

            <h2 className="text-xl font-bold text-slate-900">4. Data Security</h2>
            <p>
              We take reasonable technical and operational steps to protect platform integrity. However, no online
              system can guarantee absolute security.
            </p>

            <h2 className="text-xl font-bold text-slate-900">5. Contact</h2>
            <p>
              For privacy-related questions, contact:{' '}
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

export default PrivacyPolicyPage;
