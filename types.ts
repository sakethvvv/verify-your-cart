export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ProductInfo {
  title: string;
  url: string;
  domain: string;
  image: string;
  currency: string;
  price: number;
  originalPrice?: number;
  brand?: string;
  category?: string;
}

export interface SellerAnalysis {
  name: string;
  score: number; // 0 - 100
  status: 'VERIFIED' | 'CAUTION' | 'HIGH_RISK';
  rating: number; // 0 - 5.0
  historyYears: number;
  totalProducts: number;
  positiveSignals: string[];
  negativeSignals: string[];
  explanation: string;
}

export interface ReviewAnalysis {
  score: number; // 0 - 100
  status: 'AUTHENTIC' | 'SUSPICIOUS' | 'MANIPULATED';
  totalReviews: number;
  averageRating: number;
  fiveStarPercentage: number;
  repeatedPercentage: number;
  suspiciousCount: number;
  explanation: string;
  signals: string[];
  ratingDistribution: { star: number; percentage: number }[];
}

export interface PriceAnalysis {
  score: number; // 0 - 100
  status: 'FAIR' | 'UNREALISTIC' | 'SCAM_RISK';
  listedPrice: number;
  originalPrice: number;
  discountPercentage: number;
  estimatedMarketPrice: number;
  explanation: string;
  isTooGoodToBeTrue: boolean;
  signals: string[];
}

export interface ImageAnalysis {
  score: number; // 0 - 100
  status: 'AUTHENTIC' | 'STOCK_OR_REUSED' | 'MANIPULATED';
  explanation: string;
  isStockImage: boolean;
  signals: string[];
}

export interface EvidenceItem {
  type: 'positive' | 'warning' | 'danger';
  text: string;
}

export interface DuckAiReport {
  status: 'COMPLETED' | 'FALLBACK';
  query: string;
  source: string;
  webSearched: boolean;
  findings: string[];
  workflow: string[];
  promptExecuted?: string;
  webSnippets?: string[];
  directDuckAiUrl?: string;
}

export interface AnalysisResponse {
  id: string;
  product: ProductInfo;
  seller: SellerAnalysis;
  reviews: ReviewAnalysis;
  price: PriceAnalysis;
  images: ImageAnalysis;
  overallScore: number;
  riskLevel: RiskLevel;
  recommendation: string;
  warnings: string[];
  evidence: EvidenceItem[];
  timestamp: string;
  isDemo?: boolean;

  // Duck.ai integration metadata
  duckAi?: DuckAiReport;

  // Specification compatibility fields
  trust_score?: number;
  verdict?: 'Genuine' | 'Suspicious' | 'Fake';
  reasons?: string[];
  advice?: string;
  breakdown?: {
    reviews: string[];
    sentiment: string[];
    price: string[];
    seller: string[];
    description: string[];
    images?: string[];
  };
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface DemoProductPreview {
  id: string;
  label: string;
  riskType: 'safe' | 'suspicious' | 'danger';
  title: string;
  platform: string;
  price: string;
  url: string;
  summary: string;
}

export interface AnalysisResult {
  trust_score: number;
  verdict: 'Genuine' | 'Suspicious' | 'Fake';
  reasons: string[];
  advice: string;
  url: string;
  timestamp: string;
  breakdown: {
    reviews: string[];
    sentiment: string[];
    price: string[];
    seller: string[];
    description: string[];
  };
}

