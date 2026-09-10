import { runFullAnalysis, validateAndParseProductUrl } from '../services/analysisEngine';

/**
 * Backend /api/analyze route handler for Node.js / Next.js Pages Router / Vercel Serverless Functions.
 * Handles product URL processing, risk analysis (review, seller, price, image), and error handling.
 */
export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Enforce HTTP POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed. Please send a POST request with the product URL.`,
      code: 'METHOD_NOT_ALLOWED'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const inputUrl = body.url || body.productUrl || body.product_url || body.link;
    const demoId = body.demoId || body.demo_id;

    // 1. Validate parameter presence
    if (!inputUrl && !demoId) {
      return res.status(400).json({
        error: 'Product URL is required. Please provide a valid e-commerce listing URL (e.g., from Amazon, Apple, Walmart).',
        code: 'MISSING_URL'
      });
    }

    // 2. If URL is provided, validate URL format and security constraints
    if (inputUrl && !demoId) {
      const validation = validateAndParseProductUrl(inputUrl);
      if (!validation.valid) {
        return res.status(400).json({
          error: validation.error || 'Invalid product URL format.',
          code: 'INVALID_URL'
        });
      }
    }

    // 3. Execute full 4-dimension risk analysis logic (review, seller, price, image)
    const report = await runFullAnalysis(inputUrl || '', demoId);

    return res.status(200).json(report);
  } catch (error: any) {
    console.error('[API /api/analyze Error]:', error);
    return res.status(500).json({
      error: error.message || 'An unexpected error occurred while analyzing the product URL. Please try again.',
      code: 'ANALYSIS_ERROR'
    });
  }
}

/**
 * Next.js 13+ App Router compatibility handler (export async function POST(req))
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const inputUrl = body.url || body.productUrl || body.product_url || body.link;
    const demoId = body.demoId || body.demo_id;

    if (!inputUrl && !demoId) {
      return new Response(
        JSON.stringify({
          error: 'Product URL is required. Please provide a valid product link to analyze.',
          code: 'MISSING_URL'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    if (inputUrl && !demoId) {
      const validation = validateAndParseProductUrl(inputUrl);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({
            error: validation.error || 'Invalid product URL format.',
            code: 'INVALID_URL'
          }),
          { status: 400, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        );
      }
    }

    const report = await runFullAnalysis(inputUrl || '', demoId);
    return new Response(JSON.stringify(report), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error: any) {
    console.error('[Next.js App Router /api/analyze Error]:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred while analyzing the product URL.',
        code: 'ANALYSIS_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
