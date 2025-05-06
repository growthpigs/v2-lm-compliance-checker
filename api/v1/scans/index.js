// Handler for POST /api/v1/scans
const { randomUUID } = require('crypto');

// In-memory storage for scan results
const scanResults = new Map();

// Handler for the /api/v1/scans POST endpoint
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request (preflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log the request details
  console.log(`[SCANS API] ${req.method} ${req.url}`);
  
  // Handle POST requests to start a new scan
  if (req.method === 'POST') {
    try {
      console.log('[SCANS API] Request headers:', req.headers);
      
      // Parse the request body
      const body = req.body || {};
      console.log('[SCANS API] Request body:', body);
      
      // Validate the URL parameter
      if (!body.url) {
        console.log('[SCANS API] Missing URL in request');
        return res.status(400).json({ error: 'URL is required' });
      }
      
      // Generate a unique ID for this scan
      const scanId = randomUUID();
      console.log(`[SCANS API] Generated scan ID: ${scanId} for URL: ${body.url}`);
      
      // Return immediately with the scan ID
      return res.status(202).json({ 
        id: scanId,
        scanId: scanId, // Adding both formats for compatibility
        status: 'in-progress',
        message: 'Scan initiated',
        startedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('[SCANS API] Error processing POST request:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  // Handle GET request to list scans (not implemented fully)
  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Scan API endpoint is working. Use POST to start a new scan.'
    });
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
}; 