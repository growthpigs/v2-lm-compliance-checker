const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();

// Define allowed origins for production
const allowedOrigins = [
  'https://lm-compliance-checker.vercel.app',
  'https://v1-lm-compliance-checker.vercel.app',
  'https://lm-compliance-checker-git-main.vercel.app'
];

// Configure CORS for both development and production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins 
    : ['http://localhost:3190', 'http://localhost:5173', 'http://127.0.0.1:3190'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// In-memory storage for scan results (note: this will reset when serverless function cold starts)
const scanResults = new Map();

// Demo scan endpoint
app.post('/api/v1/scans', (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  // Generate a unique ID for this scan
  const scanId = randomUUID();
  
  // Store initial scan state
  scanResults.set(scanId, {
    id: scanId,
    url,
    status: 'in-progress',
    startedAt: new Date().toISOString(),
    progress: 0
  });
  
  // Return immediately with the scan ID
  res.status(202).json({ 
    id: scanId,
    status: 'in-progress',
    message: 'Scan initiated'
  });
  
  // Simulate scan processing asynchronously
  setTimeout(() => {
    // Generate mock results
    const mockResults = generateMockResults(url);
    
    // Update scan results
    scanResults.set(scanId, {
      ...mockResults,
      status: 'completed',
      completedAt: new Date().toISOString(),
      progress: 100
    });
  }, 5000); // Complete after 5 seconds
});

// Get scan results endpoint
app.get('/api/v1/scans/:id', (req, res) => {
  const { id } = req.params;
  
  if (!scanResults.has(id)) {
    return res.status(404).json({ error: 'Scan not found' });
  }
  
  const result = scanResults.get(id);
  
  // If scan is in progress, update progress (simulated)
  if (result.status === 'in-progress') {
    const elapsedMs = new Date() - new Date(result.startedAt);
    const progressPercent = Math.min(Math.floor(elapsedMs / 50), 99); // Max 99% until complete
    
    result.progress = progressPercent;
    scanResults.set(id, result);
  }
  
  return res.json(result);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

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

// Export handler for serverless environments
module.exports = app; 