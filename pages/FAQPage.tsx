import React from 'react';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'What does Verify Your Cart do?',
      a: 'Verify Your Cart helps users evaluate product listings by checking common risk indicators such as suspicious domains, unrealistic discounts, seller trust signals, and listing presentation issues.'
    },
    {
      q: 'Does the tool guarantee that a product is fake or genuine?',
      a: 'No. The platform provides an educational risk assessment only. It does not guarantee authenticity or fraud with absolute certainty.'
    },
    {
      q: 'What are common signs of a fake product listing?',
      a: 'Common warning signs include unusually low prices, poorly written descriptions, copied images, unknown seller names, missing return information, and suspicious or newly created domains.'
    },
    {
      q: 'Should I trust star ratings alone?',
      a: 'No. Ratings can be manipulated. Always check review quality, verified purchase patterns, seller history, product images, return policy, and platform credibility.'
    },
    {
      q: 'What should I do before buying from a suspicious listing?',
      a: 'Compare with the official brand website, verify seller details, use secure payment methods, review return/refund policies, and avoid deals that seem unrealistically cheap.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 font-bold text-xs uppercase tracking-wide mb-6">
            Buyer Safety FAQ
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600">
            Learn how to identify suspicious product listings and shop more safely online.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">{item.q}</h2>
              <p className="text-slate-700 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Buyer Safety Tips</h2>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 leading-relaxed">
            <li>Compare prices with the official brand store before buying.</li>
            <li>Check whether the seller has a clear return or refund policy.</li>
            <li>Be cautious of copied product images and poor grammar.</li>
            <li>Avoid impulse purchases driven by extreme discount pressure.</li>
            <li>Use secure payment methods and platform buyer protection whenever possible.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
