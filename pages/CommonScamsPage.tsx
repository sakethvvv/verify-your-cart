import React from 'react';

const CommonScamsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-600 font-bold text-xs uppercase tracking-wide mb-6">
            Scam Awareness
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Common Online Shopping Scams and How to Avoid Them
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Online shopping scams have evolved far beyond fake websites. Today, buyers face cloned stores,
            manipulated reviews, counterfeit products, fake tracking updates, refund traps, and off-platform
            payment fraud. Understanding how these scams work is one of the best ways to protect yourself.
          </p>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Fake brand website clones</h2>
              <p>
                Some scam websites imitate real brands with very similar domain names, copied images, and fake
                discount banners. They may look convincing but are designed to collect payments or personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Counterfeit marketplace listings</h2>
              <p>
                On large marketplaces, some sellers list counterfeit or misleading versions of real products.
                They may use genuine-looking images while shipping lower-quality substitutes or replicas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Review manipulation</h2>
              <p>
                Fake or recycled reviews can make risky products appear trustworthy. Some sellers inflate ratings
                using low-quality feedback, irrelevant reviews, or bundled review histories from other items.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Off-platform payment traps</h2>
              <p>
                A seller may ask you to continue the transaction through direct messages, UPI, wallet transfer,
                or another external method. This removes buyer protection and makes disputes much harder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Fake shipping and delivery updates</h2>
              <p>
                Some scam operations send false tracking links or mark items as delivered when nothing legitimate
                was shipped. Buyers then struggle to prove the issue if they didn’t save order records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Refund fraud and stalling tactics</h2>
              <p>
                Some sellers intentionally delay support, ask for repeated proofs, or keep changing refund
                conditions until platform protection windows expire. This is why early reporting is important.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">How to protect yourself</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Never rush because of countdown timers or pressure tactics</li>
                <li>Compare listings with official brand pages</li>
                <li>Use secure platform checkout and buyer protection</li>
                <li>Keep screenshots of the product page and order details</li>
                <li>Inspect the delivered item immediately</li>
                <li>Report suspicious sellers before refund windows expire</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Final note</h2>
              <p>
                Most online shopping scams follow recognizable patterns. When buyers learn those patterns and use
                safer purchasing habits, the risk drops significantly. Verify Your Cart is built to support this
                awareness process by helping users evaluate suspicious signals before they commit to a purchase.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CommonScamsPage;
