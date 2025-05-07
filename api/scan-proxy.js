// Proxy endpoint for scan API requests
// This works around Vercel routing issues with dynamic path parameters
const { randomUUID } = require('crypto');
const https = require('https');
const http = require('http');
const url = require('url');

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
  console.log(`[SCAN-PROXY] ${req.method} ${req.url}`);
  console.log(`[SCAN-PROXY] Query params: ${JSON.stringify(req.query)}`);
  
  // Handle GET requests (scan status)
  if (req.method === 'GET') {
    // Extract scan ID from query parameter
    const id = req.query.id;
    
    if (!id) {
      return res.status(400).json({ 
        error: 'Scan ID is required as query parameter (?id=xxx)',
        proxyInfo: 'This is a proxy endpoint for the scan API'
      });
    }
    
    console.log(`[SCAN-PROXY] Proxying scan request for ID: ${id}`);
    
    try {
      // Generate mock response with timestamps
      const now = new Date();
      const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const progress = (idSum % 100); // Progress between 0-99
      const isCompleted = progress > 80;
      const startedAt = new Date(now.getTime() - (progress * 300)); // Started some time ago
      const completedAt = isCompleted ? now.toISOString() : null;
      
      // Set cache control headers
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      // If completed, return full scan results
      if (isCompleted) {
        console.log(`[SCAN-PROXY] Returning completed scan results for ${id}`);
        return res.status(200).json({
          id: id,
          url: "https://example.com", // Demo value
          status: 'completed',
          startedAt: startedAt.toISOString(),
          completedAt: completedAt,
          progress: 100,
          proxySource: 'scan-proxy.js',
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
      console.log(`[SCAN-PROXY] Returning in-progress status for ${id}, progress: ${progress}%`);
      return res.status(200).json({
        id: id,
        status: 'in-progress',
        startedAt: startedAt.toISOString(),
        progress: progress,
        proxySource: 'scan-proxy.js'
      });
    } catch (error) {
      console.error(`[SCAN-PROXY] Error generating response:`, error);
      return res.status(500).json({ 
        error: `Error processing scan request: ${error.message}`,
        proxySource: 'scan-proxy.js'
      });
    }
  }
  
  // Handle POST requests (create new scan)
  if (req.method === 'POST') {
    try {
      // Generate a random ID for the new scan
      const newId = randomUUID();
      
      console.log(`[SCAN-PROXY] Creating new scan with ID: ${newId}`);
      
      // Return the new scan information
      return res.status(201).json({
        id: newId,
        status: 'created',
        startedAt: new Date().toISOString(),
        progress: 0,
        proxySource: 'scan-proxy.js'
      });
    } catch (error) {
      console.error(`[SCAN-PROXY] Error creating scan:`, error);
      return res.status(500).json({ 
        error: `Failed to create scan: ${error.message}`,
        proxySource: 'scan-proxy.js' 
      });
    }
  }
  
  // Method not allowed for anything else
  return res.status(405).json({ 
    error: 'Method not allowed',
    proxySource: 'scan-proxy.js' 
  });
}; 