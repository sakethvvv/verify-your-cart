import { DEMO_PREVIEWS } from '../services/demoProducts';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    demos: DEMO_PREVIEWS,
    note: 'Pre-configured datasets for presentations and safe/suspicious/high-risk demonstration.'
  });
}
