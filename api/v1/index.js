// API v1 base endpoint
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only respond to GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Log the request
  console.log(`[API_V1] Received request at ${new Date().toISOString()}`);
  console.log(`[API_V1] URL: ${req.url}`);
  
  // No caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Return diagnostic information and available endpoints
  return res.status(200).json({
    api: 'v1',
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      debug: '/api/debug',
      scans: {
        create: '/api/v1/scans (POST)',
        get: '/api/v1/scans/:id (GET)',
        list: '/api/v1/scans (GET)'
      },
      direct: {
        scan: '/api/scan-direct?id=:id (GET)'
      }
    },
    vercel: {
      environment: process.env.VERCEL_ENV || 'not set',
      region: process.env.VERCEL_REGION || 'not set',
      url: process.env.VERCEL_URL || 'not set'
    }
  });
}; 