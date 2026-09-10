import { runFullAnalysis, validateAndParseProductUrl } from '../../../services/analysisEngine';

/**
 * Next.js App Router Route Handler (app/api/analyze/route.ts)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const inputUrl = body.url || body.productUrl || body.product_url || body.link;
    const demoId = body.demoId || body.demo_id;

    // 1. Parameter Validation
    if (!inputUrl && !demoId) {
      return new Response(
        JSON.stringify({
          error: 'Product URL is required. Please provide a valid product link to analyze.',
          code: 'MISSING_URL'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // 2. URL Format and Protocol Security
    if (inputUrl && !demoId) {
      const validation = validateAndParseProductUrl(inputUrl);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({
            error: validation.error || 'Invalid product URL format.',
            code: 'INVALID_URL'
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }
        );
      }
    }

    // 3. Risk Analysis (Review, Seller, Price, Image)
    const report = await runFullAnalysis(inputUrl || '', demoId);

    return new Response(JSON.stringify(report), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) {
    console.error('[App Router /api/analyze Error]:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred while analyzing the product URL.',
        code: 'ANALYSIS_ERROR'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    }
  });
}
