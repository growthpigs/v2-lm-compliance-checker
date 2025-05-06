const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();

// Define allowed origins for production
const allowedOrigins = [
  'https://v2-lm-compliance-checker.vercel.app',
  'https://v2-lm-compliance-checker-git-main.vercel.app',
  'https://v2-lm-compliance-checker-growthpigs.vercel.app',
  'https://v2-lm-compliance-checker-vercel.app',
  'http://localhost:3190',
  'http://localhost:5173'
];

// Configure CORS for both development and production
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost')) {
      callback(null, true);
    } else {
      console.log(`Origin ${origin} not allowed by CORS`);
      // Still allow for debugging, but log it
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(express.json());

// In-memory storage for scan results (note: this will reset when serverless function cold starts)
const scanResults = new Map();

// Demo scan endpoint
app.post('/api/v1/scans', (req, res) => {
  console.log('POST /api/v1/scans - Request body:', req.body);
  
  try {
    const { url } = req.body;
    
    if (!url) {
      console.log('Missing URL in request');
      return res.status(400).json({ error: 'URL is required' });
    }
    
    // Generate a unique ID for this scan
    const scanId = randomUUID();
    console.log(`Generated scan ID: ${scanId} for URL: ${url}`);
    
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
      scanId: scanId, // Adding both formats for compatibility
      status: 'in-progress',
      message: 'Scan initiated'
    });
    
    // Simulate scan processing asynchronously
    setTimeout(() => {
      try {
        // Generate mock results
        const mockResults = generateMockResults(url);
        
        // Update scan results
        scanResults.set(scanId, {
          ...mockResults,
          status: 'completed',
          completedAt: new Date().toISOString(),
          progress: 100
        });
        
        console.log(`Scan ${scanId} completed successfully`);
      } catch (error) {
        console.error(`Error processing scan ${scanId}:`, error);
        scanResults.set(scanId, {
          id: scanId,
          url,
          status: 'failed',
          error: 'Failed to process scan',
          completedAt: new Date().toISOString()
        });
      }
    }, 5000); // Complete after 5 seconds
  } catch (error) {
    console.error('Error in POST /api/v1/scans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get scan results endpoint
app.get('/api/v1/scans/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log(`GET /api/v1/scans/${id}`);
    
    if (!scanResults.has(id)) {
      console.log(`Scan ${id} not found`);
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
    
    console.log(`Returning scan results for ${id}, status: ${result.status}`);
    return res.json(result);
  } catch (error) {
    console.error(`Error in GET /api/v1/scans/${req.params.id}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Root endpoint for API testing
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Legal Website Compliance Checker API',
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'Health check' },
      { path: '/api/v1/scans', method: 'POST', description: 'Start a new scan' },
      { path: '/api/v1/scans/:id', method: 'GET', description: 'Get scan results' }
    ]
  });
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

// Handle Vercel serverless function execution
module.exports = app; 