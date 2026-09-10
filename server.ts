import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { DEMO_PREVIEWS } from './services/demoProducts';
import { runFullAnalysis, validateAndParseProductUrl } from './services/analysisEngine';
import { ContactPayload } from './types';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Middleware
  app.use(express.json());

  // CORS Middleware for API routes
  app.use('/api', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Verify Your Cart API',
      creator: 'Saketh Vedullapalli',
      timestamp: new Date().toISOString()
    });
  });

  // Demo products endpoint
  app.get('/api/demo', (req, res) => {
    res.json({
      demos: DEMO_PREVIEWS,
      note: 'Pre-configured datasets for presentations and safe/suspicious/high-risk demonstration.'
    });
  });

  // Main product analysis endpoint (Node.js / Express backend)
  app.post('/api/analyze', async (req, res) => {
    try {
      const body = req.body || {};
      const inputUrl = body.url || body.productUrl || body.product_url || body.link;
      const demoId = body.demoId || body.demo_id;

      // 1. Parameter Validation
      if (!inputUrl && !demoId) {
        return res.status(400).json({
          error: 'Product URL is required. Please provide a valid product link to analyze.',
          code: 'MISSING_URL'
        });
      }

      // 2. URL Format and Protocol Security
      if (inputUrl && !demoId) {
        const validation = validateAndParseProductUrl(inputUrl);
        if (!validation.valid) {
          return res.status(400).json({
            error: validation.error || 'Invalid product URL format.',
            code: 'INVALID_URL'
          });
        }
      }

      // 3. Risk Analysis Logic (Review, Seller, Price, Image)
      const analysis = await runFullAnalysis(inputUrl || '', demoId);
      return res.json(analysis);
    } catch (error: any) {
      console.error('[API /api/analyze Error]:', error);
      return res.status(500).json({
        error: error.message || "We couldn't analyze this product right now. Please check the URL and try again.",
        code: 'ANALYSIS_ERROR'
      });
    }
  });

  // Reject non-POST requests to /api/analyze
  app.all('/api/analyze', (req, res) => {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({
      error: `Method ${req.method} Not Allowed. Please send a POST request with the product URL.`,
      code: 'METHOD_NOT_ALLOWED'
    });
  });

  // Contact form submission endpoint
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, subject, message }: ContactPayload = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required.' });
      }

      if (!email || !email.trim() || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }

      if (!message || message.trim().length < 5) {
        return res.status(400).json({ error: 'Message must be at least 5 characters long.' });
      }

      // Safe logging of inquiry
      console.log(`[Contact Inquiry] From: ${name} <${email}> | Subject: ${subject || 'General'} | Message: ${message.slice(0, 100)}...`);

      return res.json({
        success: true,
        message: 'Your message has been received by Saketh Vedullapalli. Thank you for reaching out!',
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to process contact message.' });
    }
  });

  // Vite integration: middleware for dev mode, static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[VERIFY YOUR CART] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
