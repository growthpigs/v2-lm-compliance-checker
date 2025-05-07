// Debug endpoint to help diagnose API routing issues
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

  // Log the request details
  console.log(`[DEBUG API] Request received at: ${new Date().toISOString()}`);
  console.log(`[DEBUG API] URL: ${req.url}`);
  console.log(`[DEBUG API] Method: ${req.method}`);
  console.log(`[DEBUG API] Headers:`, req.headers);
  
  // No caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  // Return detailed diagnostic information
  return res.status(200).json({
    status: 'debug_ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'not set',
    vercel: {
      region: process.env.VERCEL_REGION || 'not set',
      environment: process.env.VERCEL_ENV || 'not set',
      url: process.env.VERCEL_URL || 'not set'
    },
    request: {
      url: req.url,
      method: req.method,
      headers: req.headers
    }
  });
}; 