import React from 'react';

const SafeShoppingGuidePage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-xs uppercase tracking-wide mb-6">
            Shopping Safety Guide
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Safe Online Shopping Guide: Smart Habits Every Buyer Should Follow
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Online shopping is convenient, but it also exposes buyers to counterfeit products, misleading offers,
            fake stores, refund scams, and payment fraud. The good news is that most shopping risks can be reduced
            if you follow a few smart habits consistently. This guide covers the practical steps every buyer should
            use before, during, and after making a purchase online.
          </p>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Research before you buy</h2>
              <p>
                Never rely on a single listing or a single platform screenshot. Before purchasing, compare the
                product with official sources, brand websites, and trusted sellers. This helps you understand the
                real market price, packaging style, and typical specifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Prefer trusted marketplaces and verified sellers</h2>
              <p>
                Large marketplaces are not perfect, but they usually provide stronger buyer protection than unknown
                websites. If you shop on independent stores, verify whether the site has transparent policies,
                customer support details, and realistic business information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Check refund and return policies</h2>
              <p>
                A trustworthy store should clearly explain how returns, exchanges, cancellations, and refunds work.
                Scam sites often hide these details or make them intentionally vague. If the return policy is hard
                to find, incomplete, or unrealistic, treat that as a warning sign.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Be careful with urgency and pressure tactics</h2>
              <p>
                Fake or manipulative sellers often use countdown timers, “last chance” language, and extreme fear
                of missing out to make you buy fast. Legitimate sellers may run promotions, but scam pages often
                overuse urgency to stop you from researching the product properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Use secure payment methods only</h2>
              <p>
                The payment stage is where many scams become dangerous. Always use methods that provide buyer
                protection or dispute options. Avoid any seller asking for direct transfers, personal UPI requests,
                crypto payments, or off-platform settlement without safeguards.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Prefer platform checkout systems</li>
                <li>Use credit/debit methods with dispute support</li>
                <li>Keep screenshots of the listing and payment receipt</li>
                <li>Never share OTPs or sensitive banking details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Verify the final product after delivery</h2>
              <p>
                Buyer safety does not end after the payment succeeds. Once the item arrives, compare it with the
                original listing and the official brand version. Check packaging, serial numbers, seals, labels,
                material quality, and included accessories.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Keep documentation for disputes</h2>
              <p>
                If something goes wrong, evidence matters. Save the product URL, screenshots, invoice, order ID,
                seller messages, and product photos after delivery. These details help when contacting customer
                support or requesting a refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">8. Learn the difference between suspicious and confirmed fake</h2>
              <p>
                Many listings are not obviously fake, but they may still be risky. A suspicious listing may have
                incomplete information or weak trust signals without being conclusively fraudulent. This is why
                careful judgment matters. Risk-aware buyers avoid making absolute assumptions too early and instead
                verify through multiple sources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Best practice checklist</h2>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Compare with official brand listings</li>
                <li>Check seller history and profile quality</li>
                <li>Review return/refund policy before checkout</li>
                <li>Use secure payment methods only</li>
                <li>Keep all purchase records</li>
                <li>Inspect the product immediately after delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Conclusion</h2>
              <p>
                Safe online shopping is not about avoiding the internet. It is about reducing risk through habits.
                When buyers compare sources, verify sellers, inspect policies, and avoid rushed decisions, they
                significantly reduce the chance of losing money to fake products or scam stores. Tools like Verify
                Your Cart can help highlight risk signals, but the strongest protection still comes from informed,
                careful buying behavior.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SafeShoppingGuidePage;
