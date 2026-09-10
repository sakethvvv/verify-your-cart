import { AnalysisResponse, DemoProductPreview } from '../types';

export const DEMO_PREVIEWS: DemoProductPreview[] = [
  {
    id: 'demo-safe-flipkart',
    label: 'Flipkart Example',
    riskType: 'safe',
    title: 'Apple iPhone 15 Pro Max (Natural Titanium, 256 GB)',
    platform: 'Flipkart.com (Flipkart Assured)',
    price: '₹1,48,900 (was ₹1,59,900)',
    url: 'https://www.flipkart.com/apple-iphone-15-pro-max-natural-titanium-256-gb/p/itmd71ff215bc999',
    summary: 'Verified Flipkart Assured merchant, official Apple India warranty, 180,000+ customer reviews, 7% normal festival discount.'
  },
  {
    id: 'demo-safe-airpods',
    label: 'Amazon Example',
    riskType: 'safe',
    title: 'Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C)',
    platform: 'Amazon.com (Official Apple Store)',
    price: '$189.99 (was $249.00)',
    url: 'https://www.amazon.com/dp/B0CHWRXH8B',
    summary: 'Verified brand store, organic review distribution, realistic 24% discount, and official serial registry.'
  },
  {
    id: 'demo-suspicious-watch',
    label: 'Suspicious Store Example',
    riskType: 'suspicious',
    title: 'Chronograph Royal Automatic Skeleton Luxury Watch',
    platform: 'LuxuryTime-Outlet.myshopify.com',
    price: '$69.99 (claimed MSRP $450.00)',
    url: 'https://luxurytime-outlet.myshopify.com/products/royal-skeleton',
    summary: 'Unrealistic 84% discount, store created 19 days ago, stock photos from AliExpress, and repetitive reviews.'
  },
  {
    id: 'demo-scam-iphone',
    label: 'High-Risk Scam Example',
    riskType: 'danger',
    title: 'Apple iPhone 15 Pro Max 256GB - Factory Unlocked (Flash Clearance)',
    platform: 'AppleMegaDeals-Warehouse-India.site',
    price: '₹999 (was ₹1,59,900)',
    url: 'https://applemegadeals-warehouse.site/deals/iphone-15-pro-max-clearance',
    summary: 'Severe 99% fake discount scam, untraceable prepaid payment only, fake celebrity endorsements, stolen template.'
  }
];

