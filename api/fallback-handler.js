// Simplified API handler for Vercel serverless functions
const { randomUUID } = require('crypto');

// In-memory storage for scan results (note: this will reset when serverless function cold starts)
const scanResults = new Map();

// Handler for POST /api/v1/scans
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

  // Log the request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Implement a health check endpoint
  if (req.method === 'GET' && (req.url === '/api/health' || req.url.includes('/api/health'))) {
    return res.status(200).json({ status: 'API is running' });
  }

  // Filter paths for scan endpoints
  if (req.url.includes('/api/v1/scans')) {
    // Handle POST request to create a new scan
    if (req.method === 'POST') {
      try {
        // Parse the request body
        const body = req.body || {};
        console.log('[API] POST /api/v1/scans - Request body:', body);
        
        if (!body.url) {
          console.log('[API] Missing URL in request');
          return res.status(400).json({ error: 'URL is required' });
        }
        
        // Generate a unique ID for this scan
        const scanId = randomUUID();
        console.log(`[API] Generated scan ID: ${scanId} for URL: ${body.url}`);
        
        // Store initial scan state
        scanResults.set(scanId, {
          id: scanId,
          url: body.url,
          status: 'in-progress',
          startedAt: new Date().toISOString(),
          progress: 0
        });
        
        // Return immediately with the scan ID
        return res.status(202).json({ 
          id: scanId,
          scanId: scanId, // Adding both formats for compatibility
          status: 'in-progress',
          message: 'Scan initiated'
        });
      } catch (error) {
        console.error('[API] Error in POST /api/v1/scans:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
    
    // Handle GET request to retrieve scan results
    if (req.method === 'GET' && req.url.includes('/api/v1/scans/')) {
      try {
        // Extract scan ID from URL
        const urlParts = req.url.split('/');
        const scanId = urlParts[urlParts.length - 1].split('?')[0];
        console.log(`[API] GET /api/v1/scans/${scanId}`);
        
        if (!scanResults.has(scanId)) {
          console.log(`[API] Scan ${scanId} not found`);
          return res.status(404).json({ error: 'Scan not found' });
        }
        
        const result = scanResults.get(scanId);
        
        // If scan is in progress, update progress (simulated)
        if (result.status === 'in-progress') {
          const elapsedMs = new Date() - new Date(result.startedAt);
          const progressPercent = Math.min(Math.floor(elapsedMs / 50), 99); // Max 99% until complete
          
          result.progress = progressPercent;
          scanResults.set(scanId, result);
          
          // Simulate completion after 10 seconds
          const timeSinceStart = (new Date() - new Date(result.startedAt)) / 1000;
          if (timeSinceStart > 10) {
            // Generate mock results
            const mockResults = generateMockResults(result.url);
            
            // Update scan results
            scanResults.set(scanId, {
              ...mockResults,
              status: 'completed',
              completedAt: new Date().toISOString(),
              progress: 100
            });
            
            console.log(`[API] Scan ${scanId} completed automatically`);
            return res.json(scanResults.get(scanId));
          }
        }
        
        console.log(`[API] Returning scan results for ${scanId}, status: ${result.status}`);
        return res.json(result);
      } catch (error) {
        console.error(`[API] Error in GET /api/v1/scans/:id:`, error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
  
  // Root/index endpoint
  if (req.method === 'GET' && (req.url === '/' || req.url === '/api')) {
    return res.status(200).json({ 
      message: 'Legal Website Compliance Checker API',
      endpoints: [
        { path: '/api/health', method: 'GET', description: 'Health check' },
        { path: '/api/v1/scans', method: 'POST', description: 'Start a new scan' },
        { path: '/api/v1/scans/:id', method: 'GET', description: 'Get scan results' }
      ]
    });
  }
  
  // Handle 404 for any other routes
  return res.status(404).json({ error: 'Not found' });
};

// Helper function to generate mock scan results
function generateMockResults(url) {
  // Extract domain for use in mocking
  let domain = url;
  try {
    domain = new URL(url).hostname;
  } catch (e) {
    // Use as-is if URL parsing fails
  }
  
  return {
    id: randomUUID(),
    url: url,
    screenshot: "https://picsum.photos/id/999/600/400",
    jurisdiction: "United States",
    issues: [
      {
        id: "aba-rule-7-1",
        category: "ABA Compliance",
        title: "Potentially Misleading Claims",
        description: "Found superlative language that may violate ABA Rule 7.1 against misleading claims.",
        severity: "high",
        locations: ["Homepage Hero Section", "About Us Page"]
      },
      {
        id: "ada-wcag-11",
        category: "Accessibility",
        title: "Missing Image Alt Text",
        description: "WCAG 2.1 requires all images to have alt text for screen readers.",
        severity: "medium",
        locations: ["Team Page", "Case Results Page"]
      },
      {
        id: "privacy-1",
        category: "Privacy",
        title: "Missing Privacy Policy",
        description: "Website appears to lack a comprehensive privacy policy.",
        severity: "high",
        locations: ["Global"]
      }
    ],
    summary: {
      score: 65,
      maxScore: 100,
      issueCount: 3,
      criticalIssues: 1,
      majorIssues: 1,
      minorIssues: 1
    }
  };
} 