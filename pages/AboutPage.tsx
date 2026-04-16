import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wide mb-6">
            About Verify Your Cart
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Helping users make safer online shopping decisions
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Verify Your Cart is an educational AI-assisted product safety platform built to help online shoppers
            identify suspicious e-commerce listing patterns. The platform analyzes public signals such as domain
            reputation, listing presentation, pricing anomalies, and seller-related risk indicators to provide a
            general risk assessment.
          </p>

          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              This project was developed by <strong>Saketh Vedullapalli</strong> as part of a technology-focused
              initiative to improve buyer awareness in digital marketplaces. The goal is not to replace human
              judgment, platform policies, or official brand verification methods, but to provide an additional
              layer of educational support for shoppers.
            </p>

            <p>
              The platform is designed to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Highlight suspicious product listing patterns</li>
              <li>Encourage safer buying habits</li>
              <li>Teach users how to identify common scam signals</li>
              <li>Promote digital consumer awareness</li>
              <li>Support educational use in fraud-prevention learning</li>
            </ul>

            <p>
              We continuously aim to improve transparency, usability, and buyer safety education. However, all
              outputs should be treated as informational guidance only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