export const DEMO_ANALYSIS_DATABASE: Record<string, AnalysisResponse> = {
  'demo-safe-airpods': {
    id: 'demo-safe-airpods',
    product: {
      title: 'Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C)',
      url: 'https://www.amazon.com/dp/B0CHWRXH8B',
      domain: 'amazon.com',
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
      currency: '$',
      price: 189.99,
      originalPrice: 249.00,
      brand: 'Apple',
      category: 'Electronics / Audio'
    },
    seller: {
      name: 'Amazon.com (Sold & Shipped by Amazon / Apple Store Authorized)',
      score: 96,
      status: 'VERIFIED',
      rating: 4.8,
      historyYears: 18,
      totalProducts: 50000,
      positiveSignals: [
        'Official Apple brand authorization badge',
        'Fulfilled and shipped directly by Amazon logistics',
        'Over 10+ years active verified marketplace presence',
        'Standard 30-day hassle-free return window active'
      ],
      negativeSignals: [
        'High return volume typical of consumer electronics category'
      ],
      explanation: 'The seller is an official first-party distributor with verified brand authorization, long tenure, and guaranteed warranty support.'
    },
    reviews: {
      score: 89,
      status: 'AUTHENTIC',
      totalReviews: 14250,
      averageRating: 4.6,
      fiveStarPercentage: 74,
      repeatedPercentage: 1.8,
      suspiciousCount: 42,
      explanation: 'Reviews exhibit natural linguistic entropy, diverse vocabulary, photographic evidence from buyers, and normal bell-curve sentiment variance.',
      signals: [
        'Organic distribution of 1-star, 2-star, 3-star, and 4-star ratings',
        'Verified Purchase badges present on 98.2% of submissions',
        'High frequency of detailed, critical user feedback mentioning minor flaws',
        'No unnatural review clustering or automated bot copy detected'
      ],
      ratingDistribution: [
        { star: 5, percentage: 74 },
        { star: 4, percentage: 14 },
        { star: 3, percentage: 5 },
        { star: 2, percentage: 3 },
        { star: 1, percentage: 4 }
      ]
    },
    price: {
      score: 92,
      status: 'FAIR',
      listedPrice: 189.99,
      originalPrice: 249.00,
      discountPercentage: 24,
      estimatedMarketPrice: 199.00,
      explanation: 'Current price aligns with historical market promotion cycles during seasonal sales. The 24% discount is realistic and sustainable for authorized retailers.',
      isTooGoodToBeTrue: false,
      signals: [
        'Price matches authorized partner pricing on Best Buy and Target',
        'Discount is within normal promotional range (15% - 30%)',
        'Price history shows consistent price movements over the last 12 months',
        'No hidden mandatory insurance or subscription fees tacked on'
      ]
    },
    images: {
      score: 95,
      status: 'AUTHENTIC',
      explanation: 'High-resolution official manufacturer renders consistent with Apple global marketing collateral. No deceptive watermark tampering or amateur photo edits.',
      isStockImage: false,
      signals: [
        'Consistent studio lighting and product packaging specifications',
        'Exact model numbers and regulatory marks match FCC filings',
        'Multiple angles provided including open case, buds, and charging port'
      ]
    },
    overallScore: 93,
    riskLevel: 'LOW',
    recommendation: 'Safe to buy. This listing originates from an authorized marketplace channel with verified seller credentials, genuine buyer sentiment, and realistic promotional pricing.',
    warnings: [],
    evidence: [
      { type: 'positive', text: 'Verified brand authorization and authentic distribution guarantee' },
      { type: 'positive', text: 'Reviews show organic sentiment distribution with verified purchase tags' },
      { type: 'positive', text: 'Promotional discount (24%) matches authorized market benchmarks' },
      { type: 'positive', text: 'Standard manufacturer warranty and hassle-free return policy active' }
    ],
    timestamp: '2026-09-10T01:45:00.000Z',
    isDemo: true
  },
  'demo-suspicious-watch': {
    id: 'demo-suspicious-watch',
    product: {
      title: 'Chronograph Royal Automatic Skeleton Luxury Watch',
      url: 'https://luxurytime-outlet.myshopify.com/products/royal-skeleton',
      domain: 'luxurytime-outlet.myshopify.com',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
      currency: '$',
      price: 69.99,
      originalPrice: 450.00,
      brand: 'Royal Chrono Co (Unregistered)',
      category: 'Watches / Jewelry'
    },
    seller: {
      name: 'LuxuryTime Global Outlet',
      score: 58,
      status: 'CAUTION',
      rating: 3.4,
      historyYears: 0.1,
      totalProducts: 14,
      positiveSignals: [
        'HTTPS SSL Certificate active on domain',
        'Shopify hosted checkout provider'
      ],
      negativeSignals: [
        'Domain registered only 19 days ago via privacy proxy',
        'No physical corporate address or verifiable contact phone number',
        'Generic Gmail address provided for customer service',
        'Terms of Service copied from generic boilerplate template'
      ],
      explanation: 'The seller is a newly launched dropshipping storefront with no verifiable track record, ambiguous company registration, and anonymous ownership.'
    },
    reviews: {
      score: 45,
      status: 'SUSPICIOUS',
      totalReviews: 87,
      averageRating: 4.95,
      fiveStarPercentage: 96,
      repeatedPercentage: 42.5,
      suspiciousCount: 48,
      explanation: 'The reviews show an unnatural concentration of 5-star ratings without any negative criticism. Multiple reviews share exact syntax, repetitive sentence structures, and generic profile images.',
      signals: [
        'Abnormal 96% 5-star concentration on a 3-week-old store',
        '42% of reviews reuse identical phrase templates ("Best watch ever", "Looks like a Rolex")',
        'Reviews submitted within 48-hour timestamps indicating bulk import',
        'No verified customer video or unboxing proof'
      ],
      ratingDistribution: [
        { star: 5, percentage: 96 },
        { star: 4, percentage: 3 },
        { star: 3, percentage: 1 },
        { star: 2, percentage: 0 },
        { star: 1, percentage: 0 }
      ]
    },
    price: {
      score: 55,
      status: 'UNREALISTIC',
      listedPrice: 69.99,
      originalPrice: 450.00,
      discountPercentage: 84,
      estimatedMarketPrice: 22.00,
      explanation: 'Artificial inflated reference pricing ($450.00) designed to create a false sense of luxury value for an inexpensive mass-produced quartz/alloy timepiece commonly priced under $25 on wholesale portals.',
      isTooGoodToBeTrue: true,
      signals: [
        'Fabricated 84% markdown ("Urgent Flash Sale - 2 hours left")',
        'Fake countdown timer resets upon browser refresh',
        'Wholesale catalog reverse lookup reveals $15 base manufacturing cost'
      ]
    },
    images: {
      score: 62,
      status: 'STOCK_OR_REUSED',
      explanation: 'Product photos are recycled stock images taken from wholesale distributor listings. No custom photography, branded packaging, or macro movement shots.',
      isStockImage: true,
      signals: [
        'Image reverse-search matches over 35 other drop-shipping storefronts',
        'Watermarks blurred out along the bottom bezel corner',
        'No lifestyle images showing actual dial proportions on a wrist'
      ]
    },
    overallScore: 55,
    riskLevel: 'MEDIUM',
    recommendation: 'Proceed with extreme caution. This listing exhibits classic signs of inflated-price dropshipping. The watch is likely an inexpensive low-grade replica rather than a luxury mechanical timepiece.',
    warnings: [
      'Store domain is less than 30 days old',
      'Artificial 84% discount with deceptive countdown timer',
      'Repetitive reviews imported from wholesale feeds',
      'No telephone support or verified physical address'
    ],
    evidence: [
      { type: 'warning', text: 'Storefront created 19 days ago with anonymous domain registrar' },
      { type: 'danger', text: '42.5% repeated review phrasing detected across bulk uploads' },
      { type: 'warning', text: 'Claimed $450 MSRP is artificially inflated; real wholesale value is ~$20' },
      { type: 'positive', text: 'Checkout is processed via Shopify PCI-compliant gateway' }
    ],
    timestamp: '2026-09-10T01:45:00.000Z',
    isDemo: true
  },
  'demo-scam-iphone': {
    id: 'demo-scam-iphone',
    product: {
      title: 'Apple iPhone 15 Pro Max 256GB - Factory Unlocked (Flash Clearance)',
      url: 'https://applemegadeals-warehouse.site/deals/iphone-15-pro-max-clearance',
      domain: 'applemegadeals-warehouse.site',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
      currency: '₹',
      price: 999,
      originalPrice: 159900,
      brand: 'Apple (Counterfeit / Phishing)',
      category: 'Electronics / Smartphones'
    },
    seller: {
      name: 'India Customs Seized Clearance Warehouse Pvt Ltd (Fake Entity)',
      score: 12,
      status: 'HIGH_RISK',
      rating: 1.0,
      historyYears: 0.01,
      totalProducts: 3,
      positiveSignals: [],
      negativeSignals: [
        'Brand-new domain registered 4 days ago on free/budget TLD (.site)',
        'Falsely claims official Indian Customs / GST seizure partnership',
        'Refuses Cash on Delivery (COD); insists on immediate UPI / QR payment',
        'Domain flagged on multiple anti-phishing consumer protection registries',
        'Fictitious GSTIN number does not exist on government portal'
      ],
      explanation: 'Severe financial scam indicator. Criminal syndicates register temporary disposable domains claiming seized luxury stock to collect non-refundable direct UPI payments.'
    },
    reviews: {
      score: 10,
      status: 'MANIPULATED',
      totalReviews: 240,
      averageRating: 5.0,
      fiveStarPercentage: 100,
      repeatedPercentage: 88.0,
      suspiciousCount: 235,
      explanation: 'All reviews are completely fabricated. Cloned testimonial widgets showcase stolen social media avatars praising "Delivery in 2 hours for just ₹999!".',
      signals: [
        '100% 5-star reviews generated by static hardcoded client script',
        'Review timestamps increment automatically every 15 seconds',
        'Customer photos are scraped Instagram influencer selfies',
        'Comments disabling user reply or verification mechanisms'
      ],
      ratingDistribution: [
        { star: 5, percentage: 100 },
        { star: 4, percentage: 0 },
        { star: 3, percentage: 0 },
        { star: 2, percentage: 0 },
        { star: 1, percentage: 0 }
      ]
    },
    price: {
      score: 8,
      status: 'SCAM_RISK',
      listedPrice: 999,
      originalPrice: 159900,
      discountPercentage: 99.4,
      estimatedMarketPrice: 145000,
      explanation: 'Extreme "Too Good to be True" price anomaly. An authentic iPhone 15 Pro Max has an international bill of materials exceeding $550. Selling for ₹999 is a 100% financial advance-fee fraud.',
      isTooGoodToBeTrue: true,
      signals: [
        '99.4% markdown on a current-generation flagship smartphone',
        'Pressure tactics claiming "Only 3 units left in stock"',
        'Direct UPI / wire transfer requested with zero buyer chargeback protection'
      ]
    },
    images: {
      score: 18,
      status: 'MANIPULATED',
      explanation: 'Stolen high-res press photos downloaded from Apple press room, combined with fake government seal watermarks to deceive unsophisticated buyers.',
      isStockImage: true,
      signals: [
        'Stolen Apple PR promotional assets without licensing permission',
        'Pasted fake "Customs Approved" red badge graphic',
        'No real photo of packaging, IMEI number, or warehouse inventory'
      ]
    },
    overallScore: 12,
    riskLevel: 'HIGH',
    recommendation: 'DO NOT PURCHASE. This website is a confirmed fraudulent phishing storefront. Any money sent via UPI/card will be permanently lost and no product will ever arrive.',
    warnings: [
      'CRITICAL: Confirmed advance-fee payment scam pattern',
      'Unrealistic 99% discount on genuine Apple flagship hardware',
      'Direct unbacked UPI payment requirement with no buyer protection',
      'Domain registered 4 days ago with fake government authority claims'
    ],
    evidence: [
      { type: 'danger', text: 'Price is ₹999 vs real market value of ₹1,45,000+ (99.4% impossible discount)' },
      { type: 'danger', text: 'Requires direct non-reversible UPI transfer before shipping' },
      { type: 'danger', text: 'Fake corporate registration number; domain flagged as malicious' },
      { type: 'danger', text: '100% hardcoded fake review widget with stolen avatars' }
    ],
    timestamp: '2026-09-10T01:45:00.000Z',
    isDemo: true
  },
  'demo-safe-flipkart': {
    id: 'demo-safe-flipkart',
    product: {
      title: 'Apple iPhone 15 Pro Max (Natural Titanium, 256 GB)',
      url: 'https://www.flipkart.com/apple-iphone-15-pro-max-natural-titanium-256-gb/p/itmd71ff215bc999',
      domain: 'flipkart.com',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
      currency: '₹',
      price: 148900,
      originalPrice: 159900,
      brand: 'Apple',
      category: 'Mobiles & Accessories'
    },
    seller: {
      name: 'SuperComNet (Flipkart Assured Partner)',
      score: 94,
      status: 'VERIFIED',
      rating: 4.8,
      historyYears: 9,
      totalProducts: 4800,
      positiveSignals: [
        'Flipkart Assured badge certified',
        'Official Apple India authorized distributor partner',
        'Over 9 years trading history on Flipkart with 98.2% positive resolution',
        'Direct GST invoicing and warranty card included'
      ],
      negativeSignals: [],
      explanation: 'SuperComNet is one of Flipkart’s largest Tier-1 accredited authorized retail partners for Apple products in India, with strict authenticity checks and sealed packaging.'
    },
    reviews: {
      score: 92,
      status: 'AUTHENTIC',
      totalReviews: 18450,
      averageRating: 4.7,
      fiveStarPercentage: 79,
      repeatedPercentage: 1.8,
      suspiciousCount: 14,
      explanation: 'Healthy standard Gaussian distribution across 18,000+ customer reviews. Verified buyer badges present on 96% of all written feedback with genuine user-uploaded unboxing photographs.',
      signals: [
        'Over 18,000 customer reviews with verified purchase tags',
        'Natural critical reviews (1-star and 2-star) reflecting expected logistical queries',
        'Temporal spacing across 11 months with zero artificial review bursts'
      ],
      ratingDistribution: [
        { star: 5, percentage: 79 },
        { star: 4, percentage: 14 },
        { star: 3, percentage: 4 },
        { star: 2, percentage: 2 },
        { star: 1, percentage: 1 }
      ]
    },
    price: {
      score: 95,
      status: 'FAIR',
      listedPrice: 148900,
      originalPrice: 159900,
      discountPercentage: 6.9,
      estimatedMarketPrice: 151000,
      explanation: 'A 6.9% discount reflects standard seasonal promotional savings on Flipkart. Fully consistent with authorized Apple India retail price brackets.',
      isTooGoodToBeTrue: false,
      signals: [
        'Realistic 6.9% promotional festive discount',
        'Matches Apple Authorized Reseller pricing across India',
        'Compliant with standard bank cashback and exchange schemes'
      ]
    },
    images: {
      score: 96,
      status: 'AUTHENTIC',
      explanation: 'Official Apple product render gallery with accurate regulatory labeling, Indian BIS certification markings, and customer-uploaded real photos.',
      isStockImage: false,
      signals: [
        'High-resolution multi-angle studio gallery directly from Apple PR',
        'Includes BIS regulatory certification mark',
        'Matches verified retail packaging specifications'
      ]
    },
    overallScore: 94,
    riskLevel: 'LOW',
    recommendation: 'GENUINE PRODUCT LISTING. Sold by a verified Flipkart Assured partner with full Apple India 1-year manufacturer warranty and standard return policy.',
    warnings: [],
    evidence: [
      { type: 'positive', text: 'Flipkart Assured merchant with 9+ years on marketplace' },
      { type: 'positive', text: 'Official Apple India 1-Year standard warranty' },
      { type: 'positive', text: 'Realistic 6.9% price discount' },
      { type: 'positive', text: '18,000+ organic verified buyer reviews with unboxing photos' }
    ],
    timestamp: '2026-09-10T02:00:00.000Z',
    isDemo: true
  }
};
