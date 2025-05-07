// LOG: Confirm API handler is loaded and executed
console.log('[API] quick-fix.js loaded and ready');

// Super direct JSON response handler for Vercel deployment
// This avoids ALL routing issues by being directly accessible
module.exports = async (req, res) => {
  // Set response headers immediately
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  // Handle OPTIONS - respond immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end('{}');
  }

  // Get scan ID from query
  const id = req.query.id || 'unknown';
  const now = new Date();
  
  // Create scan result based on scan ID
  // Using predictable outcomes based on the ID
  const scanData = getScanResult(id, now);
  
  // Return JSON response
  return res.status(200).end(JSON.stringify(scanData));
};

// Function to generate fake scan result
function getScanResult(id, now) {
  // Use scan ID to determine status (completed or in-progress)
  // IDs ending with even numbers are "completed"
  const lastChar = id.charAt(id.length - 1);
  const isCompleted = ['0', '2', '4', '6', '8'].includes(lastChar);
  
  // Base scan data
  const scanData = {
    id: id,
    url: "https://example.com",
    status: isCompleted ? 'completed' : 'in-progress',
    startedAt: new Date(now.getTime() - 120000).toISOString(),
    progress: isCompleted ? 100 : Math.floor(Math.random() * 80) + 10,
    __source: "quick-fix direct JSON response"
  };
  
  // Add completed data if scan is complete
  if (isCompleted) {
    scanData.completedAt = now.toISOString();
    scanData.screenshot = "https://picsum.photos/600/400";
    scanData.jurisdiction = "United States";
    scanData.issues = [
      {
        id: "privacy-policy",
        category: "Compliance",
        title: "Missing Privacy Policy",
        description: "Website lacks a comprehensive privacy policy.",
        severity: "high",
        locations: ["Global"]
      },
      {
        id: "accessibility",
        category: "Accessibility",
        title: "Low Contrast Text",
        description: "Some text has insufficient contrast ratio.",
        severity: "medium",
        locations: ["Home Page", "Contact Page"]
      }
    ];
    scanData.summary = {
      score: 75,
      maxScore: 100,
      issueCount: 2,
      criticalIssues: 1,
      majorIssues: 1,
      minorIssues: 0
    };
  }
  
  return scanData;
} 