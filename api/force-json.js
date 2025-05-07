// Force JSON API endpoint - always returns JSON data with explicit content type
// This is a last resort for vercel.json routing issues
module.exports = async (req, res) => {
  // Set content type first, before anything else
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');

  // Handle OPTIONS request (preflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Disable caching
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  
  // Log the request for diagnostics
  console.log(`[FORCE-JSON] ${req.method} ${req.url}`);
  console.log(`[FORCE-JSON] Headers:`, req.headers);
  console.log(`[FORCE-JSON] Query:`, req.query);
  
  // Determine request type
  const operation = req.query.op || 'test'; // Default to test operation
  const id = req.query.id || 'test123';     // Default ID
  
  // Prepare response data
  let responseData = {
    success: true,
    operation: operation,
    timestamp: new Date().toISOString(),
    serverInfo: {
      vercelRegion: process.env.VERCEL_REGION || 'unknown',
      nodeEnv: process.env.NODE_ENV || 'development',
      buildTime: process.env.BUILD_TIMESTAMP || 'unknown'
    }
  };
  
  // Add operation-specific data
  if (operation === 'test') {
    responseData.message = "Force JSON API is working correctly";
    responseData.routeInfo = "This endpoint forces application/json content-type";
  } else if (operation === 'scan') {
    // Generate synthetic scan result
    const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const progress = (idSum % 100); // Progress between 0-99
    const isCompleted = progress > 80;
    const now = new Date();
    const startedAt = new Date(now.getTime() - (progress * 300));
    const completedAt = isCompleted ? now.toISOString() : null;
    
    responseData.id = id;
    responseData.status = isCompleted ? 'completed' : 'in-progress';
    responseData.progress = isCompleted ? 100 : progress;
    responseData.startedAt = startedAt.toISOString();
    responseData.completedAt = completedAt;
    
    if (isCompleted) {
      responseData.url = "https://example.com";
      responseData.screenshot = "https://picsum.photos/id/999/600/400";
      responseData.jurisdiction = "United States";
      responseData.issues = [
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
        }
      ];
      responseData.summary = {
        score: 65,
        maxScore: 100,
        issueCount: 2,
        criticalIssues: 1,
        majorIssues: 1,
        minorIssues: 0
      };
    }
  } else if (operation === 'health') {
    responseData.status = 'API is running';
    responseData.healthInfo = 'All systems operational';
  } else if (operation === 'create') {
    // Generate a random ID for new scans
    responseData.id = Math.random().toString(36).substring(2, 15);
    responseData.status = 'created';
    responseData.startedAt = new Date().toISOString();
    responseData.progress = 0;
  }
  
  // Send the JSON response
  console.log(`[FORCE-JSON] Sending response for operation: ${operation}`);
  return res.status(200).end(JSON.stringify(responseData, null, 0));
}; 