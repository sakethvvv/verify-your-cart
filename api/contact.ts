export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  console.log(`[Contact Message Received] from ${name} (${email}): ${message}`);

  return res.status(200).json({
    success: true,
    message: 'Your message has been received by Saketh Vedullapalli. Thank you for reaching out!',
    timestamp: new Date().toISOString()
  });
}
