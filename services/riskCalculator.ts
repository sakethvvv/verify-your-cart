import {
  EvidenceItem,
  ImageAnalysis,
  PriceAnalysis,
  ReviewAnalysis,
  RiskLevel,
  SellerAnalysis
} from '../types';

export interface RiskCalculationInput {
  seller: SellerAnalysis;
  reviews: ReviewAnalysis;
  price: PriceAnalysis;
  images: ImageAnalysis;
  domain: string;
}

export interface RiskCalculationOutput {
  overallScore: number;
  riskLevel: RiskLevel;
  recommendation: string;
  warnings: string[];
  evidence: EvidenceItem[];
}

export function calculateRisk(input: RiskCalculationInput): RiskCalculationOutput {
  const { seller, reviews, price, images } = input;

  // Weighted formula:
  // Reviews: 30%, Seller: 25%, Price: 25%, Images: 20%
  let rawScore = Math.round(
    reviews.score * 0.30 +
    seller.score * 0.25 +
    price.score * 0.25 +
    images.score * 0.20
  );

  // Severe risk caps
  if (price.status === 'SCAM_RISK' || seller.status === 'HIGH_RISK') {
    rawScore = Math.min(rawScore, 35);
  } else if (reviews.status === 'MANIPULATED' && price.isTooGoodToBeTrue) {
    rawScore = Math.min(rawScore, 40);
  }

  const overallScore = Math.min(100, Math.max(0, rawScore));

  let riskLevel: RiskLevel = 'LOW';
  if (overallScore < 60) {
    riskLevel = 'HIGH';
  } else if (overallScore < 80) {
    riskLevel = 'MEDIUM';
  }

  const warnings: string[] = [];
  const evidence: EvidenceItem[] = [];

  // Evaluate Seller Evidence
  if (seller.status === 'VERIFIED') {
    evidence.push({
      type: 'positive',
      text: `Seller has ${seller.historyYears > 1 ? `${seller.historyYears}+ years` : 'verified'} operational track record on major retail infrastructure.`
    });
  } else if (seller.status === 'HIGH_RISK') {
    warnings.push('Unregistered or disposable seller account with zero verifiable business credentials.');
    evidence.push({
      type: 'danger',
      text: 'Seller lacks corporate registration, contact telephone, or verified identity.'
    });
  } else {
    warnings.push('Independent merchant with limited tenure; review return and contact channels.');
    evidence.push({
      type: 'warning',
      text: 'Seller has limited operational history on digital marketplaces.'
    });
  }

  // Evaluate Review Evidence
  if (reviews.status === 'AUTHENTIC') {
    evidence.push({
      type: 'positive',
      text: `Natural review distribution across star ratings with ${reviews.repeatedPercentage}% duplicate rate.`
    });
  } else if (reviews.status === 'MANIPULATED') {
    warnings.push(`Severe review manipulation detected (${reviews.repeatedPercentage}% duplicate/bot reviews).`);
    evidence.push({
      type: 'danger',
      text: `Abnormal review cluster with ${reviews.fiveStarPercentage}% artificial 5-star ratings.`
    });
  } else {
    warnings.push('Review sample exhibits elevated generic praise and lower verification rate.');
    evidence.push({
      type: 'warning',
      text: 'Moderate review authenticity variance; several comments lack verified purchase badges.'
    });
  }

  // Evaluate Price Evidence
  if (price.status === 'FAIR') {
    evidence.push({
      type: 'positive',
      text: `Promotional discount (${price.discountPercentage}%) aligns with verified retail market averages.`
    });
  } else if (price.status === 'SCAM_RISK') {
    warnings.push(`Severe price anomaly: ${price.discountPercentage}% discount is mathematically unsustainable for authentic goods.`);
    evidence.push({
      type: 'danger',
      text: `Extreme ${price.discountPercentage}% discount triggers "Too Good to Be True" fraud warning.`
    });
  } else {
    warnings.push('Advertised discount appears based on artificially inflated reference MSRP.');
    evidence.push({
      type: 'warning',
      text: `Original reference price ($${price.originalPrice}) may be overstated to simulate larger savings.`
    });
  }

  // Evaluate Image Evidence
  if (images.status === 'AUTHENTIC') {
    evidence.push({
      type: 'positive',
      text: 'Product imagery appears consistent with official manufacturer specifications.'
    });
  } else if (images.status === 'MANIPULATED') {
    warnings.push('Product images show signs of watermark obscuring or unauthorized scraping.');
    evidence.push({
      type: 'danger',
      text: 'Imagery exhibits digital tampering, blurred watermarks, or stock scraping.'
    });
  } else {
    evidence.push({
      type: 'warning',
      text: 'Product listing relies on generic wholesale stock photos rather than on-hand stock photos.'
    });
  }

  // Recommendations
  let recommendation = '';
  if (riskLevel === 'LOW') {
    recommendation = 'Safe listing indicators. The merchant is verified, reviews demonstrate natural variation, and pricing matches standard promotional norms. Standard consumer caution still applies.';
  } else if (riskLevel === 'MEDIUM') {
    recommendation = 'Proceed with caution. While not an outright confirmed fraud, this listing displays multiple warning signals (inflated discount, new seller, or stock imagery). Pay only via protected payment methods like credit cards or PayPal.';
  } else {
    recommendation = 'DO NOT PURCHASE. Multiple high-risk indicators detected, including unrealistic discounts, suspicious seller signals, and review manipulation. High risk of counterfeit goods or non-delivery.';
  }

  return {
    overallScore,
    riskLevel,
    recommendation,
    warnings,
    evidence
  };
}
