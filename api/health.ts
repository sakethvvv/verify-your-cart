export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    status: 'ok',
    service: 'Verify Your Cart API',
    creator: 'Saketh Vedullapalli',
    timestamp: new Date().toISOString()
  });
}
