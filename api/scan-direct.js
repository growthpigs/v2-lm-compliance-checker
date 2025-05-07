// Direct scan endpoint (alternative to /api/v1/scans/[id])
const { randomUUID } = require('crypto');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Origin, Authorization');

  // Handle OPTIONS request (preflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log the request
  console.log(`[SCAN-DIRECT] ${req.method} ${req.url}`);
  console.log(`[SCAN-DIRECT] Query params: ${JSON.stringify(req.query)}`);
  
  // Respond to GET requests (scan status)
  if (req.method === 'GET') {
    // Extract scan ID from query parameter
    const id = req.query.id;
    
    if (!id) {
      return res.status(400).json({ error: 'Scan ID is required as query parameter (?id=xxx)' });
    }
    
    console.log(`[SCAN-DIRECT] Getting scan with ID: ${id}`);
    
    // Use the scan ID to seed a progress value (0-100)
    const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const progress = (idSum % 100); // Progress between 0-99
    
    // Only return "completed" if progress is high enough
    const isCompleted = progress > 80;
    
    // Calculate timestamps
    const now = new Date();
    const startedAt = new Date(now.getTime() - (progress * 300)); // Started some time ago
    const completedAt = isCompleted ? now.toISOString() : null;
    
    // Set cache control headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // If completed, return full scan results
    if (isCompleted) {
      console.log(`[SCAN-DIRECT] Returning completed scan results for ${id}`);
      return res.status(200).json({
        id: id,
        url: "https://example.com", // Demo value
        status: 'completed',
        startedAt: startedAt.toISOString(),
        completedAt: completedAt,
        progress: 100,
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
      });
    }
    
    // Otherwise, return in-progress status
    console.log(`[SCAN-DIRECT] Returning in-progress status for ${id}, progress: ${progress}%`);
    return res.status(200).json({
      id: id,
      status: 'in-progress',
      startedAt: startedAt.toISOString(),
      progress: progress
    });
  }
  
  // Handle POST requests (create new scan)
  if (req.method === 'POST') {
    try {
      // Generate a random ID for the new scan
      const newId = randomUUID();
      
      console.log(`[SCAN-DIRECT] Creating new scan with ID: ${newId}`);
      
      // Return the new scan information
      return res.status(201).json({
        id: newId,
        status: 'created',
        startedAt: new Date().toISOString(),
        progress: 0
      });
    } catch (error) {
      console.error(`[SCAN-DIRECT] Error creating scan:`, error);
      return res.status(500).json({ error: 'Failed to create scan' });
    }
  }
  
  // Method not allowed for anything else
  return res.status(405).json({ error: 'Method not allowed' });
}; 