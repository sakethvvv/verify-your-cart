import React from 'react';

const FakeProductGuidePage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <article className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 md:p-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-bold text-xs uppercase tracking-wide mb-6">
            Buyer Safety Guide
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            How to Spot Fake Product Listings Before You Buy
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Fake product listings are becoming more common across online marketplaces, social commerce platforms,
            and independent e-commerce websites. Many buyers lose money because a product looks genuine at first
            glance, but hidden warning signs appear in the listing, seller profile, pricing, or checkout process.
            This guide explains the most important signs you should check before placing an order.
          </p>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">1. Watch for unrealistic discounts</h2>
              <p>
                One of the biggest warning signs is a product that is priced far below the normal market value.
                If a premium product is being sold at a huge discount without a believable reason, you should be
                cautious. Some scam listings use urgency-based language such as “today only” or “limited stock”
                to pressure buyers into quick decisions.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Compare the price with the official brand website</li>
                <li>Check multiple trusted marketplaces for the normal range</li>
                <li>Be skeptical of extreme discounts on popular branded products</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">2. Inspect the seller profile carefully</h2>
              <p>
                Even when a product page looks professional, the seller profile may reveal important red flags.
                Fake sellers often have weak store history, incomplete business information, suspicious names,
                or very recent account creation dates.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Check how long the seller has been active</li>
                <li>Look for verified seller badges where available</li>
                <li>Review return, refund, and shipping information</li>
                <li>Avoid sellers with no meaningful profile details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">3. Read reviews beyond the star rating</h2>
              <p>
                A high star rating alone does not guarantee that a product is safe. Some listings use fake,
                recycled, or low-quality reviews. You should read actual review text and look for patterns.
              </p>
              <p className="mt-3">
                Red flags include:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Very short repetitive reviews</li>
                <li>Too many reviews posted in a short time</li>
                <li>Generic comments that don’t describe the product</li>
                <li>Mismatch between review photos and the listed item</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Look closely at product images</h2>
              <p>
                Fake listings often use copied images from official brand stores, stock image sites, or other
                sellers. Sometimes the product photos are overly polished but the rest of the listing looks weak.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Check whether the same images appear elsewhere online</li>
                <li>Look for low-resolution or inconsistent image quality</li>
                <li>Compare packaging details with official product photos</li>
                <li>Be careful if images hide labels, logos, or fine details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">5. Review the product description for quality issues</h2>
              <p>
                Many suspicious listings contain poor grammar, copied specifications, inconsistent sizes,
                unrealistic claims, or vague wording. Authentic brands usually provide clear descriptions,
                accurate dimensions, materials, and warranty details.
              </p>
              <p className="mt-3">
                Common issues to watch for:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Spelling mistakes in brand names</li>
                <li>Conflicting specifications in different sections</li>
                <li>Overpromising words like “100% original guaranteed” without proof</li>
                <li>Missing details such as model number or manufacturer info</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">6. Check the website or domain itself</h2>
              <p>
                If you are buying from a standalone website rather than a major marketplace, always inspect the
                domain carefully. Scam sites often imitate trusted brand names with small spelling changes.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Watch for misspelled brand domains</li>
                <li>Check whether the site uses HTTPS</li>
                <li>Look for a real contact page, privacy policy, and refund policy</li>
                <li>Be cautious if the site looks unfinished or recently created</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">7. Use safer payment methods</h2>
              <p>
                Even when a listing seems risky, some buyers still proceed. If you do, use payment methods with
                stronger buyer protection. Avoid direct bank transfers, unverified wallet payments, or requests
                to continue the transaction outside the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Final takeaway</h2>
              <p>
                The best defense against fake product listings is not a single tool or one warning sign. Safe
                shopping comes from checking multiple signals together: pricing, seller credibility, reviews,
                domain trust, product description quality, and payment safety. Verify Your Cart is designed to
                support that process with AI-assisted guidance, but buyers should always make final decisions
                carefully and independently.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FakeProductGuidePage;
